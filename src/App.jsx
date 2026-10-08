import { useMemo, useState } from 'react'
import './App.css'

const movies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    genre: 'Sci-Fi',
    rating: 9.2,
    duration: '166 min',
    language: 'English',
    price: 19,
    format: 'IMAX 3D',
    seats: 88,
    badge: 'Trending',
    poster:
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
    description:
      'Paul Atreides unites with the Fremen to protect Arrakis while the galaxy navigates a dangerous power struggle.',
    showtimes: ['11:30 AM', '2:15 PM', '6:45 PM', '9:30 PM'],
  },
  {
    id: 2,
    title: 'The Batman',
    genre: 'Action',
    rating: 8.9,
    duration: '176 min',
    language: 'English',
    price: 18,
    format: 'Dolby 5.1',
    seats: 76,
    badge: 'New',
    poster:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80',
    description:
      'As Gotham descends into chaos, Batman must unravel a conspiracy while fighting the city’s darkest forces.',
    showtimes: ['10:00 AM', '1:20 PM', '4:40 PM', '8:00 PM'],
  },
  {
    id: 3,
    title: 'Everything Everywhere',
    genre: 'Comedy',
    rating: 8.7,
    duration: '139 min',
    language: 'English',
    price: 16,
    format: 'ScreenX',
    seats: 72,
    badge: 'Popular',
    poster:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    description:
      'A laundromat owner discovers multiverse possibilities and must save her family while chasing endless possibilities.',
    showtimes: ['9:40 AM', '12:30 PM', '3:50 PM', '7:10 PM'],
  },
  {
    id: 4,
    title: 'Oppenheimer',
    genre: 'Drama',
    rating: 9.0,
    duration: '180 min',
    language: 'English',
    price: 20,
    format: '4K Laser',
    seats: 65,
    badge: 'Critics Pick',
    poster:
      'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80',
    description:
      'A tense, immersive portrait of the man behind the atomic bomb and the moral cost of innovation.',
    showtimes: ['12:10 PM', '3:00 PM', '6:30 PM', '9:45 PM'],
  },
  {
    id: 5,
    title: 'Top Gun: Maverick',
    genre: 'Action',
    rating: 8.8,
    duration: '130 min',
    language: 'English',
    price: 17,
    format: 'Dolby Atmos',
    seats: 81,
    badge: 'Top Rated',
    poster:
      'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80',
    description:
      'Maverick pushes the next generation into the skies while facing a mission that tests everything he knows.',
    showtimes: ['10:15 AM', '1:45 PM', '5:00 PM', '8:15 PM'],
  },
  {
    id: 6,
    title: 'Past Lives',
    genre: 'Drama',
    rating: 8.4,
    duration: '106 min',
    language: 'English',
    price: 15,
    format: 'Standard',
    seats: 58,
    badge: 'Award-Worthy',
    poster:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    description:
      'A quiet but powerful story of love, memory, and timing across continents and years.',
    showtimes: ['11:00 AM', '2:30 PM', '5:20 PM', '8:40 PM'],
  },
]

const navItems = [
  { key: 'home', label: 'Home' },
  { key: 'search', label: 'Search' },
  { key: 'movie', label: 'Movie' },
  { key: 'settings', label: 'Settings' },
]

const genreFilters = ['All', 'Action', 'Sci-Fi', 'Drama', 'Comedy']

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedMovieId, setSelectedMovieId] = useState(movies[0].id)
  const [selectedShowtime, setSelectedShowtime] = useState(movies[0].showtimes[0])
  const [ticketCount, setTicketCount] = useState(2)
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    subtitles: true,
    reminders: false,
  })

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre
      const matchesSearch =
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesGenre && matchesSearch
    })
  }, [searchTerm, selectedGenre])

  const selectedMovie =
    movies.find((movie) => movie.id === selectedMovieId) ?? movies[0]

  const featuredMovie = filteredMovies[0] ?? movies[0]
  const bookingTotal = selectedMovie.price * ticketCount

  const openMovie = (movie) => {
    setSelectedMovieId(movie.id)
    setSelectedShowtime(movie.showtimes[0])
    setActiveTab('movie')
  }

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className={`app-shell ${settings.darkMode ? 'theme-dark' : 'theme-light'}`}>
      <header className="topbar">
        <div className="brand" aria-label="Movie booking brand">
          <div className="brand-mark">M</div>
          <div>
            <span>Movie</span>
            <strong>Booking</strong>
          </div>
        </div>

        <nav className="main-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={activeTab === item.key ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="profile-pill">
          Hi, Alex
        </button>
      </header>

      {activeTab === 'home' && (
        <main className="page home-page">
          <section className="hero-card">
            <div className="hero-copy">
              <p className="eyebrow">Now showing this week</p>
              <h1>Book your next cinematic escape.</h1>
              <p className="lead">
                Discover blockbuster movies, premium showtimes, and smooth booking
                in one place.
              </p>

              <div className="hero-actions">
                <button type="button" className="primary-btn" onClick={() => setActiveTab('search')}>
                  Browse movies
                </button>
                <button type="button" className="secondary-btn" onClick={() => openMovie(featuredMovie)}>
                  Book featured
                </button>
              </div>

              <div className="hero-meta">
                <div>
                  <strong>24+</strong>
                  <span>screens</span>
                </div>
                <div>
                  <strong>8k</strong>
                  <span>happy viewers</span>
                </div>
                <div>
                  <strong>4.9/5</strong>
                  <span>rating</span>
                </div>
              </div>
            </div>

            <div className="hero-poster-wrap">
              <div className="hero-poster">
                <img src={featuredMovie.poster} alt={featuredMovie.title} />
              </div>
              <div className="poster-tag">
                <span>{featuredMovie.badge}</span>
                <strong>{featuredMovie.title}</strong>
              </div>
            </div>
          </section>

          <section className="stats-grid">
            <div className="stat-box">
              <span>Today</span>
              <strong>12 showtimes</strong>
            </div>
            <div className="stat-box">
              <span>Best value</span>
              <strong>From $15</strong>
            </div>
            <div className="stat-box">
              <span>VIP lounge</span>
              <strong>4 seats left</strong>
            </div>
          </section>

          <section className="movies-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Featured selection</p>
                <h2>Now showing</h2>
              </div>
              <button type="button" className="text-btn" onClick={() => setActiveTab('search')}>
                View all
              </button>
            </div>

            <div className="movie-grid">
              {movies.slice(0, 4).map((movie) => (
                <article key={movie.id} className="movie-card">
                  <div className="movie-image-wrap">
                    <img src={movie.poster} alt={movie.title} />
                    <span className="movie-badge">{movie.badge}</span>
                  </div>

                  <div className="movie-content">
                    <div className="movie-headline">
                      <h3>{movie.title}</h3>
                      <span>⭐ {movie.rating}</span>
                    </div>

                    <p>{movie.genre}</p>
                    <div className="movie-meta">
                      <span>{movie.duration}</span>
                      <span>{movie.format}</span>
                    </div>

                    <div className="movie-footer">
                      <strong>${movie.price}</strong>
                      <button type="button" className="small-btn" onClick={() => openMovie(movie)}>
                        Book now
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeTab === 'search' && (
        <main className="page search-page">
          <section className="search-shell">
            <div className="search-header">
              <div>
                <p className="eyebrow">Find your movie</p>
                <h2>Search & discover</h2>
              </div>
            </div>

            <div className="search-tools">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name or genre..."
                aria-label="Search movies"
              />

              <div className="chip-row" aria-label="Genre filters">
                {genreFilters.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    className={selectedGenre === genre ? 'chip active' : 'chip'}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="search-results">
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <article key={movie.id} className="search-card">
                    <img src={movie.poster} alt={movie.title} />

                    <div className="search-card-copy">
                      <div className="movie-headline">
                        <h3>{movie.title}</h3>
                        <span>⭐ {movie.rating}</span>
                      </div>
                      <p>{movie.description}</p>

                      <div className="movie-meta">
                        <span>{movie.genre}</span>
                        <span>{movie.duration}</span>
                        <span>{movie.format}</span>
                      </div>

                      <div className="movie-footer">
                        <strong>${movie.price}</strong>
                        <button type="button" className="small-btn" onClick={() => openMovie(movie)}>
                          Select showtime
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  <h3>No movies found</h3>
                  <p>Try a different keyword or switch genres.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {activeTab === 'movie' && (
        <main className="page movie-page">
          <section className="details-layout">
            <article className="movie-detail-card">
              <div className="detail-poster">
                <img src={selectedMovie.poster} alt={selectedMovie.title} />
              </div>

              <div className="detail-copy">
                <p className="eyebrow">
                  {selectedMovie.genre} • {selectedMovie.duration} • {selectedMovie.language}
                </p>
                <h2>{selectedMovie.title}</h2>
                <p className="detail-description">{selectedMovie.description}</p>

                <div className="feature-row">
                  <div>
                    <span>Rating</span>
                    <strong>{selectedMovie.rating}/10</strong>
                  </div>
                  <div>
                    <span>Format</span>
                    <strong>{selectedMovie.format}</strong>
                  </div>
                  <div>
                    <span>Seats left</span>
                    <strong>{selectedMovie.seats}</strong>
                  </div>
                </div>

                <div className="showtime-block">
                  <h3>Showtimes</h3>
                  <div className="time-group">
                    {selectedMovie.showtimes.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={selectedShowtime === slot ? 'time-btn active' : 'time-btn'}
                        onClick={() => setSelectedShowtime(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="booking-controls">
                  <div className="count-control">
                    <button type="button" onClick={() => setTicketCount((count) => Math.max(1, count - 1))}>
                      −
                    </button>
                    <span>{ticketCount}</span>
                    <button type="button" onClick={() => setTicketCount((count) => count + 1)}>
                      +
                    </button>
                  </div>

                  <div className="total-price">
                    <span>Total</span>
                    <strong>${bookingTotal}</strong>
                  </div>
                </div>

                <button type="button" className="primary-btn wide-btn" onClick={() => setActiveTab('home')}>
                  Confirm booking
                </button>
              </div>
            </article>

            <aside className="summary-card">
              <p className="eyebrow">Booking summary</p>
              <h3>{selectedMovie.title}</h3>

              <div className="summary-row">
                <span>Date</span>
                <strong>Today</strong>
              </div>
              <div className="summary-row">
                <span>Time</span>
                <strong>{selectedShowtime}</strong>
              </div>
              <div className="summary-row">
                <span>Tickets</span>
                <strong>{ticketCount}</strong>
              </div>
              <div className="summary-row total-row">
                <span>Amount</span>
                <strong>${bookingTotal}</strong>
              </div>

              <button type="button" className="secondary-btn full-width" onClick={() => setActiveTab('home')}>
                Continue to checkout
              </button>
            </aside>
          </section>
        </main>
      )}

      {activeTab === 'settings' && (
        <main className="page settings-page">
          <section className="settings-card">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Your preferences</p>
                <h2>Settings</h2>
              </div>
            </div>

            <div className="setting-list">
              <div className="setting-row">
                <div>
                  <h3>Dark mode</h3>
                  <p>Use the cinematic night theme.</p>
                </div>
                <button
                  type="button"
                  className={settings.darkMode ? 'toggle active' : 'toggle'}
                  onClick={() => toggleSetting('darkMode')}
                >
                  <span />
                </button>
              </div>

              <div className="setting-row">
                <div>
                  <h3>Booking notifications</h3>
                  <p>Receive reminders before showtime.</p>
                </div>
                <button
                  type="button"
                  className={settings.notifications ? 'toggle active' : 'toggle'}
                  onClick={() => toggleSetting('notifications')}
                >
                  <span />
                </button>
              </div>

              <div className="setting-row">
                <div>
                  <h3>Subtitles</h3>
                  <p>Always prefer text subtitles when available.</p>
                </div>
                <button
                  type="button"
                  className={settings.subtitles ? 'toggle active' : 'toggle'}
                  onClick={() => toggleSetting('subtitles')}
                >
                  <span />
                </button>
              </div>

              <div className="setting-row">
                <div>
                  <h3>Early reminder</h3>
                  <p>Save a 30-minute reminder before the movie starts.</p>
                </div>
                <button
                  type="button"
                  className={settings.reminders ? 'toggle active' : 'toggle'}
                  onClick={() => toggleSetting('reminders')}
                >
                  <span />
                </button>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  )
}

export default App
