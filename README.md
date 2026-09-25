# Cinder Ring

A 3D Warlock-style arena brawl that runs in the browser. Knock rival warlocks into the lava with 8 spells, buy upgrades between rounds, and be the last one standing.

**Play:** https://borabasol.github.io/cinder-ring/

Inspired by the classic *Warlock* custom map for Warcraft III. Built with three.js; everything else is a single `index.html`.

## Online play
- **Quick match** joins an open public room, or opens one if none is free (4 warlocks)
- **Create room** gives you a code and a link to share; the match starts by itself when the room is full
- The room's creator can also start early and fill empty seats with bots

Peer-to-peer over WebRTC (PeerJS). The room creator's browser runs the match, so they should keep the tab open and in front.

## Controls (desktop)
- Right-click (or tap) the ground to move
- Q W E R T A S D F cast spells toward the cursor
- Esc pauses, M toggles sound

## Controls (phone)
- Drag the left stick to walk
- Tap a spell to fire it at the nearest rival; drag it to aim and release to cast (drag back onto the button to cancel)
