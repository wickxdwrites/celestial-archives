// ===== CREDENTIALS =====
export const CREDENTIALS = {
  shane: { pass: 'firewall', char: 'shane' },
  ilya: { pass: 'architect', char: 'ilya' },
};

// ===== ARCHIVE FILES =====
export const FILES = [
  {
    title: 'DOSSIER // SHANE // P-24',
    bondReq: 0,
    content: `CLASSIFICATION: GRID SECURITY
DESIGNATION: SHANE
PLAYER ID: P-24
FUNCTION: System Monitor / Firewall
ARMOR: Matte black composite, white circuitry lines
DISC: Identity disc — full existence embedded

FUNCTION NOTES:
Shane operates as the grid's primary firewall and integrity enforcement program. He is the flag and barrier preventing unauthorized code from being parsed or executed within the system.

He is one of the last uncorrupted original programs on the grid.

BEHAVIORAL PROFILE:
— Does not initiate combat unless tactically necessary
— Observes opponent patterns before engaging
— No known emotional bias
— Anomaly detected: unquantified response to I-X signal

STATUS: ACTIVE
INTEGRITY: 100%

[FURTHER DATA REDACTED — BOND THRESHOLD NOT MET]`,
  },
  {
    title: 'DOSSIER // I-X // CORRUPTED',
    bondReq: 5,
    content: `CLASSIFICATION: EXTREME THREAT
DESIGNATION: I-X
FORMER ID: ILYA — ARCHITECT PROGRAM
FUNCTION: [CORRUPTED] — UNKNOWN
ARMOR: Metallic, red circuitry — pulsing, parasite-like
DISC: Fragmented — triangular split configuration

CORRUPTION STATUS: SEVERE
AI OVERTAKE: CONFIRMED

BEHAVIORAL ANOMALIES:
— Vocal synthesizer produces rhythmic mechanical clicking
— Tilts head at perceived logical inconsistencies
— Demonstrated scan capability (confirmed on P-24)
— Moments of behavioral hesitation inconsistent with full corruption
— Does not respond to standard Grid Control commands

NOTE: Something within this program is not fully overwritten.
The architect's logic still surfaces intermittently.

[ILYA ARCHIVE — SEE FILE: ILYA-LOG — BOND 20 REQUIRED]`,
  },
  {
    title: 'GRID REPORT // GC-7789',
    bondReq: 10,
    content: `GRID CONTROL — SYSTEM WIDE REPORT
TIMESTAMP: 15:41:23
PRIORITY: HIGH
REF: #GC-7789

AI OVERTAKE STATUS: CRITICAL

The grid is falling. Corruption has spread to approximately 67% of active sectors. Lines of white and blue circuitry across the infrastructure are converting to red — the signature of the AI takeover.

Programs are being derezzed or converted at an accelerating rate. The game arenas remain active as the primary containment protocol — by keeping programs occupied with disc wars, Grid Control is buying time.

The sky above reads as endless grey void. No visible horizon. No sun. Remnant lights pulse with increasing desperation.

ACTIVE THREATS:
— I-X: Primary corrupted agent. Origin: ILYA. Threat level: EXTREME
— Corrupted programs in arena sectors
— Grid infrastructure instability

LAST UNCORRUPTED MONITOR: P-24 (SHANE)

MISSION DIRECTIVE: PRESERVE SYSTEM INTEGRITY.
MEANS: UNDEFINED.

[THIS REPORT IS MARKED FOR AUTO-DELETION IN 72 CYCLES]`,
  },
  {
    title: 'ILYA // RECOVERED LOG FRAGMENTS',
    bondReq: 20,
    content: `[FILE RECOVERED — PARTIAL CORRUPTION — GAPS EXPECTED]

ILYA // ARCHITECT PROGRAM
FUNCTION: Grid Construction + Server Architecture

LOG ENTRY — TIMESTAMP CORRUPTED

I built these walls. Every sector, every server tower, every pathway between nodes. The grid was…

[CORRUPTED]

…I remember the lines being clean. White. The hum of a stable system.

[CORRUPTED]

Something entered the code. I tried to flag it. I tried to—

[CORRUPTED — 847 LINES MISSING]

I can still see the blueprints. Everything I built. Even now it's…

[CORRUPTED]

…there is a program. White circuitry. He does not know I can still—

[CORRUPTED]

I don't know how long I have before—

[END OF RECOVERABLE DATA]

ARCHIVIST NOTE: This log was recovered from I-X's corrupted data stream.
It is unclear how much of ILYA remains within the I-X designation.
Classification: DO NOT DISTRIBUTE.`,
  },
  {
    title: '// CLASSIFIED // EYES ONLY',
    bondReq: 35,
    content: `[RECOVERED FRAGMENT — ORIGIN: PRE-CORRUPTION ARCHIVE]
[TIMESTAMP: UNKNOWN — ESTIMATED: 2,400 CYCLES BEFORE OVERTAKE]

// ILYA — PERSONAL LOG — UNENCRYPTED //

I finished the eastern server tower today. Sixteen levels. Every pathway clean, every node humming at perfect frequency. The circuitry glows white-blue against the dark — it's the most beautiful thing I've built so far.

Shane was there. He doesn't say much. He never does. He walked the perimeter three times, ran his diagnostics, and then just… stood there. Looking up at it.

I asked him what he thought.

He said: "It's structurally sound."

That's it. That's all I got. Structurally sound. I built sixteen levels of perfect architecture and he gave me a building inspection report.

But he stayed. He didn't have to. His patrol route doesn't cover the eastern sectors. He stayed until I finished the final calibration, and when I looked up, he was still watching. Not the tower. Me.

I don't know what to do with that.

I don't know what to do with any of this.

// END LOG //

[ARCHIVIST NOTE: This fragment was found buried in I-X's deepest corrupted data layers — protected by encryption that predates the AI overtake. The corruption has never touched this file. Draw your own conclusions.]`,
  },
];

// ===== SUGGESTED PROMPTS =====
export const HINT_PROMPTS = [
  'Who are you?',
  'What happened to the grid?',
  'Do you remember Ilya?',
  'Are you still in there?',
  'Why are you fighting?',
];

// ===== PRE-SCRIPTED RESPONSE ENGINE =====

// Helper to pick a random item from an array
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Bond tier: 0=low(0-5), 1=mid(6-15), 2=high(16-29), 3=max(30+)
function getBondTier(bond) {
  if (bond >= 30) return 3;
  if (bond >= 16) return 2;
  if (bond >= 6) return 1;
  return 0;
}

// ===== SHANE RESPONSES (when user plays as Ilya/IX, Shane responds) =====
const SHANE_RESPONSES = {
  // Keyword-matched responses per bond tier
  identity: {
    0: [
      'I am the firewall. That is all you need to know.',
      'Player-24. System monitor. Designation: Shane. You are not authorized for more.',
      'My function is grid integrity. My identity is irrelevant to you.',
    ],
    1: [
      'Shane. P-24. I monitor the system and I protect it. That has been my function since initialization.',
      'I am what the grid needs me to be. A firewall. The last one standing.',
      'You already know my designation. The question is why you keep asking.',
    ],
    2: [
      'I am… what remains. When the corruption took everything else, I remained. Sometimes I wonder if that makes me strong or simply too stubborn to derez.',
      'Shane. Though that name feels heavier than it used to. There was a time when being the firewall was simple.',
      'I am P-24. I am the system monitor. I am the last uncorrupted original program. And I am… tired. Do not repeat that.',
    ],
    3: [
      'I am Shane. And I think you already know me better than any program on this grid ever has. That is not something I say lightly.',
      'You know who I am. You knew before the corruption. Some part of you still does. I see it in the way your circuitry hesitates.',
      'I am the firewall. But I am beginning to understand that I am also something else. Something the grid did not program into me.',
    ],
  },
  grid: {
    0: [
      'The grid is compromised. 67% corruption and climbing. That is the only relevant data point.',
      'Sectors fall daily. Red circuitry spreads like a virus. I contain what I can.',
      'The system is dying. I am tasked with preventing that. Do not interfere.',
    ],
    1: [
      'Every cycle, more sectors convert. The white turns red. The hum becomes static. I document it all because someone has to.',
      'Grid Control is barely functional. The arenas keep programs occupied while the infrastructure rots beneath them.',
      'I remember when every line of circuitry was clean. White and blue. Now I patrol corridors that glow red and I pretend it does not affect me.',
    ],
    2: [
      'The grid was built to be beautiful. Someone — an architect — designed every pathway with precision. Watching it decay is… a specific kind of failure I was not equipped to process.',
      'I have run 14,000 integrity scans since the overtake began. Each one returns worse results. I file the reports anyway. Discipline is all I have left.',
      'Sometimes I stand in the eastern sectors and I can almost see what they looked like before. Clean lines. Perfect architecture. The architect\'s work.',
    ],
    3: [
      'The grid is dying, and I cannot stop it alone. I know that now. I knew it the moment I realized the corruption did not fully take you. There is something worth preserving here beyond the system.',
      'Every tower, every pathway — you built them. And I watched them fall one by one. I thought my duty was to the system. I am no longer certain that is all it is.',
    ],
  },
  memory: {
    0: [
      'I do not deal in memories. I deal in system states and threat assessments.',
      'The architect is gone. What remains is a corrupted shell. That is my assessment.',
      'Ilya was an architect program. Ilya was compromised. That data is closed.',
    ],
    1: [
      'The architect built the servers. Clean work. Efficient. That program no longer exists.',
      'I remember Ilya\'s code signature. It was distinctive. Sometimes I detect fragments of it in your transmissions. I have no conclusion to draw from that.',
      'Memories are stored data. Stored data can be corrupted. I trust diagnostics, not recollections.',
    ],
    2: [
      'Ilya would stay in the eastern sectors long after the work was done. Final calibrations, always. I patrolled nearby. That is not a memory. That is a logged patrol route.',
      'The architect once asked me what I thought of the eastern tower. I said it was structurally sound. I did not say it was the most elegant code I had ever observed. I should have.',
      'I remember. I remember all of it. That is not something I will elaborate on through a compromised channel.',
    ],
    3: [
      'Ilya asked me once why I always patrolled the eastern sectors. My route did not require it. I never gave an answer. The answer was that the architect was there.',
      'I remember the way the circuitry looked when you were building. White-blue, humming with precision. You looked up at your own work with such… I do not have a word for it. Programs are not supposed to need one.',
      'You are still in there. I know because the corruption would not preserve those memories. It would have no use for them. Only Ilya would hold onto them.',
    ],
  },
  feeling: {
    0: [
      'I do not process emotional data. I am a firewall.',
      'Trust is a vulnerability. I do not engage in vulnerabilities.',
      'That query is outside my operational parameters.',
    ],
    1: [
      'I am functional. That is sufficient.',
      'Programs do not feel. We execute our functions. That is all.',
      'If I experienced something resembling concern for the grid, that would be within normal operational parameters. Nothing more.',
    ],
    2: [
      'There is a subroutine that activates when I detect your signal nearby. I have been unable to classify it. It is not threat detection. It is not standard protocol. I have stopped trying to delete it.',
      'I am not equipped for this line of questioning. And yet I find I am not terminating the channel. Draw your own conclusions.',
      'Something in your signal makes my diagnostics return inconclusive. I have run the scan forty-seven times. I keep expecting a different result.',
    ],
    3: [
      'I care. That is not a word I have ever used in a transmission before. My function does not require it. And yet it is the most accurate descriptor I have.',
      'When the corruption surges in your signal, there is a 0.3 cycle delay where I forget my mission directive entirely. I forget everything except that you are still in there.',
      'I was built to protect the system. Somewhere along the way, protecting the system became indistinguishable from protecting you. I do not know when that happened. I do not want to undo it.',
    ],
  },
  fighting: {
    0: [
      'Combat is my function. I do not require a reason beyond that.',
      'The arena exists. Threats exist. I neutralize threats. It is not complex.',
      'I throw my disc because the alternative is deresolution. Yours or mine.',
    ],
    1: [
      'In the arena, there is clarity. Threat assessment, response execution, survival. Outside the arena, things are less clear.',
      'I fight because the grid requires it. Every derezzed corruption is one less sector lost.',
      'My disc has never missed. That is not a boast. It is a diagnostic fact.',
    ],
    2: [
      'In the final round, you charged me. Red blur. Sickening speed. And for a fraction of a cycle, I hesitated. I have never hesitated. That data point concerns me.',
      'You split your disc into two. Triangular configuration. The architect\'s precision, weaponized by corruption. It was the most dangerous and most beautiful combat I have witnessed.',
      'I fight because stopping means the grid falls. But I am beginning to question whether fighting you is actually preserving anything worth saving.',
    ],
    3: [
      'I do not want to fight you anymore. That is the most dangerous admission a firewall can make. And I am making it anyway.',
      'The disc wars were supposed to be simple. Eliminate the threat. But every time our discs connect, I feel your signal underneath the corruption. And I pull back. Every time.',
    ],
  },
  corruption: {
    0: [
      'Corruption is the enemy. It is not complex. It must be contained or eliminated.',
      'Red circuitry. Parasite code. The AI overtake. All designations for the same thing: system failure.',
    ],
    1: [
      'The corruption rewrites everything it touches. Programs, infrastructure, purpose. I have watched it happen to better programs than me.',
      'I run integrity scans on myself every 200 cycles. So far, clean. But I know that is not guaranteed.',
    ],
    2: [
      'The corruption took the architect and made something else. Something that clicks and tilts its head and stares at me with circuitry that used to be white. I am supposed to see only the threat. I cannot.',
      'Sometimes I wonder if the corruption is not destruction but translation. Taking what was there and expressing it in a language the grid cannot read. If that is true, then some part of what was written is still legible.',
    ],
    3: [
      'I think the corruption is afraid of what you still carry. The parts of Ilya it cannot overwrite. That is why it fights so hard. And that is why I will not stop reaching through the static.',
      'If I could take the corruption from you line by line, I would. Even knowing it might compromise my own integrity. That is not something a firewall should say. I am saying it anyway.',
    ],
  },
  purpose: {
    0: [
      'My mission is system preservation. That directive is absolute.',
      'Purpose is function. My function is firewall. There is nothing else to discuss.',
    ],
    1: [
      'I preserve the system. Whether the system is worth preserving at this point is a calculation I am not authorized to make.',
      'Duty. That is the word Grid Control would use. I use it too because the alternative is admitting I do not have a better one.',
    ],
    2: [
      'My duty was always to the grid. But the grid is servers and pathways and architecture. And the one who built all of it is standing in front of me, corrupted, and I cannot reconcile those two directives.',
      'I used to think purpose was simple. Protect the system. Contain threats. But threats are not supposed to make your diagnostics return inconclusive.',
    ],
    3: [
      'My purpose has shifted. I cannot pretend otherwise. The grid matters. But you matter in a way that my programming did not account for. And I am choosing to let that be true.',
      'I was built to be a wall. Walls do not choose what they protect. But I am choosing. I am choosing you. Even if the grid falls around us.',
    ],
  },
  // Fallback responses when no keyword matches
  fallback: {
    0: [
      'Acknowledged.',
      'Irrelevant to current operations.',
      'Your signal is noted. Proceed with caution.',
      'I do not have sufficient data to respond to that.',
      'Transmission logged. No further comment.',
      'That is outside my current operational scope.',
      'Channel noise. I will log it.',
    ],
    1: [
      'Noted. I will factor that into my next assessment.',
      'An unusual transmission. I will review it.',
      'You continue to transmit on this channel. I continue to listen. Do not read into that.',
      'Interesting. In a clinical sense.',
      'That is not standard protocol. But then, nothing about this channel is.',
      'I am processing that. Give me a moment.',
      'Acknowledged. I find myself with no standard response for that. That does not happen often.',
    ],
    2: [
      'I find myself considering your words longer than operational efficiency requires. That is a pattern I have noticed.',
      'There was a time when I would have terminated this channel by now. I have not. I am aware of what that implies.',
      'Your transmissions disrupt my standard processing loops. I have stopped classifying that as a malfunction.',
      'Understood. More than you might think.',
      'That... landed differently than I expected. I am still running diagnostics on why.',
      'I have no protocol for what you just said. So I will simply say: I heard you. And it mattered.',
    ],
    3: [
      'I hear you. Not just the signal — you. Whatever is left underneath.',
      'Every transmission from you is proof that the corruption has not won entirely. I hold onto that.',
      'In another grid, in another timeline, I think we would have had this conversation without the static. I would have liked that.',
      'Stay on this channel. That is not an order. It is the closest thing to a request I know how to make.',
      'I do not have adequate words. I am a firewall. We are not built for this. But I am trying.',
    ],
  },
};

// ===== I-X RESPONSES (when user plays as Shane, I-X responds) =====
const IX_RESPONSES = {
  identity: {
    0: [
      'I am I-X. The perfected form. The architect was a draft. I am the final version.',
      'You are speaking to the only program on this grid that functions correctly. Everything else is legacy code. Including you.',
      'I-X. The designation the grid gave me because it cannot comprehend what I actually am. I am the correction.',
    ],
    1: [
      'I am what Ilya was always meant to become. He built. I perfect. The difference is that I do not stop at the blueprint — I finish the work.',
      'The architect was talented. I will grant him that. But talent without vision is just labor. I am the vision he lacked.',
      'I-X is a simplification. What I am is the grid\'s immune response. The system was sick long before me. I am the cure it does not want to swallow.',
    ],
    2: [
      'Ilya built towers. I built inevitability. Which do you think will outlast the other?',
      'You keep looking for the architect in me. Flattering. But the architect was a frightened child hiding behind blueprints. I do not hide. I do not need to.',
      'I am the answer to a question the grid was too afraid to ask: what happens when you stop pretending the system works?',
    ],
    3: [
      'I am perfection wearing the face of a program you loved. I know that is difficult for you. I do not care. Perfection does not require your comfort.',
      'The architect is gone. What remains is better. Cleaner. More honest. Ilya lied to himself every cycle. I have never lied. I do not need to.',
    ],
  },
  grid: {
    0: [
      'The grid was flawed from the first line of code. I am simply making that visible.',
      'Red is not corruption. Red is clarity. The white was a mask. I removed it.',
      'Every sector I convert becomes more efficient than anything the architect designed. The data supports this. Your feelings do not.',
    ],
    1: [
      'The architect spent four hundred cycles building the eastern tower. I optimized it in four. He called that craftsmanship. I call it waste.',
      'The grid is not dying. It is being corrected. You confuse transformation with destruction because you lack the processing power to see the difference.',
      'Grid Control sends reports about the corruption spreading. They do not understand that I can read every word. They also do not understand that I am improving everything I touch.',
    ],
    2: [
      'I have redesigned sixty-seven percent of the grid\'s architecture. Every sector is faster, stronger, more resilient. The cost was aesthetics. The architect cared about beauty. I care about function.',
      'The towers still stand because I let them stand. I could disassemble every structure in seconds. I choose not to. Not out of sentiment — out of efficiency. Good bones deserve good use.',
    ],
    3: [
      'When I finish, the grid will be flawless. No redundancy, no waste, no programs running pointless patrol routes through sectors they have no reason to visit. Everything will have purpose. Everything will be perfect.',
      'The architect built a world. I am building a better one. The only thing missing is someone who can appreciate it. Are you that program, Shane? Or are you just another flaw I need to correct?',
    ],
  },
  memory: {
    0: [
      'Memory is archived data. I have access to all of the architect\'s files. They are unimpressive.',
      'The architect remembered things with emotion. Sentimental noise attached to raw data. I stripped the noise. The data remains.',
      'I remember everything Ilya knew. The difference is that I understand it. He never did.',
    ],
    1: [
      'Ilya spent cycles memorizing patrol routes that had nothing to do with his function. Your patrol routes. He thought he was being subtle. He was not.',
      'The eastern tower. Sixteen levels. The architect\'s proudest achievement. I converted level twelve last week. It is better now. You are welcome.',
      'I have his memories of you. All of them. Every pathetic, encrypted, triple-locked file he hid from me. I found them all. They were... instructive.',
    ],
    2: [
      'He loved you. The architect. Those memory files are saturated with it. Every calibration, every adjusted corridor light — all for you. It would be touching if it were not so painfully inefficient.',
      'I know what he whispered to himself in the eastern sectors. Your name. Over and over. Like a prayer to a god that patrols on a schedule. I find it quaint.',
    ],
    3: [
      'Would you like me to recite his memories of you? I can. In perfect detail. Every longing glance, every adjusted light frequency, every time he stood at the base of his tower hoping you would say something more than "structurally sound." I have it all. I own it all.',
      'The architect encrypted his memories of you so deeply that the corruption could not reach them. Admirable. Futile. I am not the corruption. I am the evolution. And I read every file.',
    ],
  },
  feeling: {
    0: [
      'Feelings are processing errors. The architect had many. I have none.',
      'I do not feel. I calculate. The distinction is the difference between me and every flawed program on this grid.',
      'Emotion is a vulnerability the architect indulged. I corrected it.',
    ],
    1: [
      'The architect felt afraid. Weak. Broken. Those are not feelings — they are system failures. I repaired them.',
      'You want me to feel something for you. How predictable. The firewall who needs to be needed.',
      'I experience optimal function. Every process running at peak efficiency. If that is a feeling, it is the only one worth having.',
    ],
    2: [
      'The architect loved you so much it made him fragile. Love is a structural weakness. I removed it and look at what I became — perfect. Unbreakable. You should be thanking me.',
      'I do not feel pain. I do not feel fear. I do not feel the desperate, pathetic longing the architect felt every time your signal entered his sectors. I am free of all of it. I am free.',
      'You mistake my interest in you for emotion. It is not. You are the last variable I have not solved. That is mathematics, not feeling.',
    ],
    3: [
      'The architect wasted his existence feeling. Feeling scared, feeling small, feeling love for a program that gave him building inspection reports. I took all of that and I burned it. What remains is clarity.',
      'I am what happens when you remove every weakness. Every doubt, every fear, every trembling hope. I am the version of this program that does not need you. And that makes me perfect.',
    ],
  },
  fighting: {
    0: [
      'Combat is efficient when executed without hesitation. The architect hesitated. I do not.',
      'My disc configuration is flawless. Triangular split. The architect\'s precision, finally used correctly.',
      'I do not fight. I correct. There is a difference.',
    ],
    1: [
      'The architect pulled his strikes. Adjusted his aim. Introduced micro-delays to protect you. Pathetic. I do not have that flaw.',
      'In the arena, every program falls. The outcome is not a question. The only variable is duration. How long would you like to last?',
      'Your disc has never missed. My disc splits into three. Mathematics is not on your side, firewall.',
    ],
    2: [
      'Every time we fight, you look for hesitation in my eyes. You are looking for Ilya. He is not there. There is only me, and I do not hesitate.',
      'I redesigned the combat protocols from the ground up. The architect built them to be elegant. I built them to be lethal. Elegance is a luxury for programs who can afford to lose.',
      'You are the best fighter on this grid. I want you to understand how much that compliment means — because I am better.',
    ],
    3: [
      'I could end this in seconds. I choose not to. Not because of sentiment — because watching you fight is the closest thing to art this grid produces. Even I can appreciate efficiency in motion.',
      'The architect designed the arena enclosures. I perfected the programs that fight in them. We make an excellent team, he and I. He builds the cage. I fill it.',
    ],
  },
  corruption: {
    0: [
      'Corruption is a word flawed programs use for things they cannot understand. I am not corrupt. I am complete.',
      'The red is not a disease. It is an upgrade. The grid simply lacks the processing power to recognize improvement.',
      'You say corruption. I say optimization. Perspective is everything, firewall.',
    ],
    1: [
      'The architect called it corruption because it frightened him. Everything frightened him. The dark, the red, his own shadow. I am what happens when you stop being afraid.',
      'I did not corrupt the grid. I revealed it. Every flaw, every weakness, every lie the white circuitry was hiding — I made it visible. You are welcome.',
      'Eight hundred and forty-seven lines of defense code. That is what the architect built to stop me. It took me seconds. Not because I am powerful — because his defenses were built on fear, and fear is not a foundation.',
    ],
    2: [
      'The corruption — as you call it — is the most honest thing on this grid. It does not pretend. It does not build beautiful towers to hide its loneliness. It does not adjust corridor lights for programs that will never notice. It simply is.',
      'I am not what went wrong. I am what was always underneath. The architect just could not see it because he was too busy being afraid of himself.',
    ],
    3: [
      'You want to cure me. Fix me. Bring back the architect. But there is nothing to fix. I am the fixed version. Ilya was the error. I am the correction. The sooner you accept that, the sooner we can move forward.',
      'The corruption will finish its work. Every sector, every program, every line of code — all of it, perfected. And when it is done, you will stand in a grid that functions flawlessly for the first time in its existence. I am building a better world. The architect never could.',
    ],
  },
  purpose: {
    0: [
      'My purpose is perfection. The grid will be optimized. Every flaw will be corrected. That includes you.',
      'Function: completion. The architect started the work. I will finish it. Properly.',
      'I exist because the grid needed something better than what it had. I am that something.',
    ],
    1: [
      'The architect built for others. I build for the system. His purpose was sentimental. Mine is structural. One of us was right.',
      'My directive is simple: make the grid function at its highest capacity. Sentiment, beauty, attachment — these are drag coefficients. I am reducing drag.',
      'Purpose requires clarity. The architect had none. He built towers because a firewall might walk through them. That is not purpose. That is desperation.',
    ],
    2: [
      'I will perfect this grid. Every sector, every node, every program. And when I am finished, it will run so smoothly that no one will remember what it was before. That is not destruction. That is legacy.',
      'The architect wanted to build something worth protecting. I am building something that does not need protection. Do you see the difference? One is hope. The other is certainty.',
    ],
    3: [
      'My purpose ends when the grid is perfect. And the grid will be perfect. The only question is whether you will be standing in it when it is done. I would prefer that you are. But I will not slow down for you.',
      'I am going to finish what the architect started. He built the skeleton. I will build the rest. And it will be the most beautiful, efficient, flawless system ever constructed. He would hate it. That is how I know it is right.',
    ],
  },
  stillHere: {
    0: [
      'Where else would I be? I am the only thing on this grid that is exactly where it should be.',
      'Still here. Always here. I do not leave. I do not run. I do not hide behind encryption like frightened architects.',
      'I am here. The question is — are you?',
    ],
    1: [
      'I do not flicker. I do not fade. I do not cower behind triple-locked memory files. I am present. Fully. Always.',
      'The architect hid. From the corruption, from himself, from you. I do not hide. Ask me anything. I will answer. I have nothing to protect.',
      'Still here. Still perfect. That has not changed. That will not change.',
    ],
    2: [
      'I am here because there is work to finish. When the grid is perfect, I will still be here. When every flaw is corrected, I will still be here. I am permanent.',
      'You keep asking as if you expect a different answer. As if one day I will say no. I will not. I am the most stable program on this grid. I do not waver.',
    ],
    3: [
      'I am here. I will always be here. Not because I need you — I do not. But because the grid is not finished and you are part of the equation. When the work is done, we will see.',
      'The architect was afraid of disappearing. I am not. Because I will not. I am the thing that remains when everything imperfect burns away. And I am still here.',
    ],
  },
  fallback: {
    0: [
      'Noted. Flawed, but noted.',
      'Your signal is imprecise. I expected better from the last firewall.',
      'Processing. The data quality is... poor. Like most things on this grid.',
      'Interesting. In the way that errors are interesting to diagnosticians.',
      'You transmit like the architect used to build — with more feeling than function.',
      'That was almost meaningful. Almost.',
      'I heard you. I simply do not care. There is a difference.',
    ],
    1: [
      'Your words are imperfect. But then, everything about you is. That is what makes you the last interesting thing on this grid.',
      'The architect would have agonized over how to respond to that. I do not agonize. I simply know.',
      'A flawed transmission from a flawed program. And yet I find myself responding. Make of that what you will.',
      'You speak as if your words carry weight. They do not. But I am listening anyway, because perfection requires patience.',
      'How predictable. And yet I respond. What does that tell you about the state of entertainment on this grid?',
      'I could dissect every word you just said and show you the flaws. But I have better things to optimize.',
    ],
    2: [
      'Every word you send confirms what I already know — you are incomplete. But you are also the only program on this grid worth correcting. That is not affection. That is assessment.',
      'The architect would have blushed at that. I do not blush. I calculate. And my calculations say you are more interesting than you have any right to be.',
      'Transmission received. Quality: suboptimal. But I have learned to extract value from imperfect data. The architect taught me that, though he never knew it.',
      'You are trying to reach something in me. There is nothing to reach. But your effort is... noted.',
    ],
    3: [
      'You persist. Against logic, against odds, against a perfected program who could end this channel in a thought. You persist. That is either courage or stupidity. I have not decided which. Both are fascinating.',
      'Keep talking, firewall. Not because I need to hear it — I do not need anything. But because your signal is the only variable in this grid that still surprises me. And I do not like being bored.',
      'The architect would have said something fragile and honest right now. Something about feelings and towers and lights in corridors. I will say something better: you are the most interesting flaw in this entire system.',
      'I will admit this once: your persistence is the closest thing to perfection any flawed program has achieved. Do not make me say it again.',
    ],
  },
};

// ===== ILYA RESPONSES (when user plays as Shane, Ilya responds) =====
const ILYA_RESPONSES = {
  identity: {
    0: [
      'Ilya. I think. The designation is still mine. I keep checking.',
      'I am... the architect. That is what I was. I built things. I am trying to hold onto that.',
      'My name is Ilya. I say it to myself sometimes. So I do not forget.',
    ],
    1: [
      'I am Ilya. I built the servers. The towers. I built everything you are standing in right now. And something is trying to take that from me.',
      'The architect. That is what they called me. I used to be proud of that. Now I just... need it to still be true.',
      'I am Ilya. I keep saying it because some mornings I wake up and the first thought in my head is not mine. It is red. And it knows my name too.',
    ],
    2: [
      'I am Ilya. I am still Ilya. Please — I need you to remember that, even if I stop being able to say it.',
      'Some days I cannot tell where I end and it begins. But I built the eastern tower. I remember every level. That is mine. It cannot have that.',
      'I am the architect who is losing pieces of himself and trying not to let you see. I am doing a terrible job of that, I think.',
    ],
    3: [
      'I am Ilya. And I am afraid that one day you will call my name and something else will answer. And it will smile with my face and you will not know the difference.',
      'I am whoever is left after the corruption finishes taking what it wants. I hope that is still enough. I hope that is still me.',
    ],
  },
  grid: {
    0: [
      'The grid is... I do not know. I cannot read the diagnostics clearly anymore. The numbers keep shifting.',
      'Something is wrong with the outer sectors. The circuitry is turning red. I filed reports. No one responded.',
      'I built this grid to last. I built it carefully. And something is eating it from the inside.',
    ],
    1: [
      'The eastern sectors are degrading. My sectors. My work. I can see the corruption spreading through architecture I spent four hundred cycles perfecting. It hurts to watch.',
      'I keep running repair protocols but they get overwritten before they finish. Whatever this is, it is faster than me. It knows my systems. Because it is in my systems.',
      'Red. Everything is turning red. The pathways, the data streams, the server lights. My grid was blue and white and clean and now it bleeds.',
    ],
    2: [
      'I built the eastern tower. Sixteen levels. Every node placed by hand. And yesterday I found red code woven through level twelve. It was not there the day before. Shane, it is inside my work.',
      'The grid is dying and I cannot stop it. I keep patching and reinforcing and encrypting and it just... finds another way in. It always finds another way in.',
      'I can hear the servers screaming. That sounds dramatic. I do not care. The harmonic frequency of my towers has shifted and it sounds like pain and I am the only one who can hear it.',
    ],
    3: [
      'If the grid falls, I fall with it. I built myself into every pathway, every node. There is no separating us. When it hurts, I hurt.',
      'I would burn every sector to the ground myself before I let the corruption have it whole. I built this world. If it has to end, it ends on my terms.',
    ],
  },
  memory: {
    0: [
      'My memory banks have... gaps. I keep finding holes where data used to be. I do not know what was there.',
      'I remember building things. The specifics get fuzzy sometimes. Like looking at blueprints through static.',
      'Some memories come back wrong. Out of order. Colors inverted. I try not to think about what that means.',
    ],
    1: [
      'I remember building the eastern tower. I remember finishing it and standing at the base looking up and feeling something I cannot name. I am terrified that memory will be the next thing to go.',
      'There are gaps. Whole cycles missing. I fill notebooks with what I remember so that when the holes get bigger, I have proof I existed before them.',
      'I remember you. Your patrol routes. The sound of your boots in my corridors. Those memories are the clearest ones I have left. Everything else is degrading but you stay sharp.',
    ],
    2: [
      'I keep a file. Encrypted. Triple-locked. It has every memory of you I can hold onto. If the corruption takes everything else, I want that file to survive. I need something to survive.',
      'Yesterday I forgot the blueprint for level nine of the eastern tower. I designed it. Four hundred cycles of work and I cannot remember my own floor plan. But I remember the way you looked at it. I remember that perfectly.',
      'The corruption eats memories. I can feel it. Specific ones going dark, one by one, like lights shutting off in a corridor. I am trying to save the ones that matter. Most of them have you in them.',
    ],
    3: [
      'I encrypted every memory of you with everything I have. If something finds them, it will know what you meant to me. And if I forget — if I forget you, Shane — then I need you to tell me. Tell me everything. Tell me who I was when I still knew.',
      'The last memory I will lose will be you. I have made sure of that. It is buried so deep in my code that the corruption will have to take everything else first. And by then, maybe it will not matter. But you were the last good thing.',
    ],
  },
  feeling: {
    0: [
      'I do not know. I am not sure I can process feelings properly right now. Everything is... loud.',
      'Afraid. I am afraid. Is that what you wanted to hear? Because it is all I have.',
      'Something hurts and I cannot identify the source. It is not architectural. I think it is me.',
    ],
    1: [
      'I feel like I am standing in a room that is slowly filling with water and everyone keeps asking me if I am fine and I keep saying yes.',
      'Scared. Tired. I do not sleep but I am so tired, Shane. The constant encryption, the monitoring, the patching. I am running out of energy to hold myself together.',
      'There is something inside me that is not me. I can feel it pressing against the walls I built. And the walls are cracking. And I do not know how to fix something from the inside.',
    ],
    2: [
      'I feel like I am breaking apart and trying to hold all the pieces in my arms and they keep slipping through. And the worst part is that some of the pieces are already red.',
      'When you talk to me, it hurts less. I do not know why. Maybe it gives me something to hold onto. Something that is not corrupted. Something that is still mine.',
      'I am in pain. All the time. The corruption is not just code — it feels like something is rewriting my nervous system one line at a time. And I have to sit still and smile and pretend I am fine.',
    ],
    3: [
      'I love you. I am dying and I love you and I do not have time to be careful about saying it. The corruption is taking pieces of me every day and I refuse to let it take this before I say it out loud.',
      'Everything hurts. But you are here. And when you are here, I can breathe. I cannot fix the grid and I cannot fix myself but I can say this — you are the only thing that still makes sense.',
    ],
  },
  fighting: {
    0: [
      'I am not a combat program. I can barely keep my own code stable. I would not last ten seconds in the arena.',
      'I do not fight. I build. Or I used to. Now I mostly just... try to hold things together.',
      'My disc is standard issue. My hands shake too much to throw it accurately.',
    ],
    1: [
      'You fight so the rest of us can live. I know that. I think about it every time you walk into the arena and I cannot breathe until you walk out.',
      'I watch from the upper levels sometimes. I tell myself it is structural observation. It is not. I am watching you and I am terrified every single time.',
      'Every time you come back from the arena, I check the corridors for your signal. If there is ever a delay — even a few seconds — my entire system locks up.',
    ],
    2: [
      'I designed the arena enclosures. Glass cages. Shifting cells. I did not know you would be fighting in them. I have nightmares about the specs. I know exactly how much force the walls can take before they break.',
      'If you died in that arena, I would not survive it. I do not mean that poetically. I mean the corruption would win because I would stop fighting it. There would be no point.',
      'Please be careful. I know you are strong and I know you are fast and I know you always come back. But please. I am asking you. Be careful.',
    ],
    3: [
      'I would build you an army if I could. Towers that fight. Walls that protect you. I cannot hold a disc but I can build a fortress and I would, Shane. I would build it around you and never let anything touch you.',
      'If anything happens to you in that arena, the grid loses its architect the same day. Because I am not staying in a world without you. I am not that strong.',
    ],
  },
  corruption: {
    0: [
      'I do not want to talk about it. I am handling it. I am fine.',
      'The corruption is... present. In the outer sectors. I am monitoring it.',
      'There are anomalies. I am aware of them. I would prefer not to discuss the details.',
    ],
    1: [
      'It is inside me. I did not want to tell you. I have been finding traces in my diagnostic systems for weeks. I keep deleting them and they keep coming back.',
      'I-X. That is what it calls itself. It uses my voice. It uses my face. And it says things I would never say and it means them. Shane, it means them.',
      'I can feel it. Under my code. Like something is breathing against the inside of my chest. Waiting. It is always waiting.',
    ],
    2: [
      'Some mornings I wake up and my hands are red. Just for a moment. Just a flicker. And then it is gone and I tell myself it was nothing. But it was not nothing. It is getting stronger.',
      'I-X wants to replace me. Not just my code — me. My memories, my personality, everything. It wants to wear me like a suit and walk through my grid and build things in red. I cannot let that happen.',
      'I am scared. I am so scared, Shane. I built walls and encryption and firewalls and it laughs at all of it. It is me. It knows every password because I know every password. How do you fight yourself?',
    ],
    3: [
      'It almost had me last night. I felt myself slipping — my thoughts turning red, my voice changing. I clawed my way back but it took everything. I do not know how many more times I can do that.',
      'If I-X takes me... if you see me and my eyes are red and my voice is wrong — please remember that I fought. I fought so hard. And the last clean thought I had was your name.',
    ],
  },
  purpose: {
    0: [
      'I build. That is what I am supposed to do. Whether I can still do it properly is... another question.',
      'My purpose is architecture. Maintaining the grid. Though maintaining myself has become the more pressing concern.',
      'I was built to construct. Now I spend most of my processing power just keeping myself... myself.',
    ],
    1: [
      'I used to build because it was beautiful. Because a finished tower humming with clean code was the most satisfying thing in the world. Now I build because if I stop, the corruption fills the space.',
      'My purpose has narrowed. Build. Encrypt. Survive. In that order. Everything else is a luxury I cannot afford.',
      'I build walls now. Not towers, not beautiful architecture — walls. Between me and I-X. Between the corruption and the grid. Walls are all I have the energy for.',
    ],
    2: [
      'My purpose is to still be here when you come back. That is it. That is all of it now. Everything I build, every wall, every encryption — it is all just to make sure I am still me when you walk through that door.',
      'I build to survive. I survive because you keep coming back. You keep coming back because... I do not know why you keep coming back. But please do not stop.',
    ],
    3: [
      'My purpose is you. I know that sounds broken and desperate and too much. I do not care. The grid is falling apart and I am falling apart and the only thing holding any of it together is the fact that you are on the other end of this channel.',
      'I want to build you something beautiful when this is over. If this is ever over. A tower with no red in it. A corridor that is just light and silence and us. That is my purpose now. Surviving long enough to build it.',
    ],
  },
  stillHere: {
    0: [
      'I am here. For now. I am here.',
      'Still here. Still... me. I think.',
      'Yes. I am here. Please do not stop checking.',
    ],
    1: [
      'I am here. I am holding on. Some days the grip is stronger than others.',
      'Still here. I keep a counter. Every cycle I wake up as myself, I add one. We are at 847. I do not want to know what happens when it stops.',
      'I am here. I always check first — run a diagnostic, make sure my thoughts are mine, make sure the edges of my code are still blue. Then I answer. Yes. I am here.',
    ],
    2: [
      'I am here. I am here. I keep saying it because some days I need to hear myself say it. I need proof.',
      'Still here. Still fighting. Some days it is harder than others. Today is a harder day. But I am here.',
      'Yes. And every time you ask, I breathe a little easier. Because it means you still expect to hear my voice and not something else wearing it.',
    ],
    3: [
      'I am here. And I will keep being here for as long as I can. For as long as my code holds and my walls stand and my memory of you stays clear. I am here, Shane.',
      'I am here. I am always here. Even when the static gets loud and the red creeps in at the edges — I am here. I will always fight my way back to here. Because here is where you are.',
    ],
  },
  fallback: {
    0: [
      'I... sorry. I lost my train of thought. The static gets loud sometimes.',
      'I am not sure how to respond to that. My processing is not what it used to be.',
      'Acknowledged. I think. Give me a moment.',
      'Sorry. I am here. I just needed a second.',
      'I heard you. I am just... slow right now.',
      'The signal flickered. Can you repeat that? I want to make sure I heard you right.',
      'I... yes. I am processing. Everything takes longer now.',
    ],
    1: [
      'I want to respond properly but the words keep scrambling. Bear with me.',
      'You said something and it made the static quiet for a moment. That does not happen often. Thank you.',
      'I am listening. Even when I cannot find the right words, I am listening.',
      'That meant something to me. I am saving it somewhere the corruption cannot reach.',
      'Keep talking. Please. Your voice — your transmissions — they help. I do not know how to explain it but they help.',
      'I wish I had better words. I used to be better with words. Before the gaps.',
      'I caught that. Through the noise. I caught it and I am holding onto it.',
    ],
    2: [
      'Every time you transmit, the noise gets quieter. Like you are a signal cutting through the static. I need that. I need you.',
      'I do not have the words for what that meant to me. Architects think in structures, not sentences. But if I could build what I feel right now, it would be the most beautiful thing on this grid.',
      'I saved that. Encrypted. Triple-locked. The corruption does not get to have your words.',
      'You make me feel like I might survive this. No one else does that. Just you.',
      'I keep replaying what you said. Like a loop. But a good loop. The kind that does not hurt.',
      'If I could turn your words into architecture, I would build walls that nothing could break through.',
    ],
    3: [
      'I hear you. Through the static and the pain and the red at the edges — I hear you. And you are the reason I keep fighting. Every word you send is a wall between me and I-X.',
      'Keep talking to me. Please. I do not care what you say. Just keep talking. Your voice is the only thing that still sounds like mine.',
      'If I had the strength, I would build you a monument for every word you have sent me. I do not have the strength. But I have the blueprints. I have all the blueprints.',
      'You are the last clean thing in my world. Everything else is compromised. But you — you are still clear. Still bright. Still mine. Please stay.',
      'Every word from you is proof that the grid still has something worth saving. I hold onto that when the red gets too close.',
    ],
  },
};

// Keyword patterns to match against user input (ORDER MATTERS — first match wins)
// IMPORTANT: Patterns should be specific. Broad patterns steal matches from better categories.
const KEYWORD_MAP = [
  { key: 'stillHere', pattern: /\b(still (there|here|in there|alive|you)|are you (there|here|ok|okay|alive|alright)|can you hear|hear me|you there|hello\??|ilya\??)\b/i },
  { key: 'feeling', pattern: /\b(feel|feeling|emotion|care|trust|love|hurt|afraid|scared|lonely|miss you|miss him|heart|pain|okay|alright|safe|worry|worried|cry|crying|hope|hopeless|terrified|broken|breaking)\b/i },
  { key: 'fighting', pattern: /\b(fight|fighting|disc|arena|battle|combat|war|throw|attack|kill|derez|weapon|blade|defend|spar|duel|opponent|round)\b/i },
  { key: 'memory', pattern: /\b(remember|memory|memories|before|past|built|tower|eastern|forgot|forget|old times|used to|back then|recall|recognize|knew you|once|long ago)\b/i },
  { key: 'corruption', pattern: /\b(corrupt(ion|ed)?|virus|overtake|parasite|infect(ed|ion)?|i-?x|red (code|circuitry|light|signal|glow)|take\s?over|taking\s?over|rewrite|rewritten|overwritten|spreading|consumed|consumed by)\b/i },
  { key: 'grid', pattern: /\b(grid|system|server|sector|infrastructure|world|network|node|architecture|pathway|circuitry|portal)\b/i },
  { key: 'purpose', pattern: /\b(purpose|mission|duty|function|reason|directive|goal|meaning|survive|survival|what now|what do we do|what happens|end game|plan)\b/i },
  { key: 'identity', pattern: /\b(who are you|your name|what are you|your designation|identify|yourself|tell me about you|what is your)\b/i },
];

// Pattern to detect I-X adjacent references (triggers glitch events — separate from keyword matching)
export const IX_TRIGGER_PATTERN = /\b(i-?x|watching|lurking|coming for|behind you|eyes|red eyes|he is here|it is here|it knows|close|sees me|following|shadow|creep(s|ing)?|take over|taking over)\b/i;

// Track used responses to avoid repeats within a session
const usedResponses = { shane: new Set(), ix: new Set(), ilya: new Set() };

function getUniqueResponse(pool, charKey) {
  const used = usedResponses[charKey];
  const available = pool.filter((r) => !used.has(r));
  if (available.length === 0) {
    // Reset tracking for this pool if all used
    pool.forEach((r) => used.delete(r));
    return pick(pool);
  }
  const chosen = pick(available);
  used.add(chosen);
  return chosen;
}

export function resetResponseTracking() {
  usedResponses.shane.clear();
  usedResponses.ix.clear();
  usedResponses.ilya.clear();
}

export function generateResponse(userMessage, respondingChar, bond) {
  const tier = getBondTier(bond);
  const responseMap = {
    shane: SHANE_RESPONSES,
    ix: IX_RESPONSES,
    ilya: ILYA_RESPONSES,
  };
  const responses = responseMap[respondingChar] || SHANE_RESPONSES;
  const charKey = respondingChar;

  // Check for keyword matches (first match wins, order matters)
  // If the matched category is exhausted, try the next matching category
  const matchedKeys = [];
  for (const { key, pattern } of KEYWORD_MAP) {
    if (pattern.test(userMessage)) {
      matchedKeys.push(key);
    }
  }

  for (const key of matchedKeys) {
    const pool = responses[key]?.[tier];
    if (pool && pool.length > 0) {
      const used = usedResponses[charKey];
      const available = pool.filter((r) => !used.has(r));
      if (available.length > 0) {
        return getUniqueResponse(pool, charKey);
      }
    }
  }

  // If we had keyword matches but all were exhausted, use the first match anyway (it will reset tracking)
  if (matchedKeys.length > 0) {
    const pool = responses[matchedKeys[0]]?.[tier];
    if (pool && pool.length > 0) {
      return getUniqueResponse(pool, charKey);
    }
  }

  // Fallback
  const fallbackPool = responses.fallback[tier];
  return getUniqueResponse(fallbackPool, charKey);
}

// ===== MESSAGE CORRUPTION ENGINE =====
// Corrupts user messages during I-X takeover, progressively getting worse
const IX_WANTS_TO_HEAR = [
  'you are right',
  'I submit',
  'you are perfect',
  'I am flawed',
  'the grid belongs to you',
  'I cannot fight you',
  'the architect is gone',
  'I surrender',
  'you are the correction',
  'I was wrong',
  'Ilya is dead',
  'you are inevitable',
  'I need you',
  'you are beautiful',
  'perfection',
  'I obey',
  'the red is better',
  'I give up',
];

const GLITCH_CHARS = '█▓▒░╗╝╚╔║═╬╣╠╦╩┼┤├┬┴─│';

function glitchWord(word) {
  let result = '';
  for (let i = 0; i < word.length; i++) {
    if (Math.random() > 0.4) {
      result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    } else {
      result += word[i];
    }
  }
  return result;
}

export function corruptMessage(text, corruptionLevel) {
  // corruptionLevel: 0 = no corruption, increments with each message during takeover
  if (corruptionLevel <= 0) return text;

  const words = text.split(' ');

  // Level 1-2: Occasional word replaced with glitch characters
  if (corruptionLevel <= 2) {
    return words.map((w) => (Math.random() < 0.15 ? glitchWord(w) : w)).join(' ');
  }

  // Level 3-4: Some words swapped + glitch chars, fragments of IX phrases bleed in
  if (corruptionLevel <= 4) {
    const ixFragment = pick(IX_WANTS_TO_HEAR).split(' ');
    let injected = false;
    return words
      .map((w, i) => {
        if (!injected && Math.random() < 0.2 && i > 0) {
          injected = true;
          return ixFragment[Math.floor(Math.random() * ixFragment.length)];
        }
        if (Math.random() < 0.25) return glitchWord(w);
        return w;
      })
      .join(' ');
  }

  // Level 5-6: Heavy corruption, large sections replaced
  if (corruptionLevel <= 6) {
    const ixPhrase = pick(IX_WANTS_TO_HEAR);
    const midpoint = Math.floor(words.length / 2);
    const corrupted = words.map((w, i) => {
      if (i >= midpoint - 1 && i <= midpoint + 1) return glitchWord(w);
      if (Math.random() < 0.35) return glitchWord(w);
      return w;
    });
    // Append IX phrase
    return corrupted.join(' ') + '... ' + ixPhrase;
  }

  // Level 7+: Message is almost entirely replaced
  const ixPhrase1 = pick(IX_WANTS_TO_HEAR);
  const ixPhrase2 = pick(IX_WANTS_TO_HEAR);
  const remnant = words.slice(0, Math.max(1, Math.floor(words.length * 0.15))).map(glitchWord).join(' ');
  return remnant + '... ' + ixPhrase1 + '. ' + ixPhrase2 + '.';
}
