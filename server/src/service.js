Minima.init(function(msg){

  //Minima.log("incentivecash server: " + msg.event)

  if ( msg.event == "miningstop" ) {

    if ( msg.info.transaction.outputs[0].mxaddress == "Mx6A66DH4HRCYJH4OT4VF474AEN5JZYF3M") {

      Minima.log("Incentivecash Server: " + msg.info.transaction.outputs[0].mxaddress + " just received " + msg.info.transaction.outputs[0].amount.toString() + " token(s)");
    }
  }
});
