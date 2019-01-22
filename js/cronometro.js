(function(){

	'use strict';

	//variables
	let act;
	let run;
	let t2;
	let cont = 0;
	let t = new Date('1970-01-01T00:01:00+01:00');

	//DOM
	const HTML = document.documentElement;
	HTML.setAttribute('class','h-100');
	
	const BODY = document.getElementsByTagName('BODY')[0];
	BODY.setAttribute('class','h-100');

		const CONTAINER = document.createElement('DIV');
		CONTAINER.setAttribute('class','container-fluid bg-dark py-4 h-100');
		
		const TITLE = document.createElement('H4');
		TITLE.setAttribute('class','text-center text-muted font-italic m-0');
			const TITLETXT = document.createTextNode('Kronos');
			TITLE.appendChild(TITLETXT);

		const VISTA = document.createElement('DIV');
		VISTA.setAttribute('class', 'col-10 col-sm-6 col-md-4 col-xl-3 mx-auto mt-5 mb-5');

			const SCRN = document.createElement('H1');
			SCRN.setAttribute('class', 'text-center text-white d-flex justify-content-center');

				const SCRNHR = document.createElement('SPAN');  
				SCRNHR.setAttribute('id','horas');
				SCRNHR.setAttribute('class','w-25');
				
				const s1 = document.createElement('SPAN');
					const s1Txt = document.createTextNode(':');
					s1.appendChild(s1Txt);

				const SCRNMN = document.createElement('SPAN');  
				SCRNMN.setAttribute('id','minutos');
				SCRNMN.setAttribute('class','w-25');

				const s2 = document.createElement('SPAN');
					const s2Txt = document.createTextNode(':');
					s2.appendChild(s2Txt);

				const SCRNSG = document.createElement('SPAN');
				SCRNSG.setAttribute('id','segundos');
				SCRNSG.setAttribute('class','w-25');  
				
				const s3 = document.createElement('SPAN');
					const s3Txt = document.createTextNode(':');
					s3.appendChild(s3Txt);

				const SCRNMS = document.createElement('SPAN');
				SCRNMS.setAttribute('id','milisegundos');
				SCRNMS.setAttribute('class','w-25');

				SCRN.appendChild(SCRNHR);
				SCRN.appendChild(s1);
				SCRN.appendChild(SCRNMN);
				SCRN.appendChild(s2);
				SCRN.appendChild(SCRNSG);
				SCRN.appendChild(s3);
				SCRN.appendChild(SCRNMS);

			VISTA.appendChild(SCRN);

		const CTRLS = document.createElement('DIV');
		CTRLS.setAttribute('class', 'form-group col-12 col-sm-10 offset-sm-1 mt-3 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-1')

			const BTNS = document.createElement('DIV');
			BTNS.setAttribute('class', 'btn-group my-1 d-flex');
			BTNS.setAttribute('role', 'group');
			

				const BTNMAS = document.createElement('BUTTON');
				BTNMAS.setAttribute('class', 'btn btn-success w-50');
				BTNMAS.addEventListener('mousedown', modTime);
					const TXTBTNMAS = document.createTextNode('+');
					BTNMAS.appendChild(TXTBTNMAS);
				
				const BTNMENOS = document.createElement('BUTTON');
				BTNMENOS.setAttribute('class', 'btn btn-danger w-50');
				BTNMENOS.addEventListener('click', modTime);
					const TXTBTNMENOS = document.createTextNode('-');
					BTNMENOS.appendChild(TXTBTNMENOS);

				BTNS.appendChild(BTNMAS);
				BTNS.appendChild(BTNMENOS);

			const BTNSTARTSTOP = document.createElement('BUTTON');
			BTNSTARTSTOP.setAttribute('class', 'btn btn-outline-light btn-block mt-2');
			BTNSTARTSTOP.addEventListener('click', startStop);
				const TXTBTNSTARTSTOP = document.createTextNode('INICIAR');
				BTNSTARTSTOP.appendChild(TXTBTNSTARTSTOP);
			
			const BTNRESET = document.createElement('BUTTON');
			BTNRESET.setAttribute('class', 'btn btn-outline-light btn-block mt-2');
			BTNRESET.addEventListener('click', reset);
				const TXTBTNRESET = document.createTextNode('REINICIAR');
				BTNRESET.appendChild(TXTBTNRESET);

			CTRLS.appendChild(BTNS);
			CTRLS.appendChild(BTNSTARTSTOP);
			CTRLS.appendChild(BTNRESET);

		CONTAINER.appendChild(TITLE);
	 	CONTAINER.appendChild(VISTA);
	 	CONTAINER.appendChild(CTRLS);

		const AUDIO = document.createElement('AUDIO');
			const SOURCE = document.createElement('SOURCE');
			SOURCE.setAttribute('type','audio/wav');
			SOURCE.setAttribute('src','audio/ding.wav');
			SOURCE.setAttribute('preload','auto');

		AUDIO.appendChild(SOURCE);

 	BODY.appendChild(CONTAINER);
 	BODY.appendChild(AUDIO);
	
 	status(0);
 	formatTime();

 	//functions
 	const AUDIOSTART = () => AUDIO.play();

 	function startStop(){

 		cont++;
 		clearActive();
 		cont == 1 ? AUDIOSTART() : '';

 		if(t2){

 			t.setMilliseconds(t2.getMilliseconds());
 			t.setSeconds(t2.getSeconds());
 			t.setMinutes(t2.getMinutes());
 			t.setHours(t2.getHours());

 		}

 		if(cont%2 != 0 ){

 			status(1);

 			run = setInterval(() => {
 				if(t.getHours()==0 && t.getMinutes()==0 && t.getSeconds()==0 && t.getMilliseconds()==0){

 					AUDIOSTART();
 					reset();

 				}else{

 					t.setMilliseconds(t.getMilliseconds()-10);
 					if(t.getMilliseconds() < 0){
 						t.setSeconds(t.getSeconds()-1);
 						if(t.getSeconds() < 0){
 							t.setMinutes(t.getMinutes()-1);
 							if(t.getMinutes() < 0){
 								t.setHours(t.getHours()-1);
 							}
 						}
 					}

 					formatTime();

 				}
 			},10);

 		}else{

 			status(2);
 			clearInterval(run);

 		}

 	}

 	function reset(){

 		cont = 0;
 		run ? clearInterval(run) : '';
 		t2 ? (
 			t.setMilliseconds(t2.getMilliseconds()),
 			t.setSeconds(t2.getSeconds()),
 			t.setMinutes(t2.getMinutes()),
 			t.setHours(t2.getHours())
 			) : t = new Date('1970-01-01T00:01:00+01:00');

 		status(0);
 		clearActive();
 		formatTime();

 	}

 	function modTime(){	

 		act.setAttribute('class','text-warning w-25');

 		const OPT = act.getAttribute('id');
 		const METHOD = this.textContent;

 		switch(OPT){

 			case 'milisegundos':
 			METHOD == '+' ?	(
			t.setMilliseconds(t.getMilliseconds()+10)
			) : (
			t.setMilliseconds(t.getMilliseconds()-10)
			);
			break;

			case 'segundos':
			METHOD == '+' ?	(
			t.setSeconds(t.getSeconds()+1)
			) : (
			t.setSeconds(t.getSeconds()-1)
			);
			break;

			case 'horas':
			METHOD == '+' ?	(
			t.setHours(t.getHours()+1)
			) : (
			t.setHours(t.getHours()-1)
			);
			break;

			default:
			METHOD == '+' ?	(
			t.setMinutes(t.getMinutes()+1)
			) : (
			t.setMinutes(t.getMinutes()-1)
			);
			
		}

		let ms = t.getMilliseconds();
		let sg = t.getSeconds();
		let mn = t.getMinutes();
		let hr = t.getHours();

		ms < 10 || ms == 0 ? ms = '0'+ms : ms = ms.toString();
		sg < 10 || sg == 0 ? sg = '0'+sg : sg = sg.toString();		
		mn < 10 || mn == 0 ? mn = '0'+mn : mn = mn.toString();		
		hr < 10 || hr == 0 ? hr = '0'+hr : hr = hr.toString();

		t2 = new Date (`1970-01-01T${hr}:${mn}:${sg}+01:00`);
		t2.setMilliseconds(ms);

		formatTime();

	}

	function formatTime(){

		let tms = t.getMilliseconds()/10;
		let tsg = t.getSeconds();
		let tmn = t.getMinutes();
		let thr = t.getHours();

		tms < 10 || tms == 0 ? tms = '0'+tms : tms = tms.toString();
		tsg < 10 || tsg == 0 ? tsg = '0'+tsg : tsg = tsg.toString();		
		tmn < 10 || tmn == 0 ? tmn = '0'+tmn : tmn = tmn.toString();		
		thr < 10 || thr == 0 ? thr = '0'+thr : thr = thr.toString();

		SCRNHR.textContent = thr;
		SCRNMN.textContent = tmn;
		SCRNSG.textContent = tsg;
		SCRNMS.textContent = tms;

	}

	function modActive(){

		clearActive();

		act = this;
		this.setAttribute('class','text-warning w-25');

	}

	function clearActive(){

		if(act != undefined){
			act.removeAttribute('class','text-warning');
			act.setAttribute('class','w-25');
		}

	}

	function status(s){

		if(s == 0){

			act = SCRNMN;
			BTNMAS.disabled = false;
			BTNMENOS.disabled = false;
			BTNRESET.disabled = false;
			BTNSTARTSTOP.textContent = 'INICIAR';
			SCRNMS.addEventListener('click', modActive);
			SCRNSG.addEventListener('click', modActive);
			SCRNMN.addEventListener('click', modActive);
			SCRNHR.addEventListener('click', modActive);

		}else if (s == 1){

			BTNMAS.disabled = true;
			BTNMENOS.disabled = true;
			BTNRESET.disabled = true;
			BTNSTARTSTOP.textContent = 'PAUSAR';
			SCRNMS.removeEventListener('click', modActive);
			SCRNSG.removeEventListener('click', modActive);
			SCRNMN.removeEventListener('click', modActive);
			SCRNHR.removeEventListener('click', modActive);

		}else if (s == 2){

			BTNMAS.disabled = true;
			BTNMENOS.disabled = true;
			BTNRESET.disabled = false;
			BTNSTARTSTOP.textContent = 'INICIAR';
			SCRNMS.removeEventListener('click', modActive);
			SCRNSG.removeEventListener('click', modActive);
			SCRNMN.removeEventListener('click', modActive);
			SCRNHR.removeEventListener('click', modActive);

		}

	}

}())
