import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [deliveryRegion, setDeliveryRegion] = useState('moscow');
  const [deliveryWeight, setDeliveryWeight] = useState([50]);
  const [deliverySpeed, setDeliverySpeed] = useState('standard');

  const deliveryCosts = {
    moscow: { standard: 0, express: 2500 },
    kazan: { standard: 1200, express: 4500 },
    rostov: { standard: 2500, express: 6000 },
    leningrad: { standard: 800, express: 3500 },
    volgograd: { standard: 2800, express: 6500 },
    other: { standard: 3500, express: 8000 }
  };

  const calculateDelivery = () => {
    const baseCost = deliveryCosts[deliveryRegion as keyof typeof deliveryCosts][deliverySpeed as keyof typeof deliveryCosts.moscow];
    const weightMultiplier = deliveryWeight[0] > 100 ? 1 + (deliveryWeight[0] - 100) / 500 : 1;
    return Math.round(baseCost * weightMultiplier);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка принята! Менеджер свяжется с вами в течение 30 минут');
    setOrderFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-roboto">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(45, 49, 66, 0.75), rgba(45, 49, 66, 0.75)), url('https://cdn.poehali.dev/projects/19f273c1-5c8e-4f64-acad-37fb6e4e6456/files/47f31ccd-08c3-4bf9-b2d8-907d0a103bd6.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="font-montserrat font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
              ЧУПАЧУПС
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto">
              Откройте для себя леденцы, которые отличаются высоким качеством и неповторимым вкусом. Рассчитайте заказ прямо сейчас!
            </p>

            <Button 
              onClick={() => setOrderFormOpen(!orderFormOpen)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-montserrat font-semibold text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
            >
              Рассчитать заказ
              <Icon name="Calculator" className="ml-2" size={24} />
            </Button>

            {orderFormOpen && (
              <Card className="max-w-md mx-auto animate-scale-in shadow-2xl">
                <CardHeader>
                  <CardTitle className="font-montserrat">Расчёт заказа</CardTitle>
                  <CardDescription>Заполните форму и получите коммерческое предложение</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" placeholder="Иван Петров" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (900) 123-45-67" required />
                    </div>
                    <div>
                      <Label htmlFor="volume">Объём заказа</Label>
                      <Input id="volume" placeholder="1000 шт или 50 кг" required />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Отправить заявку
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-center mb-4 text-secondary">
            Программа лояльности
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Выгодные условия для постоянных клиентов
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Базовый',
                volume: 'до 100 тыс. ₽/мес',
                discount: '5%',
                bonus: 'Стандартная упаковка',
                icon: 'Package'
              },
              {
                title: 'Серебряный',
                volume: '100–500 тыс. ₽/мес',
                discount: '10%',
                bonus: 'Бесплатный дизайн упаковки 1 раз в квартал',
                icon: 'Star',
                featured: true
              },
              {
                title: 'Золотой',
                volume: 'от 500 тыс. ₽/мес',
                discount: '15%',
                bonus: 'Персональный менеджер + бесплатный дизайн ежемесячно',
                icon: 'Crown'
              }
            ].map((tier, idx) => (
              <Card 
                key={idx} 
                className={`animate-fade-in hover:shadow-xl transition-all ${tier.featured ? 'border-primary border-2 scale-105' : ''}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardHeader>
                  {tier.featured && (
                    <Badge className="w-fit mb-2 bg-primary">Популярный</Badge>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon name={tier.icon} className="text-primary" size={32} />
                    </div>
                    <div>
                      <CardTitle className="font-montserrat text-2xl">{tier.title}</CardTitle>
                      <CardDescription>{tier.volume}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Icon name="TrendingDown" className="text-green-600" size={20} />
                    <span className="font-semibold text-2xl text-primary">{tier.discount}</span>
                    <span className="text-muted-foreground">скидка</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Gift" className="text-primary mt-1" size={20} />
                    <p className="text-sm">{tier.bonus}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon name="Zap" className="text-primary" size={40} />
                <div>
                  <CardTitle className="font-montserrat text-2xl">Пилотный проект</CardTitle>
                  <CardDescription className="text-base">Попробуйте наш продукт с минимальным риском</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                <span className="font-bold text-primary">Пробная партия 1000 шт. со скидкой 30%</span> + бесплатный дизайн упаковки. 
                <br />
                <span className="text-muted-foreground">Успейте до конца месяца!</span>
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Запросить демо-партию
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-center mb-4 text-secondary">
            Калькулятор доставки
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Рассчитайте стоимость и сроки доставки в ваш регион
          </p>

          <div className="max-w-3xl mx-auto">
            <Card className="shadow-xl">
              <CardContent className="pt-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base mb-2 block">Откуда</Label>
                    <Input value="Волгоград (производство)" disabled className="bg-muted" />
                  </div>
                  <div>
                    <Label className="text-base mb-2 block">Куда</Label>
                    <Select value={deliveryRegion} onValueChange={setDeliveryRegion}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moscow">Москва</SelectItem>
                        <SelectItem value="kazan">Казань</SelectItem>
                        <SelectItem value="rostov">Ростов-на-Дону</SelectItem>
                        <SelectItem value="leningrad">Ленинградская обл.</SelectItem>
                        <SelectItem value="volgograd">Волгоградская обл.</SelectItem>
                        <SelectItem value="other">Другой регион</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-base mb-2 block">Вес/объём: {deliveryWeight[0]} кг</Label>
                  <Slider 
                    value={deliveryWeight} 
                    onValueChange={setDeliveryWeight}
                    min={5}
                    max={500}
                    step={5}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>5 кг</span>
                    <span>500 кг</span>
                  </div>
                </div>

                <div>
                  <Label className="text-base mb-2 block">Срочность</Label>
                  <Select value={deliverySpeed} onValueChange={setDeliverySpeed}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Стандарт (3–5 дней)</SelectItem>
                      <SelectItem value="express">Экспресс (1–2 дня)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-montserrat font-semibold text-xl">Результат расчёта:</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-background rounded-lg border-2 border-primary">
                      <div className="flex items-center gap-3">
                        <Icon name="Truck" className="text-primary" size={24} />
                        <div>
                          <p className="font-semibold">Деловые Линии</p>
                          <p className="text-sm text-muted-foreground">для опта от 20 кг</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-primary">~{calculateDelivery()} ₽</p>
                        <p className="text-sm text-muted-foreground">2 дня</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Package" className="text-secondary" size={24} />
                        <div>
                          <p className="font-semibold">СДЭК</p>
                          <p className="text-sm text-muted-foreground">универсальный</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">~{Math.round(calculateDelivery() * 0.65)} ₽</p>
                        <p className="text-sm text-muted-foreground">2-3 дня</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-background rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Zap" className="text-orange-500" size={24} />
                        <div>
                          <p className="font-semibold">Delivery Express</p>
                          <p className="text-sm text-muted-foreground">срочная доставка</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">~{Math.round(calculateDelivery() * 1.8)} ₽</p>
                        <p className="text-sm text-muted-foreground">день в день</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    Скачать расчет в PDF
                    <Icon name="Download" className="ml-2" size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-montserrat font-bold text-3xl text-center mb-8 text-secondary">
              Часто задаваемые вопросы
            </h3>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-background px-6 rounded-lg border">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                  Минимальный заказ для опта?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Минимальный оптовый заказ составляет 1000 шт. или 50 кг. Это позволяет нам предложить вам лучшие цены и сохранить высокое качество продукции.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-background px-6 rounded-lg border">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                  Как быстро делаете индивидуальный дизайн?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Разработка индивидуального дизайна упаковки занимает 3–5 дней после согласования макета. Для партнеров уровня "Серебряный" и "Золотой" дизайн предоставляется бесплатно.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-background px-6 rounded-lg border">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                  Какие гарантии при доставке?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Мы гарантируем возврат денег при задержке доставки более чем на 2 дня от указанного срока. Все грузы могут быть застрахованы за дополнительные 0,14–0,5% от стоимости.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-background px-6 rounded-lg border">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                  Можно ли заказать пробную партию?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Да! Мы предлагаем пилотный проект: пробную партию 1000 шт. со скидкой 30% + бесплатный дизайн упаковки. Это отличная возможность протестировать наш продукт перед крупным заказом.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl">
              Готовы сделать заказ сейчас?
            </h2>
            <p className="text-xl text-white/90">
              Оставьте заявку, и мы свяжемся с вами в течение 30 минут для уточнения деталей
            </p>

            <Card className="text-left">
              <CardContent className="pt-6">
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="final-name">Имя</Label>
                      <Input id="final-name" placeholder="Иван Петров" required />
                    </div>
                    <div>
                      <Label htmlFor="final-phone">Телефон</Label>
                      <Input id="final-phone" type="tel" placeholder="+7 (900) 123-45-67" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="final-email">Электронная почта</Label>
                    <Input id="final-email" type="email" placeholder="example@mail.ru" required />
                  </div>
                  <div>
                    <Label htmlFor="final-region">Регион</Label>
                    <Input id="final-region" placeholder="Москва" required />
                  </div>
                  <div>
                    <Label htmlFor="final-design">Нужна помощь с дизайном упаковки?</Label>
                    <Select>
                      <SelectTrigger id="final-design">
                        <SelectValue placeholder="Выберите вариант" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Да, нужна помощь</SelectItem>
                        <SelectItem value="no">Нет, у меня есть дизайн</SelectItem>
                        <SelectItem value="maybe">Не уверен</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-white">
                    Получить бесплатный макет дизайна
                    <Icon name="Gift" className="ml-2" size={20} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-montserrat font-bold text-xl mb-4">ЧупаЧупс Опт</h3>
              <p className="text-white/80">Оптовые поставки леденцов с индивидуальным дизайном по всей России и СНГ</p>
            </div>
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-white/80">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  +7 (495) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  opt@chupachups.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  Москва, ул. Производственная, 1
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Партнёры доставки</h4>
              <div className="space-y-2 text-white/80">
                <p>• Деловые Линии</p>
                <p>• СДЭК</p>
                <p>• Delivery Express</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>© 2024 ЧупаЧупс Опт. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;