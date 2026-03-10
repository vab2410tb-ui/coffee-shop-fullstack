import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

// 1. Đưa dữ liệu tĩnh ra ngoài để tối ưu bộ nhớ
const ACCORDION_DATA = [
  {
    id: 'usage',
    title: 'What are the payment methods?',
    content: [
      'Online banking transfer.',
      'Visa, Mastercard credit cards',
      'Banking QR Code',
      'Cash on Delivery (COD)',
    ],
  },
  {
    id: 'pickup',
    title: 'How long does delivery take?',
    content: [
      'Inner City of Bien Hoa: Delivery in 1-2 working days.',
      'Suburban and other provinces: Delivery in 3-5 working days.',
      'Other information: Please contact us or visit Delivery Policy.',
    ],
  },
  {
    id: 'policy',
    title: 'Policy',
    content: [
      'Allow customers to exchange/return within 3 days of receipt if they are not satisfied or the product is not as expected.',
      'Depending on the applicable conditions, guests can refund or exchange to another product at no cost.',
      'Please visit NABcoffeeshop Easy for more details.',
    ],
  },
  {
    id: 'question',
    title: 'Have any oder questions?',
    content: ['You can contact us through our Contact page! We are always happy to assist you.'],
  },
];

const CartAccordion = ({ cartpage }) => {
  const [activeTabs, setActiveTabs] = useState([]);

  const toggleTab = (tabId) => {
    setActiveTabs((prev) =>
      prev.includes(tabId) ? prev.filter((id) => id !== tabId) : [...prev, tabId],
    );
  };

  return (
    <div className={cartpage.accordion_container}>
      {ACCORDION_DATA.map((tab) => {
        const isOpen = activeTabs.includes(tab.id);

        return (
          <div key={tab.id} className={cartpage.accordion_item}>
            <div className={cartpage.accordion_header} onClick={() => toggleTab(tab.id)}>
              <h3>{tab.title}</h3>
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`${cartpage.icon} ${isOpen ? cartpage.rotate : ''}`}
              />
            </div>

            <div className={`${cartpage.accordion_content} ${isOpen ? cartpage.show : ''}`}>
              <div className={cartpage.accordion_inner}>
                <ul>
                  {tab.content.map((text, i) => (
                    <li key={i}>{text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartAccordion;
