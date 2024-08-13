from django.db import models


class DebtorBase(models.Model):
    kv = models.CharField("KV", max_length=512, blank=True, null=True)
    ls = models.CharField( "Лицевой счет", max_length=128, unique=True)
    fio = models.CharField("Фамилия имя отчество",
                           max_length=512, blank=True, null=True)
    otk = models.CharField("OTK", max_length=512, blank=True, null=True)
    zak = models.CharField("ZAK", max_length=512, blank=True, null=True)
    dom = models.CharField("Адрес",
                           max_length=512, blank=True, null=True)
    pr = models.CharField("PR", max_length=512, blank=True, null=True)

    def __str__(self):
        return str(self.ls)
    
    class Meta:
        abstract = True
        verbose_name = "должник"

class DebtorMyski(DebtorBase):
    class Meta:
        db_table = "ls_myski"
        ordering = ['id']
        verbose_name_plural = "должники (Мыски)"

class DebtorProkopyevsk(DebtorBase):
    class Meta:
        db_table = "ls_prk"
        ordering = ['id']
        verbose_name_plural = "должники (Прокопьевск)"

class DebtorKrasnobrod(DebtorBase):
    class Meta:
        db_table = "ls_krasnobrod"
        ordering = ['id']
        verbose_name_plural = "должники (Краснобродский)"

class DebtorKiselevsk(DebtorBase):
    class Meta:
        db_table = "ls_kiselevsk"
        ordering = ['id']
        verbose_name_plural = "должники (Киселевск)"



# при наследовании от DebtBase сбивается порядок столбцов  [важно для заказчика!]
# порядок вручную задан в миграции
class DebtBase(models.Model):
    period = models.DateField("Период")
    nacis = models.FloatField("Начисление", blank=True, default=0)
    korekt = models.FloatField("Korekt", blank=True, default=0)
    pen = models.FloatField("Пеня", blank=True, default=0)
    dolgsud = models.FloatField("Судебный долг", blank=True, default=0)
    opl = models.FloatField("Судебный долг", blank=True, default=0)
    sitog = models.FloatField("Сумма итого", blank=True, default=0)

    def __str__(self):
        return "лс {}, период {}, сумма {}".format(self.ls, self.period, self.sitog)
    
    class Meta:
        abstract = True
        ordering = ['-period']
        db_table = "kartdolg"
        verbose_name = "задолженность"
        verbose_name_plural = "задолженности"


class DebtMyski(DebtBase):
    ls = models.ForeignKey(DebtorMyski, name="ls", related_name='debt_set',
                           to_field="ls", db_column="ls", 
                           on_delete=models.CASCADE)
    class Meta:
        db_table = "kartdolg_myski"
        verbose_name_plural = "задолженности (Мыски)"

class DebtProkopyevsk(DebtBase):
    ls = models.ForeignKey(DebtorProkopyevsk, name="ls", related_name='debt_set',
                           to_field="ls", db_column="ls", 
                           on_delete=models.CASCADE)
    class Meta:
        db_table = "kartdolg_prk"
        verbose_name_plural = "задолженности (Прокопьевск)"

class DebtKrasnobrod(DebtBase):
    ls = models.ForeignKey(DebtorKrasnobrod, name="ls", related_name='debt_set',
                           to_field="ls", db_column="ls", 
                           on_delete=models.CASCADE)
    class Meta:
        db_table = "kartdolg_krasnobrod"
        verbose_name_plural = "задолженности (Краснобродский)"


class DebtKiselevsk(DebtBase):
    ls = models.ForeignKey(DebtorKiselevsk, name="ls", related_name='debt_set',
                           to_field="ls", db_column="ls", 
                           on_delete=models.CASCADE)
    class Meta:
        db_table = "kartdolg_kiselevsk"
        verbose_name_plural = "задолженности (Киселевск)"