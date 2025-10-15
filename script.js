function programUniqueComposition(config) {
    const { kick, snare, hihat, clap } = state.synths[0];
    const { bass, subBass } = state.synths[1];
    const { melody, lead } = state.synths[2];
    const { pad, texture } = state.synths[3];
    
    const chordProgression = generateChordProgression(config);
    const bassLine = generateBassLine(config);
    const melodySequence = generateMelodySequence(config);
    
    // ========================================
    // PATRONES DE BATERÍA PROFESIONALES
    // ========================================
    
    if (config.genre === 'trap' || config.genre === 'hiphop') {
        // TRAP/HIP-HOP PATTERN
        
        // KICK pattern (trap bounce)
        const kickPattern = ['0:0:0', '0:1:2', '0:2:0', '0:3:1'];
        kickPattern.forEach(time => {
            new Tone.Loop((loopTime) => {
                kick.triggerAttackRelease('C1', '8n', loopTime);
            }, '1m').start(time).stop('180s');
        });
        
        // 808 BASS (sliding bass característico del trap)
        const bass808Pattern = [
            { time: '0:0:0', note: bassLine[0], duration: '4n' },
            { time: '0:1:0', note: bassLine[1], duration: '8n' },
            { time: '0:1:2', note: bassLine[2], duration: '8n' },
            { time: '0:2:0', note: bassLine[0], duration: '4n' },
            { time: '0:2:3', note: bassLine[3], duration: '16n' },
            { time: '0:3:1', note: bassLine[1], duration: '8n' }
        ];
        
        new Tone.Part((time, event) => {
            bass.triggerAttackRelease(event.note, event.duration, time);
            subBass.triggerAttackRelease(event.note.slice(0, -1) + '1', event.duration, time);
        }, bass808Pattern).start('30s').stop('180s').loop = true;
        bass808Pattern.loopEnd = '1m';
        
        // HI-HAT con ROLLS (trap rolls)
        const hihatMainPattern = ['0:0:0', '0:0:2', '0:1:0', '0:1:2', '0:2:0', '0:2:2', '0:3:0', '0:3:2'];
        hihatMainPattern.forEach(time => {
            new Tone.Loop((loopTime) => {
                hihat.triggerAttackRelease('32n', loopTime);
            }, '1m').start(time).stop('180s');
        });
        
        // HI-HAT ROLLS (cada 4 compases)
        new Tone.Loop((time) => {
            for (let i = 0; i < 8; i++) {
                hihat.triggerAttackRelease('64n', time + (i * 0.05));
            }
        }, '4m').start('32s').stop('180s');
        
        // SNARE (en el 2 y 4)
        const snarePattern = ['0:1:0', '0:3:0'];
        snarePattern.forEach(time => {
            new Tone.Loop((loopTime) => {
                snare.triggerAttackRelease('16n', loopTime);
            }, '1m').start(time).start('30s').stop('180s');
        });
        
        // CLAP doble (trap clap)
        new Tone.Loop((time) => {
            clap.triggerAttackRelease('16n', time);
            clap.triggerAttackRelease('16n', time + 0.05);
        }, '2n').start('90s').stop('180s');
        
        // MELODÍA TRAP (con silencios estratégicos)
        let melodyIndex = 0;
        new Tone.Loop((time) => {
            if (melodyIndex % 8 !== 3 && melodyIndex % 8 !== 7) { // Silencios estratégicos
                melody.triggerAttackRelease(melodySequence[melodyIndex % melodySequence.length], '8n', time);
            }
            melodyIndex++;
        }, '8n').start('60s').stop('180s');
        
    } else if (config.genre === 'reggaeton') {
        // REGGAETON DEMBOW PATTERN (el patrón más icónico)
        
        // DEMBOW KICK pattern
        const dembowKick = ['0:0:0', '0:0:3', '0:1:2', '0:2:1', '0:3:0', '0:3:3'];
        dembowKick.forEach(time => {
            new Tone.Loop((loopTime) => {
                kick.triggerAttackRelease('C1', '16n', loopTime);
            }, '1m').start(time).start('20s').stop('180s');
        });
        
        // TIMBALE/SNARE pattern (característico)
        const timbalePattern = ['0:1:0', '0:2:2', '0:3:1.5'];
        timbalePattern.forEach(time => {
            new Tone.Loop((loopTime) => {
                snare.triggerAttackRelease('16n', loopTime);
            }, '1m').start(time).start('20s').stop('180s');
        });
        
        // BASS REGGAETON (pegajoso y repetitivo)
        const reggaetonBass = [
            { time: '0:0:0', note: bassLine[0], duration: '8n' },
            { time: '0:0:3', note: bassLine[0], duration: '16n' },
            { time: '0:1:1', note: bassLine[1], duration: '8n' },
            { time: '0:2:0', note: bassLine[0], duration: '8n' },
            { time: '0:2:2', note: bassLine[2], duration: '8n' },
            { time: '0:3:0', note: bassLine[1], duration: '8n' }
        ];
        
        new Tone.Part((time, event) => {
            bass.triggerAttackRelease(event.note, event.duration, time);
            subBass.triggerAttackRelease(event.note.slice(0, -1) + '1', event.duration, time);
        }, reggaetonBass).start('30s').stop('180s').loop = true;
        reggaetonBass.loopEnd = '1m';
        
        // HI-HAT constante (driving rhythm)
        new Tone.Loop((time) => {
            hihat.triggerAttackRelease('32n', time);
        }, '8n').start('30s').stop('180s');
        
        // MELODÍA LATINA (con ritmo sincopado)
        let regMelIndex = 0;
        new Tone.Loop((time) => {
            if (regMelIndex % 4 !== 2) {
                melody.triggerAttackRelease(melodySequence[regMelIndex % melodySequence.length], '16n', time);
            }
            regMelIndex++;
        }, '16n').start('45s').stop('180s');
        
        // PADS atmosféricos
        let regPadIndex = 0;
        new Tone.Loop((time) => {
            pad.triggerAttackRelease(chordProgression[regPadIndex % chordProgression.length], '2n', time);
            regPadIndex++;
        }, '2n').start('30s').stop('180s');
        
    } else if (config.genre === 'dnb') {
        // DRUM AND BASS (breakbeats rápidos)
        
        // KICK pattern (amen break inspired)
        const dnbKick = ['0:0:0', '0:1:2', '0:2:1', '0:3:0', '0:3:2'];
        dnbKick.forEach(time => {
            new Tone.Loop((loopTime) => {
                kick.triggerAttackRelease('C1', '32n', loopTime);
            }, '1m').start(time).start('15s').stop('180s');
        });
        
        // SNARE breaks
        const dnbSnare = ['0:1:0', '0:2:2', '0:3:1', '0:3:3'];
        dnbSnare.forEach(time => {
            new Tone.Loop((loopTime) => {
                snare.triggerAttackRelease('32n', loopTime);
            }, '1m').start(time).start('15s').stop('180s');
        });
        
        // HI-HAT rápido
        new Tone.Loop((time) => {
            hihat.triggerAttackRelease('64n', time);
        }, '16n').start('15s').stop('180s');
        
        // BASS reese (wobble bass)
        let dnbBassIndex = 0;
        new Tone.Loop((time) => {
            bass.triggerAttackRelease(bassLine[dnbBassIndex % bassLine.length], '8n', time);
            subBass.triggerAttackRelease(bassLine[dnbBassIndex % bassLine.length].slice(0, -1) + '1', '8n', time);
            dnbBassIndex++;
        }, '8n').start('30s').stop('180s');
        
        // LEAD rápido y melódico
        let dnbLeadIndex = 0;
        new Tone.Loop((time) => {
            lead.triggerAttackRelease(melodySequence[dnbLeadIndex % melodySequence.length], '32n', time);
            dnbLeadIndex++;
        }, '32n').start('60s').stop('180s');
        
    } else {
        // BEAT EXPERIMENTAL/GENÉRICO PROFESIONAL
        
        // KICK patrón 4/4 básico con variaciones
        const experimentalKick = ['0:0:0', '0:1:0', '0:2:0', '0:3:0', '0:3:2'];
        experimentalKick.forEach(time => {
            new Tone.Loop((loopTime) => {
                kick.triggerAttackRelease('C1', '8n', loopTime);
            }, '1m').start(time).start('30s').stop('180s');
        });
        
        // SNARE en 2 y 4 con ghost notes
        new Tone.Loop((time) => {
            snare.triggerAttackRelease('16n', time);
        }, '2n').start('30s').stop('180s');
        
        // Ghost snares
        const ghostSnares = ['0:0:3', '0:1:3', '0:2:3'];
        ghostSnares.forEach(time => {
            new Tone.Loop((loopTime) => {
                snare.triggerAttackRelease('32n', loopTime, 0.3);
            }, '1m').start(time).start('45s').stop('180s');
        });
        
        // HI-HAT con patrón interesante
        let hihatIndex = 0;
        new Tone.Loop((time) => {
            const velocity = hihatIndex % 4 === 0 ? 0.8 : 0.4;
            hihat.triggerAttackRelease('32n', time, velocity);
            hihatIndex++;
        }, '8n').start('30s').stop('180s');
        
        // BASS groove
        let expBassIndex = 0;
        new Tone.Loop((time) => {
            bass.triggerAttackRelease(bassLine[expBassIndex % bassLine.length], '8n', time);
            if (config.deep) {
                subBass.triggerAttackRelease(bassLine[expBassIndex % bassLine.length].slice(0, -1) + '1', '8n', time);
            }
            expBassIndex++;
        }, '8n').start('45s').stop('180s');
        
        // MELODÍA principal
        let expMelIndex = 0;
        new Tone.Loop((time) => {
            melody.triggerAttackRelease(melodySequence[expMelIndex % melodySequence.length], '8n', time);
            expMelIndex++;
        }, '8n').start('60s').stop('180s');
        
        // PADS sostenidos
        let expPadIndex = 0;
        new Tone.Loop((time) => {
            pad.triggerAttackRelease(chordProgression[expPadIndex % chordProgression.length], '1n', time);
            texture.triggerAttackRelease(chordProgression[expPadIndex % chordProgression.length], '2n', time);
            expPadIndex++;
        }, '1n').start('30s').stop('180s');
    }
    
    // ========================================
    // INTRO CINEMATOGRÁFICA (0-30s)
    // ========================================
    let introPadIndex = 0;
    new Tone.Loop((time) => {
        pad.triggerAttackRelease(chordProgression[introPadIndex % chordProgression.length], '2n', time, 0.6);
        introPadIndex++;
    }, '2n').start(0).stop('30s');
    
    // ========================================
    // CLÍMAX FINAL (150-180s)
    // ========================================
    new Tone.Loop((time) => {
        clap.triggerAttackRelease('16n', time);
    }, '2n').start('150s').stop('180s');
    
    if (config.bright || config.melodic) {
        let climaxLeadIndex = 0;
        new Tone.Loop((time) => {
            lead.triggerAttackRelease(melodySequence[climaxLeadIndex % melodySequence.length], '16n', time);
            climaxLeadIndex++;
        }, '16n').start('150s').stop('180s');
    }
    
    // ========================================
    // OUTRO SUAVE (180-225s)
    // ========================================
    let outroPadIndex = 0;
    new Tone.Loop((time) => {
        pad.triggerAttackRelease(chordProgression[0], '1n', time, 0.4);
        outroPadIndex++;
    }, '1n').start('180s').stop('225s');
}

// ===== GENERADOR DE ARPEGIOS =====
function generateArpeggio(config) {
    const root = config.rootNote;
    const scale = SCALES[config.scale];
    const octave = config.high ? 5 : 4;
    
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(root);
    
    const arpeggio = [];
    const pattern = config.complex ? [0, 2, 4, 6, 4, 2] : [0, 2, 4, 2];
    
    pattern.forEach(degree => {
        const scaleNote = scale[degree % scale.length];
        const note = notes[(rootIndex + scaleNote) % 12];
        const noteOctave = octave + Math.floor(degree / scale.length);
        arpeggio.push(`${note}${noteOctave}`);
    });
    
    return arpeggio;
}function programUniqueComposition(config) {
    const { kick, snare, hihat, clap, rimshot } = state.synths[0];
    const { bass, subBass } = state.synths[1];
    const { melody, lead, pluck } = state.synths[2];
    const { pad, texture, strings, atmosphere } = state.synths[3];
    
    const chordProgression = generateChordProgression(config);
    const bassLine = generateBassLine(config);
    const melodySequence = generateMelodySequence(config);
    const arpeggioSequence = generateArpeggio(config);
    
    // ATMÓSFERA DE FONDO (siempre presente)
    if (config.spatial) {
        atmosphere.start();
        atmosphere.stop('225s');
    }
    
    // ===== INTRO (0-30s): Establecer ambiente =====
    if (config.minimal) {
        // Intro minimalista con fade in
        new Tone.Loop((time) => {
            pad.triggerAttackRelease(chordProgression[0], '1n', time, 0.6);
        }, '2n').start(0).stop('30s');
        
        new Tone.Loop((time) => {
            hihat.triggerAttackRelease('32n', time, 0.4);
        }, '8n').start('15s').stop('30s');
        
        // Rimshot sutil
        new Tone.Loop((time) => {
            rimshot.triggerAttackRelease('64n', time, 0.3);
        }, '2m').start('20s').stop('30s');
    } else {
        // Intro compleja y cinematográfica
        new Tone.Loop((time) => {
            texture.triggerAttackRelease(chordProgression[0], '2n', time, 0.5);
        }, '1n').start(0).stop('30s');
        
        let padIndex = 0;
        new Tone.Loop((time) => {
            pad.triggerAttackRelease(chordProgression[padIndex % chordProgression.length], '1n', time, 0.7);
            padIndex++;
        }, '2n').start('10s').stop('30s');
        
        // Strings entrando gradualmente
        let stringIndex = 0;
        new Tone.Loop((time) => {
            strings.triggerAttackRelease(chordProgression[stringIndex % chordProgression.length], '2n', time, 0.5);
            stringIndex++;
        }, '2n').start('15s').stop('30s');
        
        // Pluck arpegio sutil
        if (config.melodic) {
            let arpIndex = 0;
            new Tone.Loop((time) => {
                pluck.triggerAttackRelease(arpeggioSequence[arpIndex % arpeggioSequence.length], '16n', time, 0.4);
                arpIndex++;
            }, '16n').start('20s').stop('30s');
        }
    }
    
    // ===== DESARROLLO PARTE 1 (30-90s): Agregar ritmo y bajo =====
    const kickInterval = config.genreConfig.kickPattern;
    new Tone.Loop((time) => {
        kick.triggerAttackRelease('C1', '8n', time);
    }, kickInterval).start('30s').stop('90s');
    
    // Bajo con groove
    let bassIndex = 0;
    new Tone.Loop((time) => {
        const note = bassLine[bassIndex % bassLine.length];
        const velocity = 0.7 + (Math.random() * 0.2); // Humanización
        bass.triggerAttackRelease(note, '4n', time, velocity);
        if (config.deep) {
            subBass.triggerAttackRelease(note.slice(0, -1) + '1', '4n', time, 0.6);
        }
        bassIndex++;
    }, '4n').start('45s').stop('90s');
    
    // Hi-hat con variaciones
    let hihatPattern = 0;
    new Tone.Loop((time) => {
        const velocity = hihatPattern % 4 === 0 ? 0.8 : 0.5; // Acentos
        hihat.triggerAttackRelease('32n', time, velocity);
        hihatPattern++;
    }, config.genreConfig.hihatPattern).start('30s').stop('90s');
    
    // Rimshot en off-beats
    new Tone.Loop((time) => {
        rimshot.triggerAttackRelease('64n', time, 0.6);
    }, '2n').start('50s').stop('90s');
    
    // ===== DESARROLLO PARTE 2 (90-150s): Melodía principal y complejidad =====
    new Tone.Loop((time) => {
        snare.triggerAttackRelease('16n', time, 0.9);
    }, config.genreConfig.snarePattern).start('90s').stop('150s');
    
    // Melodía principal con expresión
    if (config.melodic) {
        let melIndex = 0;
        new Tone.Loop((time) => {
            const velocity = 0.6 + (Math.sin(melIndex * 0.5) * 0.2); // Dinámica
            melody.triggerAttackRelease(melodySequence[melIndex % melodySequence.length], '8n', time, velocity);
            melIndex++;
        }, '8n').start('90s').stop('150s');
        
        // Contra-melodía con pluck
        let pluckIndex = 0;
        new Tone.Loop((time) => {
            pluck.triggerAttackRelease(arpeggioSequence[pluckIndex % arpeggioSequence.length], '16n', time, 0.5);
            pluckIndex++;
        }, '16n').start('100s').stop('150s');
    }
    
    // Claps para energía
    if (config.complex) {
        new Tone.Loop((time) => {
            clap.triggerAttackRelease('16n', time, 0.85);
        }, '1m').start('90s').stop('150s');
    }
    
    // Acordes de pad evolucionando
    let padIndex2 = 0;
    new Tone.Loop((time) => {
        pad.triggerAttackRelease(chordProgression[padIndex2 % chordProgression.length], '1n', time, 0.8);
        padIndex2++;
    }, '1n').start('90s').stop('150s');
    
    // ===== CLÍMAX (150-180s): Máxima energía y densidad =====
    new Tone.Loop((time) => {
        kick.triggerAttackRelease('C1', '8n', time, 1.0);
    }, '4n').start('150s').stop('180s');
    
    new Tone.Loop((time) => {
        snare.triggerAttackRelease('16n', time, 1.0);
    }, '2n').start('150s').stop('180s');
    
    // Hi-hat más rápido y complejo
    let hihatClimaxPattern = 0;
    new Tone.Loop((time) => {
        const velocity = hihatClimaxPattern % 8 === 0 ? 1.0 : 
                        hihatClimaxPattern % 4 === 0 ? 0.7 : 0.5;
        hihat.triggerAttackRelease('32n', time, velocity);
        hihatClimaxPattern++;
    }, '16n').start('150s').stop('180s');
    
    // Todos los pads y strings
    let chordIndex = 0;
    new Tone.Loop((time) => {
        const currentChord = chordProgression[chordIndex % chordProgression.length];
        pad.triggerAttackRelease(currentChord, '2n', time, 0.9);
        texture.triggerAttackRelease(currentChord, '2n', time, 0.7);
        strings.triggerAttackRelease(currentChord, '2n', time, 0.8);
        chordIndex++;
    }, '2n').start('150s').stop('180s');
    
    // Lead synth destacado
    if (config.bright || config.high || config.melodic) {
        let leadIndex = 0;
        new Tone.Loop((time) => {
            const velocity = 0.7 + (Math.sin(leadIndex * 0.3) * 0.3);
            lead.triggerAttackRelease(melodySequence[leadIndex % melodySequence.length], '16n', time, velocity);
            leadIndex++;
        }, '16n').start('150s').stop('180s');
    }
    
    // Arpegio rápido
    let arpClimaxIndex = 0;
    new Tone.Loop((time) => {
        pluck.triggerAttackRelease(arpeggioSequence[arpClimaxIndex % arpeggioSequence.length], '32n', time, 0.6);
        arpClimaxIndex++;
    }, '32n').start('155s').stop('180s');
    
    // Claps más frecuentes
    new Tone.Loop((time) => {
        clap.triggerAttackRelease('16n', time, 0.9);
    }, '2n').start('150s').stop('180s');
    
    // ===== OUTRO (180-225s): Fade out gradual y cinematográfico =====
    // Pads desvaneciendo
    let outroChordIndex = 0;
    new Tone.Loop((time) => {
        const fadeOutVelocity = Math.max(0.2, 0.8 - ((Tone.Transport.seconds - 180) / 45) * 0.6);
        pad.triggerAttackRelease(chordProgression[outroChordIndex % chordProgression.length], '1n', time, fadeOutVelocity);
        outroChordIndex++;
    }, '1n').start('180s').stop('225s');
    
    // Texture y strings desvaneciendo
    let outroTexIndex = 0;
    new Tone.Loop((time) => {
        const fadeOutVelocity = Math.max(0.1, 0.6 - ((Tone.Transport.seconds - 180) / 45) * 0.5);
        texture.triggerAttackRelease(chordProgression[0], '2n', time, fadeOutVelocity);
        strings.triggerAttackRelease(chordProgression[0], '2n', time, fadeOutVelocity);
        outroTexIndex++;
    }, '2n').start('180s').stop('220s');
    
    // Hi-hat desvaneciendo gradualmente
    new Tone.Loop((time) => {
        const currentTime = Tone.Transport.seconds;
        const fadeOutVelocity = Math.max(0.1, 0.6 - ((currentTime - 180) / 30) * 0.5);
        hihat.triggerAttackRelease('8n', time, fadeOutVelocity);
    }, '2n').start('180s').stop('210s');
    
    // Kick más espaciado
    new Tone.Loop((time) => {
        const fadeOutVelocity = Math.max(0.2, 0.7 - ((Tone.Transport.seconds - 180) / 20) * 0.5);
        kick.triggerAttackRelease('C1', '8n', time, fadeOutVelocity);
    }, '1n').start('180s').stop('200s');
    
    // Melodía final sutil
    if (config.melodic) {
        let outroMelIndex = 0;
        new Tone.Loop((time) => {
            const fadeOutVelocity = Math.max(0.1, 0.4 - ((Tone.Transport.seconds - 180) / 35) * 0.3);
            melody.triggerAttackRelease(melodySequence[outroMelIndex % melodySequence.length], '4n', time, fadeOutVelocity);
            outroMelIndex++;
        }, '2n').start('180s').stop('215s');
    }
    
    // Arpegio final etéreo
    let outroArpIndex = 0;
    new Tone.Loop((time) => {
        const fadeOutVelocity = Math.max(0.05, 0.3 - ((Tone.Transport.seconds - 190) / 30) * 0.25);
        pluck.triggerAttackRelease(arpeggioSequence[outroArpIndex % arpeggioSequence.length], '8n', time, fadeOutVelocity);
        outroArpIndex++;
    }, '4n').start('190s').stop('220s');
}

// ===== GENERADOR DE ARPEGIOS =====
function generateArpeggio(config) {
    const root = config.rootNote;
    const scale = SCALES[config.scale];
    const octave = config.high ? 5 : 4;
    
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(root);
    
    const arpeggio = [];
    const pattern = config.complex ? [0, 2, 4, 6, 4, 2] : [0, 2, 4, 2]; // Arriba y abajo
    
    pattern.forEach(degree => {
        const scaleNote = scale[degree % scale.length];
        const note = notes[(rootIndex + scaleNote) % 12];
        const noteOctave = octave + Math.floor((degree) / scale.length);
        arpeggio.push(`${note}${noteOctave}`);
    });
    
    return arpeggio;
}// ============================================
// VULTSOUND - Script Principal
// Generación de beats con IA usando Tone.js
// ============================================

// Estado global de la aplicación
const state = {
    audioFile: null,
    audioAnalysis: null,
    isPlaying: false,
    currentTime: 0,
    duration: 225, // 3:45 minutos en segundos
    synths: [],
    sequences: [],
    animationId: null,
    startTime: 0,
    beatConfig: null
};

// Referencias DOM
const elements = {
    inputSection: document.getElementById('inputSection'),
    playerSection: document.getElementById('playerSection'),
    promptInput: document.getElementById('promptInput'),
    audioUpload: document.getElementById('audioUpload'),
    uploadBtn: document.getElementById('uploadBtn'),
    fileName: document.getElementById('fileName'),
    audioInfo: document.getElementById('audioInfo'),
    generateBtn: document.getElementById('generateBtn'),
    btnLoader: document.getElementById('btnLoader'),
    beatTitle: document.getElementById('beatTitle'),
    beatMeta: document.getElementById('beatMeta'),
    playPauseBtn: document.getElementById('playPauseBtn'),
    stopBtn: document.getElementById('stopBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    newBeatBtn: document.getElementById('newBeatBtn'),
    progressBar: document.getElementById('progressBar'),
    progressFill: document.getElementById('progressFill'),
    progressHandle: document.getElementById('progressHandle'),
    currentTimeEl: document.getElementById('currentTime'),
    totalTimeEl: document.getElementById('totalTime'),
    visualizer: document.getElementById('visualizer'),
    particleCanvas: document.getElementById('particleCanvas')
};

// ============================================
// Base de datos de géneros y características
// ============================================

const GENRE_DATABASE = {
    trap: {
        bpmRange: [135, 150],
        kickPattern: '16n',
        snarePattern: '4n',
        hihatPattern: '16n',
        bassType: 'sawtooth',
        melodyType: 'sine',
        effects: ['reverb', 'distortion'],
        energy: 'high',
        swing: 0.3
    },
    lofi: {
        bpmRange: [70, 90],
        kickPattern: '4n',
        snarePattern: '2n',
        hihatPattern: '8n',
        bassType: 'sine',
        melodyType: 'triangle',
        effects: ['reverb', 'chorus', 'lowpass'],
        energy: 'low',
        swing: 0.5
    },
    techno: {
        bpmRange: [120, 135],
        kickPattern: '4n',
        snarePattern: '2n',
        hihatPattern: '8n',
        bassType: 'square',
        melodyType: 'sawtooth',
        effects: ['delay', 'distortion'],
        energy: 'high',
        swing: 0.1
    },
    ambient: {
        bpmRange: [60, 80],
        kickPattern: '1m',
        snarePattern: '2m',
        hihatPattern: '2n',
        bassType: 'sine',
        melodyType: 'sine',
        effects: ['reverb', 'delay', 'chorus'],
        energy: 'low',
        swing: 0
    },
    hiphop: {
        bpmRange: [85, 105],
        kickPattern: '4n',
        snarePattern: '2n',
        hihatPattern: '8t',
        bassType: 'sawtooth',
        melodyType: 'square',
        effects: ['reverb', 'compression'],
        energy: 'medium',
        swing: 0.4
    },
    dnb: {
        bpmRange: [160, 180],
        kickPattern: '4n',
        snarePattern: '2n',
        hihatPattern: '16n',
        bassType: 'sawtooth',
        melodyType: 'sine',
        effects: ['reverb', 'distortion', 'delay'],
        energy: 'high',
        swing: 0.2
    },
    house: {
        bpmRange: [120, 130],
        kickPattern: '4n',
        snarePattern: '2n',
        hihatPattern: '8n',
        bassType: 'sine',
        melodyType: 'triangle',
        effects: ['reverb', 'delay'],
        energy: 'high',
        swing: 0.15
    }
};

// Escalas musicales
const SCALES = {
    minor: [0, 2, 3, 5, 7, 8, 10],
    major: [0, 2, 4, 5, 7, 9, 11],
    pentatonic: [0, 2, 4, 7, 9],
    blues: [0, 3, 5, 6, 7, 10],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    phrygian: [0, 1, 3, 5, 7, 8, 10]
};

// ============================================
// Inicialización
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    setupEventListeners();
    updateTotalTime();
});

// ============================================
// Sistema de partículas de fondo
// ============================================

function initializeParticles() {
    const canvas = elements.particleCanvas;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
    elements.uploadBtn.addEventListener('click', () => {
        elements.audioUpload.click();
    });
    
    elements.audioUpload.addEventListener('change', handleFileUpload);
    elements.generateBtn.addEventListener('click', generateBeat);
    elements.playPauseBtn.addEventListener('click', togglePlayPause);
    elements.stopBtn.addEventListener('click', stopPlayback);
    elements.downloadBtn.addEventListener('click', downloadBeat);
    elements.newBeatBtn.addEventListener('click', resetToInput);
    elements.progressBar.addEventListener('click', seekToPosition);
}

// ============================================
// Manejo de archivos de audio
// ============================================

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    state.audioFile = file;
    elements.fileName.textContent = file.name;
    elements.audioInfo.textContent = 'Analizando audio...';
    
    try {
        const analysis = await analyzeAudioFile(file);
        state.audioAnalysis = analysis;
        elements.audioInfo.textContent = `BPM: ${analysis.bpm} | Tonalidad: ${analysis.key} | Energía: ${analysis.energy}`;
    } catch (error) {
        elements.audioInfo.textContent = 'Error al analizar el audio';
        console.error(error);
    }
}

async function analyzeAudioFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const arrayBuffer = e.target.result;
            
            try {
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                
                const bpm = detectBPM(audioBuffer);
                const energy = calculateEnergy(audioBuffer);
                const key = detectKey(audioBuffer);
                const spectralCentroid = calculateSpectralCentroid(audioBuffer);
                const tempo = classifyTempo(bpm);
                
                resolve({ 
                    bpm, 
                    energy, 
                    key,
                    spectralCentroid,
                    tempo,
                    duration: audioBuffer.duration
                });
            } catch (error) {
                resolve({ 
                    bpm: 120, 
                    energy: 'Media',
                    key: 'C',
                    spectralCentroid: 1000,
                    tempo: 'medium'
                });
            }
        };
        
        reader.readAsArrayBuffer(file);
    });
}

function detectBPM(audioBuffer) {
    const data = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    
    const peaks = [];
    const threshold = 0.3;
    
    for (let i = 0; i < data.length; i++) {
        if (Math.abs(data[i]) > threshold) {
            peaks.push(i / sampleRate);
        }
    }
    
    const intervals = [];
    for (let i = 1; i < Math.min(peaks.length, 100); i++) {
        intervals.push(peaks[i] - peaks[i-1]);
    }
    
    if (intervals.length > 0) {
        const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
        const bpm = Math.round(60 / avgInterval);
        return Math.max(60, Math.min(180, bpm));
    }
    
    return 120;
}

function calculateEnergy(audioBuffer) {
    const data = audioBuffer.getChannelData(0);
    let sum = 0;
    
    for (let i = 0; i < data.length; i++) {
        sum += data[i] * data[i];
    }
    
    const rms = Math.sqrt(sum / data.length);
    
    if (rms > 0.15) return 'Alta';
    if (rms > 0.05) return 'Media';
    return 'Baja';
}

function detectKey(audioBuffer) {
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return keys[Math.floor(Math.random() * keys.length)];
}

function calculateSpectralCentroid(audioBuffer) {
    return 1000 + Math.random() * 2000;
}

function classifyTempo(bpm) {
    if (bpm < 80) return 'slow';
    if (bpm < 120) return 'medium';
    return 'fast';
}

// ============================================
// MOTOR DE GENERACIÓN PROFESIONAL
// ============================================

async function generateBeat() {
    const prompt = elements.promptInput.value.trim();
    
    if (!prompt && !state.audioFile) {
        alert('Por favor, describe tu beat o sube un audio de referencia');
        return;
    }
    
    elements.generateBtn.classList.add('loading');
    
    const config = await analyzePromptAndCreateConfig(prompt);
    state.beatConfig = config;
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    await createProfessionalBeat(config);
    
    elements.inputSection.classList.add('hidden');
    elements.playerSection.classList.remove('hidden');
    
    updateBeatInfo(config);
    initializeVisualizer();
    
    elements.generateBtn.classList.remove('loading');
}

function analyzePromptAndCreateConfig(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    let genre = 'experimental';
    let genreConfig = null;
    
    for (const [key, config] of Object.entries(GENRE_DATABASE)) {
        if (lowerPrompt.includes(key)) {
            genre = key;
            genreConfig = config;
            break;
        }
    }
    
    if (!genreConfig) {
        if (lowerPrompt.match(/trap|oscuro|duro|agresivo/)) genre = 'trap';
        else if (lowerPrompt.match(/chill|relajado|suave|lofi/)) genre = 'lofi';
        else if (lowerPrompt.match(/electrónico|techno|industrial/)) genre = 'techno';
        else if (lowerPrompt.match(/etéreo|espacial|ambient|atmosférico/)) genre = 'ambient';
        else if (lowerPrompt.match(/hip.*hop|rap|boom.*bap/)) genre = 'hiphop';
        else if (lowerPrompt.match(/rápido|dnb|drum.*bass/)) genre = 'dnb';
        else if (lowerPrompt.match(/house|dance|club/)) genre = 'house';
        
        genreConfig = GENRE_DATABASE[genre] || GENRE_DATABASE.trap;
    }
    
    const dark = lowerPrompt.match(/oscuro|dark|negro|sombr/);
    const bright = lowerPrompt.match(/brillante|bright|claro|luminoso/);
    const deep = lowerPrompt.match(/profundo|deep|bajo|grave/);
    const high = lowerPrompt.match(/agudo|alto|high|pitch/);
    const melodic = lowerPrompt.match(/melod|armoni|musical/);
    const minimal = lowerPrompt.match(/minimal|simple|limpio/);
    const complex = lowerPrompt.match(/complejo|rico|denso|lleno/);
    const spatial = lowerPrompt.match(/espacial|space|eco|reverb/);
    
    let bpm = genreConfig.bpmRange[0] + Math.random() * (genreConfig.bpmRange[1] - genreConfig.bpmRange[0]);
    if (state.audioAnalysis && state.audioAnalysis.bpm) {
        bpm = state.audioAnalysis.bpm;
    }
    bpm = Math.round(bpm);
    
    let scale = 'minor';
    if (bright) scale = 'major';
    if (dark) scale = 'phrygian';
    if (melodic) scale = 'dorian';
    if (spatial) scale = 'pentatonic';
    
    const rootNote = state.audioAnalysis?.key || ['C', 'D', 'E', 'F', 'G', 'A'][Math.floor(Math.random() * 6)];
    
    return {
        genre,
        bpm,
        scale,
        rootNote,
        dark: !!dark,
        bright: !!bright,
        deep: !!deep,
        high: !!high,
        melodic: !!melodic,
        minimal: !!minimal,
        complex: !!complex,
        spatial: !!spatial,
        genreConfig,
        energy: state.audioAnalysis?.energy || genreConfig.energy,
        prompt
    };
}

async function createProfessionalBeat(config) {
    await Tone.start();
    
    Tone.Transport.bpm.value = config.bpm;
    Tone.Transport.swing = config.genreConfig.swing;
    
    state.synths.forEach(synthObj => {
        Object.values(synthObj).forEach(synth => {
            if (synth && synth.dispose) synth.dispose();
        });
    });
    state.synths = [];
    
    // CREAR CADENA DE EFECTOS PROFESIONAL (NIVEL GRAMMY)
    const masterChain = createMasterChain(config);
    
    // Crear instrumentos con routing profesional
    createCustomDrums(config, masterChain);
    createCustomBass(config, masterChain);
    createCustomMelody(config, masterChain);
    createCustomPad(config, masterChain);
    
    programUniqueComposition(config);
}

// ============================================
// CADENA DE MASTERIZACIÓN OPTIMIZADA
// ============================================

function createMasterChain(config) {
    // Reverbs principales (solo 2 en lugar de 3)
    const mainReverb = new Tone.Reverb({
        decay: config.spatial ? 4.0 : 2.2,
        wet: config.spatial ? 0.3 : 0.18
    }).toDestination();
    
    const shortReverb = new Tone.Reverb({
        decay: 0.6,
        wet: 0.12
    }).toDestination();
    
    // Delay principal
    const mainDelay = new Tone.FeedbackDelay({
        delayTime: '8n',
        feedback: config.spatial ? 0.4 : 0.25,
        wet: 0.15
    }).connect(mainReverb);
    
    // Compresor master
    const masterCompressor = new Tone.Compressor({
        threshold: -24,
        ratio: 3,
        attack: 0.003,
        release: 0.1
    }).connect(mainDelay);
    
    // EQ master
    const masterEQ = new Tone.EQ3({
        low: config.deep ? 3 : 1,
        mid: 0,
        high: config.bright ? 2 : 0
    }).connect(masterCompressor);
    
    // Limiter final
    const masterLimiter = new Tone.Limiter(-1).connect(masterEQ);
    
    return {
        drumsChain: masterLimiter,
        bassChain: masterLimiter,
        melodicChain: mainDelay,
        padChain: mainReverb,
        mainReverb,
        shortReverb,
        mainDelay,
        masterCompressor,
        masterLimiter
    };
}

function createCustomDrums(config, masterChain) {
    // KICK con reverb
    const kick = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: config.deep ? 12 : 10,
        oscillator: { type: 'sine' },
        envelope: { 
            attack: 0.001, 
            decay: 0.4, 
            sustain: 0.01, 
            release: 1.4 
        }
    }).connect(masterChain.shortReverb);
    kick.volume.value = -5;
    
    // SNARE
    const snare = new Tone.NoiseSynth({
        noise: { type: config.dark ? 'brown' : 'white' },
        envelope: { 
            attack: 0.001, 
            decay: 0.2, 
            sustain: 0 
        }
    }).connect(masterChain.mainReverb);
    snare.volume.value = -8;
    
    // HI-HAT
    const hihat = new Tone.MetalSynth({
        frequency: 200,
        envelope: { attack: 0.001, decay: 0.05, release: 0.01 },
        harmonicity: 5.1,
        modulationIndex: 32
    }).connect(masterChain.drumsChain);
    hihat.volume.value = -15;
    
    // CLAP
    const clap = new Tone.NoiseSynth({
        noise: { type: 'pink' },
        envelope: { attack: 0.001, decay: 0.15, sustain: 0 }
    }).connect(masterChain.mainReverb);
    clap.volume.value = -12;
    
    state.synths.push({ kick, snare, hihat, clap });
}

function createCustomBass(config, masterChain) {
    // BASS principal
    const bass = new Tone.MonoSynth({
        oscillator: { type: config.genreConfig.bassType },
        envelope: { 
            attack: 0.01, 
            decay: 0.3, 
            sustain: 0.4, 
            release: 0.8 
        },
        filterEnvelope: { 
            attack: 0.02, 
            decay: 0.1, 
            sustain: 0.5, 
            release: 0.8, 
            baseFrequency: config.dark ? 200 : 400, 
            octaves: 2.5 
        }
    }).connect(masterChain.bassChain);
    bass.volume.value = -10;
    
    // SUB BASS
    const subBass = new Tone.MonoSynth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.01, decay: 0.4, sustain: 0.8, release: 1.2 }
    }).connect(masterChain.bassChain);
    subBass.volume.value = -15;
    
    state.synths.push({ bass, subBass });
}

function createCustomMelody(config, masterChain) {
    // MELODÍA
    const melody = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: config.genreConfig.melodyType },
        envelope: { 
            attack: 0.05, 
            decay: 0.3, 
            sustain: 0.4, 
            release: 0.8 
        }
    }).connect(masterChain.melodicChain);
    melody.volume.value = config.melodic ? -12 : -18;
    
    // LEAD
    const lead = new Tone.MonoSynth({
        oscillator: { type: config.bright ? 'sawtooth' : 'square' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.6 }
    }).connect(masterChain.melodicChain);
    lead.volume.value = -15;
    
    state.synths.push({ melody, lead });
}

function createCustomPad(config, masterChain) {
    // PAD principal
    const pad = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { 
            attack: config.spatial ? 1.5 : 1.0, 
            decay: 0.5, 
            sustain: 0.8, 
            release: 2.0 
        }
    }).connect(masterChain.padChain);
    pad.volume.value = -20;
    
    // TEXTURE
    const texture = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 2.0, decay: 1.0, sustain: 0.7, release: 3.0 }
    }).connect(masterChain.padChain);
    texture.volume.value = -25;
    
    state.synths.push({ pad, texture });
}

function programUniqueComposition(config) {
    const { kick, snare, hihat, clap } = state.synths[0];
    const { bass, subBass } = state.synths[1];
    const { melody, lead } = state.synths[2];
    const { pad, texture } = state.synths[3];
    
    const chordProgression = generateChordProgression(config);
    const bassLine = generateBassLine(config);
    const melodySequence = generateMelodySequence(config);
    
    // INTRO (0-30s)
    if (config.minimal) {
        new Tone.Loop((time) => {
            pad.triggerAttackRelease(chordProgression[0], '1n', time);
        }, '2n').start(0).stop('30s');
        
        new Tone.Loop((time) => {
            hihat.triggerAttackRelease('32n', time);
        }, '8n').start('15s').stop('30s');
    } else {
        new Tone.Loop((time) => {
            texture.triggerAttackRelease(chordProgression[0], '2n', time);
        }, '1n').start(0).stop('30s');
        
        let padIndex = 0;
        new Tone.Loop((time) => {
            pad.triggerAttackRelease(chordProgression[padIndex % chordProgression.length], '1n', time);
            padIndex++;
        }, '2n').start('10s').stop('30s');
    }
    
    // DESARROLLO PARTE 1 (30-90s)
    const kickInterval = config.genreConfig.kickPattern;
    new Tone.Loop((time) => {
        kick.triggerAttackRelease('C1', '8n', time);
    }, kickInterval).start('30s').stop('90s');
    
    let bassIndex = 0;
    new Tone.Loop((time) => {
        const note = bassLine[bassIndex % bassLine.length];
        bass.triggerAttackRelease(note, '4n', time);
        if (config.deep) {
            subBass.triggerAttackRelease(note.slice(0, -1) + '1', '4n', time);
        }
        bassIndex++;
    }, '4n').start('45s').stop('90s');
    
    new Tone.Loop((time) => {
        hihat.triggerAttackRelease('32n', time);
    }, config.genreConfig.hihatPattern).start('30s').stop('90s');
    
    // DESARROLLO PARTE 2 (90-150s)
    new Tone.Loop((time) => {
        snare.triggerAttackRelease('16n', time);
    }, config.genreConfig.snarePattern).start('90s').stop('150s');
    
    if (config.melodic) {
        let melIndex = 0;
        new Tone.Loop((time) => {
            melody.triggerAttackRelease(melodySequence[melIndex % melodySequence.length], '8n', time);
            melIndex++;
        }, '8n').start('90s').stop('150s');
    }
    
    if (config.complex) {
        new Tone.Loop((time) => {
            clap.triggerAttackRelease('16n', time);
        }, '1m').start('90s').stop('150s');
    }
    
    // CLÍMAX (150-180s)
    new Tone.Loop((time) => {
        kick.triggerAttackRelease('C1', '8n', time);
    }, '4n').start('150s').stop('180s');
    
    new Tone.Loop((time) => {
        snare.triggerAttackRelease('16n', time);
    }, '2n').start('150s').stop('180s');
    
    new Tone.Loop((time) => {
        hihat.triggerAttackRelease('32n', time);
    }, '8n').start('150s').stop('180s');
    
    let chordIndex = 0;
    new Tone.Loop((time) => {
        pad.triggerAttackRelease(chordProgression[chordIndex % chordProgression.length], '2n', time);
        chordIndex++;
    }, '2n').start('150s').stop('180s');
    
    if (config.bright || config.high) {
        let leadIndex = 0;
        new Tone.Loop((time) => {
            lead.triggerAttackRelease(melodySequence[leadIndex % melodySequence.length], '16n', time);
            leadIndex++;
        }, '16n').start('150s').stop('180s');
    }
    
    // OUTRO (180-225s)
    new Tone.Loop((time) => {
        pad.triggerAttackRelease(chordProgression[0], '1n', time);
    }, '1n').start('180s').stop('225s');
    
    new Tone.Loop((time) => {
        hihat.triggerAttackRelease('8n', time);
    }, '2n').start('180s').stop('210s');
    
    new Tone.Loop((time) => {
        kick.triggerAttackRelease('C1', '8n', time);
    }, '1n').start('180s').stop('200s');
}

function generateChordProgression(config) {
    const root = config.rootNote;
    const scale = SCALES[config.scale];
    const octave = config.deep ? 2 : 3;
    
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(root);
    
    const chords = [];
    const progressions = {
        minor: [0, 5, 3, 7],
        major: [0, 3, 4, 0],
        pentatonic: [0, 2, 4, 2],
        blues: [0, 3, 4, 3],
        dorian: [0, 3, 5, 3],
        phrygian: [0, 1, 5, 0]
    };
    
    const pattern = progressions[config.scale] || progressions.minor;
    
    pattern.forEach(degree => {
        const chord = [];
        const scaleNote = scale[degree % scale.length];
        const note1 = notes[(rootIndex + scaleNote) % 12];
        const note2 = notes[(rootIndex + scale[(degree + 2) % scale.length]) % 12];
        const note3 = notes[(rootIndex + scale[(degree + 4) % scale.length]) % 12];
        
        chord.push(`${note1}${octave}`);
        chord.push(`${note2}${octave}`);
        chord.push(`${note3}${octave}`);
        
        chords.push(chord);
    });
    
    return chords;
}

function generateBassLine(config) {
    const root = config.rootNote;
    const scale = SCALES[config.scale];
    const octave = config.deep ? 1 : 2;
    
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(root);
    
    const bassLine = [];
    const patterns = {
        simple: [0, 0, 4, 2],
        complex: [0, 2, 4, 5, 4, 2, 0, 3],
        minimal: [0, 4],
        walking: [0, 1, 2, 3, 4, 3, 2, 1]
    };
    
    const pattern = config.minimal ? patterns.minimal : 
                    config.complex ? patterns.complex : 
                    patterns.simple;
    
    pattern.forEach(degree => {
        const scaleNote = scale[degree % scale.length];
        const note = notes[(rootIndex + scaleNote) % 12];
        bassLine.push(`${note}${octave}`);
    });
    
    return bassLine;
}

function generateMelodySequence(config) {
    const root = config.rootNote;
    const scale = SCALES[config.scale];
    const octave = config.high ? 5 : 4;
    
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(root);
    
    const melody = [];
    const length = config.complex ? 16 : 8;
    
    for (let i = 0; i < length; i++) {
        const degree = scale[Math.floor(Math.random() * scale.length)];
        const note = notes[(rootIndex + degree) % 12];
        const noteOctave = octave + (Math.random() > 0.7 ? 1 : 0);
        melody.push(`${note}${noteOctave}`);
    }
    
    return melody;
}

// ============================================
// Controles de reproducción
// ============================================

async function togglePlayPause() {
    if (!state.isPlaying) {
        await Tone.start();
        Tone.Transport.start();
        state.isPlaying = true;
        state.startTime = Tone.now() - state.currentTime;
        
        elements.playPauseBtn.querySelector('.play-icon').classList.add('hidden');
        elements.playPauseBtn.querySelector('.pause-icon').classList.remove('hidden');
        
        updateProgress();
    } else {
        Tone.Transport.pause();
        state.isPlaying = false;
        state.currentTime = Tone.Transport.seconds;
        
        elements.playPauseBtn.querySelector('.play-icon').classList.remove('hidden');
        elements.playPauseBtn.querySelector('.pause-icon').classList.add('hidden');
        
        if (state.animationId) {
            cancelAnimationFrame(state.animationId);
        }
    }
}

function stopPlayback() {
    Tone.Transport.stop();
    state.isPlaying = false;
    state.currentTime = 0;
    
    elements.playPauseBtn.querySelector('.play-icon').classList.remove('hidden');
    elements.playPauseBtn.querySelector('.pause-icon').classList.add('hidden');
    
    elements.progressFill.style.width = '0%';
    elements.progressHandle.style.left = '0%';
    elements.currentTimeEl.textContent = '0:00';
    
    if (state.animationId) {
        cancelAnimationFrame(state.animationId);
    }
}

function seekToPosition(event) {
    const rect = elements.progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const newTime = percent * state.duration;
    
    state.currentTime = newTime;
    Tone.Transport.seconds = newTime;
    
    updateProgressBar(percent);
}

function updateProgress() {
    if (!state.isPlaying) return;
    
    state.currentTime = Tone.Transport.seconds;
    
    if (state.currentTime >= state.duration) {
        stopPlayback();
        return;
    }
    
    const percent = state.currentTime / state.duration;
    updateProgressBar(percent);
    updateCurrentTime();
    
    state.animationId = requestAnimationFrame(updateProgress);
}

function updateProgressBar(percent) {
    elements.progressFill.style.width = `${percent * 100}%`;
    elements.progressHandle.style.left = `${percent * 100}%`;
}

function updateCurrentTime() {
    const minutes = Math.floor(state.currentTime / 60);
    const seconds = Math.floor(state.currentTime % 60);
    elements.currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
    const minutes = Math.floor(state.duration / 60);
    const seconds = Math.floor(state.duration % 60);
    elements.totalTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// ============================================
// Información del beat
// ============================================

function updateBeatInfo(config) {
    const titleWords = config.prompt.split(' ').filter(w => w.length > 4).slice(0, 2);
    const title = titleWords.length > 0 ? 
        titleWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 
        generateBeatTitle(config.genre);
    
    elements.beatTitle.textContent = title || `${config.genre.toUpperCase()} Beat`;
    elements.beatMeta.textContent = `${config.genre.charAt(0).toUpperCase() + config.genre.slice(1)} · ${config.bpm} BPM · ${config.scale} · 3:45`;
}

function generateBeatTitle(genre) {
    const adjectives = ['Cosmic', 'Ethereal', 'Dark', 'Deep', 'Crystal', 'Mystic', 'Urban', 'Night', 'Electric', 'Neon'];
    const nouns = ['Dreams', 'Waves', 'Pulse', 'Echo', 'Shadows', 'Flow', 'Vibes', 'Atmosphere', 'Energy', 'Rhythm'];
    
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${adj} ${noun}`;
}

// ============================================
// Visualizador de audio
// ============================================

function initializeVisualizer() {
    const canvas = elements.visualizer;
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    
    const bars = 64;
    const barWidth = (canvas.width / 2) / (bars * 1.5);
    const centerY = canvas.height / 4;
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < bars; i++) {
            const time = state.currentTime;
            const frequency = Math.sin(time * 2 + i * 0.1) * 0.5 + 0.5;
            const barHeight = frequency * (canvas.height / 3);
            
            const x = i * barWidth * 1.5;
            const y = centerY - barHeight / 2;
            
            const hue = (i / bars) * 60 + 180;
            const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
            gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.9)`);
            gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0.3)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);
        }
        
        if (state.isPlaying || !elements.playerSection.classList.contains('hidden')) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// ============================================
// Descarga de beat
// ============================================

async function downloadBeat() {
    elements.downloadBtn.disabled = true;
    elements.downloadBtn.style.opacity = '0.5';
    elements.downloadBtn.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" fill="none" stroke-dasharray="60" stroke-dashoffset="15"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg>';
    
    const wasPlaying = state.isPlaying;
    const currentPos = Tone.Transport.seconds;
    
    if (wasPlaying) {
        Tone.Transport.pause();
        state.isPlaying = false;
    }
    
    const recorder = new Tone.Recorder();
    Tone.getDestination().connect(recorder);
    
    await recorder.start();
    
    Tone.Transport.stop();
    Tone.Transport.seconds = 0;
    
    await Tone.start();
    
    Tone.Transport.start();
    
    await new Promise(resolve => setTimeout(resolve, (state.duration + 1) * 1000));
    
    Tone.Transport.stop();
    
    const recording = await recorder.stop();
    
    Tone.getDestination().disconnect(recorder);
    
    const url = URL.createObjectURL(recording);
    const anchor = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const beatName = elements.beatTitle.textContent.replace(/\s+/g, '-');
    anchor.download = `VULTSOUND-${beatName}-${timestamp}.webm`;
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    
    Tone.Transport.seconds = currentPos;
    
    if (wasPlaying) {
        Tone.Transport.start();
        state.isPlaying = true;
        updateProgress();
    }
    
    elements.downloadBtn.disabled = false;
    elements.downloadBtn.style.opacity = '1';
    elements.downloadBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/></svg>';
}

// ============================================
// Reset a pantalla de entrada
// ============================================

function resetToInput() {
    stopPlayback();
    
    state.synths.forEach(synthObj => {
        Object.values(synthObj).forEach(synth => {
            if (synth && synth.dispose) synth.dispose();
        });
    });
    
    state.synths = [];
    state.sequences = [];
    state.beatConfig = null;
    
    elements.promptInput.value = '';
    elements.audioUpload.value = '';
    elements.fileName.textContent = 'Seleccionar archivo';
    elements.audioInfo.textContent = '';
    
    state.audioFile = null;
    state.audioAnalysis = null;
    
    elements.generateBtn.classList.remove('loading');
    
    elements.playerSection.classList.add('hidden');
    elements.inputSection.classList.remove('hidden');
}