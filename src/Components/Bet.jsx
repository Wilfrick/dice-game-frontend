import PropTypes from 'prop-types'
import Hand from './Hand'

const Bet = ({player_identifier, bet_multiplier, value}) => {
  
    

    return (
      <div className="bet">
          <p className="player_identifier">Player: {player_identifier} </p>
            <div className="bet_multiplier">
              <p>{bet_multiplier}</p>x
            </div>
        <Hand values={[value]}></Hand>
    </div>
  )
}
Bet.propTypes = {
    player_identifier: PropTypes.string,
    bet_multiplier: PropTypes.number,
    value: PropTypes.string
}

export default Bet