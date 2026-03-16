const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
const routePanel = document.getElementById('routePanel');

// Nodos: posiciones x, y, label, ip, routes
const nodes = [
    { x: 0.25 * canvas.width, y: 0.25 * canvas.height, label: 'R1', ip: '10.1.1.1', routes: [] },
    { x: 0.75 * canvas.width, y: 0.25 * canvas.height, label: 'R2', ip: '10.2.1.1', routes: [] },
    { x: 0.5 * canvas.width, y: 0.75 * canvas.height, label: 'R3', ip: '10.3.1.1', routes: [] }
];

// Enlaces: índices de nodos, activo (true/false), label, localPreference, asPathLength, med
let links = [
    { from: 0, to: 1, active: true, label: 'R1-R2', localPreference: 100, asPathLength: 1, med: 0 },
    { from: 0, to: 2, active: true, label: 'R1-R3', localPreference: 100, asPathLength: 1, med: 0 },
    { from: 1, to: 2, active: true, label: 'R2-R3', localPreference: 100, asPathLength: 1, med: 0 }
];

let packet = null; // {from, to, progress, finalDest, hops}
let selectedNode = null;
let highlightedLinks = new Set();

function updateBGP() {
    links[0].localPreference = parseInt(document.getElementById('lp12').value) || 100;
    links[0].asPathLength = parseInt(document.getElementById('as12').value) || 1;
    links[0].med = parseInt(document.getElementById('med12').value) || 0;
    links[1].localPreference = parseInt(document.getElementById('lp13').value) || 100;
    links[1].asPathLength = parseInt(document.getElementById('as13').value) || 1;
    links[1].med = parseInt(document.getElementById('med13').value) || 0;
    links[2].localPreference = parseInt(document.getElementById('lp23').value) || 100;
    links[2].asPathLength = parseInt(document.getElementById('as23').value) || 1;
    links[2].med = parseInt(document.getElementById('med23').value) || 0;
    calculateRoutes();
    updateHighlightedLinks();
    updateRoutePanel();
    draw();
}

function calculateRoutes() {
    // Reset routes
    nodes.forEach(node => {
        const net = node.label.slice(1);
        node.routes = [{ dest: `10.${net}.0.0/24`, nextHop: 'local', via: 'direct', lp: 0, asPath: 0, med: 0 }];
    });

    // For each pair, find best route
    nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
            if (i !== j) {
                const destNet = `10.${other.label.slice(1)}.0.0/24`;
                let bestRoute = null;

                // Direct route
                const directLink = links.find(l => (l.from === i && l.to === j) || (l.from === j && l.to === i));
                if (directLink && directLink.active) {
                    bestRoute = { dest: destNet, nextHop: other.ip, via: `${other.label} (${directLink.label})`, lp: directLink.localPreference, asPath: directLink.asPathLength, med: directLink.med };
                }

                // Indirect routes via third node
                nodes.forEach((via, k) => {
                    if (k !== i && k !== j) {
                        const link1 = links.find(l => (l.from === i && l.to === k) || (l.from === k && l.to === i));
                        const link2 = links.find(l => (l.from === k && l.to === j) || (l.from === j && l.to === k));
                        if (link1 && link1.active && link2 && link2.active) {
                            const route = { dest: destNet, nextHop: via.ip, via: `${via.label} (${node.label}-${via.label}-${other.label})`, lp: link1.localPreference, asPath: link1.asPathLength + link2.asPathLength, med: link2.med };
                            if (!bestRoute || compareRoutes(route, bestRoute) > 0) {
                                bestRoute = route;
                            }
                        }
                    }
                });

                if (bestRoute) {
                    node.routes.push(bestRoute);
                }
            }
        });
    });
}

function compareRoutes(r1, r2) {
    // BGP selection: higher LP, lower AS-Path, lower MED
    if (r1.lp !== r2.lp) return r1.lp - r2.lp;
    if (r1.asPath !== r2.asPath) return r2.asPath - r1.asPath;
    return r2.med - r1.med;
}

function updateHighlightedLinks() {
    highlightedLinks.clear();
    if (selectedNode !== null) {
        nodes[selectedNode].routes.forEach(route => {
            if (route.via !== 'direct') {
                const viaParts = route.via.split(' ');
                const pathStr = viaParts[1].slice(1, -1);
                const viaNodes = pathStr.split('-');
                for (let i = 0; i < viaNodes.length - 1; i++) {
                    const from = nodes.findIndex(n => n.label === viaNodes[i]);
                    const to = nodes.findIndex(n => n.label === viaNodes[i+1]);
                    if (from !== -1 && to !== -1) {
                        highlightedLinks.add(`${from}-${to}`);
                    }
                }
            }
        });
    }
}

function updateRoutePanel() {
    if (selectedNode !== null) {
        const routesText = nodes[selectedNode].routes.map(r => `${r.dest} -> ${r.nextHop} via ${r.via}`).join('\n');
        routePanel.textContent = `Rutas BGP de ${nodes[selectedNode].label} (${nodes[selectedNode].ip}):\n${routesText}`;
    }
}

function draw() {
    ctx.fillStyle = '#23272a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Actualizar posiciones de nodos basadas en tamaño actual
    nodes[0].x = 0.25 * canvas.width;
    nodes[0].y = 0.25 * canvas.height;
    nodes[1].x = 0.75 * canvas.width;
    nodes[1].y = 0.25 * canvas.height;
    nodes[2].x = 0.5 * canvas.width;
    nodes[2].y = 0.75 * canvas.height;

    // Dibujar enlaces
    links.forEach((link, index) => {
        const n1 = nodes[link.from];
        const n2 = nodes[link.to];
        let color = link.active ? '#00b4d8' : '#ff6b6b';
        if (highlightedLinks.has(`${link.from}-${link.to}`) || highlightedLinks.has(`${link.to}-${link.from}`)) {
            color = '#119b11'; // Verde para resaltado
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
    });

    // Dibujar nodos
    nodes.forEach((node, index) => {
        ctx.fillStyle = selectedNode === index ? '#119b11' : '#23272a';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 35, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#00b4d8';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#eaeaea';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 10);
        ctx.fillText(node.ip, node.x, node.y + 10);
    });

    // Dibujar paquete si existe
    if (packet) {
        const n1 = nodes[packet.from];
        const n2 = nodes[packet.to];
        const x = n1.x + (n2.x - n1.x) * packet.progress;
        const y = n1.y + (n2.y - n1.y) * packet.progress;
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function resetNetwork() {
    links.forEach(link => link.active = true);
    packet = null;
    selectedNode = null;
    highlightedLinks.clear();
    // Reset BGP attributes to defaults
    links[0].localPreference = 100;
    links[0].asPathLength = 1;
    links[0].med = 0;
    links[1].localPreference = 100;
    links[1].asPathLength = 1;
    links[1].med = 0;
    links[2].localPreference = 100;
    links[2].asPathLength = 1;
    links[2].med = 0;
    // Update inputs
    document.getElementById('lp12').value = 100;
    document.getElementById('as12').value = 1;
    document.getElementById('med12').value = 0;
    document.getElementById('lp13').value = 100;
    document.getElementById('as13').value = 1;
    document.getElementById('med13').value = 0;
    document.getElementById('lp23').value = 100;
    document.getElementById('as23').value = 1;
    document.getElementById('med23').value = 0;
    calculateRoutes();
    status.textContent = 'Estado: Normal. Rutas propagadas vía BGP.';
    routePanel.textContent = 'Selecciona un router para ver sus rutas BGP.';
    draw();
}

function toggleLink12() {
    links[0].active = !links[0].active;
    calculateRoutes();
    updateHighlightedLinks();
    updateRoutePanel();
    status.textContent = `Estado: Enlace R1-R2 ${links[0].active ? 'activo' : 'caído'}.`;
    draw();
}

function toggleLink13() {
    links[1].active = !links[1].active;
    calculateRoutes();
    updateHighlightedLinks();
    updateRoutePanel();
    status.textContent = `Estado: Enlace R1-R3 ${links[1].active ? 'activo' : 'caído'}.`;
    draw();
}

function toggleLink23() {
    links[2].active = !links[2].active;
    calculateRoutes();
    updateHighlightedLinks();
    updateRoutePanel();
    status.textContent = `Estado: Enlace R2-R3 ${links[2].active ? 'activo' : 'caído'}.`;
    draw();
}

function sendPacket() {
    const from = 0; // R1
    const to = 1; // R2
    packet = {from: from, to: to, progress: 0, finalDest: to, hops: 0};
    // Choose initial nextHop
    const route = nodes[from].routes.find(r => r.dest === `10.${nodes[to].label.slice(1)}.0.0/24`);
    if (!route || route.nextHop === 'local') {
        status.textContent = 'No hay ruta disponible para R1→R2.';
        packet = null;
        return;
    }
    const nextHopIdx = nodes.findIndex(n => n.ip === route.nextHop);
    packet.to = nextHopIdx;
    animatePacket();
}

function animatePacket() {
    if (!packet) return;
    
    packet.progress += 0.01;
    if (packet.progress >= 1) {
        packet.hops++;
        if (packet.hops > 10) {
            status.textContent = 'Paquete en loop infinito, detenido.';
            packet = null;
            draw();
            return;
        }
        // Arrived at packet.to
        if (packet.to === packet.finalDest) {
            packet = null;
            draw();
            return;
        }
        // Choose next hop from current to finalDest
        const route = nodes[packet.to].routes.find(r => r.dest === `10.${nodes[packet.finalDest].label.slice(1)}.0.0/24`);
        if (!route || route.nextHop === 'local') {
            status.textContent = 'Paquete atascado: no hay ruta desde ' + nodes[packet.to].label;
            packet = null;
            draw();
            return;
        }
        const nextHopIdx = nodes.findIndex(n => n.ip === route.nextHop);
        packet.from = packet.to;
        packet.to = nextHopIdx;
        packet.progress = 0;
    }
    draw();
    requestAnimationFrame(animatePacket);
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const index = nodes.findIndex(node => Math.sqrt((node.x - x)**2 + (node.y - y)**2) < 35);
    selectedNode = index !== -1 ? index : null;
    if (selectedNode !== null) {
        updateHighlightedLinks();
        const routesText = nodes[selectedNode].routes.map(r => `${r.dest} -> ${r.nextHop} via ${r.via}`).join('\n');
        routePanel.textContent = `Rutas BGP de ${nodes[selectedNode].label} (${nodes[selectedNode].ip}):\n${routesText}`;
    } else {
        highlightedLinks.clear();
        routePanel.textContent = 'Selecciona un router para ver sus rutas BGP.';
    }
    draw();
});

function updateNodePositions() {
    nodes[0].x = 0.25 * canvas.width;
    nodes[0].y = 0.25 * canvas.height;
    nodes[1].x = 0.75 * canvas.width;
    nodes[1].y = 0.25 * canvas.height;
    nodes[2].x = 0.5 * canvas.width;
    nodes[2].y = 0.75 * canvas.height;
}

window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    updateNodePositions();
    draw();
});

resetNetwork();