# Veilbound

Play: https://kurokirishiki.github.io/veilbound-survivors/

Version 5: twenty themed animated enemies, stronger bosses with rage patterns, active skills (Space or touch button), four upgrade rarities, weapon audio and procedural background music, richer terrain, worlds every 10,000 points. Horde grows by stage and every five character levels, capped at 300 enemies for device performance.

Offline: first open online and wait for the ready indicator. All code, JSON, sprites and synthesized audio are local and cached by the service worker. Browser cache removal requires another online visit. Co-op requires an external server and remains unconfigured on Pages.

Audio starts after interaction; effects and music volumes are separate. Old saves retain their score and current location; subsequent thresholds use 10,000 points.

При каждом обновлении добавлять описание изменений в патчноут главного меню (index.html), обновлять версию ресурсов и офлайн-кэша. Правила 1.10: два уникальных босса на локацию, появления на 3000/9000 очков; переход при убийстве второго босса после достижения 10000 очков.


## 1.14 — Chrome and moonblood
Six heroes. David uses a rapid-fire cyber pistol and a four-second enemy time stop. Lyra transforms for eight seconds (damage ×1.9, speed ×1.35, incoming damage ×0.65); her cooldown starts on return. Contact damage ×1.05. Area enemies are limited to two, weighted lower, and share a 1.8-second attack spacing. Touch action buttons use pointerdown independently of the movement finger. All artwork and sound remain local.
