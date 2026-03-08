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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YAHY35J%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIG7PZXMSu05b7K6S3%2FSDVqlkbhWmVDEs%2BKAdIDee0JbtAiB4YUVi1lt9ESE%2FFRvRHSixhlK1jdHqFB3kgh2xNzwGByr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMs2rG6wCKX%2BW2vLdGKtwDsWDrfkAwWpTbF%2BhYy4zZYEiuF2Q5o8U%2Bx5%2FGzppm9PoTGlv4Mccn4deUFEb2%2FCUu3EuD64NP7Xl%2FISsqzISQnyVh4gt%2F%2F5uaBWPexkmbC2isN0TbL6UIkoA1shVFeA4S1gViBwQfn3VZAb6BjXK6b9n3ze%2FRXjugGwBs8d%2F2%2F03cBa058Zb37aLLpTtpcNcsyePFFNnoD3ypAD%2FRT%2FI3hX08yFv%2BcZeyuX7XPL8FdyXwl0TH84F%2FhpWrhRXypLnjsY1b%2BF5enbApineGT46kdWj%2FmMAS5A0cd0sfLdMpODZ4EUM13ilIgnqju8iTnw%2Bhv1Ntgg8CYvyS3neKW%2FqOq1YiixpsgTbTJRYmG%2FVuTvRjltO1YypMDENz2gQ03BjAbYJH7QSM0oAzcR0p3gA7iedoxxaj2wQPV%2FKF1ALIZUWZEoi6CLF7c7rqmDuM7ghdMqFH9dy1iSb5VOB2iWkRUCNhbi3J2vCMU6mrwTX88LTtdgulm2leNudpAQLYZtea%2F%2Bgrx7JkIr0B0BLeEYVN3YCpQgeEM0U19D5WBo9yyqUxMYV4PRGsd2cqdbp8bBWl1MNqho08e3TxHkqZPjprQMOOuRkbNy2HNgLFYPkHpJqRLhimpU%2BVT2DXSrMwtti0zQY6pgFA%2FxLr%2B%2FVAOrdDhprt%2FxyKyev7DYA0JzcSllXio5JZW7B0XpAwb3PA8Ut0VqGOqiZEH1D3IjvKlK%2BKSh9a9B7lbRVCBQfUNCpmSZ5F7YATPE9zO3f7cWbc9nO3bCeUqCgTvTF8zXxDG39yd55rvm3S3JRriphonjXxWXmScIovp0JrE2Sim2XIFYDnzFiRtBdkX45x3pnBA0QTr0FT56jDhx8cd4Tj&X-Amz-Signature=faa3a7b8216717b99ab470b10a731bf160bd6f72158b5d9e3be332addc1fb78d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YAHY35J%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIG7PZXMSu05b7K6S3%2FSDVqlkbhWmVDEs%2BKAdIDee0JbtAiB4YUVi1lt9ESE%2FFRvRHSixhlK1jdHqFB3kgh2xNzwGByr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMs2rG6wCKX%2BW2vLdGKtwDsWDrfkAwWpTbF%2BhYy4zZYEiuF2Q5o8U%2Bx5%2FGzppm9PoTGlv4Mccn4deUFEb2%2FCUu3EuD64NP7Xl%2FISsqzISQnyVh4gt%2F%2F5uaBWPexkmbC2isN0TbL6UIkoA1shVFeA4S1gViBwQfn3VZAb6BjXK6b9n3ze%2FRXjugGwBs8d%2F2%2F03cBa058Zb37aLLpTtpcNcsyePFFNnoD3ypAD%2FRT%2FI3hX08yFv%2BcZeyuX7XPL8FdyXwl0TH84F%2FhpWrhRXypLnjsY1b%2BF5enbApineGT46kdWj%2FmMAS5A0cd0sfLdMpODZ4EUM13ilIgnqju8iTnw%2Bhv1Ntgg8CYvyS3neKW%2FqOq1YiixpsgTbTJRYmG%2FVuTvRjltO1YypMDENz2gQ03BjAbYJH7QSM0oAzcR0p3gA7iedoxxaj2wQPV%2FKF1ALIZUWZEoi6CLF7c7rqmDuM7ghdMqFH9dy1iSb5VOB2iWkRUCNhbi3J2vCMU6mrwTX88LTtdgulm2leNudpAQLYZtea%2F%2Bgrx7JkIr0B0BLeEYVN3YCpQgeEM0U19D5WBo9yyqUxMYV4PRGsd2cqdbp8bBWl1MNqho08e3TxHkqZPjprQMOOuRkbNy2HNgLFYPkHpJqRLhimpU%2BVT2DXSrMwtti0zQY6pgFA%2FxLr%2B%2FVAOrdDhprt%2FxyKyev7DYA0JzcSllXio5JZW7B0XpAwb3PA8Ut0VqGOqiZEH1D3IjvKlK%2BKSh9a9B7lbRVCBQfUNCpmSZ5F7YATPE9zO3f7cWbc9nO3bCeUqCgTvTF8zXxDG39yd55rvm3S3JRriphonjXxWXmScIovp0JrE2Sim2XIFYDnzFiRtBdkX45x3pnBA0QTr0FT56jDhx8cd4Tj&X-Amz-Signature=faa3a7b8216717b99ab470b10a731bf160bd6f72158b5d9e3be332addc1fb78d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4B54Y6O%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIChgZqD%2FL8uNEyLjRgyJD1K1S792QdNuP6TMNos6UWqtAiEA%2BGYC%2F2LOQj0w%2FCoj6FBk1rMO2okSbaRn3%2Fh1toHcohgq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDHSNgvPOrjPs1zatbircAwa6oE5V6Zt3QdcJlbEgSPROZ2VK5%2BaatiPWSm6NxKKkoK9gtOZmwVfaFwHlGCUh0nEDBzhJmYTljcS%2B2VoIGd0uoZiNduIvurxgWplSJVnl9lBhCwudeuohaVhxqtwpekqwlamL2B1q9l%2F9KxINBQIQppo7AIK%2BBDdemW5MB4lWNeTN%2Fzr9cKV%2BLjsxQ%2FtgQgjiOdxNjQwsHme2eLFpddvMuOsXLya%2Fa%2F2qOixJA%2Bq5YQgHmpowIR40%2FI7chuKFAQm7Md5PDYVeONzKqio1rv%2FgTqmqd9mxZVLPy75qysHxa8z6N%2B2S%2FQ2AhA%2BXvjnJg%2F2EtZWoZvlzStTrOaarT3GpyObSLTLeBtxWJcp9wgC3fKvXZRoF2ykSzEVrhhbCElei6C%2FjHJkZvrzv2fm3KvjRFViysd2Agqzulg2JLw8k84CrzfKSOL8RqA%2FnSbJt1mpqqsb1SWwEg6Q3sibPRvRnKHYd7AdUM7Hr6HU%2BfOJCx9fwyKOR5GcQFaM6Aqvsx3oDhdLPI9As2CdRj9QuRzOpVZXU3SNcOjxTkqY3%2Bn4Ha%2Bx8CR20updfLDvwyylW4V3kyCLqlQ8KsT%2BRJ71lyiwExPtrZmbiImOehTBSv1y1YlNOVICBB18OpWdLMMvXtM0GOqUBMes2lQoV25C7BT%2FMlRa7v6MGi6Uuv22cW5nHtr38PrQxeox8N6sTlUUTRKSvAsEbP3BFubsvLjU4aLsqV8asTVeZ4xvCl8k%2B4WaBwtQTqmaQbYl%2F%2BdsdWVhkD1ZggiYP31gynsn39FwZ7YSmduLnkyOkvc2etzP77GnwcOQO8qsv7PKmChc3PqlXCWupcdjJZl5m%2B9XuDa826ChgtpvIkBlkUft0&X-Amz-Signature=5282402530560c6271b10652c0b4e1feed696f09add7252582ac1c23fd212209&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WGNTQ33%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQD99tS461SAxSihdmu3%2B8AQRdXVkHsq4xFkAdoQL0IUWAIhANYhD0lOr5l3q61VR%2FnyVdV%2FMwuvjSF%2F9ZutkAwcltauKv8DCBEQABoMNjM3NDIzMTgzODA1IgzBZGZplVInfz2mlycq3ANcZW0TpivjKx4OJSrq1fwHbgrD9MhX7QHd1Mv0UxVcPrE7hEvslwMTnAAEC9XPQcc5q%2BFnw%2FjuPhaxfj248khoW9qJc40Szs96iy7XKFXEHp6PEt%2FZ60q2WwL3nscU7doWhSuE3kBMUsuP02vZLQr7fnFMfqMDcdn5WZGtTjM%2FzKMPxzhbshT9nTK6tRGBr%2BzdhsntB3h3o0YSS3y%2FnDL63%2FJBmX8scvYZA0yT6fFORPAul%2BamyTXswFOCmHk1VsKFMMEDIjvaSAtUVOPZgtWcQMYkDqtfiyg1v0CiHxfT9JyYsy7GCHmvpf3z6tpckqm%2BCR2svGfZ7ujs%2FTIIjbtX%2BVp30VeBZ6OVr1sfHa3EOkOUUPt4TM%2BOdPBCUH31q7akC028IiNDMJpGGNj1MKokey6GYMh4IrA7e1a%2BiVkT3XvL0ZgMg6BLyIv7WAwcqO1X8FeWlxqT01xRcVWjAEeNYwretOV8UhMmXTp1Rw0c5M7TUCIRPpQgRNpLIelRj5iEWTcGojZpaQoTJ73HLXmVo6aJ5Uz69MIcg5%2FEclncYQwWOIJFnFjA%2B1G5ikC2u80HkxPji3A%2F5YVmdJ4P5SxCIy2BPrj1cR22Za5ncFdeFtYPYM8D3xxd7iDVTjDN17TNBjqkAXZR7w90uIE97%2B2qJES4K%2BlZXYv2pqzxDPEFWIaafeRm2EiQq6GpenPOjmoc72LMkhcd9duCcEJ8eAqvdIaIuBFnnd7E1CnjppgXqaBg%2Brm9ziHd%2F1AOODZ7bL2UzSxupj6JwI%2BX2%2FEkt670N5lB6KxQafXOfnIzSqFS%2B%2F%2FuN%2FvjWWdWSfHqT2eMc6Pg9HXULenWu67Q%2FLeqQw5ZXZ9mwXHgpCG5&X-Amz-Signature=85d881e5ba097338aeafb5326cc430e3cdf8d60bd4ca008c2948a730adc083e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WGNTQ33%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQD99tS461SAxSihdmu3%2B8AQRdXVkHsq4xFkAdoQL0IUWAIhANYhD0lOr5l3q61VR%2FnyVdV%2FMwuvjSF%2F9ZutkAwcltauKv8DCBEQABoMNjM3NDIzMTgzODA1IgzBZGZplVInfz2mlycq3ANcZW0TpivjKx4OJSrq1fwHbgrD9MhX7QHd1Mv0UxVcPrE7hEvslwMTnAAEC9XPQcc5q%2BFnw%2FjuPhaxfj248khoW9qJc40Szs96iy7XKFXEHp6PEt%2FZ60q2WwL3nscU7doWhSuE3kBMUsuP02vZLQr7fnFMfqMDcdn5WZGtTjM%2FzKMPxzhbshT9nTK6tRGBr%2BzdhsntB3h3o0YSS3y%2FnDL63%2FJBmX8scvYZA0yT6fFORPAul%2BamyTXswFOCmHk1VsKFMMEDIjvaSAtUVOPZgtWcQMYkDqtfiyg1v0CiHxfT9JyYsy7GCHmvpf3z6tpckqm%2BCR2svGfZ7ujs%2FTIIjbtX%2BVp30VeBZ6OVr1sfHa3EOkOUUPt4TM%2BOdPBCUH31q7akC028IiNDMJpGGNj1MKokey6GYMh4IrA7e1a%2BiVkT3XvL0ZgMg6BLyIv7WAwcqO1X8FeWlxqT01xRcVWjAEeNYwretOV8UhMmXTp1Rw0c5M7TUCIRPpQgRNpLIelRj5iEWTcGojZpaQoTJ73HLXmVo6aJ5Uz69MIcg5%2FEclncYQwWOIJFnFjA%2B1G5ikC2u80HkxPji3A%2F5YVmdJ4P5SxCIy2BPrj1cR22Za5ncFdeFtYPYM8D3xxd7iDVTjDN17TNBjqkAXZR7w90uIE97%2B2qJES4K%2BlZXYv2pqzxDPEFWIaafeRm2EiQq6GpenPOjmoc72LMkhcd9duCcEJ8eAqvdIaIuBFnnd7E1CnjppgXqaBg%2Brm9ziHd%2F1AOODZ7bL2UzSxupj6JwI%2BX2%2FEkt670N5lB6KxQafXOfnIzSqFS%2B%2F%2FuN%2FvjWWdWSfHqT2eMc6Pg9HXULenWu67Q%2FLeqQw5ZXZ9mwXHgpCG5&X-Amz-Signature=76b5e0ddd88d20d051d187dad7c5bbf6ee5382566becd3aba369ea2fb2268f3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XZK5K2Y%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081532Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIBzVd1zDv7a9jPJHuNEFGOrchRwTYkz%2BRFshj9r4DGn7AiEArcg5mP28NvI%2F%2Be26znqsIzNf0ej6k4vjSW7cABD5disq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDHDwpZ6L%2BuiG7BAy7CrcA8j%2FMQ%2FYFV%2F0hXJCB0gNlk9binV0MPX9zzGwcoSE%2FzdTBqmf4qz2OuW9PWhVxYpWxDWCY%2B16R5YJMRUopaKQzltEUYDCWMhmL00uJw6skheDQEhN2S3y5mdm9uGfCtL72JsT53WhmxGVXVfRD7D686OoqgW4u14UW3TN4Gv1y%2BsIpsgbFcAuvmnaLYoJC2YIqmNg3lAnblDeYPVsw%2BIH%2BwXoJQ2HoD9DNfxoQEHH2XIuISSIv98XUU9EG2%2FmNhZhAq%2F4hPeruimA%2FEYC8bSTcc3%2FJnXCvUO3s502VZDLzSfevqZv8yP2OpDvKLjST%2BOuPWK8NXt7CwFoy6DOqphF1R99Vy5VzFL5Iyu2Ou20caHMY03oTtyq8Yu7OdQep9uM5qqBEtdn0UWd5NC%2BGF5ksb30MzFNSm8eDBJQUXFxn%2Fe8yKbkE5Y4kYuWs9PC7qkCCSnbYMBrmkxoFWJHRK5i48DQLq4QxFf62AjsmpgXJas5uAZSUpLKb%2B22jIKx6qF0AdADHCND4nlf7nXjBhnAoZ5Eo%2FgnHzuvdjUt38qevE5w5T61j8oized00wI5e2S4eapyvaNYkzTnxCcI79EyX72tp2sc%2FoV6nVt9KBP3oTH98CBqnzwessvhYXRtMLXYtM0GOqUBlZt57xlbGe82WBuQtrq263Ptg%2B16wrAMhJQ59z3E6aSDQjhceOK5aD6vSbeobhc%2BJjsW%2FeMcfPok4Cj0R8E0JAyCV6FAy6EPVXpbghn6kGjIGOjQHs7qbafNgmkF7U9YnwcusRNolnc7CgP%2F8xWywQcJjzdfT8Dev3coWBl5yjtRFAxDbTW5McIE7IYDp163BhQx7jmnHcsE%2Bo7lOiEHRH50vEO0&X-Amz-Signature=070157e05b92bc8b21d8439c6b0081083b12ea56add45cbc3fa258c5b9429cf6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMDVWBS3%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIDf%2FSTAlPugGogElMZ%2BxWNInlJERUFpG2BkYEMqru%2FgSAiEA%2B1Oess5wEpmdp5MGkMPcTyvIqQlKl6KOu%2BiOhFdIDkEq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDPNEHI24TmPyl55GACrcAzGjz63q1Qw%2BYmb0Fv9E9q2ox1NwLQAoElSQ1V5JDrWf9mp4R0P%2Fbh4EJ46SuFdReag8iIx0kSwbGQEjevpVwicuABBrcZySoxZ5nfpyFPJt4PvfimkMHOQS34qpXU0u34xvuoH2LFObLV2%2BZ3oCw1auEz1YIb1IUPbHH0viNY8aSmjB5MPcb5uNgeWD0oip38niVmIW78c2BWl6Ozr7gUmA2nrEqa5ioDsMrBEQ97g6mZOiHZBxWrfDjTvxsDikI8JNOBk3vg8nKpsnxB04LX%2FrF7CAeC%2BpSClR5ky5LBlkjia%2F70Kj9ghT4AOiOzIjNBooJdTZQMnYQhCMzHxCJ%2FNFKK8ONKncl5YTZs%2F7Io%2BYswhnU1DTjkQ%2Bd43NLzdF%2BG4gAzlaYkD%2Bke6ggjGVDsCcm4Xh8rtM3IlNGEFCGQ4ma9jH3%2FqBv6ENXX%2F5gkiynIlWJDSfzkTNSE9f4LGxfoH2VD2O89LB2nlQTF1%2Bz0NXKjzPvcK89HHxMdx%2Fc5zlKE8Mt9tt3F7cjvc3sb7kovdDcCmPAokDjCo9GHUNtcEcSDADNF2msx%2BW2Lj3acD2WPBSLqP6tSb5djuRKQnWaPNk1nPLk4cITy3QM5pmykKpnyBpP0qJZ7S4drQLMJHYtM0GOqUBSPBw8v90VsGXsfO0DKzrdt62k1pzmxG3XZjqFioOfl0kNDUAtTFHKL2fzILreu9uHdaOeRwFOBPNjHm7kQqa9vVgHFVhPpQVWCDF9s%2BhWe5K9FraBwMwiS5QyTXVyM%2FjzBP2G2zvCUvaNkpIBvC3s04TS8ln1L6Nlk6RhL3VhTImGaGjs9Oj3gt%2BLHMAHqSDBhOTHjNro5zEyIzTMpyqK6dI%2F69t&X-Amz-Signature=1c62122dfde1048a45dbdfdd28eb036c69e1722aa1b7e236ca70921ae40e04fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBPYPAGI%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCY5O%2BvsHa6AID1aUrh7MZugokCNWMBGl2o1qgOy9SouAIgT%2BqfAV2kJ6Dbhcos1GHOcmuIOKF7ydUDERxhd10f4W4q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDFqgAWGjg7uK8a9X8ircAxNqZwhIXA%2FZGbpRdyX%2F1%2FnHVgU0rC5VeBVSRLYJPqjP3Dmo%2FTyE%2BY3I2ZAyDeQAhatkPXNl%2BAGZ%2F6LbYvv4IpH1mTL0V7GTjLaUapMUJCc8s4DyZtUg1Dxn89LuoeAYLP09gAdvmOqM%2FKgu827LEaoXgOCl7g6nhBwGQr0lRSWCN9Vfp%2FwY6inJ1s2%2BVx4QkisRi67kCk6RudeK%2Fo7WcU%2BdzVN57vcaHkGDYBFK2%2BA44VPSld2icNIqlRoZ4cS%2FqDYs%2F81njBN0Q5ScwL41EiBUBB%2F46oo7eJ2LcNkv8sgUDzzAzfqVybciyyms8aq4T71%2Fz1bZ1mA%2B0Q50GQLip2LYPpYHvJUEnbX%2B2qNv6XKviebVL2wq1lN%2FeaSERb5u6T67vI1F1hWuIx7fI3vyg2DYBXK%2B4QaIpyZuY1vXSgsNfoe05dZ5bkG3bf65ni9IgTV1UPnwEPFHOJ7lS63iiMZqbogmBSEaivR4bjBykS%2B%2B6JXoqar3HtHUUEMhACG7GJMo%2FYo%2FC9rBlh7RS1zl836sr8IC7m2PaJUOYBO6m494kng0%2B%2FHtGUbTdOvhduoORofxax2ha7UU7i1qsjdrnFHEaNJMk8DL%2BvplEqwNep9JSFy9FJgX21ktiW1mMM7YtM0GOqUBSV4cg0hHhyGbksCdLIQvbbND8wsKpdqLN7OoaK31gIWF3BLfBZmccPPN%2FSHm0KTMpYZOyKM1Pg%2Bl%2Ba3UsBveliJDpbk9vocyi91qvKrn7YSpTRiV%2BRz4rFwHgm4kHVQApk8mRfWWUZr1u8AIbQNi%2BvrtM0ei5DHubSqDjqqGWGIpKnTIXykCSeI7cPO5566bTAuRMf3y0Hm6zFe%2BjbM3LOgMOzyX&X-Amz-Signature=da857b727903c0698d5691070bc4bd1e582d8cb9fe0fccd025187857ec04e804&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U75JAC6I%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQC3g%2F4j99ELeGxGtJtrVRee65Sh2mt%2BJr%2FIgCqlpqiPYgIhAI0Txknczza8gXMBotaBfEQPQW1vnuG6638sCtcElyESKv8DCBEQABoMNjM3NDIzMTgzODA1IgxaU8c1UjLN%2Fcs1X9Eq3AMkIxTTYQPpagK%2FlCW4X8k9In3UtXALb2g00buWAMu0LMDpj8P%2BGXBTBpdSMv6Bh%2BZcZFbZT7LWDVkYw%2B950wvZ%2BacILg6F%2BPTKPwtO7rYQlsjX0W5H%2Bt1GOyD9nx%2Fyk5qL2byZTW78VEddJrgRke6pdheqdWHhgMBAFLEv9iShYIOB9liRV7mP0ZJ41yzwuquyUPdJnRkQ04o92daUjcGgdRmIBZuR4bz6wUKnXQHlmid9pOWIKtrCElsPZos7tK06PusKcZSFRVnB%2FT46xxL82EAf%2BFGVJA7twahFJ8MVj%2BbaX31mo%2F46lUj%2FDlTufaEx%2Fg3fWa4F3KD9ZAGqJbazclmNxGQcUlSufKbrW%2FOlkQk3RWfgzaE%2FwqjmNaNPLsoP2E6i69ehv19mjNNrAa%2FY1xJWNLv%2BJ76eLohRIvNFbKyFaQygp6qSMF59CzG1P7kQOo85i%2FWff4YSvu4c0nDD4JRUXhbutCbnmRBl5RfpQkC9HTnCEWNvBsYfQ5R8LNEa0yFLbDcOtDOA%2FpvO5IcBY%2BA2L%2F%2FJrEPdpfNZZ5WZBoswVyY%2FCWk6t6qtpxF96Vij%2FOUYlBaqoezWkT7FZ0gpOFM83dvrDwtMs3GxVrOx%2FEdanmkAV6sQtHZj%2FzCd2LTNBjqkATnNSWY1trEW2GMw3pcbiMUtOwpCzGu4912I%2Ftdca71bjPsw0tAUFE%2B%2FGRdl6dTlHkcJJMw32ZTiVI05JLB6u5b3%2B6xjLJaQg5K6Lfyd40S%2FO1gE4%2BIggHNz5XC%2Fy6TE1bJqf6et5s9f3vG%2FrSy77elHVV%2FJ5VDN%2FxMWVsL10Dpfr3o%2B5howMHZTDuo4yQ09mtxixvJsMtVejEYDwhXg7hrDUSjo&X-Amz-Signature=b3f6dcfa009870a96d015c6247f6e9b852e00e329f44b4955d10889ccc8d01cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U75JAC6I%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQC3g%2F4j99ELeGxGtJtrVRee65Sh2mt%2BJr%2FIgCqlpqiPYgIhAI0Txknczza8gXMBotaBfEQPQW1vnuG6638sCtcElyESKv8DCBEQABoMNjM3NDIzMTgzODA1IgxaU8c1UjLN%2Fcs1X9Eq3AMkIxTTYQPpagK%2FlCW4X8k9In3UtXALb2g00buWAMu0LMDpj8P%2BGXBTBpdSMv6Bh%2BZcZFbZT7LWDVkYw%2B950wvZ%2BacILg6F%2BPTKPwtO7rYQlsjX0W5H%2Bt1GOyD9nx%2Fyk5qL2byZTW78VEddJrgRke6pdheqdWHhgMBAFLEv9iShYIOB9liRV7mP0ZJ41yzwuquyUPdJnRkQ04o92daUjcGgdRmIBZuR4bz6wUKnXQHlmid9pOWIKtrCElsPZos7tK06PusKcZSFRVnB%2FT46xxL82EAf%2BFGVJA7twahFJ8MVj%2BbaX31mo%2F46lUj%2FDlTufaEx%2Fg3fWa4F3KD9ZAGqJbazclmNxGQcUlSufKbrW%2FOlkQk3RWfgzaE%2FwqjmNaNPLsoP2E6i69ehv19mjNNrAa%2FY1xJWNLv%2BJ76eLohRIvNFbKyFaQygp6qSMF59CzG1P7kQOo85i%2FWff4YSvu4c0nDD4JRUXhbutCbnmRBl5RfpQkC9HTnCEWNvBsYfQ5R8LNEa0yFLbDcOtDOA%2FpvO5IcBY%2BA2L%2F%2FJrEPdpfNZZ5WZBoswVyY%2FCWk6t6qtpxF96Vij%2FOUYlBaqoezWkT7FZ0gpOFM83dvrDwtMs3GxVrOx%2FEdanmkAV6sQtHZj%2FzCd2LTNBjqkATnNSWY1trEW2GMw3pcbiMUtOwpCzGu4912I%2Ftdca71bjPsw0tAUFE%2B%2FGRdl6dTlHkcJJMw32ZTiVI05JLB6u5b3%2B6xjLJaQg5K6Lfyd40S%2FO1gE4%2BIggHNz5XC%2Fy6TE1bJqf6et5s9f3vG%2FrSy77elHVV%2FJ5VDN%2FxMWVsL10Dpfr3o%2B5howMHZTDuo4yQ09mtxixvJsMtVejEYDwhXg7hrDUSjo&X-Amz-Signature=72e15963618c2077c8f84eb50b4d3623edf331897097836ffcfc4874c4fad860&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYFQYZIY%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIGib0dgWen3j8RitpZ%2BSXEBDegleZxsg%2FsNmsgMyXAIwAiEAzUIPLhoGLE0nYLTmgBP45EhamUhLPURbLrM052BfIGoq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDCn5d1Ils4lE0ZA1BSrcA9YI0WQubzqFJUpRgXR4vF9Bja9X9uH6HRb8X4T5KJfOVotCYZydopJBqCOFYHY%2FUcMdfw4earJrhaLU8RwtWq0xa%2BRnRcLOca61BWKTN%2F6hCFAvkPXe2MHtKKYvKRmJh4OTdUAyPKpV1nBe9sXdGN55W0V6BjWqbrzI3DASjXS6I9nShPcQuhKtz%2FS1nx%2FVFLPqVIkUw2UPymkIYHghu3q6bMnpBjJFmuAuZbkVYNrRmgyBHdjWP2aenwObrbHLIkCa1zknpQw4YFkfNGHMwN4t1OiUnrt%2B8gkvN7bmWXQ6ldG86tIErtdfrihKicEodqmRVfh3znaziiqqJfzvn%2BvfuICf18vLbKkvzNQfRE0GR92wod27nruyt3p6SFMZycDfbx5RqGkykB23%2Bdv7SHAxnLdKXw8ZS71XxUWtEPd%2ByOlmVconemBjt3XPccRf4KsG3XDm2Cb7q%2BLnWrGRMKEdXThnoNXWDQTLCwWHKX5fY5lLmBbxTDD2kP%2BVczugfqUQZTOukMvBNoS4RbUhdqlzHQe2j4MLnYdqWm2nvP3IFHYDW6p8NuSZS1Fq%2FfT19fKPDrVYsc3vfj5QMHsIT7sCZgLWcB3UQE2DWgKHTVJwygnAMtEoWODY6wSzMIHYtM0GOqUB3ega6Mw3IGDafZl9ZmgdG0xZDG0d%2FCbs%2BlFLD8JUNZ%2BEWbChSD0KLH9KigdQtVCyrNRRx5rkd7WQ8EDRZ7F3eSReRNkxqYHCTzSGN0hj3R1Sg26h%2FUyWXH3cYDg3PTJoXYzamT3Dr5bhSIYQ4Ilnr357zgzAZWQEXhuDHtwf10zczbVFQ0pygzhijilXfK6M%2F9QkORi79KEf1hBJLM5WiIJjLbOo&X-Amz-Signature=f6d754e266bbfed34e038a2ba6f902af899aa23fbe19b86e06eb15286ce412a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663W755LI7%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQDWdUrDa8QBwJ1i97T3GaVjBTSybswQQtFpBS5NnSuq9gIgNXh5YmZgv6QxendqhqX9XrBfxk880NLTKYS%2B%2Ft920T0q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDOiPWJrRVKkh9qxX%2BircA7h5hjhNEvVVqaUP%2FztEgWxr7mPdRJKPQITvAwSbByp%2BqtCct7A%2BjQj3OMC%2BrWyFYpMbdu0DJMImucnTE9FauAsUrp9mfy%2FGE%2BiLdDjAROPxo3ySCVlJH8xgOhzZ6qsuCnVn8bXeigfawLSkRqbnh0hpIsak32VsSd8tvGK%2BCq94mj4OIbvcjCF%2FcrbAeeJyiJml9eAm2htYICAJ%2FTEfoCpnlhj%2FhdM3JPad%2FYcWmV0rfbsWtL7hARshmlbX%2BCptjk9sqoZX3%2BhDeyfeIo78QNJC7xIfjWPu9E%2BhJS8KqVfojRGYi8Z26Zsa6f2H655Ap%2FkHYROIvBrG4msTSkYwMdoOXXoackq4U9IeRNTrVKnliLoPXOCPhwD%2FkTTWgWpTCepjILkls5DmTwr98Nv9stZPisGmvuQhpUuV3iWIF23bj%2FX%2Brkt3nxB53xgvba%2BK4tWOfnq3rclqeEVdNbPv%2Brlrz2BwEozsxiSkgUn%2Fzzy7%2Bwa%2F4cGy6HTLh3XKNCVWoVH5HTV1O%2B0M8rEsBqaEGezYBOXTT6wujbGeAh4C2gp4uaFXM4%2F8WfW7xlAPb189a0nxvCRwiBh7qYnr0EF1eCLgZXzmnVtW3eC%2BaBtCorLi5PLVClrHOKokGOFJMN7YtM0GOqUBUcfQdJNkrtbQhBX7g3STY6z3kwlz0YmNedrFAnRcXkNWKj0aZ9D7FfD%2Fbpm%2FNrfRKckk%2BCF6Z17V6tAehMJVcY%2FjfyA1oqoLGkGHuHhsm34pxhJI%2Bcn%2BFK3t8gB6xtNurT0V3bx8JVgHkwXGjIacB99vy%2FB3EBp42oMeHcTSqr28fqQy7m3GrOCf1vChMPB%2Bx9ftlrnZK3qk%2FJq4MDXcAxmOBKiW&X-Amz-Signature=636abf57fb75a891f4ebd99abe321481cb064f0a06a4bc5cbba5580c84056655&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663W755LI7%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQDWdUrDa8QBwJ1i97T3GaVjBTSybswQQtFpBS5NnSuq9gIgNXh5YmZgv6QxendqhqX9XrBfxk880NLTKYS%2B%2Ft920T0q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDOiPWJrRVKkh9qxX%2BircA7h5hjhNEvVVqaUP%2FztEgWxr7mPdRJKPQITvAwSbByp%2BqtCct7A%2BjQj3OMC%2BrWyFYpMbdu0DJMImucnTE9FauAsUrp9mfy%2FGE%2BiLdDjAROPxo3ySCVlJH8xgOhzZ6qsuCnVn8bXeigfawLSkRqbnh0hpIsak32VsSd8tvGK%2BCq94mj4OIbvcjCF%2FcrbAeeJyiJml9eAm2htYICAJ%2FTEfoCpnlhj%2FhdM3JPad%2FYcWmV0rfbsWtL7hARshmlbX%2BCptjk9sqoZX3%2BhDeyfeIo78QNJC7xIfjWPu9E%2BhJS8KqVfojRGYi8Z26Zsa6f2H655Ap%2FkHYROIvBrG4msTSkYwMdoOXXoackq4U9IeRNTrVKnliLoPXOCPhwD%2FkTTWgWpTCepjILkls5DmTwr98Nv9stZPisGmvuQhpUuV3iWIF23bj%2FX%2Brkt3nxB53xgvba%2BK4tWOfnq3rclqeEVdNbPv%2Brlrz2BwEozsxiSkgUn%2Fzzy7%2Bwa%2F4cGy6HTLh3XKNCVWoVH5HTV1O%2B0M8rEsBqaEGezYBOXTT6wujbGeAh4C2gp4uaFXM4%2F8WfW7xlAPb189a0nxvCRwiBh7qYnr0EF1eCLgZXzmnVtW3eC%2BaBtCorLi5PLVClrHOKokGOFJMN7YtM0GOqUBUcfQdJNkrtbQhBX7g3STY6z3kwlz0YmNedrFAnRcXkNWKj0aZ9D7FfD%2Fbpm%2FNrfRKckk%2BCF6Z17V6tAehMJVcY%2FjfyA1oqoLGkGHuHhsm34pxhJI%2Bcn%2BFK3t8gB6xtNurT0V3bx8JVgHkwXGjIacB99vy%2FB3EBp42oMeHcTSqr28fqQy7m3GrOCf1vChMPB%2Bx9ftlrnZK3qk%2FJq4MDXcAxmOBKiW&X-Amz-Signature=636abf57fb75a891f4ebd99abe321481cb064f0a06a4bc5cbba5580c84056655&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663EDS3CZZ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T081540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCICAR%2BYd3toQ%2FeKuvOMV0FnEU6rDKA%2FD9GOpYtKEaM6HbAiEAkysmdS%2FPC%2BfU7TTeabx0k84%2F4faG5IGmip3EkZjWraMq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDHnJlksLM%2BNu5DsuxyrcA9PTZtRsA4K0xbdJffzG6mOPheIPh6WeYHavYNNoP7Ox9NpSo43L6ug3z%2Fn8Sx%2FVfgbmu0%2B%2FJsH%2BcmN3Ofc4MARHDd0Ab%2BbPwcOnpSyTyVESLNCqz0CEq2WfDGJKHLKCYcG6gcfzwJuZoFILzjDG4biqT3QRXM7a%2FWYGTJmyl3c4yIFOEHwc%2FbKLKeNU6O9AxXivEvN%2B8Jef2YNW5lq6JpvwPdSAh%2B%2BA8LW4wV1da5UMdbnXU0BtSMudxbNiNERRFsjY22vMcTUOicU4tPYH9ef0O4txBx8tm6dS2RL7uj595CC7%2Fs4V6L3eTsEd5wopnWQOuLHGQZxzRb%2BBsIcwCs%2B2e6O1myGoBEJvmAgfED9mX4UY%2BXIDZwBRP63nNtffOgSJEjZwmqKqTR4zSgM%2BQ2hNnR4prvgc7r2mbFO8%2FcUoqecxDKSS1NnLfGkNY7vc379kag%2Fu9GMKBzPE2gNR%2B91%2BovunrYQ8%2FDfB98iombxTNkfWBUw3CpfmDsnL8URHiYbc6meGsudSF%2BUNh4Yvu0AXf9mAQMheiG4Xrz5pfwQlzYf4vP1K3c0wPtoyFZmCkHXB%2FjACQ85JYrNm8I2kUz%2BJB4WJbfdvJMg5%2FqCxYJYFf7Ipgrufk%2FzVPZIqMODYtM0GOqUBNHjEwwN9ZFh1ROcsVK8zYAG6pvp6JmOhvJ8EsPHTW4%2Bw6Uoc7uq2sJ9oYiRySq9Qd%2BFOsOF3U1NytJsJPCD2D30zU7JgFq7v%2FPf8o4mk4L2Z6wIhOwBmbCXvgYDDOtTOw85Sd85Zz4xIrVcdgd%2BXS4236GOr1xj6KJLhIuU%2FJ034o7xNCxs1ONnRGX87tSDgt%2BLnCfn3VRHDIXHoYTxv3DRzHWB1&X-Amz-Signature=9278fc6ed0d2920663739d84cf7567eb7c35ea122d0856e3cb56963277d19cc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

