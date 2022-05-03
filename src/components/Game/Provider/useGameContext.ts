import { useContext } from 'react';
import GameContext, { IGameContext } from './GameContext';

/**
 * This hook simply exposes the values that are stored in the game context. These values are defined
 * in the GameProvider component.
 *
 * @see GameProvider
 */
const useGameContext = (): IGameContext =>
  useContext<IGameContext | null>(GameContext) as IGameContext;

export default useGameContext;
