 const seizure1 = document.querySelector(".enterSeizure1")//input text saisie1
 const seizure2 = document.querySelector(".enterSeizure2")//input text saisie2
 const seizure3 = document.querySelector(".enterSeizure3")//input text saisie3
 const seizure4 = document.querySelector(".enterSeizure4")//input text saisie4
 const leftBlock = document.querySelector("#leftBlock")//le block de gauche dans résultat (welcome + IBM)
 const welcome = document.querySelector("#welcome")// "welcome titre"
 const bmiResult = document.querySelector("#bmiResult")// affichafe resultat IBM
 const bmiExplication = document.querySelector("#bmiExplication")// explications du resultat IBM
 const formBox = document.querySelector(".data")//partie formulaire
 const dataEntry2 = document.querySelector(".dataEntry2")// formulaire pour imperial
 const presentationBox =  document.querySelector(".presentation")//bloc de presentation
 const metricButton = document.querySelector("#metric")//boutton metric
 const imperialButton = document.querySelector("#imperial")//bouton imperial
 const changeValueHeight = document.querySelector("#heightValue1")
 const changeValueWeight = document.querySelector("#weightValue2")
 const textWeight = document.querySelector(".weight")
 let heightValue = 0 // valeur entré au clavier pour taille
 let weightValue = 0// valeur entré au clavier pour poid
 let ftValue = 0
 let inValue = 0
 let stValue = 0
 let lbsValue = 0
 
 

 window.addEventListener("load", function() {
  metricButton.click();
});

metricButton.addEventListener("click",()=>{//active le mode metric

  imperialButton.style.backgroundColor = "white" // fond blanc
  metricButton.style.backgroundColor = "#345FF6"// fond bleu
  dataEntry2.style.display ="none"// fait disparaitre le form imperial
  formBox.style.height = "484px"// réajuste la hauteur du formulaire
  changeValueHeight.innerHTML = "cm"//change la valeur ft
  changeValueWeight.innerHTML = "kg"// change la valeur in
  textWeight.innerHTML = "weight"

    seizure1.addEventListener("keyup",() =>{ 
      heightValue = parseInt(seizure1.value)
      displayResult(weightValue,heightValue)
    }) 
    
    seizure2.addEventListener("keyup",() =>{
      weightValue = parseInt(seizure2.value)
      displayResult(weightValue,heightValue)
    })
})



imperialButton.addEventListener("click",() =>{//active le mode imperial

  metricButton.style.backgroundColor ="white"//bouton metric repasse au blanc
  imperialButton.style.backgroundColor = "#345FF6"// bouton imperial en bleu
  dataEntry2.style.display = "flex"//montre le formulaire imperial
  formBox.style.height = "590px"// alonge le formulaire pour imperial
  changeValueHeight.innerHTML = "ft"//change la valeur cm
  changeValueWeight.innerHTML = "in"// change la valeur kg
  textWeight.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;"

  seizure1.addEventListener("keyup",() =>{ 
    ftValue = parseInt(seizure1.value)//définie la varibale ft
    if(ftValue>0 && inValue>0)
    heightValue = ImperialEnMetres(ftValue,inValue)//met la somme des valeurs en mètres dans la variable
    displayResult(weightValue,heightValue)
  })  
  seizure2.addEventListener("keyup",() =>{
    inValue = parseInt(seizure2.value)//définie la varibale in
    if(ftValue>0 && inValue>0)
    heightValue = ImperialEnMetres(ftValue,inValue)//met la somme des valeurs en mètres dans la variable
    displayResult(weightValue,heightValue)
  })
  seizure3.addEventListener("keyup",() =>{
    stValue = parseInt(seizure3.value)//définie la varibale st
    if(stValue>0 && lbsValue>0)
    weightValue = ImperialEnKg(stValue,lbsValue)//met la somme des valeurs en kg dans la variable
    displayResult(weightValue,heightValue)
  })
  seizure4.addEventListener("keyup",() =>{
    lbsValue = parseInt(seizure4.value)//définie la varibale lbs
    if(stValue>0 && lbsValue>0)
    weightValue = ImperialEnKg(stValue,lbsValue)//met la somme des valeurs en kg dans la variable
    displayResult(weightValue,heightValue)
  })
})


/** 
 * 
 * fonction qui converti le système imperial en système métric 
 * 
 */

function ImperialEnMetres(a,b){
  let metres = ((a*30.48) + (b*2.54))
  return metres
}
function ImperialEnKg(c,d){
  let kg = (c*6.35)+(d/2.2)
  return kg
}

/**
 ****
 ******fonction qui calcul l'IDM metricselon les données entrés par l'utilisateur
 ****
 **/
function calculIdm(w,h){
   let calcul = (w) / ((h)/100)**2
   return calcul
}
/**
 ****
 ****** affiche les explication IBM appres les saisies entrés + permet d'afficher dans quel catégorie est l'utilisateur + ajouter l'explication à droite du resultat.
 ****
 **/

function ibmExplication(w,h,calcul){
  calcul = calculIdm(w,h)
  if(calcul<18.5){// underweight
    bmiExplication.innerHTML = `Your BMI suggests you’re a underweight. Your ideal weight is between ${Math.round(((h/100)**2 * 18.5)*10)/10}- ${Math.round(((h/100)**2 * 24.9)*10)/10} kgs.`
    bmiExplication.style.display = "block"
  }else if(calcul>=18.5 && calcul<= 24.9){//healthy weight
    bmiExplication.innerHTML = `Your BMI suggests you’re a healthy weight. Your ideal weight is between ${Math.round(((h/100)**2 * 18.5)*10)/10}- ${Math.round(((h/100)**2 * 24.9)*10)/10} kgs.`
    bmiExplication.style.display = "block"
  }else if (calcul>=25 && calcul<= 29.9){//overweight
    bmiExplication.innerHTML = `Your BMI suggests you’re a overweight. Your ideal weight is between ${Math.round(((h/100)**2 * 18.5)*10)/10}- ${Math.round(((h/100)**2 * 24.9)*10)/10} kgs.`
    bmiExplication.style.display = "block"
  }else {//obese
    bmiExplication.innerHTML = `Your BMI suggests you’re a obese. Your ideal weight is between ${Math.round(((h/100)**2 * 18.5)*10)/10}- ${Math.round(((h/100)**2 * 24.9)*10)/10} kgs.`
    bmiExplication.style.display = "block"
  }
}

/**
 * ***
 * *****affiche le resultat IBM + explications (block alignés)
 * ***
 */

 function displayResult(w,h,calcul){
  if (w> 0 && h > 0){
    bmiResult.innerHTML = `Your BMI is ...<br><font size = 48px;> ${(Math.round(calculIdm(w,h)*10) / 10)}</font>`
    leftBlock.style.width = "180px"
    welcome.style.display = "none"
    formBox.style.boxShadow = "59px 50px 10px rgb(163 186 219), 60px -15px 10px rgb(163 186 219)"
    presentationBox.style.background = "none"
    presentationBox.style.backgroundColor = "rgb(223, 241, 255)"
    presentationBox.style.boxShadow = "10px 15px 10px rgb(163 186 219)"
    ibmExplication(w,h,calcul) 
  }else{
    bmiResult.innerHTML = `<p>Saisie des valeurs en cours ...</p>` 
  }
}