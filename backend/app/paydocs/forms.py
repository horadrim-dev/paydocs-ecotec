from django import forms
from django_ace import AceWidget
from .models import PaymentDocumentSettings

class PaymentDocumentSettingsForm(forms.ModelForm):

    contacts_html = forms.CharField(
        required=False, label="Блок с контактными данными",
        widget=AceWidget(
        mode='html', 
        wordwrap=False,
        width="800px",
        height="300px",
        tabsize=None,
        toolbar=False,
        )
    ) 
    details_html = forms.CharField(
        required=False, label="Блок с реквизитами",
        widget=AceWidget(
        mode='html', 
        wordwrap=False,
        width="800px",
        height="300px",
        tabsize=None,
        toolbar=False,
        )
    ) 
    annotation_html = forms.CharField(
        required=False, label="Блок с примечанием",
        widget=AceWidget(
        mode='html', 
        wordwrap=False,
        width="800px",
        height="300px",
        tabsize=None,
        toolbar=False,
        )
    ) 

    class Meta:
        model = PaymentDocumentSettings
        fields = '__all__'