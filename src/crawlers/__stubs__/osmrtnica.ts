import { createObituary } from '../../domain'
import { IObituary } from '../../domain/types'

const expected: Record<string, Array<IObituary>> = {
  osmrtnica_1: [
    {
      ...createObituary({
        type: 'obituary',
        firstname: 'Blaž',
        name_misc: 'Banović',
        surname: 'Vlašić',
        long_text:
          '<p>Prožima nas nada u uskrsnuće, jer one koje ovdje izgubismo tamo ćemo opet vidjeti. Gospodin posjeduje snagu da lakše probudi mrtve nego što mi možemo probuditi usnule. (Sv. Braulion)<br><p>Zahvalni za dar njegovog života i za ljubav i dobrotu koju smo od njega i po njemu primili, javljamo da je naš dragi</p></p><br><p>BLAŽ VLAŠIĆ  BANOVIĆ</p><br><p>Blago u Gospodinu preminuo u UTORAK 04.01.2022. u 75. godini života. Sprovod dragog nam pokojnika bit će u ČETVRTAK 06.01.2022. godine u 14.00 sati ispred mrtvačnice GORICA – SOVIĆI. Obitelj prima sućut u mrtvačnici od 13.00 sati. Pokop dragog nam pokojnika obavit će se na mjesnom groblju GORICA – SOVIĆI.</p><br><p>POČIVAO U MIRU BOŽJEM!</p><br>OŽALOŠĆENI',
        date_of_birth: '1947-01-01T00:00:00.000Z',
        date_of_death: '2022-01-01T00:00:00.000Z',
        image:
          'https://www.osmrtnica.ba/wp-content/uploads/2022/01/blaz-vlasic.jpg',
        relative:
          'supruga ANČICA, sin RUDOLF, kćeri: ANTONIJA i BLAŽENKA, zet HRVOJE, unučad: LUCIJA i IVANO, obitelji pok. braće: JANKA, RUDE i VALTERA, obitelj pok. strica ŽARKE, te obitelji: VLAŠIĆ, ŽUŽUL i HRKAĆ te ostala mnogobrojna rodbina i prijatelji. Zbog novonastale situacije molimo izraze sućuti bez rukovanja.'
      }),
      date_created: expect.any(String),
      date_updated: expect.any(String)
    }
  ]
}

export default expected
