module.exports = {
  name: 'Total',
  module(jaffamod) {
    jaffamod.registerCommand('total', (message, reply, discord) => {
      // Only run during JingleJam + first week of January
      if (jaffamod.utils.isJingleJamExt()) {
        jaffamod.api.get('https://jinglejam.yogscast.com/api/total').then(res => {
          // Validate the response from API
          if (!res || !res.data || !res.data.formatted_total) {
            console.error(`Couldn't run total command, got bad data`, res.data);
            throw new Error(); // Force ourselves into the catch block
          }

          // Get the year, accounting for being in January
          const d = new Date();
          const year = d.getMonth() === 11 ? d.getFullYear() : d.getFullYear() - 1;

          // Message time
          reply(`We've raised ${jaffamod.utils.getBold(`$${res.data.formatted_total}`, discord)} for charity during Jingle Jam ${year} so far! Donate now at ${jaffamod.utils.getLink('https://humble.com/yogs', discord)}`);
        })
          .catch(() => {
            // Web request failed or returned invalid data
            reply(`The total amount couldn't be determined. ${jaffamod.utils.getEmote('yogP3', discord)} Please try again later.`);
          });
      } else {
        // Not currently the best time of the year :(
        reply(`It's not currently Jingle Jam time. ${jaffamod.utils.getEmote('yogP3', discord)} We look forward to seeing you in December to raise more money for charity once again!`);
      }
    });
  }
};
