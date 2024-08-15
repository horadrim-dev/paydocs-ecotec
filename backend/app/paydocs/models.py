from django.db import models
from django.core.cache import cache

class PaymentDocument(models.Model):
    index = models.PositiveIntegerField("index", )
    gorod = models.CharField("город", max_length=512, blank=True, null=True)
    rayon = models.CharField("район", max_length=512, blank=True, null=True)
    ulica = models.CharField("улица", max_length=512, blank=True, null=True)
    dom = models.CharField("дом", max_length=512, blank=True, null=True)
    kv = models.CharField("квартира", max_length=512, blank=True, null=True)
    pr = models.IntegerField("pr", default=0)
    period = models.CharField("период", max_length=64)
    ls = models.CharField("лицевой счет", max_length=512, blank=True)
    fio = models.CharField("фамилия имя отчество",
                           max_length=512, blank=True, null=True)
    opl_tko = models.FloatField("опл тко", default=0)
    vh_saldo= models.FloatField("входящее сальдо", default=0)
    nacis = models.FloatField("начисление", default=0)
    kor = models.FloatField("корректировка", default=0)
    opl = models.FloatField("опл", default=0)
    ish_saldo = models.FloatField("исходящее сальдо", default=0)
    vh_saldo_pen = models.FloatField("вх.с.пен", default=0)
    pen = models.FloatField("пеня", default=0)
    kor_pen = models.FloatField("кор.пен.", default=0)
    opl_pen = models.FloatField("опл.пен.", default=0)
    ish_saldo_pen = models.FloatField("исх.с.пен", default=0)

    ad = models.CharField("адрес", max_length=512, blank=True, null=True)
    active = models.CharField("активен", max_length=512)
    tip = models.CharField("тип", max_length=64)
    itog = models.FloatField("итого", default=0)
    qr = models.CharField("qr", max_length=1024, blank=True)
    uid = models.CharField("uid", max_length=512)
    dolg_m = models.IntegerField("dolgm", default=0)
    
    soob = models.CharField("soob", max_length=5096, blank=True)

    vh_saldo_s = models.FloatField("входящее сальдо c.", default=0)
    nacis_s = models.FloatField("начисление с.", default=0)
    kor_s = models.FloatField("корректировка с.", default=0)
    opl_s = models.FloatField("опл c.", default=0)
    ish_saldo_s = models.FloatField("исходящее сальдо c.", default=0)

    itog_vse = models.FloatField("итог все", default=0)

    potok = models.IntegerField("potok", default=0)
    nn = models.IntegerField("nn", default=0)
    nns = models.IntegerField("nns", default=0)

    def __str__(self):
        return "лс {}, период {}, сумма {}".format(self.ls, self.period, self.itog_vse)
    
    class Meta:
        db_table = "kvitok"
        ordering = ['id']
        verbose_name = "платежный документ"
        verbose_name_plural = "платежные документы"



        

class PaymentDocumentSettings(models.Model):
    """Singleton settings model """

    tarif_tko = models.FloatField("Тариф ТКО", blank=True, null=True)
    contacts_html = models.TextField("Блок с контактами", blank=True, null=True)
    details_html = models.TextField("Блок с реквизитами", blank=True, null=True)
    annotation_html = models.TextField("Блок с примечанием", blank=True, null=True)

    def __str__(self):
        return 'Настройки шаблона'


    def save(self, *args, **kwargs):
        """
        Save object to the database. Removes all other entries if there
        are any.
        """
        self.__class__.objects.exclude(id=self.id).delete()
        self.pk = 1
        super().save(*args, **kwargs)


    @classmethod
    def load(cls):
        """
        Load object from the database. Failing that, create a new empty
        (default) instance of the object and return it (without saving it
        to the database).
        """
        try:
            return cls.objects.get()
        except cls.DoesNotExist:
            return cls()
        

    class Meta:
        db_table = "kvitok_settings"
        verbose_name = "Настройки"
        verbose_name_plural = "Настройки"