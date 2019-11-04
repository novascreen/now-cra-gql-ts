import { GraphQLResolveInfo } from 'graphql';
import { Context } from './utils/utils';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Country = {
  __typename?: 'Country';
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type Episode = {
  __typename?: 'Episode';
  id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  season?: Maybe<Scalars['Int']>;
  number?: Maybe<Scalars['Int']>;
  airdate?: Maybe<Scalars['String']>;
  airtime?: Maybe<Scalars['String']>;
  airstamp?: Maybe<Scalars['String']>;
  runtime?: Maybe<Scalars['Int']>;
  image?: Maybe<Image>;
  summary?: Maybe<Scalars['String']>;
  show?: Maybe<Show>;
};

export type Externals = {
  __typename?: 'Externals';
  tvrage?: Maybe<Scalars['Int']>;
  thetvdb?: Maybe<Scalars['Int']>;
  imdb?: Maybe<Scalars['String']>;
};

export type FavoriteShow = {
  __typename?: 'FavoriteShow';
  id: Scalars['ID'];
  tvmaze: Scalars['Int'];
  tvrage?: Maybe<Scalars['Int']>;
  thetvdb?: Maybe<Scalars['Int']>;
  imdb?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Image = {
  __typename?: 'Image';
  medium?: Maybe<Scalars['String']>;
  original?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticate?: Maybe<User>;
  createFavoriteShow?: Maybe<User>;
  deleteFavoriteShow?: Maybe<User>;
};

export type MutationAuthenticateArgs = {
  idToken: Scalars['String'];
};

export type MutationCreateFavoriteShowArgs = {
  tvmaze: Scalars['Int'];
};

export type MutationDeleteFavoriteShowArgs = {
  id: Scalars['ID'];
};

export type Network = {
  __typename?: 'Network';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  country?: Maybe<Country>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  search?: Maybe<Array<Maybe<Show>>>;
  show?: Maybe<Show>;
  shows?: Maybe<Array<Maybe<Show>>>;
  scheduleAll?: Maybe<Array<Maybe<Episode>>>;
  scheduleByDate?: Maybe<Array<Maybe<Episode>>>;
  scheduleFavorites?: Maybe<Array<Maybe<Episode>>>;
  episode?: Maybe<Episode>;
  episodes?: Maybe<Array<Maybe<Episode>>>;
};

export type QuerySearchArgs = {
  query: Scalars['String'];
};

export type QueryShowArgs = {
  id: Scalars['Int'];
};

export type QueryShowsArgs = {
  ids: Array<Maybe<Scalars['Int']>>;
};

export type QueryScheduleAllArgs = {
  previous?: Maybe<Scalars['Boolean']>;
};

export type QueryScheduleByDateArgs = {
  date: Scalars['String'];
};

export type QueryScheduleFavoritesArgs = {
  showIds: Array<Maybe<Scalars['Int']>>;
  previous?: Maybe<Scalars['Boolean']>;
};

export type QueryEpisodeArgs = {
  id: Scalars['Int'];
};

export type QueryEpisodesArgs = {
  showId: Scalars['Int'];
};

export type Rating = {
  __typename?: 'Rating';
  Rating?: Maybe<Scalars['Int']>;
};

export type Schedule = {
  __typename?: 'Schedule';
  time?: Maybe<Scalars['String']>;
  days?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Season = {
  __typename?: 'Season';
  id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  episodeOrder?: Maybe<Scalars['Int']>;
  premiereDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  network?: Maybe<Network>;
  webChannel?: Maybe<WebChannel>;
  image?: Maybe<Image>;
  summary?: Maybe<Scalars['String']>;
  episodes?: Maybe<Array<Maybe<Episode>>>;
};

export type Show = {
  __typename?: 'Show';
  id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  airedYears?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<Scalars['String']>;
  officialSite?: Maybe<Scalars['String']>;
  runtime?: Maybe<Scalars['Int']>;
  premiered?: Maybe<Scalars['String']>;
  schedule?: Maybe<Schedule>;
  rating?: Maybe<Rating>;
  weight?: Maybe<Scalars['Int']>;
  network?: Maybe<Network>;
  webChannel?: Maybe<WebChannel>;
  externals?: Maybe<Externals>;
  image?: Maybe<Image>;
  summary?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['Int']>;
  seasons?: Maybe<Array<Maybe<Season>>>;
  episodes?: Maybe<Array<Maybe<Episode>>>;
  previousEpisode?: Maybe<Episode>;
  nextEpisode?: Maybe<Episode>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  identity?: Maybe<Scalars['String']>;
  favoriteShows: Array<FavoriteShow>;
};

export type WebChannel = {
  __typename?: 'WebChannel';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  country?: Maybe<Country>;
};

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {};
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  FavoriteShow: FavoriteShow;
  Int: Scalars['Int'];
  Show: Show;
  Schedule: Schedule;
  Rating: Rating;
  Network: Network;
  Country: Country;
  WebChannel: WebChannel;
  Externals: Externals;
  Image: Image;
  Season: Season;
  Episode: Episode;
  Boolean: Scalars['Boolean'];
  Mutation: {};
};

export type IsAuthenticatedDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsOwnerDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = { type?: Maybe<Maybe<Scalars['String']>> }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CountryResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Country']
> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type EpisodeResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Episode']
> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  season?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  airdate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  airtime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  airstamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  runtime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  show?: Resolver<Maybe<ResolversTypes['Show']>, ParentType, ContextType>;
};

export type ExternalsResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Externals']
> = {
  tvrage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  thetvdb?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  imdb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type FavoriteShowResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['FavoriteShow']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tvmaze?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tvrage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  thetvdb?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  imdb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type ImageResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Image']
> = {
  medium?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Mutation']
> = {
  authenticate?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    MutationAuthenticateArgs
  >;
  createFavoriteShow?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    MutationCreateFavoriteShowArgs
  >;
  deleteFavoriteShow?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    MutationDeleteFavoriteShowArgs
  >;
};

export type NetworkResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Network']
> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Query']
> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  search?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Show']>>>,
    ParentType,
    ContextType,
    QuerySearchArgs
  >;
  show?: Resolver<
    Maybe<ResolversTypes['Show']>,
    ParentType,
    ContextType,
    QueryShowArgs
  >;
  shows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Show']>>>,
    ParentType,
    ContextType,
    QueryShowsArgs
  >;
  scheduleAll?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Episode']>>>,
    ParentType,
    ContextType,
    QueryScheduleAllArgs
  >;
  scheduleByDate?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Episode']>>>,
    ParentType,
    ContextType,
    QueryScheduleByDateArgs
  >;
  scheduleFavorites?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Episode']>>>,
    ParentType,
    ContextType,
    QueryScheduleFavoritesArgs
  >;
  episode?: Resolver<
    Maybe<ResolversTypes['Episode']>,
    ParentType,
    ContextType,
    QueryEpisodeArgs
  >;
  episodes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Episode']>>>,
    ParentType,
    ContextType,
    QueryEpisodesArgs
  >;
};

export type RatingResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Rating']
> = {
  Rating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type ScheduleResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Schedule']
> = {
  time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  days?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
};

export type SeasonResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Season']
> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodeOrder?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  premiereDate?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  network?: Resolver<Maybe<ResolversTypes['Network']>, ParentType, ContextType>;
  webChannel?: Resolver<
    Maybe<ResolversTypes['WebChannel']>,
    ParentType,
    ContextType
  >;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Episode']>>>,
    ParentType,
    ContextType
  >;
};

export type ShowResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Show']
> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  airedYears?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  officialSite?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  runtime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  premiered?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  schedule?: Resolver<
    Maybe<ResolversTypes['Schedule']>,
    ParentType,
    ContextType
  >;
  rating?: Resolver<Maybe<ResolversTypes['Rating']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  network?: Resolver<Maybe<ResolversTypes['Network']>, ParentType, ContextType>;
  webChannel?: Resolver<
    Maybe<ResolversTypes['WebChannel']>,
    ParentType,
    ContextType
  >;
  externals?: Resolver<
    Maybe<ResolversTypes['Externals']>,
    ParentType,
    ContextType
  >;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  seasons?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Season']>>>,
    ParentType,
    ContextType
  >;
  episodes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Episode']>>>,
    ParentType,
    ContextType
  >;
  previousEpisode?: Resolver<
    Maybe<ResolversTypes['Episode']>,
    ParentType,
    ContextType
  >;
  nextEpisode?: Resolver<
    Maybe<ResolversTypes['Episode']>,
    ParentType,
    ContextType
  >;
};

export type UserResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  identity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favoriteShows?: Resolver<
    Array<ResolversTypes['FavoriteShow']>,
    ParentType,
    ContextType
  >;
};

export type WebChannelResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['WebChannel']
> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Country?: CountryResolvers<ContextType>;
  Episode?: EpisodeResolvers<ContextType>;
  Externals?: ExternalsResolvers<ContextType>;
  FavoriteShow?: FavoriteShowResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Network?: NetworkResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rating?: RatingResolvers<ContextType>;
  Schedule?: ScheduleResolvers<ContextType>;
  Season?: SeasonResolvers<ContextType>;
  Show?: ShowResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WebChannel?: WebChannelResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = Context> = {
  isAuthenticated?: IsAuthenticatedDirectiveResolver<any, any, ContextType>;
  isOwner?: IsOwnerDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<
  ContextType
>;
