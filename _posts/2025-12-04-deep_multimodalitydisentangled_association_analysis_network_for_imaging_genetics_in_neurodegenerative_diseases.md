---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOHIFAB3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQD%2FlELbXJAKbyzFTx3atMYQgIjwQvpUnR6j%2BYjjLTacxwIhAJ9GUZbz57YAFGKgabnV7gq5Dj5iRj7uGZ1I84mzqSShKv8DCAcQABoMNjM3NDIzMTgzODA1Igz8V7OTrrpP4eBMUvsq3AMVBpEV5kx7MtJfwLSIW2%2FltE%2FwapFNutsE6GQDgzgQnqBztWFAhTwvgaZVXvKKcRBS2FncwD4AidFCzksaio0ZxdlAUnFsgxRCyhoWerNKG9QBf7veEP6HwffTl2WvzMTzIT6h8EzKa7L%2FL8RSFPVNnU%2FnljQATw0YPEPT2Mb7to5JrHuXKJgG00LMeRl8cPKTJtZ%2B6RXjbcfqnvWuWuHvx03nk8iEUgmBAlWbgs0MNBZtUXbZSp2VyKvbK70WGI9L%2B6q3pSev8z5xjdPzTzshlR2e3MLVLELDpTowuQ0%2FpsfQaxQOdkZ41ztqi8jqsjsu0he18XIgXN9xsH%2FAiP818ir4XV8yNuRKMK6V0oNy69lbwbnif4c5EJT18Bx0uXAbce81iaONS9Oe%2Fe2DCvwpZJO%2BcnP2IOCYaDxk0DfnxbhnkgUSAbKdWp97PbTAT9TPmdXcU%2Bza0iIEEPZxtz9i63yIVulsVVT%2FztE%2FbAIVEMki6g5jLj5hFHcYKc1aDxvO%2B62YXW0VzJdgDzLw0RZXz2dNMBQiRsnC%2B2bhafjOuLXLt4eX%2B5gfs97HJVlBImlqE99K93pk%2FeCFegG0pp1uhtKhbytpxBnAfTTxBDR9Hn3R%2FDs1R0vwkE%2Bv0TCypvrMBjqkAVjB1HvvxQz0%2Bo1QEIgb%2BtsCFibSDOsOow21sd55uXIZDidWdsfmXlBzDQUzwlSUPLmhjom2v6hHZBK34eEy1fyoi8CBzBUNvU3QCS1pDqxRpHjFu5PwbghgQfOldKJ06qeJHhqYSgpKfUzlUD%2F6a258ZARIRC3pbxDLJeoPw5awNpzTibKwSmuNh1rHLGIO3OFOghaVLWqMS2Iy%2Bt6Wign6%2FIGA&X-Amz-Signature=a6cddd7f3604dbefc0c68025f18053a8891c4ac03fdd812e22ef6868d8e081b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOHIFAB3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQD%2FlELbXJAKbyzFTx3atMYQgIjwQvpUnR6j%2BYjjLTacxwIhAJ9GUZbz57YAFGKgabnV7gq5Dj5iRj7uGZ1I84mzqSShKv8DCAcQABoMNjM3NDIzMTgzODA1Igz8V7OTrrpP4eBMUvsq3AMVBpEV5kx7MtJfwLSIW2%2FltE%2FwapFNutsE6GQDgzgQnqBztWFAhTwvgaZVXvKKcRBS2FncwD4AidFCzksaio0ZxdlAUnFsgxRCyhoWerNKG9QBf7veEP6HwffTl2WvzMTzIT6h8EzKa7L%2FL8RSFPVNnU%2FnljQATw0YPEPT2Mb7to5JrHuXKJgG00LMeRl8cPKTJtZ%2B6RXjbcfqnvWuWuHvx03nk8iEUgmBAlWbgs0MNBZtUXbZSp2VyKvbK70WGI9L%2B6q3pSev8z5xjdPzTzshlR2e3MLVLELDpTowuQ0%2FpsfQaxQOdkZ41ztqi8jqsjsu0he18XIgXN9xsH%2FAiP818ir4XV8yNuRKMK6V0oNy69lbwbnif4c5EJT18Bx0uXAbce81iaONS9Oe%2Fe2DCvwpZJO%2BcnP2IOCYaDxk0DfnxbhnkgUSAbKdWp97PbTAT9TPmdXcU%2Bza0iIEEPZxtz9i63yIVulsVVT%2FztE%2FbAIVEMki6g5jLj5hFHcYKc1aDxvO%2B62YXW0VzJdgDzLw0RZXz2dNMBQiRsnC%2B2bhafjOuLXLt4eX%2B5gfs97HJVlBImlqE99K93pk%2FeCFegG0pp1uhtKhbytpxBnAfTTxBDR9Hn3R%2FDs1R0vwkE%2Bv0TCypvrMBjqkAVjB1HvvxQz0%2Bo1QEIgb%2BtsCFibSDOsOow21sd55uXIZDidWdsfmXlBzDQUzwlSUPLmhjom2v6hHZBK34eEy1fyoi8CBzBUNvU3QCS1pDqxRpHjFu5PwbghgQfOldKJ06qeJHhqYSgpKfUzlUD%2F6a258ZARIRC3pbxDLJeoPw5awNpzTibKwSmuNh1rHLGIO3OFOghaVLWqMS2Iy%2Bt6Wign6%2FIGA&X-Amz-Signature=a6cddd7f3604dbefc0c68025f18053a8891c4ac03fdd812e22ef6868d8e081b3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNLDRVSX%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCIC52rLAvjsh3tNTpmN2euzTL4qffZBpAIOAMVVNE%2BmDUAiAHnRIdZ%2BkZUFsW4yY51HkluKctX00c7k3w4b%2B0hVo3%2FSr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIM7GbjCEKdKTkg1W4QKtwDaNwNLrcxWTTUPNFM1eWd%2FUnV8xvU5hsKG2EdQyvPOni187u%2FMf5j0hVjLUijXu62YW6nmxOZ35LC8qAiA3pkMArU7m1v36l046ghXKqSGksXotwHu%2BVmfnai2BZ5Tep1%2FA3AlR37o%2BNUCz%2Bn2QDA9dHjoGBLML%2Bpa9gywOITD3c3Oj45Mel504KMEFz7tzCc8pjsbCfMr3KFcEnVw498iupJsque%2FzJYF3EJngsZJAYMjeQ5NlMMvDkJVz4%2B6q19CFRKfiW4iQJDDNUX8%2FwXEs50oO1xgmAiK7ZNntsojC7dwvwtET8zi6PkF%2Btuu0pjilNJH%2FhRRCUXAPTiK23Ma4cEVZAdnh3T6DpgqCMXVYP9crNVzBSee%2BKwQn14AFwnXAopmhD2wbCbtJRJxYsh1A8IfLIH4yJblmTa%2BzG8KqTJ%2FIsh90n1w1Y3j8QuEaV2uz1trtz2Zp9TulkNFLNX7NGbn8IcISjovbdPjoo3UsWcW0ME1oo%2BZU0QPFgl5ZjJktfGtUkF%2F2x75lWRJTmxs2BQDfE3JSztQqL%2Ft7uw7ivrZttZFAS%2FALgTQqw7RUWuUqTyDQiPCAA4FdqkHFGnjJGWsoZR5ar879MzbhMbfwFvt8svvAAFNTLS0nUw%2B4v6zAY6pgE9JL5FhAhFOVkqYjb4qMRo0ARsz5vjlvbv%2Fat0FFQM3uXkz3x8%2BV8eGAkt4%2BfEN66qHGPAURi6M4YnwCd262x6drijFOFvNhiqs7GnNLoehR09DV5LXOMptpHbFSdJtcPHd2dzDs0Cm3I%2FPXgdkK06XNaWIJxr3BehVLrgJRauIVmQnYbhmeiZ3TYK0o5fBytWDolhn9Tu6R031SHn8iEHF1yghJsV&X-Amz-Signature=fa56fd0501e2b4f325066e31c82000a236be98697bdd3832b429f1be3c053528&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HWGRJA7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIGtYVzu%2BIodTunjAQrTUZyyaKTZ5FDwcH%2B2yvcM22%2FHgAiEAzLdJQ%2BfMrgZ9xNIym0t448R%2B7R2396x5%2FF0J93OcIhoq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDJKdaMQ72lCqN8eacSrcA43nRxaUb5lBk%2FabgoYjTaeRXQ76qutCaIyRzU7T77Wsy6i8fsWXQuG5vcbHgnLgFxWyrpEZUUTGaVJDe74L0zEShet8VbeZoHK6lnhQZw9ICZO8t9LZThAreGOP4RKeag6GJsoot0lwxtT4mAKM571F8nly2Pz4tXYM07gkKWw%2FPV9quA%2Fl4jnvqZi6%2FNoVAkuS8tavWTm%2F9GHuEdmNm19dHagg%2B5s9%2Bu%2FW62A2cG6UhvnZiEH%2Focm2X72sapOog4QRvSN7bkIrObuRv7MA6i4g2OnfURnIJrqiHd3ZX5lOH%2B%2Br%2FGJ833JgKZQ%2BuBailhWTBtH%2B4yNXfMGzMGiNF1vfQ0LB5B7yaHCryTATGDwX%2FVkRHWI1K7sBs2RRIVpVkt0XwnRRBeMmI1nDQgwtnYRhF28ZbsdWlvwpCKGKMhpBt870LNZX6kXIhWA0b0BPzl%2B58urF2Ts1anyTx9P9gkqXMSQW5alokjV25sfRGBZY0zjdW1djgDVMbJ6rW0PtOvsz%2B1DWgqd%2FdEZJEHNN0R7OFrTZOUwa1V15NmobpWPNLySqRKOG7G2sbGpfwvkGgL8cG6WHYSNlmeuytp1K%2BvRncTQHsTfw6WBn%2BiBYRIpUmMTnCjFIrH5B9pTnMOKM%2BswGOqUBRiuM2VfJaqpzXiIoinmJztzVQhG%2BVTysEznAWU3TrSIfeV24rt5EHEDRsBe4eyQdoNBHmEJgYsmOIeqKunun2QOYZ0oelvQ3Ttnlt4qhIs%2B98Vqu8yATssIQjWF4pmIXsUeXM4t339NQWm5WcA%2BF4wye%2Bc2S9t7zR4ZD3aPuJBv4tR2Knm3pVpAMKrus50Khky9QtKxSqtNQJTZR%2BeUSz2sZLKQY&X-Amz-Signature=0768539fde45b9bf27c7148262bd3b6afa2355bb2f76eafdecf6750f606a30f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HWGRJA7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIGtYVzu%2BIodTunjAQrTUZyyaKTZ5FDwcH%2B2yvcM22%2FHgAiEAzLdJQ%2BfMrgZ9xNIym0t448R%2B7R2396x5%2FF0J93OcIhoq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDJKdaMQ72lCqN8eacSrcA43nRxaUb5lBk%2FabgoYjTaeRXQ76qutCaIyRzU7T77Wsy6i8fsWXQuG5vcbHgnLgFxWyrpEZUUTGaVJDe74L0zEShet8VbeZoHK6lnhQZw9ICZO8t9LZThAreGOP4RKeag6GJsoot0lwxtT4mAKM571F8nly2Pz4tXYM07gkKWw%2FPV9quA%2Fl4jnvqZi6%2FNoVAkuS8tavWTm%2F9GHuEdmNm19dHagg%2B5s9%2Bu%2FW62A2cG6UhvnZiEH%2Focm2X72sapOog4QRvSN7bkIrObuRv7MA6i4g2OnfURnIJrqiHd3ZX5lOH%2B%2Br%2FGJ833JgKZQ%2BuBailhWTBtH%2B4yNXfMGzMGiNF1vfQ0LB5B7yaHCryTATGDwX%2FVkRHWI1K7sBs2RRIVpVkt0XwnRRBeMmI1nDQgwtnYRhF28ZbsdWlvwpCKGKMhpBt870LNZX6kXIhWA0b0BPzl%2B58urF2Ts1anyTx9P9gkqXMSQW5alokjV25sfRGBZY0zjdW1djgDVMbJ6rW0PtOvsz%2B1DWgqd%2FdEZJEHNN0R7OFrTZOUwa1V15NmobpWPNLySqRKOG7G2sbGpfwvkGgL8cG6WHYSNlmeuytp1K%2BvRncTQHsTfw6WBn%2BiBYRIpUmMTnCjFIrH5B9pTnMOKM%2BswGOqUBRiuM2VfJaqpzXiIoinmJztzVQhG%2BVTysEznAWU3TrSIfeV24rt5EHEDRsBe4eyQdoNBHmEJgYsmOIeqKunun2QOYZ0oelvQ3Ttnlt4qhIs%2B98Vqu8yATssIQjWF4pmIXsUeXM4t339NQWm5WcA%2BF4wye%2Bc2S9t7zR4ZD3aPuJBv4tR2Knm3pVpAMKrus50Khky9QtKxSqtNQJTZR%2BeUSz2sZLKQY&X-Amz-Signature=dbefd3b7838331fd34c35c621a480e70e90568e49ff4d49582f48ae3d4ec9296&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4TW66ND%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQDq2GcnVDd32OOeV6rcfUtsMoQZ3ocf5Uz6vOyqOZpOCwIhAPaPrms6P7u1lbuLEjTvZlPVuE%2BDRCMKHeUEd54yzttxKv8DCAYQABoMNjM3NDIzMTgzODA1Igz10glDDxoqvbc4qzUq3APapkvr68exOHj8jNgpHvz6aAYc64MQYQj2W%2FsdPfQQBUN%2BkN8uy0z7DaSDiGJaVoTi3ZGQFRW3rBgIQXzy9dtT8M7nFrfuBoxPBUr9zB97El1porySjw4KGOHTvSx2zAFzXtvKgdD5xQdYah2OjQvC8cErUetTjdzS1GN1Ck%2FSlixvdUAa68bIn0VEN15d5mT6Z4wumRFlOuEG9896MPddheOPaeF%2FVkyzBdy5A3XooLpVK95o%2Bx%2FT67A62ftsYarDsreWKJmFkGxLkONdjyCongEaija8UmKzRx9LLNCfXp0zUzMS8csAVzSdbrFvJMHdj093oFu8hccxeDnFr4hcxs5LS4w1t0rjvis1e9q5kf4pfdsDdOvVEYIaCi2NkLcudXldKmzmOIqdSiNAsaAAHUhZPRBCoYi%2FyNysQ%2Bj%2F4woALbcEgxKpyEyRv05yK%2Ftd0zqNFTTwR4g8%2FsXrnD30GHSpYRCayI0Fwo9dhoUs39B2vfvOSBo35%2BBHnZT9Vhdx3oKCx1oHA0ZoNLSntCsSUpDiIiKXS%2Bff9Qm%2Fi8b6qgcmAZZAZWa9LSArZ6TWkhubwg7%2FtzZhCClsoXSZlKJNLRvnTUJYJZqORk47YufXFLZpq9DOwm9sXyP2FzCci%2FrMBjqkAVmpCqOeXCtYN%2FqNVVF8eOjn9QIll%2FvudpVTLu2c6k27yqZIYR5LHrJxyvHUO8AWf6EvCyYXgSJvrDuNpiw9V9Em5ktIIOYZ1c8dG9D5GOBqd3XU9zOjNG%2FBNDzBXy38kfeLUudE6sCxHuuIV3nBnOYh64Hj0vGpqMHHU%2BdIjlMPRqirZBul54cHzOj46X%2Fr9iFxwADNePcmSfqFI6NwcVPZUkIs&X-Amz-Signature=50080f889ec335b5feae1fe450817b4b8278aa40b8086863526c315f0f8ed411&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OXBZ73E%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIECxBwpvYmXhKGXIm5mnC%2FaagVekJBOXYusu7HhAGX%2BjAiEAkcvtrb3OhP7YEFXr75fyw%2F5mSAKnkvXL6FXMN3iJ%2FWoq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDBrbyhgdPLHNsGO5XSrcA6oghudkl8fLZ%2Fb%2FR%2FeMmkCrqxGXeoFNWy7CtDCSAOArOoRPe4erdFBK6RfyvoajvkcdePHbPuy%2BLwtf9XPs40QYFx3GvWz2wQSIi5ssM0kPNtOZpJa4%2Fix448SrQ4Mf6erN2nVHlbx92rcKXWiBeZEMHa5kH6XUVjjRF%2BfSbvB6qVAEaKbJN00K5WuskWJ5dj7VHf%2FSvkgLhvQ3xPfXxUlKs26%2F54ebD4nrdv%2FOoJHUasAOiJLBG8D95lvmydXT6IkE%2BxUJgKH0LOuOzK8J59xElBSzKt8ZX70vYbPrK5BBCPBH8lelAHAcdMK9YqEdk4Q%2BU%2Fzj20HfyCLXnXvZ8EmqwZfEMKgaBBEt%2FM833ECipnhX%2FQue74qpVR%2BtJi4cWBoRF8K58U9HP8d8s04hvkcHU3mkkXqB6mtcf0q%2B1%2Fqsvih7%2BBP2Zfykv6u3X%2BsgBWrTPSq5P76MXVR5m1tzS9MBG%2BzMmh%2BWBP2md0SU6A54632yjNpEotb9B6eK2cgM21NHwUTQKEiyZWtMGU65YQvZQhaY1oK%2B96887cjJvBzA%2Ff1DaKxUTUvnDut%2FIjofmJNQqMyctca9JRSIKyYAqa5HMUbNfrgOE12JvQvd0p%2FQxN6tpP%2BsTPQLUr5RMNKK%2BswGOqUBTQ5HiPiPazzfxM518rEXID536W%2FHW7VmXEWhuKoVAgPCOTnkcBWslixactYLucj06TZqn%2BJSxfRGuiRsKl67e84SgaF56bvpsSTpIWsHTsjl5HqrH%2BYc8Wj1spoN1JP14VUMzjEyCMAZPFLJa1pU6PVqrzk39zYlZ9IVpEGX7QXkt8aL%2BVAA8bGjwl92Ifg7wBM4s2QRKBnhxsRGkOuqWmswuIO0&X-Amz-Signature=fc6089b8d74a0f6d6d55811f9f6d49f96592ff1bf8d4b7b09b2d1341249c2c9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MF2WWZE%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQDV5k2bwIGm3BunOwHRK5rVNQw014XDqA8852hK28xd%2FAIhALFqyGIEgRssd5yNPFv1m%2FzYJkfQJMk5dn1gktSw7aqjKv8DCAYQABoMNjM3NDIzMTgzODA1Igx%2Fd1D2ZigBvgsyOr4q3AN9vg3f9e%2BJey%2FGTZwawIa2I708EaXJPSqid3nS0RJLI0oEMe046r8lpk%2BgtSbm6RMcpkUWpFk99DlPADoLT7NuTwdYiheU9kUVvUBfKYko8nll3198BaLtGmuWGnuob43wrgZ8KfGQ6nO4VDL47LrhbD0Gghko29cUP5p6KHZbQLs7G99GC0XVQtU8LDLmpX5y6rkxTP1XhWicfyjRDYJ6IFI7%2F%2B8iyRBBju67Nkj%2F4WvVZrpVf4HlOgUZSXpjemGa2XxyOpEjF2yZAfeijcTXlMDhteogw%2BOTbwVEBBEhvDJJJ3I2WJB5D88nZUYiRCOELDRU%2F5k58LSJuYrDWGQ7Rqyv7i3tHJaIYAHrGANLHx%2B7ZBYTEnVDR8XRL8BKqVbZvDDWWloC0QZ2TBGhqFZgzTeFxEiKa80DGjcvrpPV2CC3dprI5aSh2eCUZ5Iq2HTxuR%2FpTbanFANxYPD2F8%2B%2FImYnD%2BwyuzJ6icpB%2BWmzP%2BXSsuaQhobrJZg%2BRCrwD%2F0bbUnfRmvempPDk3N87%2FfPS2WTQPZlb382H%2FQY5JrZv6YQdVo7CnivEm2qlCUDBGpfwKzJtNpYOhxyWXAIiaO24McuUffIpyltDSvU5Xov6S8MmCZrWcnPD6ocUTCNi%2FrMBjqkASd8k1DQM29wRmONgMP938v6dPKCGNYNFpjAvQu3FMKpwKYmwoPTcISmTW7O3S%2BljzciPkvP9jPtMW5ZDZboFpLdoHmzsBA23LcYnfB3H3b8CUm0%2FcCQWB0jiXPHoFdQNT9OLyxKjA0xWGGZeZ7XlWfEoEkcLkhDjgVqzwc9xJGD90D8%2F%2F0A9Er8gFgehgKHvMiGqeuUuZVPZ6VKsQKy4obffwAd&X-Amz-Signature=cc1e1257b5de0cf7724287ab95e5bf56ea2eefe05cc14d68a5935842c44dfcdc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGEGXBVW%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCICytEP25NMGR3Zenw%2BNgGr%2B3JvOJRU%2FsfMkErQMmdPFZAiEAiJmNR%2BtCL6cv14jcfYOmFH78J3UF2JQIWBB3o0w%2B3OEq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDCzI842igYQv%2FFpxFyrcA%2BispwFS%2Ffz5be0OhF1%2FBoBa%2F3UMKOQJmhcmAnQ3p8RRlWdX0chTZsLuLvKQiEGxFaL5oZ%2FW1d7iSynLYFdTR3%2B3HAyarC%2FZUddpu9HSor5C469VVtdq%2FnCgpdAFZySZl3TAJq2znO%2ByVeX7%2BcRKTxRPPT4A60lmy2PWDoPeeIAT8fMdEJyRn937U6r%2FYMI8WF7b0gNrNBGzWHrbDDa7U%2FTk%2Bf0M0dsZC0o7x2Zjx%2BPtjMDx0l%2BfFIoZ%2BxvEHjX3nJNtPkE7vJ2OJkRl%2FPUNAJhdQeaaTzp4YmpXrym1%2FV5B4jwWjkiUUTypDmSy%2Bf%2Fm8AQC1y4pq%2Fj3Te2Sh43tuZMSfAWdOf1IbnI1oWiG3CF4tfD1vjTLCI69FOGAv5fJwIXEoji48xnRw4PeUSskHzARPajfnfyYKMLNgLMZM9GZ0%2BkXinO8DGpKUZRN1YIxMIZirj6ljA2%2FX5%2BrqOLWV3EKU8LA6evKlbQIHzWi%2Bwik2HYjGuGQtzZ7q7Zk6FjrzhSVaVep5OHUz7IHmztDQ5t%2F645R2TAeWF1doI2vU%2BO%2BjA22Vafo8xTD0hF2o0diKQr15j8Py%2F54NKsVAyoACvTkz21P25oqHIIPDyaibODuiE%2FQB8%2F1GkeXZACUMNSM%2BswGOqUBBWqPsIdSkiu2Dh0yR5Hanwpm1R9yiL0GAJgFaPNL%2FPSUZrGIYPA39VhjuqDiigVm1O2nyqrFDyYUqGyhrNpN8qVnH5Wqq8v6WgMsSJlVF9M4J8buZO9lzFgSrwq2hT1WzD3pWzVkLTFbS3LMaumXr%2FysO8rxtO0XSl1fPX6LV8vQWwwgrZHwOrVAgZYHpWu96NtOC0x3kTyWEaHx6WxU3bKXwoRq&X-Amz-Signature=ce6fe1430fbdda15d40998048caba07cb12c92054bd5eb3c26c0772a2a1de966&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGEGXBVW%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCICytEP25NMGR3Zenw%2BNgGr%2B3JvOJRU%2FsfMkErQMmdPFZAiEAiJmNR%2BtCL6cv14jcfYOmFH78J3UF2JQIWBB3o0w%2B3OEq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDCzI842igYQv%2FFpxFyrcA%2BispwFS%2Ffz5be0OhF1%2FBoBa%2F3UMKOQJmhcmAnQ3p8RRlWdX0chTZsLuLvKQiEGxFaL5oZ%2FW1d7iSynLYFdTR3%2B3HAyarC%2FZUddpu9HSor5C469VVtdq%2FnCgpdAFZySZl3TAJq2znO%2ByVeX7%2BcRKTxRPPT4A60lmy2PWDoPeeIAT8fMdEJyRn937U6r%2FYMI8WF7b0gNrNBGzWHrbDDa7U%2FTk%2Bf0M0dsZC0o7x2Zjx%2BPtjMDx0l%2BfFIoZ%2BxvEHjX3nJNtPkE7vJ2OJkRl%2FPUNAJhdQeaaTzp4YmpXrym1%2FV5B4jwWjkiUUTypDmSy%2Bf%2Fm8AQC1y4pq%2Fj3Te2Sh43tuZMSfAWdOf1IbnI1oWiG3CF4tfD1vjTLCI69FOGAv5fJwIXEoji48xnRw4PeUSskHzARPajfnfyYKMLNgLMZM9GZ0%2BkXinO8DGpKUZRN1YIxMIZirj6ljA2%2FX5%2BrqOLWV3EKU8LA6evKlbQIHzWi%2Bwik2HYjGuGQtzZ7q7Zk6FjrzhSVaVep5OHUz7IHmztDQ5t%2F645R2TAeWF1doI2vU%2BO%2BjA22Vafo8xTD0hF2o0diKQr15j8Py%2F54NKsVAyoACvTkz21P25oqHIIPDyaibODuiE%2FQB8%2F1GkeXZACUMNSM%2BswGOqUBBWqPsIdSkiu2Dh0yR5Hanwpm1R9yiL0GAJgFaPNL%2FPSUZrGIYPA39VhjuqDiigVm1O2nyqrFDyYUqGyhrNpN8qVnH5Wqq8v6WgMsSJlVF9M4J8buZO9lzFgSrwq2hT1WzD3pWzVkLTFbS3LMaumXr%2FysO8rxtO0XSl1fPX6LV8vQWwwgrZHwOrVAgZYHpWu96NtOC0x3kTyWEaHx6WxU3bKXwoRq&X-Amz-Signature=cc9a57b41270fefab1a02a0834b28ad31ddf4db94e851e4a7144f7875b6804e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664J3TSWLQ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIAwdku7F2pCDpUxqJu3Tn39Ax%2Bmyp%2BKK%2FPEI8pph%2BIkeAiEAh3sqO8Hk0kUtTG7%2Fy8d7eNU9XpaWPuTECCThHneULx0q%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDMmf73UdgEv4Qp1zPyrcA4BipfgomcKonD3EVW%2BSyrS3kJGTCMFSP%2BUgAQ35UOmISVEKWfc2vHiAQoeb5QHy5WglH%2BWqstmM3pOe7okr6aLWPXVQ%2BU6RWxl%2B21T0fz%2Ftc%2BqNM9PHV4Wpb37FnsR2ADlMZs8HAwL5ruIUfac5R8Q%2Bv73dzSsDaotXRCUc6f9a1sa9LPWqIqeMf%2Bpy80%2BhxCt%2BVRQEHuxuJ0W4BVMOJ0EY%2FUT7HpN95CPBso72Dr3AexDxeyB7ZLfBomQtt6WiaAAEWl9Q0NEP1QJYP3lZUQeVTzaMBrNtVEm%2BjuHlcaSKqL5gKvbEUVl930qAvfZRs94J2SFVMXmqLU2qDUSybwaw%2B7LsKN8bLMANh7cEfAcvlzycc7EVucCGcEp0ocJny8sjjEq80nFMr0vKv8rfSeRHJMDkQsuORqM1Vu9EVw4c8jENA5IGEVbdOTHubNKeRo35iE%2FH7716%2FHLhiE%2BfVu8H%2FKw%2FJghhFj0LxDmmS7zvWPS4egiRK1puJ5znvAA92hIckAB%2FBDHSZZhBxKhAJ%2FbTIwae%2F6PcmpOSYLyGstPgUdT2W7VCyjDsrkxgKtzDJlIAZdIBXxYxwlxywzeJ6%2BdNMxBGmKFrRWFXtslJR1Rwu5Moz58lYhmj9FeoMKmM%2BswGOqUBTF4fqwGXkQZXbtFyEP2V8Gm5KF6iPQQ9hib94%2FIzdeYHu%2BqUTjeD16KEn9N2uvUn2HzRw1Xd4LMiGdIUS7twhtsDsDY%2Btast7bzLrpKDOGYNEYYWzAdQ8d%2FvIesTBD6bQDovaJ4SI8dJ4whv%2B%2Bcxsj5PzlRTqL6AeiEjlb%2Fq5AtmH2o%2Fd8nVGUmvYRxwDu8XoRdHZFRzXCKDCzmzCOMjB8f%2FaWx%2F&X-Amz-Signature=d91c4e06e14c4d213999b76e1e8420773ed8899b3d62df654669b22035c05188&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYQHJ6ND%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQDUX8vbl5XFqGt2VCHlfvnbIdCRASM%2BbHt78vhkeSGCXAIhAKV5xFhaKbIMoqnUxQL5D6jWwCeVv%2F9xHZAcW9nrNp6qKv8DCAYQABoMNjM3NDIzMTgzODA1Igy6MeAXM11xKGXivToq3AMekws7Lw8ibn1hBeQp3r5yAX0YW4xXW57WQSW%2FSPG9VZCA%2FnrNfWCrgBqe%2FxdW%2B0ITulx2sWO3m1zpYUDIefCsFNyhN6emPJh2O%2Baf%2BNRO8ztPkkSiHCzrS2Z3FGVqFL5oqlsr1vIqa4O0hV0BWOmj8z1QOup7e2HhNx9A4jGy6ybtezpPq00oTT2ZG9gYoPc3djDENlZsdQ6T%2FOWv3QJhKG3Z2mtsBIqVDC3unY7SAiqi6EKEYpMvPiCKRRJ5Q%2FC%2BaXcOjLMVmG7CCfcCLa9vBvAtG%2FS58zDhGqbeC%2BS4hMpduBcgVVZEfsl%2B4%2FkHAqt88Q9qbEsVAPZBckYvOxMvBMwQxzEber5w%2BfjvhexAkgaW4LQMuv4eCXkNWLI8%2FlhU2vXC8evWfHgSad%2BAMg8Ekk4qg%2FCyaXDYtV3s9q%2BUEwe1sX7NafOqLX5Mj%2Bv7LW3MmnTPjdRoYHiUrObI6ylBraiuS9MrpJDUTQvAOr%2FQ0xHlUoGgvxKTXodY1I8hYZT7YfCz6tZwUogPBN8mQmrkWUWYHqfZLM1m5ao8rMbxS45IqUmwD53REgcgNJDEZKJWOdrehFdpvJU6xzOEI9dPnlxaigZH36sVgsOPo9H5yKv%2BCRtjUa1x2dgX1zDKivrMBjqkAb3%2F6Wo37avQjVHIbl8S%2FBZ0lkM6pxf%2FMe95Xn7kP9mAre6O%2BHK821d5jL%2B9kQ4ByGUpjVycCgEEnqcVLhvcM2Hrhi62EYjhg%2FrkHZ2rDbid2KgPc4dHdmVUScMrzBilVQ3ZIvzmTsZ1zqPguK1%2BsMhcAB0Lmt%2BWlrSkzDqyjwT%2F1Gt%2FbWZtzOmXIU3x7Cb%2FbOql3I2EnpG%2F%2BSFyggHWwZ5O%2BQiq&X-Amz-Signature=68bb901775b8e6f1ca27522a0b863cccf06a01c3e2af73bd3d8d0bbdf45d5951&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYQHJ6ND%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQDUX8vbl5XFqGt2VCHlfvnbIdCRASM%2BbHt78vhkeSGCXAIhAKV5xFhaKbIMoqnUxQL5D6jWwCeVv%2F9xHZAcW9nrNp6qKv8DCAYQABoMNjM3NDIzMTgzODA1Igy6MeAXM11xKGXivToq3AMekws7Lw8ibn1hBeQp3r5yAX0YW4xXW57WQSW%2FSPG9VZCA%2FnrNfWCrgBqe%2FxdW%2B0ITulx2sWO3m1zpYUDIefCsFNyhN6emPJh2O%2Baf%2BNRO8ztPkkSiHCzrS2Z3FGVqFL5oqlsr1vIqa4O0hV0BWOmj8z1QOup7e2HhNx9A4jGy6ybtezpPq00oTT2ZG9gYoPc3djDENlZsdQ6T%2FOWv3QJhKG3Z2mtsBIqVDC3unY7SAiqi6EKEYpMvPiCKRRJ5Q%2FC%2BaXcOjLMVmG7CCfcCLa9vBvAtG%2FS58zDhGqbeC%2BS4hMpduBcgVVZEfsl%2B4%2FkHAqt88Q9qbEsVAPZBckYvOxMvBMwQxzEber5w%2BfjvhexAkgaW4LQMuv4eCXkNWLI8%2FlhU2vXC8evWfHgSad%2BAMg8Ekk4qg%2FCyaXDYtV3s9q%2BUEwe1sX7NafOqLX5Mj%2Bv7LW3MmnTPjdRoYHiUrObI6ylBraiuS9MrpJDUTQvAOr%2FQ0xHlUoGgvxKTXodY1I8hYZT7YfCz6tZwUogPBN8mQmrkWUWYHqfZLM1m5ao8rMbxS45IqUmwD53REgcgNJDEZKJWOdrehFdpvJU6xzOEI9dPnlxaigZH36sVgsOPo9H5yKv%2BCRtjUa1x2dgX1zDKivrMBjqkAb3%2F6Wo37avQjVHIbl8S%2FBZ0lkM6pxf%2FMe95Xn7kP9mAre6O%2BHK821d5jL%2B9kQ4ByGUpjVycCgEEnqcVLhvcM2Hrhi62EYjhg%2FrkHZ2rDbid2KgPc4dHdmVUScMrzBilVQ3ZIvzmTsZ1zqPguK1%2BsMhcAB0Lmt%2BWlrSkzDqyjwT%2F1Gt%2FbWZtzOmXIU3x7Cb%2FbOql3I2EnpG%2F%2BSFyggHWwZ5O%2BQiq&X-Amz-Signature=68bb901775b8e6f1ca27522a0b863cccf06a01c3e2af73bd3d8d0bbdf45d5951&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AM6PYZK%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T083232Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCeOUaWC0aF9i%2B%2Fp8Bcc%2BtBVAPh8FsFUHH7M4Wbk3iO4gIgQkuq%2FKzg3bszfa%2FHAgLurMvuIhGVarAR%2BSaMQIj6i38q%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDCN65jcDapw6A8JvJCrcA5Vtxcbg8%2By0%2FwoXFeoxRnB1ofwDqyU7HDMr7hYRn41epysz5v2dLFjAhCaFQky9kSpxHl%2BN8Rjc0tBUO6ic%2BZbHU2SRS07%2F7TfrpJa%2FnZN6zRWijXMD2ugXwGQ8ZG9iOC%2BCD1xv0D5lu%2BmtVm3rJVl%2BfA%2B%2FXajt%2BrrlfhTXAuTan26A8CSqRRlFX%2BSMjvVxtG7K9%2B9Dhbt6v6Tdu1k8%2BxLT6FulLB0dhWCIBVFehnNVPZDhv7Txue1tmx5yJ8rUe%2FVwT%2BIqV9tx%2Bn4uT0XDQgMcorb1hNKOyOvnFyT0fW2D1D1%2FUqrOys%2BGH8L2Nn1q7X8BdAVhopY9bq8DQUpfA6%2BM6O4x2LxGqORRm4k3f4RIa5cRBRLgvhwKcuK5cdTqzcqTcQJrHWTUhvG4ke0LoXAwk9t6HldBTO7o%2FuPlxJyQh5PNeup4cT5bhSBodMqMHZCHt5eieuBLsEUj9Vw1V5VhJXvHhoS%2B3zUDxciYXBw9Y1adRNLnJXKBUGb3ZrDgXrLC36YOJhrcUOKwvIFzNKE5Yd7GIGkIK04ti2E3q7ZXO4GHM8ooOsIGqapf9VuKhxzcpjrdYvxcNCxxiu6IyEAPofZWu97TKiS1v93Zajk4O4aFkF6G5hHP2gRAMPWh%2BswGOqUBKXC5uAv3J518C%2Fe5S7efg5D8NmD8Z%2Fk5Wu6s8K4r1JxOk2eMrvCrHnwkTXdTXoEU4MZ9t7brgDLi64l1scFv4BXi6mq5LF467cO84mi7tExPxq2THZKwh39KN%2FoufOFar9m56NkPsU3KcC8qw7yDg87CbTa%2BtiyNYNbNFto%2FlrfxIK1kRRKNR%2Fk1pRsdfNVSmJ19cVVwk2qaZhcKHJaSeDpw6Kdq&X-Amz-Signature=2c97dd98509930de207adefa94cf2a1594203aa48ba2cbdad2d3074fc7fc0da1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

