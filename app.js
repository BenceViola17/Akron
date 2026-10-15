// ==========================================
// AKRON PLATFORM - ULTIMATE CORE ENGINE
// ==========================================

// Global Application State
let activeView = 'chat'; // 'chat' or 'room'
let currentUni = 'PE';
let currentMajor = 'prog';
let currentChannel = 'altalanos';
let userName = 'Bence';
let userNeptun = 'HS3333';
let isSidebarOpen = true;

// Voice Room State
let activeRoomId = 'algo';
let isInVoiceRoom = false;
let isMicMuted = false;
let isCameraOn = false;
let isScreenSharing = false;
let isHandRaised = false;
let isRoomNotesOpen = false;
let isRoomChatOpen = false;
let localMediaStream = null;
let canvasColor = '#22d3ee';
let isDrawing = false;
let isSoundEnabled = true;

// Pomodoro Timer State
let pomodoroSeconds = 25 * 60;
let pomodoroTimer = null;
let isPomodoroRunning = false;
let pomodoroMode = 'focus'; // 'focus', 'break', 'longBreak'

// Command Palette State
let paletteResults = [];
let selectedPaletteIndex = 0;

// Voice & Study Rooms
const voiceRooms = {
    'algo': {
        id: 'algo',
        name: 'Algoritmusok Tanulószoba',
        desc: 'Közös felkészülés a félévközi ZH-ra • C/C++ konzultáció',
        type: 'Tanulószoba (Hang + Videó)',
        participants: [],
        icon: 'fa-headphones'
    },
    'webdev': {
        id: 'webdev',
        name: 'Webfejlesztés Csapatmunka',
        desc: 'HTML5/CSS3/JavaScript projekt egyeztetés',
        type: 'Projekt Szoba',
        participants: [],
        icon: 'fa-laptop-code'
    },
    'lounge': {
        id: 'lounge',
        name: 'Diák Kávézó & Chill',
        desc: 'Kötetlen beszélgetés, szünet a laborok között',
        type: 'Közösségi Szoba',
        participants: [],
        icon: 'fa-mug-hot'
    }
};

// In-Call Chat Messages
const roomChatMessages = {
    'algo': [],
    'webdev': [],
    'lounge': []
};

// Shared Notes in Room
const sharedRoomNotes = {
    'algo': `Algoritmusok ZH - Jegyzet & Képletek:
------------------------------------------
1. QuickSort átlagos műveletigény: O(n * log n)
2. Legrosszabb eset (már rendezett tömb): O(n^2)
3. Bináris Keresőfa (BST) beszúrás lépései:
   - Ha gyökér NULL -> új csomópont
   - Ha érték < gyökér -> bal részfa rekurzívan
   - Ha érték > gyökér -> jobb részfa rekurzívan
Memóriakezelés: malloc() után mindig kell free()!`,
    'webdev': `Webfejlesztés Projekt feladatok:
- Responsive Tailwind grid
- Chat és szobák kialakítása
- Közös feladatok felosztása`,
    'lounge': `Kávészünet témák:
- Hétvégi hackathon
- Egyetemi sportnap`
};

// Universities Data
const universities = {
    'PE': {
        name: 'Pannon Egyetem (PE)',
        fullName: 'Pannon Egyetem',
        city: 'Veszprém',
        majors: [
            { id: 'prog', name: 'Programtervező Informatikus' },
            { id: 'mornok', name: 'Mérnökinformatikus' },
            { id: 'gazd', name: 'Gazdaságinformatikus' },
            { id: 'villam', name: 'Villamosmérnök' }
        ]
    },
    'BME': {
        name: 'Budapesti Műszaki Egyetem (BME)',
        fullName: 'Budapesti Műszaki és Gazdaságtudományi Egyetem',
        city: 'Budapest',
        majors: [
            { id: 'mornok', name: 'Mérnökinformatikus' },
            { id: 'villam', name: 'Villamosmérnök' },
            { id: 'mechatron', name: 'Mechatronikai mérnök' },
            { id: 'egeszseg', name: 'Egészségügyi mérnök' }
        ]
    },
    'ELTE': {
        name: 'Eötvös Loránd Tudományegyetem (ELTE)',
        fullName: 'Eötvös Loránd Tudományegyetem',
        city: 'Budapest',
        majors: [
            { id: 'prog', name: 'Programtervező Informatikus' },
            { id: 'adattud', name: 'Adattudomány MSc' },
            { id: 'muszaki', name: 'Műszaki Informatikus' }
        ]
    },
    'SZE': {
        name: 'Széchenyi István Egyetem (SZE)',
        fullName: 'Széchenyi István Egyetem',
        city: 'Győr',
        majors: [
            { id: 'jarmu', name: 'Járműmérnök' },
            { id: 'mornok', name: 'Mérnökinformatikus' },
            { id: 'logisztika', name: 'Logisztikai mérnök' }
        ]
    },
    'DE': {
        name: 'Debreceni Egyetem (DE)',
        fullName: 'Debreceni Egyetem',
        city: 'Debrecen',
        majors: [
            { id: 'prog', name: 'Programtervező Informatikus' },
            { id: 'gazd', name: 'Gazdaságinformatikus' },
            { id: 'mernok', name: 'Mérnökinformatikus' }
        ]
    },
    'PTE': {
        name: 'Pécsi Tudományegyetem (PTE)',
        fullName: 'Pécsi Tudományegyetem',
        city: 'Pécs',
        majors: [
            { id: 'mornok', name: 'Mérnökinformatikus' },
            { id: 'rendszer', name: 'Rendszerüzemeltető' }
        ]
    },
    'OE': {
        name: 'Óbudai Egyetem (OE)',
        fullName: 'Óbudai Egyetem',
        city: 'Budapest',
        majors: [
            { id: 'cyber', name: 'Cyber Security & Hálózatbiztonság' },
            { id: 'mornok', name: 'Mérnökinformatikus' },
            { id: 'villam', name: 'Villamosmérnök' }
        ]
    }
};

// Channels Data
const channels = [
    { id: 'altalanos', name: 'általános', desc: 'Közösségi beszélgetések és információk', icon: 'fa-hashtag' },
    { id: 'feladatok', name: 'feladatok-és-hf', desc: 'Házi feladatok, laborok és beadandók megbeszélése', icon: 'fa-hashtag' },
    { id: 'vizsga', name: 'vizsga-felkészülés', desc: 'ZH és vizsga tételsorok, konzultációk', icon: 'fa-hashtag' },
    { id: 'offtopic', name: 'off-topic', desc: 'Kötetlen beszélgetések, egyetemi élet, mémek', icon: 'fa-hashtag' }
];

// Messages Data per Channel
const channelMessages = {
    'altalanos': [],
    'feladatok': [],
    'vizsga': [],
    'offtopic': []
};

// University Community Members
const channelMembers = [
    { name: userName, role: 'Te', status: 'Online', initials: userName.charAt(0).toUpperCase(), color: 'bg-cyan-600', skills: 'C/C++, Webfejlesztés, Python' }
];

// Notifications
let notifications = [
    { id: 1, title: 'Beszélgetőszoba elérhető: Algoritmusok tanulószoba', time: 'Most', read: false, icon: 'fa-headset text-emerald-400' }
];

// Kanban Study Deadlines Tasks
let kanbanTasks = [
    {
        id: 't1',
        title: 'Algoritmusok 1. Nagyházi (QuickSort & Fa)',
        course: 'Algoritmusok és adatszerkezetek',
        deadline: '2 nap múlva (okt. 16.)',
        status: 'todo',
        priority: 'high'
    },
    {
        id: 't2',
        title: 'Diszkrét matematika ZH tételsor átismétlése',
        course: 'Diszkrét matematika',
        deadline: '5 nap múlva',
        status: 'todo',
        priority: 'high'
    },
    {
        id: 't3',
        title: 'Webfejlesztés Kliensoldali Mini-Portál',
        course: 'Webfejlesztés',
        deadline: 'Jövő hétfő',
        status: 'progress',
        priority: 'medium'
    },
    {
        id: 't4',
        title: 'Operációs rendszerek bash szkript labor',
        course: 'Operációs rendszerek',
        deadline: 'Leadva tegnap',
        status: 'done',
        priority: 'low'
    }
];

// ==========================================
// AUDIO SYNTHESIZER (ZERO ASSET DEPENDENCY)
// ==========================================
function playAudioTone(freq, type = 'sine', duration = 0.15) {
    if (!isSoundEnabled) return;
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        // AudioContext might be blocked until user gesture, safely ignored
    }
}

function playJoinChime() {
    playAudioTone(440, 'triangle', 0.12);
    setTimeout(() => playAudioTone(660, 'triangle', 0.15), 100);
}

function playLeaveChime() {
    playAudioTone(660, 'triangle', 0.12);
    setTimeout(() => playAudioTone(380, 'triangle', 0.16), 100);
}

function playBellChime() {
    playAudioTone(880, 'sine', 0.25);
}

function playGongChime() {
    playAudioTone(523.25, 'sine', 0.4);
    setTimeout(() => playAudioTone(659.25, 'sine', 0.5), 150);
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    applyUniversityTheme(currentUni);
    renderUniversityRail();
    updateMajorSelect();
    renderChannels();
    renderVoiceRooms();
    renderChatMessages();
    renderStudentsList();
    renderNotifications();
    setupOutsideClickHandlers();
    initWhiteboard();
    updateBreadcrumbs();
    renderKanban();
});

// ==========================================
// VIEW SWITCHER (Chat vs Beszélgetőszoba)
// ==========================================
function switchMainView(view) {
    activeView = view;
    const chatView = document.getElementById('chatView');
    const roomView = document.getElementById('roomView');

    const btnViewChat = document.getElementById('btnViewChat');
    const btnViewRoom = document.getElementById('btnViewRoom');
    const railBtnRoom = document.getElementById('railBtnRoom');

    // Hide all main views first
    chatView.classList.add('hidden');
    roomView.classList.add('hidden');

    // Reset button styles (stretched & organized)
    const inactiveBtnClass = "px-4 sm:px-5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all whitespace-nowrap text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 cursor-pointer";
    btnViewChat.className = inactiveBtnClass;
    btnViewRoom.className = inactiveBtnClass;

    if (railBtnRoom) railBtnRoom.className = "w-10 h-10 rounded-2xl bg-slate-800 hover:bg-emerald-600 text-emerald-400 hover:text-white flex items-center justify-center transition-all relative group shadow-md";

    if (view === 'room') {
        roomView.classList.remove('hidden');
        btnViewRoom.className = "px-4 sm:px-5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all whitespace-nowrap bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/60 cursor-pointer";
        if (railBtnRoom) railBtnRoom.className = "w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center transition-all relative group shadow-lg";

        updateRoomViewState();
    } else {
        chatView.classList.remove('hidden');
        btnViewChat.className = "px-4 sm:px-5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all whitespace-nowrap bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/60 cursor-pointer";
    }

    updateBreadcrumbs();
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('channelSidebar');
    if (!sidebar) return;

    isSidebarOpen = !isSidebarOpen;
    if (isSidebarOpen) {
        sidebar.classList.remove('-ml-64');
    } else {
        sidebar.classList.add('-ml-64');
    }
}

// Breadcrumbs Navigation
function updateBreadcrumbs() {
    const bcUni = document.getElementById('bcUni');
    const bcMajor = document.getElementById('bcMajor');
    const bcSection = document.getElementById('bcSection');

    if (bcUni) bcUni.innerText = currentUni;
    if (bcMajor) {
        const uni = universities[currentUni];
        const m = uni ? uni.majors.find(x => x.id === currentMajor) : null;
        bcMajor.innerText = m ? m.name : 'Informatika';
    }
    if (bcSection) {
        if (activeView === 'room') {
            bcSection.innerText = `🎧 ${voiceRooms[activeRoomId]?.name || 'Beszélgetőszoba'}`;
        } else {
            bcSection.innerText = `#${currentChannel}`;
        }
    }
}

// ==========================================
// UNIVERSITIES & MAJORS (WITH COLOR THEMES)
// ==========================================
function applyUniversityTheme(uniCode) {
    document.body.className = `theme-${uniCode.toLowerCase()} h-screen w-screen flex flex-col antialiased select-none bg-[#020408] text-slate-100 font-sans`;
}

function renderUniversityRail() {
    const container = document.getElementById('uniListContainer');
    if (!container) return;

    let html = '';
    for (const [code, uni] of Object.entries(universities)) {
        const isSelected = code === currentUni;
        const activeClass = isSelected
            ? 'bg-cyan-600 text-white shadow-lg glow-active'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white';

        html += `
            <button id="uni-${code}" onclick="selectUniversity('${code}')" class="uni-btn w-10 h-10 rounded-2xl ${activeClass} flex items-center justify-center font-bold text-xs hover:rounded-xl transition-all relative group shadow-md" data-uni="${code}">
                ${isSelected ? '<span class="absolute -left-1 w-1 h-6 bg-cyan-400 rounded-r-full"></span>' : ''}
                ${code}
                <span class="absolute left-16 bg-slate-900 text-slate-200 text-xs font-semibold px-2 py-1 rounded-md shadow-xl whitespace-nowrap hidden group-hover:block z-50">
                    ${uni.fullName}
                </span>
            </button>
        `;
    }
    container.innerHTML = html;
}

function selectUniversity(uniCode) {
    if (!universities[uniCode]) return;
    currentUni = uniCode;

    applyUniversityTheme(uniCode);
    renderUniversityRail();

    const titleEl = document.getElementById('currentUniTitle');
    if (titleEl) {
        titleEl.innerHTML = `<i class="fa-solid fa-building-columns text-cyan-400"></i> ${universities[uniCode].name}`;
    }

    updateMajorSelect();
    updateBreadcrumbs();
    showToast(`Egyetem kiválasztva: ${universities[uniCode].fullName}`, 'info');
}

function updateMajorSelect() {
    const select = document.getElementById('majorSelect');
    if (!select || !universities[currentUni]) return;

    const majors = universities[currentUni].majors;
    select.innerHTML = majors.map(m => `<option value="${m.id}">${m.name}</option>`).join('');

    currentMajor = majors[0] ? majors[0].id : 'prog';
    updateBreadcrumbs();
}

function changeMajor(majorId) {
    currentMajor = majorId;
    const uni = universities[currentUni];
    const majorObj = uni ? uni.majors.find(m => m.id === majorId) : null;
    const majorName = majorObj ? majorObj.name : majorId;

    updateBreadcrumbs();
    showToast(`Szak beállítva: ${majorName}`, 'success');
}



// ==========================================
// CHANNELS & COMMUNITY CHAT
// ==========================================
function renderChannels() {
    const container = document.getElementById('channelsContainer');
    if (!container) return;

    let html = '';
    channels.forEach(ch => {
        const isSelected = ch.id === currentChannel;
        const activeClass = isSelected
            ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 font-medium';

        html += `
            <button onclick="switchChannel('${ch.id}')" class="w-full flex items-center px-2 py-1.5 rounded-md text-xs transition-colors ${activeClass}">
                <i class="fa-solid ${ch.icon} ${isSelected ? 'text-cyan-400' : 'text-slate-500'} mr-2"></i>
                <span class="truncate">${ch.name}</span>
            </button>
        `;
    });
    container.innerHTML = html;
}

function switchChannel(channelId) {
    currentChannel = channelId;
    const ch = channels.find(c => c.id === channelId);
    if (!ch) return;

    renderChannels();

    const titleEl = document.getElementById('channelTitle');
    const descEl = document.getElementById('channelDescription');
    const inputEl = document.getElementById('chatInput');

    if (titleEl) titleEl.innerText = ch.name;
    if (descEl) descEl.innerText = ch.desc;
    if (inputEl) inputEl.placeholder = `Üzenet küldése ide: #${ch.name}...`;

    renderChatMessages();
    updateBreadcrumbs();

    if (activeView !== 'chat') {
        switchMainView('chat');
    }

    // Mobile: auto close sidebar when selecting a channel
    if (window.innerWidth <= 768 && isSidebarOpen) {
        toggleSidebar();
    }
}

function renderChatMessages() {
    const container = document.getElementById('chatMessagesContainer');
    if (!container) return;

    const msgs = channelMessages[currentChannel] || [];
    const ch = channels.find(c => c.id === currentChannel) || { name: currentChannel, desc: '' };

    let html = `
        <div class="bg-[#10172a] border border-cyan-500/30 rounded-xl p-4 mb-4">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl mb-2">
                <i class="fa-solid fa-hashtag"></i>
            </div>
            <h2 class="text-base font-bold text-slate-100">Üdvözlünk a #${ch.name} csatornán!</h2>
            <p class="text-xs text-slate-400 mt-1">${ch.desc || 'Ez a csatorna a megbeszélések helye.'}</p>
        </div>
    `;

    msgs.forEach(msg => {
        html += `
            <div class="flex space-x-3 group">
                <div class="w-8 h-8 rounded-full ${msg.color || 'bg-slate-700'} flex items-center justify-center font-bold text-xs text-white shrink-0 shadow">
                    ${msg.initials || 'U'}
                </div>
                <div class="flex-1">
                    <div class="flex items-baseline space-x-2">
                        <span class="text-xs font-bold text-slate-200">${msg.sender}</span>
                        <span class="text-[10px] text-slate-500">${msg.time}</span>
                    </div>
                    <div class="text-xs text-slate-300 mt-0.5 leading-relaxed">${msg.text}</div>
                    ${msg.codeSnippet ? renderCodeSnippetBlock(msg.codeSnippet) : ''}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
}

function renderCodeSnippetBlock(snippet) {
    const escaped = snippet.code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `
        <div class="chat-code-block">
            <div class="chat-code-header">
                <span><i class="fa-solid fa-code mr-1.5 text-cyan-400"></i>${snippet.language.toUpperCase()}</span>
                <button onclick="copySnippetToClipboard(this)" data-code="${encodeURIComponent(snippet.code)}" class="text-slate-400 hover:text-white transition-colors">
                    <i class="fa-solid fa-copy mr-1"></i>Másolás
                </button>
            </div>
            <div class="chat-code-content">${escaped}</div>
        </div>
    `;
}

function copySnippetToClipboard(btn) {
    const rawCode = decodeURIComponent(btn.getAttribute('data-code'));
    navigator.clipboard.writeText(rawCode).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check text-emerald-400 mr-1"></i>Másolva!`;
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 1800);
    });
}

function handleChatKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    if (!channelMessages[currentChannel]) {
        channelMessages[currentChannel] = [];
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    channelMessages[currentChannel].push({
        sender: userName,
        initials: userName.charAt(0).toUpperCase(),
        color: 'bg-cyan-600',
        time: `Ma ${time}`,
        text: text
    });

    input.value = '';
    renderChatMessages();

}

// Modal: Add Channel
function openAddChannelModal() {
    openModal('addChannelModal');
}

function submitAddChannel(e) {
    e.preventDefault();
    const nameInput = document.getElementById('inputChannelName').value.trim();
    const descInput = document.getElementById('inputChannelDesc').value.trim();

    if (!nameInput) return;

    const cleanId = nameInput.toLowerCase().replace(/[^a-z0-9]/g, '-');
    channels.push({
        id: cleanId,
        name: cleanId,
        desc: descInput || 'Hallgatói csatorna',
        icon: 'fa-hashtag'
    });

    channelMessages[cleanId] = [];

    closeModal('addChannelModal');
    renderChannels();
    switchChannel(cleanId);
    showToast(`Csatorna létrehozva: #${cleanId}`, 'success');
    e.target.reset();
}

// ==========================================
// CODE SNIPPET SHARING
// ==========================================
function openCodeSnippetModal() {
    openModal('codeSnippetModal');
}

function submitCodeSnippet(e) {
    e.preventDefault();
    const lang = document.getElementById('snippetLanguage').value;
    const code = document.getElementById('snippetCode').value.trim();
    const comment = document.getElementById('snippetComment').value.trim();

    if (!code) return;

    if (!channelMessages[currentChannel]) {
        channelMessages[currentChannel] = [];
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    channelMessages[currentChannel].push({
        sender: userName,
        initials: userName.charAt(0).toUpperCase(),
        color: 'bg-cyan-600',
        time: `Ma ${time}`,
        text: comment || 'Kódrészlet megosztva a munkaterületről:',
        codeSnippet: {
            language: lang,
            code: code
        }
    });

    closeModal('codeSnippetModal');
    renderChatMessages();
    showToast('Kódrészlet elküldve a chatbe!', 'success');
    e.target.reset();
}

// ==========================================
// MEMBERS LIST & PINNED MESSAGES
// ==========================================
function toggleMembersList() {
    const drawer = document.getElementById('membersDrawer');
    if (!drawer) return;

    drawer.classList.toggle('hidden');
    if (!drawer.classList.contains('hidden')) {
        renderDrawerMembers();
    }
}

function renderDrawerMembers() {
    const list = document.getElementById('drawerMemberList');
    if (!list) return;

    let html = '';
    channelMembers.forEach(m => {
        html += `
            <div onclick="openStudentModal('${m.name}')" class="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors">
                <div class="relative">
                    <div class="w-7 h-7 rounded-full ${m.color} flex items-center justify-center font-bold text-[10px] text-white">
                        ${m.initials}
                    </div>
                    <span class="absolute bottom-0 right-0 w-2 h-2 rounded-full ${m.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-500'} border border-slate-900"></span>
                </div>
                <div class="flex-1 truncate">
                    <div class="text-xs font-semibold text-slate-200 truncate">${m.name}</div>
                    <div class="text-[10px] text-slate-400 truncate">${m.role}</div>
                </div>
            </div>
        `;
    });
    list.innerHTML = html;
}

function togglePinnedMessages() {
    openModal('pinnedModal');
}

// ==========================================
// CURRENT USER PRESENCE
// ==========================================
function renderStudentsList() {
    const container = document.getElementById('studentListContainer');
    const countEl = document.getElementById('onlineMembersCount');
    if (!container) return;

    const allMembers = channelMembers;
    const onlineCount = allMembers.filter(m => m.status === 'Online').length;

    if (countEl) countEl.innerText = `${onlineCount}/${allMembers.length}`;

    // Sort: Online first, then others
    const sorted = [...allMembers].sort((a, b) => {
        if (a.status === 'Online' && b.status !== 'Online') return -1;
        if (a.status !== 'Online' && b.status === 'Online') return 1;
        return 0;
    });

    // Check which room each member is in
    const memberRoomMap = {};
    for (const [roomId, room] of Object.entries(voiceRooms)) {
        room.participants.forEach(pName => {
            memberRoomMap[pName] = { roomId, roomName: room.name };
        });
    }

    let html = '';
    let lastGroup = null;

    sorted.forEach(m => {
        const isOnline = m.status === 'Online';
        const group = isOnline ? 'online' : 'offline';

        // Section divider
        if (group !== lastGroup) {
            lastGroup = group;
            html += `<div class="text-[9px] font-bold uppercase tracking-widest text-slate-600 px-2 pt-2 pb-1">${isOnline ? 'Online' : 'Offline / Inaktív'}</div>`;
        }

        const statusDot = isOnline ? 'bg-emerald-500' : 'bg-slate-600';
        const inRoom = memberRoomMap[m.name];
        const voiceTag = inRoom
            ? `<span class="text-[9px] text-emerald-400 font-semibold truncate block"><i class="fa-solid fa-headphones mr-0.5"></i>${inRoom.roomName.split(' ')[0]}</span>`
            : '';

        html += `
            <div onclick="openStudentModal('${m.name}')" class="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors text-xs ${isOnline ? 'text-slate-300' : 'text-slate-500 opacity-70'}">
                <div class="relative shrink-0">
                    <div class="w-6 h-6 rounded-full ${m.color} flex items-center justify-center font-bold text-[10px] text-white">
                        ${m.initials}
                    </div>
                    <span class="absolute bottom-0 right-0 w-2 h-2 rounded-full ${statusDot} border border-slate-900"></span>
                </div>
                <div class="flex-1 min-w-0">
                    <span class="truncate block font-medium leading-tight">${m.name}</span>
                    ${voiceTag || `<span class="text-[9px] text-slate-600 truncate block">${m.role.split(' ')[0]}</span>`}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function openStudentModal(studentName) {
    const nameEl = document.getElementById('studentModalName');
    const avatarEl = document.getElementById('studentAvatar');
    const uniEl = document.getElementById('studentModalUni');
    const roleEl = document.getElementById('studentModalRole');
    const titleEl = document.getElementById('studentModalTitle');
    const badgeEl = document.getElementById('studentModalBadge');
    const statusDotEl = document.getElementById('studentModalStatusDot');
    const statusTextEl = document.getElementById('studentModalStatusText');
    const skillsEl = document.getElementById('studentModalSkills');

    const member = channelMembers.find(m => m.name === studentName) || {
        name: studentName,
        role: studentName === userName ? 'Te' : 'Hallgató',
        status: 'Online',
        initials: studentName.charAt(0).toUpperCase(),
        color: 'bg-cyan-600',
        skills: 'C/C++, Webfejlesztés, Python'
    };

    const isMe = studentName === userName || member.role === 'Te';

    if (titleEl) titleEl.innerText = isMe ? 'Saját profilod' : `${studentName} profilja`;
    if (nameEl) nameEl.innerText = studentName;
    if (avatarEl) {
        avatarEl.className = `w-12 h-12 rounded-2xl ${member.color || 'bg-cyan-600'} flex items-center justify-center font-bold text-base text-white shadow-lg`;
        avatarEl.innerText = member.initials || studentName.charAt(0).toUpperCase();
    }
    if (uniEl) uniEl.innerText = universities[currentUni]?.name || 'Pannon Egyetem';
    if (roleEl) roleEl.innerText = isMe ? 'Saját profil • Online' : `${member.role} • ${member.status}`;
    if (badgeEl) badgeEl.innerText = isMe ? 'Saját fiók' : (member.role.includes('Demonstrátor') ? 'Demonstrátor / Oktató' : 'Hitelesített Hallgató');
    if (statusDotEl) statusDotEl.className = `w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-500'}`;
    if (statusTextEl) statusTextEl.innerText = `${member.status} az Akronon`;
    if (skillsEl) skillsEl.innerText = member.skills || 'C/C++, Webfejlesztés, Python';

    openModal('studentModal');
}

// ==========================================
// KANBAN & STUDY DEADLINES
// ==========================================
function openKanbanModal() {
    renderKanban();
    openModal('kanbanModal');
}

function renderKanban() {
    const colTodo = document.getElementById('kanbanColTodo');
    const colProgress = document.getElementById('kanbanColProgress');
    const colDone = document.getElementById('kanbanColDone');

    if (!colTodo || !colProgress || !colDone) return;

    let todoHtml = '';
    let progressHtml = '';
    let doneHtml = '';

    let countTodo = 0;
    let countProgress = 0;
    let countDone = 0;

    kanbanTasks.forEach(task => {
        let priorityBadge = '';
        if (task.priority === 'high') {
            priorityBadge = '<span class="px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-700/40 text-[9px] font-bold">Magas</span>';
        } else if (task.priority === 'medium') {
            priorityBadge = '<span class="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-700/40 text-[9px] font-bold">Normál</span>';
        } else {
            priorityBadge = '<span class="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[9px]">Alacsony</span>';
        }

        const card = `
            <div class="kanban-card text-xs flex flex-col justify-between space-y-2">
                <div>
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-[10px] text-slate-400 font-medium">${task.course}</span>
                        ${priorityBadge}
                    </div>
                    <div class="font-bold text-slate-100 leading-snug">${task.title}</div>
                </div>
                <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                    <span class="text-amber-400 flex items-center gap-1"><i class="fa-solid fa-clock text-[10px]"></i> ${task.deadline}</span>
                    <div class="flex items-center space-x-1">
                        ${task.status !== 'done' ? `
                            <button onclick="advanceKanbanTask('${task.id}')" class="p-1 hover:text-emerald-400 text-slate-400 transition-colors" title="Előreléptetés">
                                <i class="fa-solid fa-arrow-right text-[10px]"></i>
                            </button>
                        ` : ''}
                        <button onclick="deleteKanbanTask('${task.id}')" class="p-1 hover:text-red-400 text-slate-500 transition-colors" title="Törlés">
                            <i class="fa-solid fa-trash-can text-[10px]"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        if (task.status === 'todo') {
            todoHtml += card;
            countTodo++;
        } else if (task.status === 'progress') {
            progressHtml += card;
            countProgress++;
        } else {
            doneHtml += card;
            countDone++;
        }
    });

    colTodo.innerHTML = todoHtml || '<div class="text-slate-600 text-center py-6 text-xs">Nincs teendő.</div>';
    colProgress.innerHTML = progressHtml || '<div class="text-slate-600 text-center py-6 text-xs">Nincs folyamatban.</div>';
    colDone.innerHTML = doneHtml || '<div class="text-slate-600 text-center py-6 text-xs">Még nincs leadott feladat.</div>';

    const cntTodoEl = document.getElementById('kanbanCountTodo');
    const cntProgEl = document.getElementById('kanbanCountProgress');
    const cntDoneEl = document.getElementById('kanbanCountDone');

    if (cntTodoEl) cntTodoEl.innerText = countTodo;
    if (cntProgEl) cntProgEl.innerText = countProgress;
    if (cntDoneEl) cntDoneEl.innerText = countDone;
}

function advanceKanbanTask(taskId) {
    const task = kanbanTasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.status === 'todo') {
        task.status = 'progress';
        showToast(`Feladat áthelyezve a 'Folyamatban' oszlopba: ${task.title}`, 'info');
    } else if (task.status === 'progress') {
        task.status = 'done';
        playJoinChime();
        showToast(`Gratulálunk! Feladat leadva és kész: ${task.title}`, 'success');
    }
    renderKanban();
}

function deleteKanbanTask(taskId) {
    kanbanTasks = kanbanTasks.filter(t => t.id !== taskId);
    renderKanban();
    showToast('Feladat törölve a határidők közül.', 'info');
}

function openAddTaskModal() {
    openModal('addTaskModal');
}

function submitAddTask(e) {
    e.preventDefault();
    const title = document.getElementById('inputTaskTitle').value.trim();
    const course = document.getElementById('inputTaskCourse').value.trim() || 'Informatika';
    const deadline = document.getElementById('inputTaskDeadline').value.trim() || 'Hamarosan';
    const priority = document.getElementById('inputTaskPriority').value;

    if (!title) return;

    kanbanTasks.push({
        id: 't_' + Date.now(),
        title: title,
        course: course,
        deadline: deadline,
        status: 'todo',
        priority: priority
    });

    closeModal('addTaskModal');
    renderKanban();
    showToast(`Új feladat hozzáadva a határidőkhöz: ${title}`, 'success');
    e.target.reset();
}

// ==========================================
// POMODORO TIMER (IN BESZÉLGETŐSZOBA)
// ==========================================
function togglePomodoro() {
    isPomodoroRunning = !isPomodoroRunning;
    const btnPlay = document.getElementById('btnPomodoroPlay');
    const icon = document.getElementById('pomodoroIcon');

    if (isPomodoroRunning) {
        if (icon) icon.className = "fa-solid fa-pause text-[11px] text-amber-400";
        showToast('🍅 Pomodoro fókusz időzítő elindítva!', 'info');

        pomodoroTimer = setInterval(() => {
            pomodoroSeconds--;
            updatePomodoroDisplay();

            if (pomodoroSeconds <= 0) {
                clearInterval(pomodoroTimer);
                isPomodoroRunning = false;
                playGongChime();

                if (pomodoroMode === 'focus') {
                    showToast('🔔 Pomodoro fókusz lejárt! 5 perc szünet következik.', 'success');
                    switchPomodoroMode('break');
                } else {
                    showToast('🔔 Szünet véget ért! Vissza a fókuszhoz.', 'info');
                    switchPomodoroMode('focus');
                }
            }
        }, 1000);
    } else {
        clearInterval(pomodoroTimer);
        if (icon) icon.className = "fa-solid fa-play text-[11px]";
        showToast('Pomodoro időzítő szüneteltetve.', 'info');
    }
}

function resetPomodoro() {
    clearInterval(pomodoroTimer);
    isPomodoroRunning = false;
    const icon = document.getElementById('pomodoroIcon');
    if (icon) icon.className = "fa-solid fa-play text-[11px]";

    pomodoroSeconds = pomodoroMode === 'focus' ? 25 * 60 : 5 * 60;
    updatePomodoroDisplay();
    showToast('Pomodoro időzítő visszaállítva.', 'info');
}

function switchPomodoroMode(targetMode) {
    if (targetMode) {
        pomodoroMode = targetMode;
    } else {
        pomodoroMode = pomodoroMode === 'focus' ? 'break' : 'focus';
    }

    const label = document.getElementById('pomodoroModeLabel');
    if (label) {
        label.innerText = pomodoroMode === 'focus' ? 'Fókusz' : 'Szünet';
    }

    resetPomodoro();
}

function updatePomodoroDisplay() {
    const display = document.getElementById('pomodoroTimerDisplay');
    if (!display) return;

    const mins = Math.floor(pomodoroSeconds / 60);
    const secs = pomodoroSeconds % 60;
    display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ==========================================
// COMMAND PALETTE (CTRL + K SPOTLIGHT)
// ==========================================
function openCommandPalette() {
    const modal = document.getElementById('commandPaletteModal');
    const input = document.getElementById('paletteInput');
    if (!modal || !input) return;

    modal.classList.remove('hidden');
    input.value = '';
    handlePaletteSearch('');
    setTimeout(() => input.focus(), 40);
}

function handlePaletteSearch(query) {
    const q = (query || '').trim().toLowerCase();
    const list = document.getElementById('paletteResultsList');
    if (!list) return;

    let items = [
        { title: 'Neptun Tanulmányi Adatok', desc: 'Átlagok, kreditek és aktuális kurzusok megtekintése', category: 'Tanulmányok', icon: 'fa-graduation-cap text-emerald-400', action: openNeptunModal },
        { title: 'Határidők & Kanban Tábla', desc: 'Beadandók és vizsgák áttekintése', category: 'Tanulmányok', icon: 'fa-list-check text-amber-400', action: openKanbanModal },
        { title: 'Pomodoro Időzítő Indítása/Megállítása', desc: '25 perces tanulási fókusz a beszélgetőszobában', category: 'Eszköz', icon: 'fa-clock text-red-400', action: () => { switchMainView('room'); togglePomodoro(); } },
        { title: 'Rajztábla Megnyitása', desc: 'Közös rajzoló felület a szobában', category: 'Eszköz', icon: 'fa-pen-nib text-cyan-400', action: () => { switchMainView('room'); toggleRoomNotes(); } },
        { title: 'Kódrészlet Megosztása', desc: 'C, JS, Python kód csatolása a chatbe', category: 'Eszköz', icon: 'fa-code text-cyan-400', action: openCodeSnippetModal },
        { title: 'Kitűzött Határidők & Konzultációk', desc: 'Heti konzultációk és feladat specifikációk', category: 'Tanulmányok', icon: 'fa-thumbtack text-amber-400', action: togglePinnedMessages },
        { title: 'Új Feladat Létrehozása', desc: 'Beadandó felvétele a határidők közé', category: 'Tanulmányok', icon: 'fa-plus text-amber-400', action: openAddTaskModal }
    ];

    // Add all voice rooms dynamically
    Object.entries(voiceRooms).forEach(([id, room]) => {
        items.push({
            title: `Csatlakozás: ${room.name}`,
            desc: `${room.type} • ${room.desc}`,
            category: 'Beszélgető',
            icon: 'fa-headset text-emerald-400',
            action: () => requestJoinVoiceRoom(id)
        });
    });

    // Add all channels dynamically
    channels.forEach(ch => {
        items.push({
            title: `Csatorna: #${ch.name}`,
            desc: ch.desc,
            category: 'Csatorna',
            icon: 'fa-hashtag text-cyan-400',
            action: () => switchChannel(ch.id)
        });
    });

    // Add all universities dynamically
    Object.entries(universities).forEach(([code, uni]) => {
        items.push({
            title: `Egyetemváltás: ${uni.fullName} (${code})`,
            desc: uni.city,
            category: 'Egyetem',
            icon: 'fa-building-columns text-purple-400',
            action: () => selectUniversity(code)
        });
    });

    if (q) {
        items = items.filter(it => it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q) || it.category.toLowerCase().includes(q));
    }

    paletteResults = items;
    selectedPaletteIndex = 0;

    if (items.length === 0) {
        list.innerHTML = `<div class="p-4 text-center text-slate-500">Nincs találat a parancsra: "${query}"</div>`;
        return;
    }

    list.innerHTML = items.map((it, idx) => `
        <div onclick="executePaletteItem(${idx})" class="p-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${idx === selectedPaletteIndex ? 'palette-selected' : 'hover:bg-slate-800/60'}">
            <div class="flex items-center space-x-3">
                <i class="fa-solid ${it.icon} text-sm"></i>
                <div>
                    <div class="font-semibold text-slate-200">${it.title}</div>
                    <div class="text-[10px] text-slate-400">${it.desc}</div>
                </div>
            </div>
            <span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">${it.category}</span>
        </div>
    `).join('');
}

function handlePaletteKey(e) {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (selectedPaletteIndex < paletteResults.length - 1) {
            selectedPaletteIndex++;
            updatePaletteSelection();
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (selectedPaletteIndex > 0) {
            selectedPaletteIndex--;
            updatePaletteSelection();
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();
        executePaletteItem(selectedPaletteIndex);
    } else if (e.key === 'Escape') {
        closeModal('commandPaletteModal');
    }
}

function updatePaletteSelection() {
    const list = document.getElementById('paletteResultsList');
    if (!list) return;

    const children = list.children;
    for (let i = 0; i < children.length; i++) {
        if (i === selectedPaletteIndex) {
            children[i].classList.add('palette-selected');
            children[i].scrollIntoView({ block: 'nearest' });
        } else {
            children[i].classList.remove('palette-selected');
        }
    }
}

function executePaletteItem(index) {
    if (paletteResults[index]) {
        closeModal('commandPaletteModal');
        paletteResults[index].action();
    }
}

// Global Keyboard Listener for Ctrl+K / Cmd+K
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCommandPalette();
    }
});

// ==========================================
// VOICE & STUDY ROOMS ENGINE (Beszélgetőszoba)
// ==========================================
function renderVoiceRooms() {
    const container = document.getElementById('voiceRoomsContainer');
    const dropdown = document.getElementById('roomSelectDropdown');
    if (!container) return;

    let html = '';
    let dropdownHtml = '';

    for (const [id, room] of Object.entries(voiceRooms)) {
        const isCurrent = isInVoiceRoom && activeRoomId === id;
        const allParticipants = [...room.participants, ...(isCurrent ? [userName] : [])];
        const participantCount = allParticipants.length;

        const avatarRowHtml = allParticipants.slice(0, 4).map(name => {
            const member = channelMembers.find(m => m.name === name);
            const initials = name === userName ? userName.charAt(0).toUpperCase() : (member ? member.initials : name.charAt(0).toUpperCase());
            const color = name === userName ? 'bg-cyan-600' : (member ? member.color : 'bg-slate-600');
            const label = name === userName ? name + ' (Te)' : name;
            return `<div class="w-5 h-5 rounded-full ${color} flex items-center justify-center font-bold text-[9px] text-white border border-slate-900 shadow" title="${label}">${initials}</div>`;
        }).join('');

        const namesPreview = allParticipants.slice(0, 2).join(', ') + (allParticipants.length > 2 ? '...' : '');
        const extraLabel = allParticipants.length > 4 ? `<span class="text-[10px] text-slate-500">+${allParticipants.length - 4}</span>` : '';
        const participantsRow = participantCount > 0
            ? `<div class="flex items-center space-x-1.5 pl-5 mt-1">${avatarRowHtml}${extraLabel}<span class="text-[10px] truncate ${isCurrent ? 'text-emerald-400/70' : 'text-slate-600'}">${namesPreview}</span></div>`
            : `<div class="pl-5 mt-1 text-[10px] text-slate-600 italic">Üres szoba</div>`;

        html += `
            <button onclick="requestJoinVoiceRoom('${id}')" class="w-full flex flex-col px-2 py-2 rounded-md text-xs transition-colors ${isCurrent ? 'bg-emerald-950/70 text-emerald-300 font-semibold border border-emerald-600/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}">
                <div class="flex items-center justify-between w-full">
                    <div class="flex items-center space-x-2 truncate">
                        <i class="fa-solid ${room.icon} ${isCurrent ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}"></i>
                        <span class="truncate font-semibold">${room.name}</span>
                    </div>
                    <span class="px-1.5 py-0.5 rounded-full text-[10px] ${isCurrent ? 'bg-emerald-800 text-emerald-200' : 'bg-slate-800 text-slate-400'}">${participantCount}</span>
                </div>
                ${participantsRow}
            </button>
        `;

        dropdownHtml += `<option value="${id}" ${id === activeRoomId ? 'selected' : ''}>${room.name} (${participantCount} fő)</option>`;
    }

    container.innerHTML = html;
    if (dropdown) dropdown.innerHTML = dropdownHtml;
}

function renderRoomParticipantGrid() {
    const grid = document.getElementById('roomGrid');
    if (!grid) return;
    const room = voiceRooms[activeRoomId];
    if (!room) return;

    const roomParticipants = [...room.participants];
    const visibleTilesCount = roomParticipants.length === 0 ? 2 : roomParticipants.length + 1;
    const cols = visibleTilesCount <= 1 ? 1 : visibleTilesCount <= 2 ? 2 : 3;
    grid.className = `grid gap-4 h-full max-h-[640px] ${cols === 1 ? 'grid-cols-1' : cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`;

    let tilesHtml = '';

    // Your own tile (always first)
    tilesHtml += `
        <div id="tileUser" class="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 relative flex flex-col justify-between overflow-hidden shadow-xl transition-all">
            <video id="localVideoFeed" class="hidden absolute inset-0 w-full h-full object-cover rounded-2xl z-0" autoplay muted playsinline></video>
            <div class="flex justify-between items-center z-10">
                <span class="px-2 py-0.5 rounded bg-cyan-900/80 text-[10px] text-cyan-300 border border-cyan-700/40 font-mono font-semibold">Te (${userNeptun})</span>
                <span id="myHandBadge" class="hidden bg-amber-500 text-slate-900 px-2 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 shadow animate-bounce">
                    <i class="fa-solid fa-hand"></i> Kéz feltéve
                </span>
            </div>
            <div id="myAvatarBox" class="flex-1 flex items-center justify-center z-10">
                <div id="myAvatarRing" class="w-20 h-20 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-2xl text-white shadow-2xl transition-all border-2 border-transparent ${!isMicMuted ? 'speaking-active' : ''}">
                    <span id="roomUserInitials">${userName.charAt(0).toUpperCase()}</span>
                </div>
            </div>
            <div class="flex justify-between items-center z-10 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                <span id="roomUserName" class="text-xs font-semibold text-slate-200">${userName} (Te)</span>
                <div class="flex items-center space-x-1.5">
                    <i id="myMicStatusIcon" class="fa-solid ${isMicMuted ? 'fa-microphone-slash text-red-400' : 'fa-microphone text-emerald-400'} text-xs"></i>
                    <i id="myCamStatusIcon" class="fa-solid fa-video-slash text-slate-500 text-xs"></i>
                </div>
            </div>
        </div>
    `;

    // Tiles for each actual participant of this room
    roomParticipants.forEach(name => {
        const member = channelMembers.find(m => m.name === name);
        const meta = {
            initials: member ? member.initials : name.charAt(0).toUpperCase(),
            color: member ? member.color : 'bg-slate-600',
            role: member ? member.role : 'Hallgató',
            speaking: name === 'Kovács Péter',
            micOn: name === 'Kovács Péter' || name === 'Nagy Anna',
            isBot: false
        };

        const speakingBadge = meta.speaking
            ? `<div class="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-600/40 text-[10px]"><div class="sound-bar"></div><div class="sound-bar"></div><div class="sound-bar"></div><div class="sound-bar"></div><span class="ml-1 text-[9px] font-bold">Beszél...</span></div>`
            : `<span class="text-slate-500 text-[10px]"><i class="fa-solid fa-headphones"></i> Figyel</span>`;

        const roleColor = meta.isBot ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/40' : 'bg-slate-900/80 text-slate-400 border border-slate-800';
        const avatarStyle = meta.isBot ? 'style="background:linear-gradient(to top right,#0891b2,#2563eb)"' : '';
        const avatarClass = meta.isBot ? '' : meta.color;
        const avatarContent = meta.isBot ? '<i class="fa-solid fa-robot text-xl"></i>' : meta.initials;
        const speakingRing = meta.speaking ? 'border-2 border-emerald-400 speaking-active' : 'border-2 border-transparent';

        tilesHtml += `
            <div class="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 relative flex flex-col justify-between overflow-hidden shadow-xl transition-all">
                <div class="flex justify-between items-center z-10">
                    <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${roleColor}">${meta.role}</span>
                    ${speakingBadge}
                </div>
                <div class="flex-1 flex items-center justify-center z-10">
                    <div class="w-20 h-20 rounded-full ${avatarClass} flex items-center justify-center font-bold text-2xl text-white shadow-2xl ${speakingRing}" ${avatarStyle}>
                        ${avatarContent}
                    </div>
                </div>
                <div class="flex justify-between items-center z-10 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                    <span class="text-xs font-semibold text-slate-200">${name}</span>
                    <i class="fa-solid ${meta.micOn ? 'fa-microphone text-emerald-400' : 'fa-microphone-slash text-slate-500'} text-xs"></i>
                </div>
            </div>
        `;
    });

    // Empty room hint tile
    if (roomParticipants.length === 0) {
        tilesHtml += `
            <div class="bg-[#0f172a]/60 border border-dashed border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                <i class="fa-solid fa-user-plus text-3xl text-slate-600"></i>
                <p class="text-xs text-slate-500">Még senki más nincs ebben a szobában.<br>Oszd meg a szoba nevét szaktársaiddal!</p>
            </div>
        `;
    }

    grid.innerHTML = tilesHtml;
}

let pendingRoomId = null;

// Lobbi (szobaválasztó) megjelenítése
function renderRoomLobby() {
    const container = document.getElementById('roomLobbyCards');
    if (!container) return;

    container.innerHTML = Object.entries(voiceRooms).map(([id, room]) => {
        const isCurrent = isInVoiceRoom && activeRoomId === id;
        const count = room.participants.length + (isCurrent ? 1 : 0);
        return `
            <button onclick="requestJoinVoiceRoom('${id}')" class="text-left bg-[#0f172a] hover:bg-[#131c33] border ${isCurrent ? 'border-emerald-500/60' : 'border-slate-800 hover:border-emerald-600/40'} rounded-2xl p-4 transition-all shadow-lg group">
                <div class="flex items-center justify-between mb-3">
                    <div class="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 flex items-center justify-center">
                        <i class="fa-solid ${room.icon}"></i>
                    </div>
                    <span class="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold">
                        <i class="fa-solid fa-user mr-1"></i>${count}
                    </span>
                </div>
                <div class="font-bold text-slate-100 text-sm">${room.name}</div>
                <div class="text-[11px] text-emerald-400/80 mt-0.5">${room.type}</div>
                <div class="text-xs text-slate-400 mt-2">${room.desc}</div>
                ${isCurrent ? '<div class="text-[10px] text-emerald-400 font-semibold mt-3">Jelenleg itt vagy</div>' : ''}
            </button>
        `;
    }).join('');
}

// Lobbi <-> aktív szoba nézet váltása
function updateRoomViewState() {
    const lobby = document.getElementById('roomLobbyView');
    const header = document.getElementById('roomSessionHeader');
    const stage = document.getElementById('roomSessionStage');
    const footer = document.getElementById('roomSessionFooter');

    if (lobby) lobby.classList.toggle('hidden', isInVoiceRoom);
    [header, stage, footer].forEach(el => {
        if (el) el.classList.toggle('hidden', !isInVoiceRoom);
    });

    if (isInVoiceRoom) {
        updateRoomViewUI();
    } else {
        renderRoomLobby();
    }
}

// Belépés kérése -> megerősítő ablak
function requestJoinVoiceRoom(roomId) {
    const room = voiceRooms[roomId];
    if (!room) return;

    // Ha már ebben a szobában vagy, csak átváltunk a nézetre
    if (isInVoiceRoom && activeRoomId === roomId) {
        if (activeView !== 'room') switchMainView('room');
        if (window.innerWidth <= 768 && isSidebarOpen) toggleSidebar();
        return;
    }

    pendingRoomId = roomId;
    document.getElementById('joinRoomConfirmName').innerText = room.name;
    document.getElementById('joinRoomConfirmDescription').innerText = `${room.type} • ${room.desc}`;
    openModal('joinRoomConfirmModal');
}

function confirmJoinVoiceRoom() {
    const roomId = pendingRoomId;
    pendingRoomId = null;
    closeModal('joinRoomConfirmModal');
    if (roomId) joinVoiceRoom(roomId);
    if (window.innerWidth <= 768 && isSidebarOpen) {
        toggleSidebar();
    }
}

function cancelJoinVoiceRoom() {
    pendingRoomId = null;
    closeModal('joinRoomConfirmModal');
    const dropdown = document.getElementById('roomSelectDropdown');
    if (dropdown) dropdown.value = activeRoomId;
}

function joinVoiceRoom(roomId) {
    if (!voiceRooms[roomId]) return;

    const isNewRoom = !isInVoiceRoom || activeRoomId !== roomId;
    activeRoomId = roomId;
    isInVoiceRoom = true;

    if (isNewRoom) {
        playJoinChime();
        showToast(`Beléptél a szobába: ${voiceRooms[roomId].name}`, 'success');
    }

    const statusWidget = document.getElementById('voiceStatusWidget');
    const statusRoomName = document.getElementById('voiceStatusRoomName');
    if (statusWidget) statusWidget.classList.remove('hidden');
    if (statusRoomName) statusRoomName.innerText = voiceRooms[roomId].name;

    renderVoiceRooms();
    updateRoomViewState();
    updateBreadcrumbs();

    if (activeView !== 'room') {
        switchMainView('room');
    }
}

function updateRoomViewUI() {
    const room = voiceRooms[activeRoomId];
    if (!room) return;

    const titleEl = document.getElementById('activeRoomTitle');
    const descEl = document.getElementById('activeRoomDesc');
    const dropdown = document.getElementById('roomSelectDropdown');
    const notesText = document.getElementById('roomSharedNotes');

    if (titleEl) titleEl.innerText = room.name;
    if (descEl) descEl.innerText = room.desc;
    if (dropdown) dropdown.value = activeRoomId;

    if (notesText && sharedRoomNotes[activeRoomId] !== undefined) {
        notesText.value = sharedRoomNotes[activeRoomId];
    }

    renderRoomParticipantGrid();
    renderRoomChatMessages();
}

function leaveVoiceRoom() {
    if (!isInVoiceRoom) return;

    playLeaveChime();
    isInVoiceRoom = false;

    if (localMediaStream) {
        localMediaStream.getTracks().forEach(t => t.stop());
        localMediaStream = null;
    }
    isCameraOn = false;
    isScreenSharing = false;
    isHandRaised = false;

    const statusWidget = document.getElementById('voiceStatusWidget');
    if (statusWidget) statusWidget.classList.add('hidden');

    renderVoiceRooms();
    updateBreadcrumbs();
    showToast('Kiléptél a beszélgetőszobából.', 'info');
    if (activeView === 'room') {
        updateRoomViewState();
    }
}

function toggleVoiceMute() {
    isMicMuted = !isMicMuted;

    if (isMicMuted) {
        playAudioTone(280, 'sine', 0.1);
        showToast('Mikrofon elnémítva', 'info');
    } else {
        playAudioTone(520, 'sine', 0.1);
        showToast('Mikrofon bekapcsolva', 'success');
    }

    const btnMain = document.getElementById('btnToggleMic');
    const micIconMain = document.getElementById('micIconMain');
    const quickMuteIcon = document.getElementById('quickMuteIcon');
    const myMicStatusIcon = document.getElementById('myMicStatusIcon');
    const myAvatarRing = document.getElementById('myAvatarRing');

    if (isMicMuted) {
        if (btnMain) btnMain.className = "w-11 h-11 rounded-2xl bg-red-600/80 text-white flex items-center justify-center transition-all shadow-md group relative";
        if (micIconMain) micIconMain.className = "fa-solid fa-microphone-slash text-base";
        if (quickMuteIcon) quickMuteIcon.className = "fa-solid fa-microphone-slash text-xs text-red-400";
        if (myMicStatusIcon) myMicStatusIcon.className = "fa-solid fa-microphone-slash text-red-400 text-xs";
        if (myAvatarRing) myAvatarRing.classList.remove('speaking-active');
    } else {
        if (btnMain) btnMain.className = "w-11 h-11 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-400 flex items-center justify-center transition-all shadow-md group relative";
        if (micIconMain) micIconMain.className = "fa-solid fa-microphone text-base";
        if (quickMuteIcon) quickMuteIcon.className = "fa-solid fa-microphone text-xs text-emerald-400";
        if (myMicStatusIcon) myMicStatusIcon.className = "fa-solid fa-microphone text-emerald-400 text-xs";
        if (myAvatarRing) myAvatarRing.classList.add('speaking-active');
    }
}

async function toggleVoiceCamera() {
    const videoEl = document.getElementById('localVideoFeed');
    const btnCam = document.getElementById('btnToggleCamera');
    const camIcon = document.getElementById('camIconMain');
    const camStatus = document.getElementById('myCamStatusIcon');

    isCameraOn = !isCameraOn;

    if (isCameraOn) {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                localMediaStream = stream;
                if (videoEl) {
                    videoEl.srcObject = stream;
                    videoEl.classList.remove('hidden');
                }
            } else {
                throw new Error("No mediaDevices");
            }
        } catch (err) {
            console.log("Webcam unavailable or denied, using simulated stream:", err);
            if (videoEl) videoEl.classList.add('hidden');
        }

        if (btnCam) btnCam.className = "w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center transition-all shadow-md group relative";
        if (camIcon) camIcon.className = "fa-solid fa-video text-base";
        if (camStatus) camStatus.className = "fa-solid fa-video text-emerald-400 text-xs";
        showToast('Kamera bekapcsolva', 'success');
    } else {
        if (localMediaStream) {
            localMediaStream.getTracks().forEach(t => t.stop());
            localMediaStream = null;
        }
        if (videoEl) videoEl.classList.add('hidden');
        if (btnCam) btnCam.className = "w-11 h-11 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-md group relative";
        if (camIcon) camIcon.className = "fa-solid fa-video-slash text-base";
        if (camStatus) camStatus.className = "fa-solid fa-video-slash text-slate-500 text-xs";
        showToast('Kamera kikapcsolva', 'info');
    }
}

async function toggleScreenShare() {
    isScreenSharing = !isScreenSharing;
    const btnScreen = document.getElementById('btnToggleScreen');

    if (isScreenSharing) {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
                await navigator.mediaDevices.getDisplayMedia({ video: true });
            }
        } catch (e) {
            console.log("Screen share cancelled or unsupported");
        }
        if (btnScreen) btnScreen.className = "w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center transition-all shadow-md group relative";
        showToast('Képernyőmegosztás aktív!', 'success');
    } else {
        if (btnScreen) btnScreen.className = "w-11 h-11 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-md group relative";
        showToast('Képernyőmegosztás leállítva.', 'info');
    }
}

function raiseHand() {
    isHandRaised = !isHandRaised;
    const badge = document.getElementById('myHandBadge');
    const btnHand = document.getElementById('btnRaiseHand');

    if (isHandRaised) {
        playBellChime();
        if (badge) badge.classList.remove('hidden');
        if (btnHand) btnHand.className = "w-11 h-11 rounded-2xl bg-amber-500 text-slate-900 flex items-center justify-center transition-all shadow-md group relative";
        showToast('Kéz felemelve! A demonstrátor látja a jelentkezésed.', 'info');

    } else {
        if (badge) badge.classList.add('hidden');
        if (btnHand) btnHand.className = "w-11 h-11 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all shadow-md group relative";
        showToast('Kéz leengedve.', 'info');
    }
}

function toggleRoomNotes() {
    const panel = document.getElementById('roomNotesPanel');
    const btn = document.getElementById('btnToggleWhiteboard');
    if (!panel) return;

    isRoomNotesOpen = !isRoomNotesOpen;
    if (isRoomNotesOpen) {
        panel.classList.remove('hidden');
        if (btn) btn.className = "px-2.5 py-1.5 bg-cyan-900/60 text-cyan-300 text-xs rounded-lg border border-cyan-500 flex items-center space-x-1.5 transition-colors shadow-sm";
    } else {
        panel.classList.add('hidden');
        if (btn) btn.className = "px-2.5 py-1.5 bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 text-xs rounded-lg border border-slate-700/60 flex items-center space-x-1.5 transition-colors";
    }
}

function toggleRoomChatDrawer() {
    const drawer = document.getElementById('roomChatDrawer');
    const btn = document.getElementById('btnToggleRoomChat');
    if (!drawer) return;

    isRoomChatOpen = !isRoomChatOpen;
    if (isRoomChatOpen) {
        drawer.classList.remove('hidden');
        if (btn) btn.className = "px-2.5 py-1.5 bg-blue-900/60 text-blue-300 text-xs rounded-lg border border-blue-500 flex items-center space-x-1.5 transition-colors shadow-sm";
        renderRoomChatMessages();
    } else {
        drawer.classList.add('hidden');
        if (btn) btn.className = "px-2.5 py-1.5 bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 text-xs rounded-lg border border-slate-700/60 flex items-center space-x-1.5 transition-colors";
    }
}

function renderRoomChatMessages() {
    const list = document.getElementById('roomChatMessagesList');
    if (!list) return;

    const msgs = roomChatMessages[activeRoomId] || [];
    if (msgs.length === 0) {
        list.innerHTML = `<div class="text-slate-500 text-center py-4">Nincs még csevegés ebben a szobában. Írj be egy üzenetet!</div>`;
        return;
    }

    list.innerHTML = msgs.map(m => `
        <div class="flex items-start space-x-2">
            <div class="w-6 h-6 rounded-full ${m.color} text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                ${m.initials}
            </div>
            <div class="flex-1">
                <div class="flex items-baseline space-x-1.5">
                    <span class="font-bold text-slate-200 text-[11px]">${m.sender}</span>
                    <span class="text-[9px] text-slate-500">${m.time}</span>
                </div>
                <div class="text-slate-300 text-xs mt-0.5 bg-[#141e33] p-1.5 rounded-lg border border-slate-800">${m.text}</div>
            </div>
        </div>
    `).join('');

    list.scrollTop = list.scrollHeight;
}

function handleRoomChatKey(e) {
    if (e.key === 'Enter') {
        sendRoomChatMessage();
    }
}

function sendRoomChatMessage() {
    const input = document.getElementById('roomChatInput');
    if (!input || !input.value.trim()) return;

    if (!roomChatMessages[activeRoomId]) {
        roomChatMessages[activeRoomId] = [];
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    roomChatMessages[activeRoomId].push({
        sender: userName,
        initials: userName.charAt(0).toUpperCase(),
        color: 'bg-cyan-600',
        time: time,
        text: input.value.trim()
    });

    input.value = '';
    renderRoomChatMessages();
}

function syncRoomNotes(val) {
    sharedRoomNotes[activeRoomId] = val;
}

// Modal: Create Custom Room
function openCreateRoomModal() {
    openModal('createRoomModal');
}

function submitCreateRoom(e) {
    e.preventDefault();
    const name = document.getElementById('inputRoomName').value.trim();
    const type = document.getElementById('inputRoomType').value;
    const desc = document.getElementById('inputRoomDesc').value.trim() || 'Hallgatói szoba';

    if (!name) return;

    const cleanId = 'room_' + Date.now();
    let icon = 'fa-headphones';
    if (type === 'pomodoro') icon = 'fa-clock';
    if (type === 'lounge') icon = 'fa-mug-hot';

    voiceRooms[cleanId] = {
        id: cleanId,
        name: name,
        desc: desc,
        type: type,
        participants: [],
        icon: icon
    };

    roomChatMessages[cleanId] = [];
    sharedRoomNotes[cleanId] = `Közös jegyzet: ${name}`;

    closeModal('createRoomModal');
    renderVoiceRooms();
    joinVoiceRoom(cleanId);
    showToast(`Új szoba létrehozva és csatlakozva: ${name}`, 'success');
    e.target.reset();
}

// Whiteboard Canvas Logic
function initWhiteboard() {
    const canvas = document.getElementById('whiteboardCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = canvasColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }

    function startDrawing(e) {
        isDrawing = true;
        const coords = getCoords(e);
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
    }

    function draw(e) {
        if (!isDrawing) return;
        if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();
        const coords = getCoords(e);
        ctx.strokeStyle = canvasColor;
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
    }

    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
            ctx.closePath();
        }
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDrawing);

    // Touch support for mobile and tablets
    canvas.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        startDrawing(e);
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        draw(e);
    }, { passive: false });

    window.addEventListener('touchend', stopDrawing);

    // Initial demo drawing on canvas: small algorithm binary tree sketch
    ctx.strokeStyle = '#22d3ee';
    ctx.strokeRect(145, 20, 60, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = '11px sans-serif';
    ctx.fillText('Root: 25', 152, 40);

    ctx.beginPath();
    ctx.moveTo(155, 50);
    ctx.lineTo(100, 85);
    ctx.moveTo(195, 50);
    ctx.lineTo(250, 85);
    ctx.stroke();

    ctx.strokeStyle = '#10b981';
    ctx.strokeRect(70, 85, 60, 30);
    ctx.fillText('Bal: 12', 82, 105);

    ctx.strokeStyle = '#f59e0b';
    ctx.strokeRect(220, 85, 60, 30);
    ctx.fillText('Jobb: 48', 228, 105);
}

function setCanvasColor(color) {
    canvasColor = color;
}

function clearWhiteboard() {
    const canvas = document.getElementById('whiteboardCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ==========================================
// SEARCH, EXPORT, NOTIFICATIONS & NEPTUN
// ==========================================

// Global Search
function handleGlobalSearch(query) {
    const dropdown = document.getElementById('searchResultsDropdown');
    if (!dropdown) return;

    const q = (query || '').trim().toLowerCase();
    if (!q) {
        dropdown.classList.add('hidden');
        return;
    }

    let results = [];

    // Search rooms
    Object.entries(voiceRooms).forEach(([id, room]) => {
        if (room.name.toLowerCase().includes(q) || room.desc.toLowerCase().includes(q)) {
            results.push({
                type: 'Beszélgetőszoba',
                icon: 'fa-headset text-emerald-400',
                title: room.name,
                desc: `${room.type} • ${room.participants.length} résztvevő`,
                action: () => { requestJoinVoiceRoom(id); }
            });
        }
    });

    // Search channels
    channels.forEach(ch => {
        if (ch.name.toLowerCase().includes(q) || ch.desc.toLowerCase().includes(q)) {
            results.push({
                type: 'Csatorna',
                icon: 'fa-hashtag text-cyan-400',
                title: `#${ch.name}`,
                desc: ch.desc,
                action: () => { switchChannel(ch.id); }
            });
        }
    });

    // Search students
    channelMembers.forEach(m => {
        if (m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q)) {
            results.push({
                type: 'Hallgató / Oktató',
                icon: 'fa-user-graduate text-emerald-400',
                title: m.name,
                desc: m.role,
                action: () => { openStudentModal(m.name); }
            });
        }
    });

    // Search universities
    Object.entries(universities).forEach(([code, uni]) => {
        if (code.toLowerCase().includes(q) || uni.fullName.toLowerCase().includes(q)) {
            results.push({
                type: 'Egyetem',
                icon: 'fa-building-columns text-purple-400',
                title: `${uni.fullName} (${code})`,
                desc: uni.city,
                action: () => { selectUniversity(code); }
            });
        }
    });

    if (results.length === 0) {
        dropdown.innerHTML = `<div class="p-3 text-slate-500 text-center">Nincs találat a keresésre: "${query}"</div>`;
    } else {
        dropdown.innerHTML = results.map((r, idx) => `
            <div onclick="executeSearchResult(${idx})" class="px-3 py-2 hover:bg-slate-800 cursor-pointer flex items-center space-x-2.5 transition-colors">
                <i class="fa-solid ${r.icon} text-sm"></i>
                <div class="truncate flex-1">
                    <div class="text-slate-200 font-semibold truncate">${r.title}</div>
                    <div class="text-[10px] text-slate-400 truncate">${r.type} • ${r.desc}</div>
                </div>
            </div>
        `).join('');

        window._currentSearchResults = results;
    }

    dropdown.classList.remove('hidden');
}

function executeSearchResult(index) {
    if (window._currentSearchResults && window._currentSearchResults[index]) {
        window._currentSearchResults[index].action();
        const dropdown = document.getElementById('searchResultsDropdown');
        const input = document.getElementById('globalSearchInput');
        if (dropdown) dropdown.classList.add('hidden');
        if (input) input.value = '';
    }
}

// Export Menu
function toggleExportMenu(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('exportMenu');
    if (menu) menu.classList.toggle('hidden');
}

function exportProject(type) {
    const menu = document.getElementById('exportMenu');
    if (menu) menu.classList.add('hidden');

    if (type === 'pdf') {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Akron Platform - Jegyzetek</title>
                    <style>
                        body { font-family: sans-serif; padding: 2rem; color: #111; line-height: 1.5; }
                        h1 { color: #0284c7; }
                        pre { background: #f1f5f9; padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 12px; }
                        .meta { color: #64748b; font-size: 13px; margin-bottom: 2rem; }
                    </style>
                </head>
                <body>
                    <h1>Akron Platform - Tanulmányi Jegyzetek</h1>
                    <div class="meta">
                        Hallgató: ${userName} (${userNeptun}) • Intézmény: ${universities[currentUni]?.fullName || 'Pannon Egyetem'}<br>
                        Dátum: ${new Date().toLocaleDateString('hu-HU')}
                    </div>
                    <h2>Tanulószoba Közös Jegyzetek</h2>
                    <pre>${(sharedRoomNotes[activeRoomId] || '').replace(/</g, '&lt;')}</pre>
                    <script>window.onload = function() { window.print(); };<\/script>
                </body>
                </html>
            `);
            printWindow.document.close();
            showToast('PDF nyomtatási előnézet megnyitva!', 'info');
        }
    }
}

// Neptun Modal
function openNeptunModal() {
    const studentNameEl = document.getElementById('neptunStudentName');
    const studentCodeEl = document.getElementById('neptunStudentCode');
    if (studentNameEl) studentNameEl.innerText = userName;
    if (studentCodeEl) studentCodeEl.innerText = userNeptun;

    openModal('neptunModal');
}

// Notifications Popover
function toggleNotifications(e) {
    if (e) e.stopPropagation();
    const pop = document.getElementById('notificationsPopover');
    if (pop) pop.classList.toggle('hidden');
}

function renderNotifications() {
    const list = document.getElementById('notificationList');
    const badge = document.getElementById('unreadNotificationBadge');
    if (!list) return;

    const unreadCount = notifications.filter(n => !n.read).length;
    if (badge) {
        if (unreadCount > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    if (notifications.length === 0) {
        list.innerHTML = `<div class="text-slate-500 text-center py-2">Nincs új értesítésed.</div>`;
        return;
    }

    list.innerHTML = notifications.map(n => `
        <div class="p-2 rounded-lg ${n.read ? 'bg-[#111828]/50' : 'bg-[#141e33] border-l-2 border-cyan-400'} flex items-start space-x-2.5 transition-colors">
            <i class="fa-solid ${n.icon} text-sm mt-0.5"></i>
            <div class="flex-1 truncate">
                <div class="text-slate-200 font-medium truncate text-xs">${n.title}</div>
                <div class="text-[10px] text-slate-500">${n.time}</div>
            </div>
        </div>
    `).join('');
}

function markAllNotificationsRead() {
    notifications.forEach(n => n.read = true);
    renderNotifications();
    showToast('Összes értesítés olvasottnak jelölve.', 'info');
}

// Settings Modal
function openSettingsModal() {
    const inputName = document.getElementById('inputSettingName');
    const inputNeptun = document.getElementById('inputSettingNeptun');
    const inputSound = document.getElementById('inputSettingSound');

    if (inputName) inputName.value = userName;
    if (inputNeptun) inputNeptun.value = userNeptun;
    if (inputSound) inputSound.checked = isSoundEnabled;

    openModal('settingsModal');
}

function submitSettings(e) {
    e.preventDefault();
    const name = document.getElementById('inputSettingName').value.trim();
    const neptun = document.getElementById('inputSettingNeptun').value.trim().toUpperCase();
    const soundCheck = document.getElementById('inputSettingSound');

    if (name) userName = name;
    if (neptun) userNeptun = neptun;
    if (soundCheck) isSoundEnabled = soundCheck.checked;

    // Update UI elements
    const profileName = document.getElementById('profileUserName');
    const profileNeptun = document.getElementById('profileNeptunCode');
    const roomUserName = document.getElementById('roomUserName');
    const roomUserInitials = document.getElementById('roomUserInitials');
    const profileInitial = document.getElementById('profileUserInitial');

    if (profileName) profileName.innerText = userName;
    if (profileNeptun) profileNeptun.innerText = `NEPTUN: ${userNeptun}`;
    if (roomUserName) roomUserName.innerText = `${userName} (Te)`;
    if (roomUserInitials) roomUserInitials.innerText = userName.charAt(0).toUpperCase();
    if (profileInitial) profileInitial.innerText = userName.charAt(0).toUpperCase();

    const me = channelMembers.find(m => m.role === 'Te');
    if (me) {
        me.name = userName;
        me.initials = userName.charAt(0).toUpperCase();
    }

    renderStudentsList();
    renderVoiceRooms();
    if (isInVoiceRoom) {
        renderRoomParticipantGrid();
    }

    closeModal('settingsModal');
    showToast('Beállítások sikeresen mentve!', 'success');
}

// ==========================================
// MODAL & TOAST HELPERS
// ==========================================
function openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) {
        m.classList.remove('hidden');
    }
}

function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) {
        m.classList.add('hidden');
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = "toast-item px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center space-x-2 text-white border";

    if (type === 'success') {
        toast.classList.add('bg-emerald-950', 'border-emerald-600/50', 'text-emerald-200');
        toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i><span>${message}</span>`;
    } else if (type === 'error') {
        toast.classList.add('bg-red-950', 'border-red-600/50', 'text-red-200');
        toast.innerHTML = `<i class="fa-solid fa-circle-exclamation text-red-400"></i><span>${message}</span>`;
    } else {
        toast.classList.add('bg-[#141e33]', 'border-cyan-600/50', 'text-cyan-200');
        toast.innerHTML = `<i class="fa-solid fa-circle-info text-cyan-400"></i><span>${message}</span>`;
    }

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// Outside Click Handlers
function setupOutsideClickHandlers() {
    document.addEventListener('click', (e) => {
        // Mobile sidebar outside click to close
        if (window.innerWidth <= 768 && isSidebarOpen) {
            const sidebar = document.getElementById('channelSidebar');
            const toggleBtn = document.querySelector('button[onclick="toggleSidebar()"]');
            if (sidebar && !sidebar.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
                toggleSidebar();
            }
        }

        // Export menu
        const exportMenu = document.getElementById('exportMenu');
        const btnExport = document.getElementById('btnExport');
        if (exportMenu && !exportMenu.classList.contains('hidden')) {
            if (!exportMenu.contains(e.target) && !btnExport.contains(e.target)) {
                exportMenu.classList.add('hidden');
            }
        }

        // Notifications popover
        const notifPop = document.getElementById('notificationsPopover');
        const btnNotif = document.getElementById('btnNotifications');
        if (notifPop && !notifPop.classList.contains('hidden')) {
            if (!notifPop.contains(e.target) && !btnNotif.contains(e.target)) {
                notifPop.classList.add('hidden');
            }
        }

        // Global search dropdown
        const searchDrop = document.getElementById('searchResultsDropdown');
        const searchInput = document.getElementById('globalSearchInput');
        if (searchDrop && !searchDrop.classList.contains('hidden')) {
            if (!searchDrop.contains(e.target) && !searchInput.contains(e.target)) {
                searchDrop.classList.add('hidden');
            }
        }

        // Modals backdrop click to close
        const modals = ['addUniModal', 'addChannelModal', 'createRoomModal', 'commandPaletteModal', 'kanbanModal', 'addTaskModal', 'neptunModal', 'settingsModal', 'studentModal', 'codeSnippetModal', 'pinnedModal', 'joinRoomConfirmModal'];
        modals.forEach(mId => {
            const el = document.getElementById(mId);
            if (el && !el.classList.contains('hidden') && e.target === el) {
                closeModal(mId);
            }
        });
    });

    // ESC key closes modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modals = ['addUniModal', 'addChannelModal', 'createRoomModal', 'commandPaletteModal', 'kanbanModal', 'addTaskModal', 'neptunModal', 'settingsModal', 'studentModal', 'codeSnippetModal', 'pinnedModal', 'joinRoomConfirmModal'];
            modals.forEach(mId => closeModal(mId));

            const searchDrop = document.getElementById('searchResultsDropdown');
            if (searchDrop) searchDrop.classList.add('hidden');

            const exportMenu = document.getElementById('exportMenu');
            if (exportMenu) exportMenu.classList.add('hidden');

            const notifPop = document.getElementById('notificationsPopover');
            if (notifPop) notifPop.classList.add('hidden');
        }
    });
}
