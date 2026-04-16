const chapter1 = {
  id: "chapter-1",
  label: "Chapter 1 — Boot Sequence",
  summary:
    "The grid, to the user, was nothing significant than just an ordinary system. But within it was a place of entertainment for most and a death sentence for many.",
  content: `The grid, to the user, was nothing significant than just an ordinary system, a server. Where data and information move freely to communicate with one another. But within it was a place of entertainment for most and a death sentence for many. A digital world where the expansive skies were an endless grey void of echoing communication and despair.

There was no visible horizon, so sun, only a sinking darkness with shrouds of remnant lights from the grid. Every so often, the lines of white and blue flicker into a dangerous shade of red – the AI takeover that signaled the impending doom of a fall of a once stable grid. The air tasted and smelled like burnt silicon with every ominous pulse, sending waves of dread to the programs that lived within it.

<div class="system-broadcast">
  <div class="broadcast-header">
    <span class="broadcast-icon">📡</span>
    <span class="broadcast-origin">GRID CONTROL</span>
    <span class="broadcast-priority">PRIORITY: HIGH</span>
  </div>
  
  <div class="broadcast-content">
    <div class="message-header">
      <span class="msg-type">SYSTEM WIDE NOTIFICATION</span>
      <span class="msg-id">#GC-7789</span>
    </div>
    
    <div class="message-body">
      All combatants, prepare for disc wars.
    </div>
    
    <div class="broadcast-footer">
      <span class="broadcast-time" id="broadcast-time-1">15:41:23</span>
      <span class="broadcast-status">TRANSMITTED</span>
    </div>
  </div>
</div>

Shane stood tall in his new glass cell, standing high above the crowd cheering all around the arena, his silhouette sharp and refined, a stark difference to the petrified players facing off in their own cells. His boots made a dull metallic thud against the glass floor. Cheers of the crowd grew louder, a deafening chant of disc wars and screams of glee when another player had been derezzed. But Shane was a development of his own caliber. His armor, a sleek matte black composite that barely reflected light, was etched with lines of white circuitry. A program yet to be touched by the AI, remaining pure and one of the few original programs on the grid.

Shane was the integral part of the system monitor. He was the flag and the barrier that prevented the wrong code or the wrong program being parsed or executed. And now in a grid that was slowly decaying by this AI overtake, it was his duty to prevent any more harm done to the system.

Adjusting his grip on his identity disc. He gripped it with importance, everything about his entire existence was embedded on this very disc, his presence, his history, objectives and his… well … soul. As soon as he activated the nimbus, the glowing edge, he could hear the data humming sharply. Shane looked at his last opponent before the final round. Cowering away on the other side of their enclosure, Shane didn't hesitate to throw his disc, the sharp edge sliced through the air, shitting the glass wall behind the player and ricocheting fast. Shane watched as his disc cut through the player's torso, his trembling body shattering into millions of voxels. His screams were the last thing Shane heard before the arena blared a dangerous red. He caught his returning disc and tuned in to hear who was his last opponent.

His cell was shifting, moving around until it merged all the empty cells into one large battle cage.

<div class="arena-announcement">
  <div class="announcement-header">
    <span class="arena-icon">🏟</span>
    <span class="arena-title">ARENA CONTROL</span>
    <span class="match-status">FINAL ROUND</span>
  </div>
  
  <div class="match-display">
    <div class="competitor left">
      <span class="player-id">PLAYER-24</span>
      <span class="player-name">SHANE</span>
    </div>
    
    <div class="versus-separator">
      <span class="vs-text">VS</span>
      <div class="vs-line"></div>
    </div>
    
    <div class="competitor right">
      <span class="player-id threat">I-X</span>
      <span class="player-name corrupted">CORRUPTED</span>
    </div>
  </div>
  
  <div class="match-info">
    <div class="arena-stats">
      <span class="stat-item">ARENA: GLASS CAGE</span>
      <span class="stat-item">WEAPON: IDENTITY DISC</span>
      <span class="stat-item">STAKES: DEREZ OR VICTORY</span>
    </div>
  </div>
</div>

The playing field had shifted, Shane sauntered over to his expected position facing towards the dark corner opposite to him. He couldn't make out much but the faint glow of red pulsing on the player's suit. Shane ran a quick diagnostic check through the visor of his helmet, the internal hud flickering with multiple new strings.

<div class="diagnostic-hud">
  <div class="hud-scan-line"></div>
  
  <div class="diag-header">
    <span class="diag-title">COMBAT DIAGNOSTICS</span>
    <span class="diag-timestamp" id="hud-timestamp">15:42:07</span>
  </div>
  
  <div class="status-grid">
    <div class="status-item primary">
      <span class="status-icon">●</span>
      <span class="status-name">INTEGRITY</span>
      <span class="status-value good">100%</span>
    </div>
    
    <div class="status-item">
      <span class="status-icon">◉</span>
      <span class="status-name">TARGET LOCK</span>
      <span class="status-value warning">I-X</span>
    </div>
    
    <div class="status-item">
      <span class="status-icon">⚡</span>
      <span class="status-name">POWER CORE</span>
      <span class="status-value good">OPTIMAL</span>
    </div>
    
    <div class="status-item">
      <span class="status-icon">🛡</span>
      <span class="status-name">DEFENSE GRID</span>
      <span class="status-value good">ACTIVE</span>
    </div>
  </div>
  
  <div class="tactical-info">
    <div class="threat-level">
      <span class="threat-label">THREAT ASSESSMENT</span>
      <div class="threat-bar">
        <div class="threat-fill critical" style="width: 95%"></div>
      </div>
      <span class="threat-value">EXTREME</span>
    </div>
  </div>
  
  <div class="mission-directive">
    <span class="directive-label">MISSION DIRECTIVE</span>
    <span class="directive-command">ELIMINATE TARGET</span>
  </div>
  
  <script>
    (function() {
      const timestamp = document.getElementById('hud-timestamp');
      if (timestamp) {
        setInterval(() => {
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, '0');
          const minutes = now.getMinutes().toString().padStart(2, '0');
          const seconds = now.getSeconds().toString().padStart(2, '0');
          timestamp.textContent = \`\${hours}:\${minutes}:\${seconds}\`;
        }, 1000);
      }
    })();
  </script>
</div>

"You do not belong." Shane said, his voice resonating across the room. The crowd booed at his taunt. Not like it would mean anything to him, they were all slowly being corrupted anyways. Shane didn't move, he couldn't see I-X move either. But Shane didn't need to see him, he could smell him – the smell of overheating coolant and the faint sound of his erratic whirring. Almost too sharp to even perceive through the deafening roar of the crowd.

Then there he was, I-X emerging from the darkness, his shiny metallic armor glistened under the arena lights, his red circuitry pulsed with a life of its own, like a parasite clinging to a host. In Shane's eyes it didn't look like armor protecting him, it was like a personal cage, a prison locking away something deadly. The haunting red hurt his eyes, it flickered rapidly like an unsteady heartbeat. The cursed code that now created a monster.

I-X didn't respond to his taunt at all. In fact, the only sound that came from him was a low rumble mixed with a rhythmic, mechanical clicking. Like metal discs rubbing together and grinding away each other. A sound so grating it made teeth ache.

They began to move, a waltz if you will, one stalking the other, neither making moves to get closer. The crowd was growing antsy with their lack of action, their voices grew louder as they chanted.

"Throw the disc!" and "Disc war!"

Shane sneered. "You are an anomaly." I-X tilted his head to the side in response to his words, almost as if confused as to why Shane hasn't made his first move. Shane never made the first move, unless it was absolutely necessary to do so. Shane typically liked to observe a player's fighting style, and this time was no different, with his eyes fixed on I-X circling around him.

That single red circuit of light down the center of I-X's featureless helmet visor, flared brighter then disappeared. Shane was scanned. And for a split uncalculated second, something within this corrupt program stuttered, a faint distorted sound echoed out from his vocal synthesizer – it was barely coherent but it sent a child down Shane's body.

As soon as Shane decided to take a step closer to close the gap, to get a better listen on the sound, I-X's little blip was cut short, gone as quickly as it came.

With his disc in hand, I-X activated the nimbus, and with a quick flick of his wrist he split his triangular disk into two. A piercing shriek from him almost made Shane become disorientated. But after that short delay of response, Shane's body naturally dropped into his combative stance.

He was like a [red] blur in Shane's vision.

I-X moved with a sickening speed, he wasn't just running, he was charging up, determined to destroy the stability that Shane represented. Both of his discs flew straight toward Shane, immediately his hand went up, using his disc to deflect those red ones back.

The sounds of their discs colliding wasn't just merely the sounds of metal clashing harshly. It was sharp screeches of two conflicting opponents trying to establish a hierarchy within the system.

Sparks of both white and red erupted, sprinkling between the two of them, the game master seemingly growing disinterested with such child's play decided to add a new switch up. Symbols on the glass floor flashed. They both stopped and caught their discs before running in opposite directions, up the walls. The enclosure had rotated upside down, the ceiling now their new ground.

Shane's sharp eyes watched as I-X moved, his acrobatic power and lethal bloodlust almost made his mind go blank at potential angles and moves he could use to fight against him. There was no time to think, just react, and all he could have done in this very moment was to parry the swift yet strike from I-X.

He could feel the burning heat from I-X's disc coming into contact with his own. Every time their discs clashed together, Shane felt a spark and not in the sense from his own being hit, it was like every deliberate strike from I-X sent a vibration through his bones, the danger warnings were flashing within his visor, telling him to retreat. But he couldn't, there was nowhere to run to but his own derezzing. A sense of cold dread started to grow inside of him.

This momentary distraction was a fatal error on Shane's part, he shouldn't have been careless to let his mind wander off knowing that I-X is currently unstoppable. On the grid, a millicycle of a stutter could determine life or reset. Sensing Shane's hesitation, I-X spun for momentum to throw his disc into the glass floor beneath Shane's feet. It was like witnessing the moment in slow motion as Shane stared in stunned horror as the glass shattered making him slip down.

But with luck, he manages to catch himself by clinging to the edge, preventing his fall towards the fan blades below them. He manages to pull himself up from the hole while attempting to deflect more of I-X's hits. The hole self-sealed behind him, but Shane barely got a moment to catch up before I-X launched both of his discs at the same time toward him.

Shane blocked the first disc, narrowly missing his cheek, but the second one sliced right through him.

<div class="system-broadcast">
  <div class="broadcast-header">
    <span class="broadcast-icon">💀</span>
    <span class="broadcast-origin">ARENA CONTROL :: VITAL STATUS</span>
    <span class="broadcast-priority">CRITICAL</span>
  </div>
  
  <div class="message-header">
    <span class="msg-type">COMBATANT STATUS UPDATE</span>
    <span class="msg-id">VST-24-DERZ</span>
  </div>
  
  <div class="message-body">
    <strong>PLAYER-24 [SHANE]:</strong> INTEGRITY FAILURE DETECTED<br/>
    STATUS: DEREZZED → RESET PROTOCOL INITIATED
  </div>
  
  <div class="broadcast-footer">
    <span class="broadcast-time">15:47:23</span>
    <span class="broadcast-status">CONFIRMED</span>
  </div>
</div>

The crowd cheered like lunatics, drowning out the sound of his own defeated scream of pain. The impact not only hurt but he could feel his vision dissipate without another second to process it. His code failed to prevent the execution and the last thing he saw before he shattered into a pile of voxels was I-X standing tall before him. But not in a stance one may believe that it belonged to a victor, no… his body went rigid, almost as if, in fear. Like he was guilty.

I-X let out a restrained sound – not the usual growl or screeching, but a series of clicking and whirring, like a morse code. But it was too late for Shane to even process that.

<div class="system-broadcast">
  <div class="broadcast-header">
    <span class="broadcast-icon">🏆</span>
    <span class="broadcast-origin">ARENA CONTROL :: MATCH RESULTS</span>
    <span class="broadcast-priority">FINAL</span>
  </div>
  
  <div class="message-header">
    <span class="msg-type">VICTORY DECLARATION</span>
    <span class="msg-id">MTR-IX-WIN</span>
  </div>
  
  <div class="message-body">
    <strong>MATCH CONCLUDED:</strong> COMPETITOR I-X VICTORIOUS<br/>
    OPPONENT ELIMINATED → ARENA SECURED
  </div>
  
  <div class="broadcast-footer">
    <span class="broadcast-time">15:47:31</span>
    <span class="broadcast-status">ARCHIVED</span>
  </div>
</div>

<div class="hud-critical">
  <div class="error-header">
    <span class="error-icon">⚠</span>
    <span class="error-title">CRITICAL SYSTEM FAILURE</span>
    <span class="error-code">ERR-IX-113</span>
  </div>
  
  <div class="error-message">DATA CORRUPTION DETECTED</div>
  
  <div class="system-status">
    <div class="status-line"><span class="label">SYSTEM:</span><span class="value error">UNSTABLE</span></div>
    <div class="status-line"><span class="label">INTEGRITY:</span><span class="value critical">0%</span></div>
    <div class="status-line"><span class="label">MEMORY:</span><span class="value warning">FRAGMENTED</span></div>
  </div>
  
  <div class="stack-trace">
    <div class="trace-header">STACK TRACE:</div>
    <div class="trace-line">→ StackOverflowError at grid.core.combat()</div>
    <div class="trace-line">→ UnhandledPromiseRejection in disc.battle.exe</div>
    <div class="trace-line">→ Segmentation fault (core dumped)</div>
  </div>
  
  <div class="emergency-action">
    <div class="countdown-wrapper">
      <span class="action-label">EMERGENCY REBOOT</span>
      <span class="countdown-timer" id="reboot-countdown">00:03</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" id="reboot-progress"></div>
    </div>
  </div>
  
  <script>
    (function() {
      const countdownEl = document.getElementById('reboot-countdown');
      const progressEl = document.getElementById('reboot-progress');
      if (!countdownEl || !progressEl) return;
      
      let timeLeft = 3;
      
      const updateDisplay = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownEl.textContent = \`\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`;
        
        const progressPercent = ((3 - timeLeft) / 3) * 100;
        progressEl.style.width = \`\${progressPercent}%\`;
        
        if (timeLeft <= 0) {
          countdownEl.textContent = '00:00';
          countdownEl.style.color = '#ff0000';
          countdownEl.style.animation = 'critical-flash 0.1s infinite';
          progressEl.style.width = '100%';
          progressEl.style.background = 'linear-gradient(90deg, #ff0000, #ffffff, #ff0000)';
        }
      };
      
      const countdown = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft < 0) {
          clearInterval(countdown);
        }
      }, 1000);
      
      updateDisplay();
    })();
  </script>
</div>

A loud gasp was ripped from Shane's throat as he woke up in the center of the suiting chamber, violently forced back into a new loop. Loud chanting echoed above him, reverberating within the empty chamber. His identity disc back on him, and before him was a simple table with one singular baton. Then a cold sweat broke out on him, the one game he never could win. Light cycle battle. The dread settled over him like a secondary armor, weak and penetrable.

Shane detached himself from the dock, with legs feeling like tungsten he walked towards the table, his hand hesitantly reaching out to take the baton. But a sudden sharp pain bloomed across his chest. His outstretched hand instinctively, retracted to feel the area of pain, trying to soothe it away. There shouldn't have been any phantom pain when awoken from a derezzing, something was wrong. Then his head pounded as memories of I-X, standing before him like he was guilty, like he was afraid. Then the clicking replayed in his mind. What did that even mean?

His helmet engaged and he looked at the hud flashing in his visor as he attempted to decipher the code.

<div class="hud-white">

  <p>
    <span class="hud-label">... .- ...- . </span> 
    <span class="hud-value">-- .</span>
  </p>
  <p>
    <span class="hud-label">..   .- -- </span> 
    <span class="hud-value"> ... --- .-. .-. -.--</span>
  </p>

</div>

"Why?" Shane whispered to himself. Why was I-X begging to be saved? Why was he sorry? Confusion filled in between his thoughts, he couldn't afford to stall for time now. Shaking it off, he picked up the baton, its circuitry started to glow white, matching his suit, then the platform beneath his feet rose up.

Emerging from the underground, the crowd both booed and cheered loud. Shane turned his head to his right, feeling the threatening yet familiar heat. I-X stood in all of his monstrous glory all packaged under that black and red. Despite being unable to see his face, Shane could somehow feel those eyes hidden behind the black visor staring back at him briefly before averting away.

Before Shane could even process that fact, I-X was already taking off running with his team. Shane glanced at his fellow programs behind him, his team and commerades, all in a glorious blue or white. Giving them one reassuring nod that he would lead, he turned back around and started running in the same direction I-X went, boots thumping on the glass floor, he made the major leap into the air and pulled apart the baton.

The schematic of his bike formed then materialized around his body, landing with a heavy thud as his engine roared loud, speeding down the tracks of the area's grid. The thrum of his steady engine changed the pulse of his own code, steady and strong. His teammates split to focus on the other team's players, he could hear the first impact making his teeth clench. One red player down, 6 more to go.

He glanced at I-X, the monster locked onto him already, not good. To get a better advantage, Shane took a sharp turn to exit the main ground by taking a spiral track downward. His bike reaching a terminal velocity, the track beeped with every pass through a speed powerup. Shane glanced up through the glass floor above and spotted I-X racing to get towards him. When he refocused in front a red bike with their activated light ribbon was speeding up to attempt to get him to crash.

With his current speed, he just might, but Shane gritted his jaw and sped up faster, he had to be precise. Activating his own light ribbon, a tail of white behind his bike glowed brightly. His speed reached the limit but Shane pushed for it and right before he could crash into his opponent he swerved sharply. The bike scratches the glass with an agitating sound as he manages to get the opponent to hit his own ribbon. Mechanical screams echoed out as the player shattered into voxels. The crowd went wild.

"FUCK! Let's go!" Shane cheered himself anxiously under his breath. These races were never his caliber, it was the only game that he could only try to narrowly avoid dying to. And yet he managed to risk everything to get his first elimination. As Shane gripped his handle bars, leaning his body to make a sharp turn, I-X had to be somewhere. The arena is covered in red, white and blue ribbons, screams of opponents and his team mates crashing and derezzing. The scene was almost blinding and he started to realize he was hyperventilating, panicking all the while avoiding I-X's ribbon.

Looking over his shoulder, he decided now he needed to get onto the high ground. With a sharp screeching u-turn, Shane took the nearest ramp back up to the main floor of the arena. With his current velocity on the bike, it ended up launching him high off the ground, he looked below him, spotting I-X impending approach towards him.

I-X watched the dazzling and pretty white ribbon of Shane's bike from high above him. He was in awe at the sight. Shane landed harshly, cracking the ground with a sickening crunch. No sooner the surface was slowly mending itself as Shane redirected himself around to face towards I-X, detaching his identity disc he was preparing to throw with the nimbus engaged, but I-X was faster and quicker. A silver streak of bright red, almost imperceptible to his own eyes if it weren't for the fact that his disc was supposed to be white light… there shouldn't be [red].

The AI… it somehow had begun its infection on his code. It was just a tiny fragment of it, a fragment of I-X, that somehow lodged deep. Shane looked at I-X in horror, then behind his bike, there were strands of red in the once pure white.

I-X saw it too. He thought it was pretty, Shane was mortified. Something has changed, the system is alive in a way that it is hungry, starving, and waiting for the perfect moment to devour everything…`,
};

export default chapter1;