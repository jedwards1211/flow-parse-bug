// @flow

import assert from 'assert'

export const PATH_SEPARATOR = '/'

export const CHANNEL_GROUP_DEPTH_DEFAULT = 3 // Split paths at this depth

export const INGEST_POINTS_THRESHOLD = 50

export const LOGGER_NAME = 'JCoreHistorian'

export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR

export const PAGE_SIZE_HOUR = HOUR
export const PAGE_SIZE_8_HOUR = 8 * HOUR
export const PAGE_SIZE_3_DAY = 3 * DAY
export const PAGE_SIZE_30_DAY = 30 * DAY
export const PAGE_SIZE_300_DAY = 300 * DAY

export const PAGE_SIZES = [
  PAGE_SIZE_HOUR,
  PAGE_SIZE_8_HOUR,
  PAGE_SIZE_3_DAY,
  PAGE_SIZE_30_DAY,
  PAGE_SIZE_300_DAY,
]
// Time interval for downsampling at each page size

/*
 * Page intervals are:
 * 1 second
 * 10 seconds
 * 90 seconds
 * 15 minutes
 * 3 hours
 */
export const PAGE_INTERVALS = [1000, 10000, 90000, 900000, 10800000]
export const NUM_PAGE_SIZES = PAGE_SIZES.length

// Maximum pages per fetch during downsampling operations, on a per-page-size basis.
// Chosen so that if operations are broken up, the source page batches align with an
// even increment of target pages.
// 1 hour pages: 360 pages = 15 days = 1/2 of a 30 day page
// 8 hour pages: 360 pages = 120 days = 4 x 30 day pages
// 3 day pages: 300 pages = 900 days = 3 x 300 day pages
// 30 day pages: 200 pages = 6000 days = 20 x 300 day pages
//export const DOWNSAMPLE_MAX_PAGES_PER_FETCH = [360, 360, 300, 200]

// Lower the max pages per fetch to reduce the chances of out of memory errors
export const DOWNSAMPLE_MAX_PAGES_PER_FETCH = [32, 27, 30, 30]

assert.strictEqual(DOWNSAMPLE_MAX_PAGES_PER_FETCH.length, PAGE_SIZES.length - 1)

export const VALID_TIMEOUT_DEFAULT = 15 * MINUTE
// Window where we avoid extending data from real time into the future. Should be
// slightly larger than VALID_TIMEOUT_DEFAULT
export const REAL_TIME_CUTOFF_WINDOW = 20 * MINUTE

// Ensure that we never have to look back by more than one page to figure out what the
// value was at the beginning of a page
export const VALID_TIMEOUT_MAX = PAGE_SIZES[0]

// Save downsampled data immediately if we fetched more than 6 pages to generate it
export const DOWNSAMPLING_SAVE_THRESHOLD = 6

// When downsampling string values, up to 3 values with the highest durations will be
export const DOWNSAMPLING_ENUM_VALUES_PER_POINT_MAX = 3

export const POINTS_PER_PAGE_MIN = 400 // Min points per page, when deciding whether to increase the page size
export const POINTS_PER_PAGE_TARGET = 4000 // Max points per page, when initially choosing a page size
export const POINTS_PER_PAGE_MAX = 8000 // Max points per page, when deciding whether to decrease the page size

export const TIMELINE_PAGE_SIZE = 1 // Indicates the minimum page size for a time range.
export const TIMELINE_DATA_NOT_DOWNSAMPLED = 2 // Indicates that raw data has been inserted during this range, but not downsampled
export const TIMELINE_DATA_IN_INGEST = 3 // Indicates that raw data has been saved into the ingest table for this time period

export const SHARD_DEFAULT = '01'

export const DEFAULT_PREFIX = 'Historian' // Prefix used on table names and Redis topics

export const TABLE_MIGRATIONS = 'Migrations'

export const TABLE_CHANNEL_CHANGES = 'ChannelChanges'
export const TABLE_CHANNEL_INFO = 'ChannelInfo'
export const TABLE_CHANNEL_TIMELINES = 'ChannelTimelines'
export const TABLE_DATA_INGEST = 'DataIngest'
export const TABLE_DATA_PAGES = 'DataPages'

export const INGEST_FLAG_INTERVAL = DAY // Interval for flags indicating that there is data in the ingest table for time ranges before the real time range
export const NOT_DOWNSAMPLED_FLAG_INTERVAL = PAGE_SIZE_8_HOUR

export const INGEST_REAL_TIME_WRITE_WINDOW = HOUR // Data timestamped within the last hour can be put into the ingest table without any timeline markers being written
export const INGEST_REAL_TIME_READ_WINDOW = INGEST_REAL_TIME_WRITE_WINDOW * 2 // When someone requests data within 2 hours of real time, we always look in the ingest table

export const CODE_DATA_CONFLICT = 'DATA_CONFLICT'

export const ACTION_CREATE = 'CREATE'
export const ACTION_SET_DATA_TYPE = 'SET_DATA_TYPE'

export const SWEEP_MARKERS_PER_FETCH = 1000

export const CHANNEL_CHANGE_EVENTS_PER_FETCH = 50

export const POSTGRES_ERR_CODE_UNIQUE_CONSTRAINT_VIOLATION = '23505'

