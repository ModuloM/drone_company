/*eslint-disable semi, no-empty-label, no-undef, no-extra-semi, no-undef-expression, no-unused-params, no-use-before-define*/
const { publishInTopic } = require('./pubsubUtils');


exports.onDroneEventHttp = async (req, res) => {

  console.log(`receiving: ${JSON.stringify(req.body)}`);

  const droneEvent = req.body;

  if (!droneEvent && !droneEvent.event) {
    console.error('bad droneEvent received');
    res.status(500).send('bad droneEvent received');
    return;
  }

  let command = null;

  if (droneEvent.event === 'WAITING_FOR_COMMAND') {
    command = onWaitingForCommandEvent(droneEvent);
  } else if (droneEvent.event === 'PARCEL_DELIVERED') {
    command = onParcelDeliveredEvent(droneEvent);
  } else if (droneEvent.event === 'PARCEL_GRABBED') {
    command = onParcelGrabbedEvent(droneEvent);
  } else if (droneEvent.event === 'DESTINATION_REACHED') {
    command = onDestinationReachedEvent(droneEvent);
  } else if (droneEvent.event === 'MOVING') {
    command = onMovingEvent(droneEvent);
  }

  if (command !== null) {
  	await publishInTopic(JSON.stringify(command), 'projects/jbc-atl-sal-func-techevent/topics/drone-command');
  }


  res.send('ok');
};

function onWaitingForCommandEvent(droneEvent) {
  let command = null;

  /*
  example of a move command:

  command = {
    teamId: droneEvent.teamId,
    command: {
      name: 'MOVE',
      location: {
        latitude: x,
        longitude: y
      },
    }
  };
  */


  // write your code here

  return command;
}


function onParcelDeliveredEvent(droneEvent) {
  // write your code here
  return null;
}

function onParcelGrabbedEvent(droneEvent) {
  // write your code here
  return null;
}

function onDestinationReachedEvent(droneEvent) {
  // write your code here
  return null;
}

function onMovingEvent(droneEvent) {
  // write your code here
  return null;
}