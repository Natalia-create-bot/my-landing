import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import {
  Accordion,
  Button,
  Checkbox,
  Input,
  Modal,
  ProductCard,
} from 'my-ui-kit-kolmykova'
import 'my-ui-kit-kolmykova/style.css'
import brazilImage from './assets/coffee/brazil.jpg'
import colombiaImage from './assets/coffee/colombia.jpg'
import ethiopiaImage from './assets/coffee/ethiopia.jpg'
import './App.css'

const products = [
  {
    id: 'ethiopia',
    title: 'Эфиопия Иргачефф',
    description: 'Цитрусовые ноты и жасмин',
    price: '1 200 ₽',
    image: ethiopiaImage,
  },
  {
    id: 'colombia',
    title: 'Колумбия Супремо',
    description: 'Молочный шоколад и карамель',
    price: '1 500 ₽',
    image: colombiaImage,
  },
  {
    id: 'brazil',
    title: 'Бразилия Сантос',
    description: 'Ореховая сладость и мягкое послевкусие',
    price: '1 000 ₽',
    image: brazilImage,
  },
]

const faqItems = [
  {
    title: 'Как часто приходит кофе?',
    content:
      'Раз в месяц. Мы обжариваем зерна партией и отправляем заказ в день обжарки, чтобы к вам кофе приезжал свежим.',
  },
  {
    title: 'Можно ли изменить вкусовые предпочтения?',
    content:
      'Конечно. В личном кабинете можно поменять сорт, степень обжарки или приостановить доставку — без штрафов.',
  },
  {
    title: 'Как оплатить подписку?',
    content:
      'Картой онлайн при оформлении. Списания проходят раз в месяц, а отменить подписку можно в один клик.',
  },
]

const weightOptions = ['250 г', '500 г', '1 кг']

const namePattern = /^[А-Яа-яЁёA-Za-z]+(?:[ '-][А-Яа-яЁёA-Za-z]+)*$/
const phonePattern = /^\+?[\d\s()-]+$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isValidName = (value: string) => namePattern.test(value.trim())
const isValidPhone = (value: string) =>
  phonePattern.test(value.trim()) && value.replace(/\D/g, '').length >= 6
const isValidEmail = (value: string) => emailPattern.test(value.trim())

const storeItems = [
  {
    title: 'Хамовники',
    content: 'ул. Зерновая, 12 · Ежедневно, 8:00–20:00',
  },
  {
    title: 'Патриаршие',
    content: 'Малый Патриарший пер., 5 · Ежедневно, 9:00–21:00',
  },
  {
    title: 'Пресненский',
    content: 'ул. Кофейная, 8 · Ежедневно, 7:30–19:00',
  },
  {
    title: 'Таганский',
    content: 'наб. Зерновая, 3 · Ежедневно, 10:00–22:00',
  },
]

const socials: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M21.8 4.2 2.9 11.4c-.9.4-.9 1.6 0 2l5 1.8 1.9 6c.3.9 1.4 1 2 .3l2.9-2.7 4.8 3.5c.8.6 2 .1 2.2-.9l3.4-16c.2-1-.9-1.9-1.3-1.2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m8.2 13.5 10-6.2-7.2 8.1-.1 3.3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'ВКонтакте',
    href: 'https://vk.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M13.4 18.2c-4.9 0-8-3.4-8.2-9h3c.1 3.8 1.8 6.1 5 6.4v-6.4h3c-.1 2.2-.5 3.8-1.4 4.9 1 .1 2.2.7 4.1 2.5h-2.4c-1-.9-1.8-1.3-2.5-1.5v2.1h-1.6z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

function App() {
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [name, setName] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [phone, setPhone] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isStoresOpen, setIsStoresOpen] = useState(false)
  const [orderProduct, setOrderProduct] = useState<string | null>(null)
  const [weight, setWeight] = useState(weightOptions[0])

  useEffect(() => {
    if (!isStoresOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsStoresOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isStoresOpen])

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setEmailTouched(true)
      return
    }
    setSubscribed(true)
    setEmail('')
    setEmailTouched(false)
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValidName(name) || !isValidPhone(phone)) {
      setNameTouched(true)
      setPhoneTouched(true)
      return
    }
    setIsContactOpen(false)
    setOrderProduct(null)
    setName('')
    setPhone('')
    setNameTouched(false)
    setPhoneTouched(false)
  }

  const openContact = (product: string | null = null) => {
    setOrderProduct(product)
    setWeight(weightOptions[0])
    setName('')
    setPhone('')
    setNameTouched(false)
    setPhoneTouched(false)
    setIsContactOpen(true)
  }

  const closeContact = () => {
    setIsContactOpen(false)
    setOrderProduct(null)
    setNameTouched(false)
    setPhoneTouched(false)
  }

  return (
    <div className="page">
      <header className="site-header">
        <span className="brand">☕ Bean There</span>
        <nav className="site-nav" aria-label="Основная навигация">
          <Button variant="secondary" size="sm" onClick={() => scrollToSection('about')}>
            О нас
          </Button>
          <div className="stores-nav-item">
            <Button
              variant="secondary"
              size="sm"
              aria-expanded={isStoresOpen}
              onClick={() => setIsStoresOpen((open) => !open)}
            >
              Наши магазины
            </Button>
            {isStoresOpen && (
              <div className="stores-accordion">
                <Accordion
                  className="stores-accordion__accordion"
                  items={storeItems}
                />
              </div>
            )}
          </div>
          <Button variant="secondary" size="sm" onClick={() => scrollToSection('catalog')}>
            Сорта кофе
          </Button>
        </nav>
        <Button onClick={() => openContact()}>Заказать кофе</Button>
      </header>

      <main className="main">
        <section className="hero">
          <div className="hero__content">
            <h1 className="hero__title">Свежая обжарка у вас дома</h1>
            <p className="hero__subtitle">
              Подписка на кофе от локальной обжарки. Прямиком к вашей двери
            </p>
            <Button
              className="hero__button"
              onClick={() => scrollToSection('catalog')}
            >
              Выбрать кофе
            </Button>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="section__heading">
            <span className="section__eyebrow">О нас</span>
            <h2 id="about-title">Обжариваем сами, доставляем лично</h2>
          </div>
          <p>
            Мы — небольшая кофейня из Москвы. Закупаем зерно у проверенных
            фермеров, обжариваем маленькими партиями и отправляем заказ в день
            обжарки. Так чашка дома пахнет так же, как в нашей кофейне.
          </p>
        </section>

        <section className="section catalog" id="catalog" aria-labelledby="catalog-title">
          <div className="section__heading">
            <span className="section__eyebrow">Каталог</span>
            <h2 id="catalog-title">Наши сорта</h2>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                onAddToCart={() => openContact(product.title)}
                buttonLabel="Купить"
              />
            ))}
          </div>
        </section>

        <section className="section faq" aria-labelledby="faq-title">
          <div className="section__heading">
            <span className="section__eyebrow">FAQ</span>
            <h2 id="faq-title">Частые вопросы</h2>
          </div>
          <Accordion items={faqItems} />
        </section>

        <section className="section subscribe" aria-labelledby="subscribe-title">
          <div className="subscribe__card">
            <h2 id="subscribe-title">Получайте свежий кофе раз в месяц</h2>
            <p>
              Выберите сорт, мы обжарим его специально для вас и доставим в удобный день.
            </p>
            <form className="subscribe__form" onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="Ваш Email"
                aria-label="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setEmailTouched(true)
                }}
                error={emailTouched && !isValidEmail(email)}
                disabled={subscribed}
                required
              />
              <Button type="submit" disabled={subscribed || !isValidEmail(email)}>
                Оформить подписку
              </Button>
            </form>
            {subscribed && (
              <div className="subscribe__success">
                <span>Спасибо! Мы отправили детали подписки на вашу почту.</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSubscribed(false)}
                >
                  Изменить email
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="section contact">
          <div>
            <h2>Остались вопросы?</h2>
            <p>Поможем выбрать сорт и оформить первую доставку.</p>
          </div>
          <Button variant="secondary" onClick={() => openContact()}>
            Связаться с нами
          </Button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__legal">
          <strong>ООО «Bean There»</strong>
          <span>101000, г. Москва, ул. Зерновая, д. 12, стр. 1</span>
          <span>Генеральный директор — Анна Сергеевна Зернова</span>
        </div>
        <div className="socials" aria-label="Социальные сети">
          {socials.map((social) => (
            <a
              key={social.label}
              className="socials__link"
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </footer>

      <Modal
        isOpen={isContactOpen}
        onClose={closeContact}
        title={orderProduct ? `Заказ: ${orderProduct}` : 'Связаться с нами'}
      >
        <form className="contact-form" onSubmit={handleContactSubmit}>
          {orderProduct && (
            <div className="weight-options" role="group" aria-label="Вес кофе">
              {weightOptions.map((option) => (
                <Checkbox
                  key={option}
                  className="weight-option"
                  label={option}
                  name="weight"
                  value={option}
                  checked={weight === option}
                  onChange={() => setWeight(option)}
                />
              ))}
            </div>
          )}
          <Input
            type="text"
            placeholder="Имя"
            aria-label="Имя"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              setNameTouched(true)
            }}
            error={nameTouched && !isValidName(name)}
            required
          />
          <Input
            type="tel"
            label="Телефон"
            placeholder="+7 (___) ___-__-__"
            aria-label="Телефон"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value)
              setPhoneTouched(true)
            }}
            error={phoneTouched && !isValidPhone(phone)}
            required
          />
          <Button type="submit" disabled={!isValidName(name) || !isValidPhone(phone)}>
            {orderProduct ? 'Заказать' : 'Отправить'}
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default App
