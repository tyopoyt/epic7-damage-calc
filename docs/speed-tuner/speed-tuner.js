const resolve = () => {
    const slowerUnitSpeed = Number(document.getElementById('slow-unit-speed').value);
    const fasterUnitSpeed = Number(document.getElementById('fast-unit-speed').value);
    const slowerUnitPush = Number(document.getElementById('slow-unit-push').value);
    const fasterUnitPush = Number(document.getElementById('fast-unit-push').value);
    const fasterUnitTurns = Number(document.getElementById('fast-unit-turns').value);
    
    /* 
     * FORMULA: fast Speed = slow Speed * fast CR / slow CR
     *
     * 0.95 used as base for slowerUnitCR to ensure that in the worst case (slow unit +5% CR, fast unit +0% CR)
     * the turn order will still hold 100% of the time
     */ 
    const slowerUnitCR = 0.95 - (slowerUnitPush / 100);
    const fasterUnitCR = (1 * fasterUnitTurns) - (fasterUnitPush / 100);
    const CRRatio = fasterUnitCR / slowerUnitCR;

    // take the floor of max speed and ceil of min speed for safety since we can't have fractional speed
    const slowUnitMaxSpeed = Math.max(Math.floor(fasterUnitSpeed / CRRatio), 0);
    const fastUnitMinSpeed =  Math.max(Math.ceil(slowerUnitSpeed * CRRatio), 0);

    // TODO: implement suggestion box
    let recommendation = '';
  
    document.getElementById('slow-max-speed').innerText = slowUnitMaxSpeed.toString();
    document.getElementById('fast-min-speed').innerText = fastUnitMinSpeed.toString();
    document.getElementById('recommendation').innerText = recommendation;
  }