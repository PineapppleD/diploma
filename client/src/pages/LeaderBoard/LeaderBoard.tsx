import React, { useEffect } from 'react';
import classes from './style.module.css'; // Import CSS styles

interface TeamMember {
  rank: number;
  name: string;
  handle: string;
  img: string;
  kudos: number;
  sent: number;
}

const LeaderBoard: React.FC = () => {
  useEffect(() => {
    const team: TeamMember[] = [{
      rank: 1,
      name: 'Lewis Hamilton',
      handle: 'lewishamilton',
      img: 'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png',
      kudos: 36,
      sent: 31 },
    {
      rank: 2,
      name: 'Kimi Raikkonen',
      handle: 'kimimatiasraikkonen',
      img: 'https://www.formula1.com/content/dam/fom-website/drivers/K/KIMRAI01_Kimi_R%C3%A4ikk%C3%B6nen/kimrai01.png.transform/2col-retina/image.png',
      kudos: 31,
      sent: 21 },
    {
      rank: 3,
      name: 'Sebastian Vettel',
      handle: 'vettelofficial',
      img: 'https://www.formula1.com/content/dam/fom-website/drivers/S/SEBVET01_Sebastian_Vettel/sebvet01.png.transform/2col-retina/image.png',
      kudos: 24,
      sent: 7 },
    {
      rank: 4,
      name: 'Max Verstappen',
      handle: 'maxverstappen1',
      img: 'https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col-retina/image.png',
      kudos: 22,
      sent: 4 },
    {
      rank: 5,
      name: 'Lando Norris',
      handle: 'landonorris',
      img: 'https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col-retina/image.png',
      kudos: 18,
      sent: 16 },
    {
      rank: 6,
      name: 'Charles Leclerc',
      handle: 'charles_leclerc',
      img: 'https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col-retina/image.png',
      kudos: 16,
      sent: 6 },
    {
      rank: 7,
      name: 'George Russell',
      handle: 'georgerussell63',
      img: 'https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png',
      kudos: 10,
      sent: 21 },
    {
      rank: 8,
      name: 'Daniel Ricciardo',
      handle: 'danielricciardo',
      img: 'https://www.formula1.com/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danric01.png.transform/2col-retina/image.png',
      kudos: 7,
      sent: 46 },
    {
      rank: 9,
      name: 'Alexander Albon',
      handle: 'alex_albon',
      img: 'https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col-retina/image.png',
      kudos: 4,
      sent: 2 },
    {
      rank: 10,
      name: 'Carlos Sainz Jr.',
      handle: 'carlossainz55',
      img: 'https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col-retina/image.png',
      kudos: 1,
      sent: 24 }];

    const randomEmoji = () => {
      const emojis = ['👏', '👍', '🙌', '🤩', '🔥', '⭐️', '🏆', '💯'];
      let randomNumber = Math.floor(Math.random() * emojis.length);
      return emojis[randomNumber];
    };

    const list = document.getElementById('list');

    team.forEach(member => {
      let newRow = document.createElement('li');
      newRow.classList.add('c-list__item');
      newRow.innerHTML = `
        <div class="c-list__grid">
          <div class="u-text--left u-text--small u-text--medium">${member.rank}</div>
          <div class="u-text--left u-text--small u-text--medium">${member.name}</div>
          <div class="u-text--right u-text--small u-text--medium">${member.kudos} ${randomEmoji()}</div>
        </div>
      `;
      if (list) list.appendChild(newRow);
    });

    // Find Winner from sent kudos by sorting the drivers in the team array
    let sortedTeam = [...team].sort((a, b) => b.sent - a.sent);
    let winner = sortedTeam[0];

    // Render winner card
    const winnerCard = document.getElementById('winner');
    if (winnerCard) {
      winnerCard.innerHTML = `
        <div class="u-text-small u-text--medium u-mb--16">Top of the Last Week</div>
        <img class="c-avatar c-avatar--lg" src="${winner.img}" alt="${winner.name}'s Avatar"/>
        <h3 class="u-mt--16">${winner.name}</h3>
        <span class="u-text--teal u-text--small">${winner.name}</span>
      `;
    }
  }, []);

  return (
    <div className="l-wrapper">
      <div className="l-grid">
        <div className="l-grid__item l-grid__item--sticky">
          <div className="c-card u-bg--light-gradient u-text--dark">
            <div className="c-card__body">
              <div className="u-display--flex u-justify--space-between">
                <div className="u-text--left">
                  <div className="u-text--small">My Rank</div>
                  <h2>3rd Place</h2>
                </div>
                <div className="u-text--right">
                  <div className="u-text--small">My Score</div>
                  <h2>24</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="c-card">
            <div className="c-card__body">
              <div className="u-text--center" id="winner"></div>
            </div>
          </div>
        </div>
        <div className="l-grid__item">
          <div className="c-card">
            <div className="c-card__header">
              <h3>Received XP</h3>
              <select className="c-select">
                <option selected={true}>Sunday, Feb. 23 - Sunday, Feb. 30</option>
              </select>
            </div>
            <div className="c-card__body">
              <ul className="c-list" id="list">
                <li className="c-list__item">
                  <div className="c-list__grid">
                    <div className="u-text--left u-text--small u-text--medium">Rank</div>
                    <div className="u-text--left u-text--small u-text--medium">Team Member</div>
                    <div className="u-text--right u-text--small u-text--medium"># of Kudos</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
