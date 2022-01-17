const puppeteer = require('puppeteer');
const { PendingXHR } = require('pending-xhr-puppeteer');
process.env.NTBA_FIX_319 = 1;
process.env["NTBA_FIX_350"] = 1;
const TelegramBot = require('node-telegram-bot-api');
let chatId = '821592272';
let chatIds = '-1001423587135';
const token = '1166886043:AAEeJlJl7r8y1i_ivKqk5HYFC3mFu61OhgA';
const telegram = new TelegramBot(token, {polling: false});


var accountSid = 'ACeb0609414529d7fd65662335a9203501';
var authToken = '4cbccc7ad915250836f846a3aeb8dcb6'; // Tu Auth Token
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

var fs = require('fs');
var usuarioss = [
	{
		"user":"lorenaad00@gmail.com",
		"pass":"Lorena@mexico00",
		"pasp":"J598717"
	},
    {
		"user":"marcelaiturriav00@gmail.com",
		"pass":"Marcela@mexico00",
		"pasp":"L327713"
	},
    {
		"user":"delvislab97@gmail.com",
		"pass":"Delvis@mexico97",
		"pasp":"L347425"
	},
    {
		"user":"damisyta70@gmail.com",
		"pass":"Damisy@mexico00",
		"pasp":"J023991"
	},
    {
		"user":"marbelisgg86@gmail.com",
		"pass":"Marbelis@mexico86",
		"pasp":"K513174"
	},
    {
		"user":"rocioaer96@gmail.com",
		"pass":"Rocioalba@mexico96",
		"pasp":"J869930"
    },
    
	{
		"user":"yuniorlopezg91@gmail.com",
		"pass":"Yunior@mexico91",
		"pasp":"K788928"
	},

];

(async () => {

	const browser = await puppeteer.launch({
		slowMo: 0,
		headless: true,
		defaultViewport: { width: 1366, height: 768 },
		args:['--disable-dev-shm-usage','--no-sandbox']
	});

	
	const page = await browser.newPage();
	let element, formElement, tabs;
	
	////SYLAR START
	var  existpng = 0;
    //// END
	for (key in usuarioss) {
					        
			////SYLAR START
		    const path = './'+usuarioss[key].user + '.png';
			if (fs.existsSync(path)) {                        
				existpng = 1;				
			  }
			  else
			  {
				existpng = 0;
			  } 

			if(existpng === 0)
			{
			////// END

					await page.goto('https://mexitelcuba.sre.gob.mx/auth/', { waitUntil : "networkidle2"} );

					try {
							//EScribiendo el Usuario
							console.info('  -LOGIN ' + usuarioss[key].user);
							await page.waitForSelector('#emil');
							await page.type('#emil', usuarioss[key].user);
				
							//Escribiendo la contraseña
							console.info('  -Escribiendo password');
							await page.waitForSelector('#password');
							await page.type('#password', usuarioss[key].pass);
				
							//Entrando a la cuenta
							console.info('  -Dando en ingresar');
							await page.waitForSelector('button[type="submit"]');
                            await page.click('button[type="submit"]');
				
							/*//Rectificando cuenta si hay error
							await page.waitForTimeout(1000);
							const [aceptar] = await page.$x('//button[contains(.,"Aceptar")]');
							if (aceptar) {
								telegram.sendMessage( chatId ,"Cuenta Abierta Cerrando Sesion " + usuarioss[key].user );
								await page.waitForTimeout(200);
								console.info('  -Rectificando cuenta abierta ');
								await aceptar.click();
								await page.waitForTimeout(5200);
								console.info('  -LOGIN ' + usuarioss[key].user);
								telegram.sendMessage( chatId ,"No se preocupe su cuenta a sido cerrada " + usuarioss[key].user );
								await page.waitForSelector('button[type="submit"]');
                                await page.click('button[type="submit"]');	
							}
							*/
                           //Programar
						   await page.waitForTimeout(200);                            
						   const  programar = await page.waitForXPath("//button[contains(., 'Programar')]");                            
						   await programar.click();
						   await page.waitForResponse(response => response.url().includes('/api/v1/event') && response.status() === 200)
						   console.info('  -Programar');
						   
						   //Siguiente
						   //await page.waitForTimeout(600);
						   const  buttonSig = await page.waitForXPath("//button[contains(., 'Siguiente')]");
						   await buttonSig.click();
						   await page.waitForResponse(response => response.url().includes('/api/v1/procedures') && response.status() === 200)
						   console.info('  -Siguiente');

						   //Tramite             
						   //await page.waitForTimeout(700);
						   const  tramite = await page.waitForXPath("//input[@placeholder='Selecciona trámite']");
						   //await page.waitForTimeout(500);
						   await tramite.click();
						   //await page.waitForTimeout(500);
						   console.info('  -Desplegando Tramite');
						   await page.keyboard.type('Visa sin');
						   await page.keyboard.press('Enter');
						   await page.waitForResponse(response => response.url().includes('/api/v1/procedures/2/types') && response.status() === 200)
						   console.info('  -Se Escogio Sin Permiso del Inm');

						   //Tipo de Tramite
						   //await page.waitForTimeout(500);
						   const  tipotramite = await page.waitForXPath("//input[@placeholder='Selecciona trámite']");
						   //await page.waitForTimeout(500);
						   await tipotramite.click();
						   await page.waitForTimeout(200);
						   console.info('  -Desplegando Tipo de Tramite');
						   await page.keyboard.type('Visa tu');
						   await page.keyboard.press('Enter');
						   console.info('  -Se Escogio Turismo Y Transito');

						   //Pasaporte
						   await page.waitForTimeout(100);  
						   await page.waitForSelector('#no_passport');
						   await page.click('#no_passport');
						   console.info('  -Di clic en pasaporte');
						   await page.keyboard.type(usuarioss[key].pasp);
						   console.info('  -Se Escribio el Pasaporte');
				
							//Solicitando cita
							await page.waitForTimeout(200);
                            const  agendar = await page.waitForXPath("//button[contains(., 'Solicitar')]");
                            await agendar.click();
							
							//Sino hay citas disponibles
							await page.waitForTimeout(500);
							console.info('  -Cita Solicitada - esperando resultado');
							const [resultado] = await page.$x('/html/body/div[2]/div/div[2]/div/div[2]/div[1]');
							if (resultado){
								console.info(await page.evaluate(resultado => resultado.textContent, resultado));
								telegram.sendMessage( chatId ,(await page.evaluate(resultado => resultado.textContent, resultado) ) + "\n" +   usuarioss[key].user );
							}

							//Obteniendo resultados si hay citas
							await page.waitForTimeout(1000);
							const [haycitas]  = await page.$x('//button[contains(.,"Aceptar")]');
							if (haycitas) {
								await page.screenshot({ path: usuarioss[key].user + '.png', fullPage: true });
								bot.sendPhoto( chatId , usuarioss[key].user + '.png' );
								await haycitas.click();
								console.info('  -Cerrando ticket de cita agendada');

								telegram.sendMessage( chatId ,"Su cita fue agendada de manera exitosa - " + usuarioss[key].user );
								telegram.sendMessage( chatIds , "🎯 🔜 🇲🇽 Citas de Mexico Disponibles 🇲🇽  🔚 🎯");
								client.messages.create({
									body: 'SU PRIMERA CITA FUE AGENDADA . MEXICO ABRIO CORREEE',
									to: '+5353114362', // Número al que se enviará el SMS
									from: '+18166084915' // Número comprado de Twilio
								})
								.then((message) => console.log(message.sid));
							}

							
							//await page.waitForTimeout(20000);// """""""""""""""""""""""""""""AQUIIIIIIIIIIIIIIII NOOOOOOOOO"
							//Siempre cerrando Sesion , sea cual sea el resultado 
							//await page.waitForTimeout(1000);
							await page.waitForXPath('//a[contains(.,"Cerrar")]');
							const [cerrar] = await page.$x('//a[contains(.,"Cerrar")]');
							await page.waitForTimeout(200);
							if (cerrar) await cerrar.click();
							console.info('  -Siempre cerrando Sesion , sea cual sea el resultado ');
							await page.waitForTimeout(1000);// """""""""""""""""""2000
						}
				
							//Cerrando sesion en caso de que halla algun error
							catch (error) {
								const [cerrar] = await page.$x('//a[contains(.,"Cerrar")]');
								await page.waitForTimeout(1000);
								if (cerrar) await cerrar.click();
								console.info('  -Cerramos sesion de forma inesperada en ' + usuarioss[key].user );
								telegram.sendMessage( chatId ,"Cerramos sesion de forma inesperada en " + usuarioss[key].user );
								await page.waitForTimeout(1000);// """""""""""""""""""""""2000
							}

			////SYLAR START
			}
			else
			{
				//console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');  
				console.log('El usuario: '+ usuarioss[key].user+' Ya tiene cita agendada');
				telegram.sendMessage( chatId ,'El usuario: '+ usuarioss[key].user +' Ya tiene cita agendada');
				//console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
			} 
			////END
		
        }

        await browser.close();
        process.exit(1);
    })();
