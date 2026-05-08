import { ExternalLink, Calendar, User } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

export default function NewsCard({ article }) {
  const { title, description, url, urlToImage, publishedAt, source, author } = article;

  return (
    <article
      className="glass-card fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Image */}
      <div style={{ height: '180px', width: '100%', overflow: 'hidden', background: 'var(--bg-secondary)', position: 'relative' }}>
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
            No image available
          </div>
        )}
        <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--accent)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>
          {source?.name || 'News'}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {title}
        </h3>
        
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
          {description || 'No description available for this article.'}
        </p>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} /> {formatDate(publishedAt)}
          </div>
          {author && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <User size={12} /> {author}
            </div>
          )}
        </div>

        {/* Read More Button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
          style={{ width: '100%', justifyContent: 'center', marginTop: '4px', textDecoration: 'none' }}
        >
          Read Article <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}
