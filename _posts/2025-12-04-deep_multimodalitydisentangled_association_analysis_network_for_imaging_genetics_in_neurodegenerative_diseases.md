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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NTSDDSC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIAUSdcCTYOpc1s9iebiVY5QuWx%2BAfCZ1oXabZpVhRApIAiAi7bjz4708yp3V3Ry7YYzY0iXSaJTJFHigK%2BXzISKlDSr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMOhv%2BS8xUiF0SWdE9KtwD9tsBwe63D68HeBeTz0SuBIBGrvoDmKCVMuu8%2B0FsupshIDmGBhgEcsXa0aVAd5jH5NCcWJzx6XSLs48XQhxccx6lpgjaiIm256QDvOjOzG6Cq2MHIADnPy94ULiB%2FPPOoyiZSgQdFjKVCNUXEVGZjPUVgU9ALusJT6d7yqvir2MpiyjZud6siRoVY7dCVjJLWupXzR5P8QEiCpefu8IJLk4Qnr222F8xDMA5YM91XRdbqOTlgP3HzXqwdjyzTnmPaCVtE%2FeRYGiqjJDn8kXRuzOHpZIsaVo%2FjQzAFFbpghGdrBjeDgWZBGrr1%2FOSITF%2FPdBAKbvc%2Bq25U7ZiCYlxykNpd52pZ1ua38w%2BW7INUFe8yJWEBPZdJAfdte8ddsxs8YpPxXQdDbECXoZhrmcRQtrm%2B%2BC1A2eYtGqoqeh8otWDlSCCl4P9r4pBYHa%2Bdf1%2BcI9Xtl6Pn8YztJ283wnydtWvPxUnadXt7kjY3%2BGek94NC951yTi4OmZgcjMYiFiHrNkhBiGlsH0cebFGTKZK3QGAXltruFZQc88aDyYMU8oaV9aGaamxiknNpu7gFSw70Z3jkot5h%2FDTV7aRQhC7QhuBRAYwC8o0kcnOvMagGDePlzAAWIBV6il76RMwsYmgzwY6pgGGXmZlkxtw9QY8JtxyKOkv05IHf%2BiFlEU77aidqFI7ApiNYTTH0y6gCcNKvRbat0IR2RKvyNMz1qigDQj3USegD7vRbxubhfsbLPn03Bpc1LxXVxoEShpntEZIZUxdvRYabMGnnHSsZEhO3R%2FnE18SN4eu%2F3wHoRTcMQB9mlVEQjuGQ8BBYYXq4LYuARYx0WT%2BfT916VJo%2Be2x%2Fb2S3wKgOuJEwIxS&X-Amz-Signature=e6980047fcfc8280d61519d43c9d87ecfa4d5d825d268f13472df125b0a0d63c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NTSDDSC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIAUSdcCTYOpc1s9iebiVY5QuWx%2BAfCZ1oXabZpVhRApIAiAi7bjz4708yp3V3Ry7YYzY0iXSaJTJFHigK%2BXzISKlDSr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMOhv%2BS8xUiF0SWdE9KtwD9tsBwe63D68HeBeTz0SuBIBGrvoDmKCVMuu8%2B0FsupshIDmGBhgEcsXa0aVAd5jH5NCcWJzx6XSLs48XQhxccx6lpgjaiIm256QDvOjOzG6Cq2MHIADnPy94ULiB%2FPPOoyiZSgQdFjKVCNUXEVGZjPUVgU9ALusJT6d7yqvir2MpiyjZud6siRoVY7dCVjJLWupXzR5P8QEiCpefu8IJLk4Qnr222F8xDMA5YM91XRdbqOTlgP3HzXqwdjyzTnmPaCVtE%2FeRYGiqjJDn8kXRuzOHpZIsaVo%2FjQzAFFbpghGdrBjeDgWZBGrr1%2FOSITF%2FPdBAKbvc%2Bq25U7ZiCYlxykNpd52pZ1ua38w%2BW7INUFe8yJWEBPZdJAfdte8ddsxs8YpPxXQdDbECXoZhrmcRQtrm%2B%2BC1A2eYtGqoqeh8otWDlSCCl4P9r4pBYHa%2Bdf1%2BcI9Xtl6Pn8YztJ283wnydtWvPxUnadXt7kjY3%2BGek94NC951yTi4OmZgcjMYiFiHrNkhBiGlsH0cebFGTKZK3QGAXltruFZQc88aDyYMU8oaV9aGaamxiknNpu7gFSw70Z3jkot5h%2FDTV7aRQhC7QhuBRAYwC8o0kcnOvMagGDePlzAAWIBV6il76RMwsYmgzwY6pgGGXmZlkxtw9QY8JtxyKOkv05IHf%2BiFlEU77aidqFI7ApiNYTTH0y6gCcNKvRbat0IR2RKvyNMz1qigDQj3USegD7vRbxubhfsbLPn03Bpc1LxXVxoEShpntEZIZUxdvRYabMGnnHSsZEhO3R%2FnE18SN4eu%2F3wHoRTcMQB9mlVEQjuGQ8BBYYXq4LYuARYx0WT%2BfT916VJo%2Be2x%2Fb2S3wKgOuJEwIxS&X-Amz-Signature=e6980047fcfc8280d61519d43c9d87ecfa4d5d825d268f13472df125b0a0d63c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFVL6NME%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQCEZM%2Bzp7Px6jcNzSIGUNMxwIy2BkS9Js7kZ80buyB3vgIgT1UrqcBjoWXyCSEXt6pT5L67nfApl%2BJTkei%2FJjakVkgq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDMS4pSZK4SrhipFBSyrcA%2Fe%2FnXhckPoS%2BKF3O0j7%2FeIYO4SeJTq5u%2FtPCwZtZZ1d1TIz2AbEO2f3f6QicZEYR7B9Xm4yFNk4wrxR21mNYCFQMGSFvyKDrGwW4xPrGMJg7OkwRj2k0w%2Fc9Ir7%2BtFonp2U9ofShqAKFR%2FUsI%2B5XXFE3kbxGSs4rA3835dB2RAIK3FEsHSSB%2FZYcPJwVAqydUnU0seEjXE5ERG9Yc2GZPFjgvxKsfOi4wIneQ%2FrDCLwKnCuUActI2LbqCm7MgEAFqhn7cOkkKevyiAgHVNwrKTHat8zMsn%2BhEu30Jzk7SFj6b%2FHZeWUB2fAvrlB%2BHojlk8uNHD9gnod5s%2F3u7JkhFbTX49JAhdzme7ukzGwrntw%2BaNHB941BtgL3nC6H5vUCOUa1oSwmywBnH8Zi7rFVZRNSV6WdcvIZbFZu%2BuiMmTgDLyYGIO152GJJNx3lDcycmbeNZvXNbcUfMpe%2FtafadO4Ow%2BwXPuM%2BXxgCMJfZ3gJaTl%2B7XOHeaRRFJCAZFa3B9Xmm4rXDcspOgkLfxCXRsUBy8rg1lxGUwMcFgqlnf9S8jeWDG4A9mvY93c8CaNQ1g4OewTVm7lQA4Mkt9IbLQl2ZSvqomwVQQl6FxWN3jfzd13ksMQL9yEub4CoMJWKoM8GOqUBO72senSqut97yLymRnSJMA1acdBgQHH0ZUxNnewMehxJg2X8SATG%2BzuLVl%2FLXERQs5PbJB94sEJc9v2D4L17355%2FGnq%2BIEnf%2BjZU0bLcGneAtMCg0zvdj5ND2gbjnEBI4t5yRcckJuOnz3vP%2FvoQrGUwY7tBTQ6mERmSBvVay7GNm2HjnAl22igoMPWPHIBrBkIWChZ1ntduetgcN96gjq0%2BmtEh&X-Amz-Signature=1ce0f693252d6850015aa141ef4734fa1a779ae0ec0e5f54e26f1dd5dadbaf09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XNLF5JM%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIG%2FOyiVhnXLi76nk45aH2eRwpiW3n5O24dYwTstD7yJ1AiBuEadD4Xs8mCPAjg3Fb9J2P7HTY3ywP0Q%2Fgjw%2BopYECyr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMqlgmnA8A7WKf83X1KtwDEffBG3YMwwQSQLXgc8qfKuQKxYAZ16emHXDyTNllC0ZsoJbsrca1Bk%2BGWEpxlrOjSDpT5n6tenE%2BPWEqA%2BBKTOzE4Plb0q%2FP0PObHjftPo5%2FcYFgYfLnVRrjZY37yT%2BkvfT38XLS%2F4JtAIx%2FqpEmh9mRuKBIexVtjzp8cwlJUy96FLtkCJUDx1NP0kg3nZA0wmOwStUMOTci59RFTWfSz7WODLrlj38JQjEK1vM2u0bmQUBu2wUznqbnctabcZEPDcE08V9Dp45sQ0ipu0X6AEPRZAcMkD7b45E9D%2FbsWs%2BgfTwvuId9NfVW%2BeL4BgfbCfhAw63vweh1AgSJtXSDfaAfn3DHIIMIMCNDyUxMsIJcoSZxDHG8bYS7aL5V0yIskkHE1ltEACsyVsXwQVeXIN7HeMgmOxlFlccs%2Fkpb1NpxhOIDP3rZ7onmCvR%2BmyLtn4XHDKBdOof5j2W1aaAtSOys4zEhobmUNINRgIgERNZYiahnu%2FiRl4AnucwwOxVHZpbB0Vb7PAVVeaNiGwOOtX5N3g5i2Rb2AfliKHANnqNbdXSJKdSbP0szDyGHYbXoTozjISGT3Y0DEyD5KmrV8FTbufOSK7KoPeZ3VOZFRn2iLpCdw03MordUxLcw1oigzwY6pgHPqLTwjPzFqCGWHXmjJlHSly7%2F2gtfDpJDnoO5ELdPjMno2i3B8six9wOlCotKK7GrcGI0Sp3JL9ZOOsuvipNaC8C6fXlZDEsgeYWmIEHySTNBAUFHtha3K%2FBjwbiFGq0%2F7F0cLe%2F6IGmQES2N3jh5gQeIObzwKd3ilCz%2FYoFGQSWCQqwt2iJj0wix0wqdzhAVc%2BFsNQLJPdxpisGISNeW1JvYtlrT&X-Amz-Signature=a88397e294a5843e5a74156418e045c79f8061a09966ecfba9acce47695da577&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XNLF5JM%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJGMEQCIG%2FOyiVhnXLi76nk45aH2eRwpiW3n5O24dYwTstD7yJ1AiBuEadD4Xs8mCPAjg3Fb9J2P7HTY3ywP0Q%2Fgjw%2BopYECyr%2FAwhAEAAaDDYzNzQyMzE4MzgwNSIMqlgmnA8A7WKf83X1KtwDEffBG3YMwwQSQLXgc8qfKuQKxYAZ16emHXDyTNllC0ZsoJbsrca1Bk%2BGWEpxlrOjSDpT5n6tenE%2BPWEqA%2BBKTOzE4Plb0q%2FP0PObHjftPo5%2FcYFgYfLnVRrjZY37yT%2BkvfT38XLS%2F4JtAIx%2FqpEmh9mRuKBIexVtjzp8cwlJUy96FLtkCJUDx1NP0kg3nZA0wmOwStUMOTci59RFTWfSz7WODLrlj38JQjEK1vM2u0bmQUBu2wUznqbnctabcZEPDcE08V9Dp45sQ0ipu0X6AEPRZAcMkD7b45E9D%2FbsWs%2BgfTwvuId9NfVW%2BeL4BgfbCfhAw63vweh1AgSJtXSDfaAfn3DHIIMIMCNDyUxMsIJcoSZxDHG8bYS7aL5V0yIskkHE1ltEACsyVsXwQVeXIN7HeMgmOxlFlccs%2Fkpb1NpxhOIDP3rZ7onmCvR%2BmyLtn4XHDKBdOof5j2W1aaAtSOys4zEhobmUNINRgIgERNZYiahnu%2FiRl4AnucwwOxVHZpbB0Vb7PAVVeaNiGwOOtX5N3g5i2Rb2AfliKHANnqNbdXSJKdSbP0szDyGHYbXoTozjISGT3Y0DEyD5KmrV8FTbufOSK7KoPeZ3VOZFRn2iLpCdw03MordUxLcw1oigzwY6pgHPqLTwjPzFqCGWHXmjJlHSly7%2F2gtfDpJDnoO5ELdPjMno2i3B8six9wOlCotKK7GrcGI0Sp3JL9ZOOsuvipNaC8C6fXlZDEsgeYWmIEHySTNBAUFHtha3K%2FBjwbiFGq0%2F7F0cLe%2F6IGmQES2N3jh5gQeIObzwKd3ilCz%2FYoFGQSWCQqwt2iJj0wix0wqdzhAVc%2BFsNQLJPdxpisGISNeW1JvYtlrT&X-Amz-Signature=e321c6c29466e8c758a9c40e6c818c71c2e3b9f0989b6095ec265fc438ed6221&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLZ5KEZO%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQDRATfCYeVbikX00blpwZMe05NY%2F0Z8dmYr7ECAvVRpxQIhAMb%2BpU35S%2BQSLBk4suXBRlYzBH06lEqnOKN2Swq5cPdTKv8DCEAQABoMNjM3NDIzMTgzODA1IgwsatQ9%2F8URF%2B32cGgq3AOxisWKqE1ndC1e8ZTC2i50RXJtUKhryV57Z6ISAcbyRw1r5B5IdRGQrzM8oQGnqwCiQzAzHItFrCdoF8Gf88XOi84Q0dQK%2BH7V4S16VFJqfc5Q4%2FZN5%2FjJ6xymQS12GOqInsAJBbGRNJWcZVqqdxI%2BmQMEghoX6PqDwqjdpG37V%2F1zuWXazaGQpoy6OEX1kJ15c44gcIedJ2rgx7siaQtLIiHhx%2FXZ77L59M5VGctDGhvvSECQcdCzWRFsDazsUBce0Dha%2BFzbmr6RqUGGg%2F8YeYnjNVOuPK94RLrCydSKA7qkGiFjt2cNO4%2FuzxbY5lCdAT0kWXzQ5vlfkI4pHLj1X9%2BemCT9eKxGxdH2zwgN7pnxrLyTKPibeOZvZkwN68CnkwL%2FXESn3%2Bf3CPfVDfmvdwxMUcGpeQdXfQ6Ylnqtd2mxOdUvUaULf4XealWJHP5%2F2%2BUVQT%2BuFiXUaL2qtDuP8Q9OTmsniQTdwOtMZJh1NFhICWEYm67kQ4rW8EpwkrJOtgYINanG%2BMdLzvG9lOH9juOM7T1rNEUeL7vbwDp%2FEhui1YDZPe%2FasgYxawZuB1ABGkW0juVShLG03h7JQvEv06q2z1DCqtyhE8aq7MgN8npo4vDsLLjz9dc2bjDXiKDPBjqkAboDGCMW92MM8L7Bm0t%2BUWvZYWru%2FTfOBYc3mjlY%2FCe46iRImMs5PhW6%2BJJ2Z8e%2FIZO3nypG936cPL7zM4%2Boy%2F6E4JA0V1Tm%2FrI9XEyGXqoU95pRxnQKkQZa095GwugkQ8NVSP9G9GvghiNc5POd5CCYtkzeoAOYt0W5YU74MFuPLQrhsi9e8O9OmwAKg8%2FEmXWm1KKPRVdIA9fmU8RSwZXw0Iy2&X-Amz-Signature=202bd005fbfe27f5251bf4690c02c838f2487f5a156f6698cfa948246694b553&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466266KRNOR%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCTl%2FIdhVjpEbrfZD%2BrXurGG0IpzonLiphxV2mRx3jSAQIhAMiUtdh8IEWYqB0Oz0cGoe9hehWAFCbnZPdRls06WrphKv8DCEAQABoMNjM3NDIzMTgzODA1Igx0aowKXzbQKzkExk4q3AOsyVgnqE2SmoIEa%2BXHqoNA0yzH0k%2FqXOq0LzpEs1Mgwmyt3M2VSCbvc3BKoCFfdOMw01HqGkpulJSVJ5hK0jp%2BMjG5tTZ04ZyN7KkX9%2F4k4YH13DzDtmJaqu6LU6eGdPu8RpNqhJ%2BrJx%2B17ACACNv7j0wvNF1MYrb1%2BmFFWmfS1cNrAEMCSbRt3NnY8t9Q1cM7f24XLKkaZOKDxSoq%2BqrLYOroH4VNl2ezZkceIknUv%2Bm0%2B271IVAVEGtAh0uo0in%2B9Sm%2BrzS57xnxPbOXbgC653XuHvWEBBBswdRQPsAxUe2VJfVNcqPqjOFWMQuC91vDJ%2FdT3bYG7z8Li6CDxaYl%2BJhq9i%2F3Cz6gQBM2EteVjooC2pVPVn5ry8Znin7eNgnKuOEJ%2Fm6r5eeukNIBirJ0xK5%2BFJXjUeUdyUnaXD7nd7uId3Fo356aWMQOLMKRbPE6ZVwO5hRniokhjXvD81tkc%2Fuuw0OfZWZc4MgDGvElJWz7BznrEFjhL33%2FFfsoHUiCe808BkMIOAli7XlWIk1edFMn%2BXmcfmQr6ciVq9%2Bf658kkCRV%2FsgFrMdHyuz4VhcwBTkteFUWSucd2PZMwLpiLATO7U0Kqkln6tifo49wH1Dc4x4IR7Jo0ux8yjCWiaDPBjqkAYz5eOugpTf742OqfZvEbJVHfwVzE2GFnL2dkQAV31psAwBcx4shgpnVpPxrqu8KpGoGAyH0Y1AaxNcDJ%2BuD7hyrDu0igLH5YLGLDSgUMFgcsbPdtX1Wkwjoowa1BjPbafGQIbKoJIMOMgBbr1%2BcmZqSsUxy5SietcmKAWPTwu8YmS1vSqoGo7uXr56BwVfIZn%2BCWS9Pm3WyNJXFCdrdf0hS2BsO&X-Amz-Signature=d569e04ee5a34d87139db23e4353b73f69f29b17e909e06ac89bb60be6f8e216&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEEHJKM4%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQC9uNdlW1xTTdF2k6KISpG1KhIAw3C5EPrCT2ugboV5CgIhAISxsJIXDBrYBvito8ozjLGEQjbY85TfGoJrEs2ImDB1Kv8DCEAQABoMNjM3NDIzMTgzODA1IgwyaS0GPnbwMTqRvZcq3APkfpSHF01ApOvSC9dTQ4qtgThL6Rz7cptPQmHPQ4RTOrmUoN0KcjTZ%2FV1n%2Fd7tkDnRYnIC6pMK%2B7Ie2qSO5Iv%2FEb9TX409ukuVtzAh%2FaF1ABIyFfSF2lV4AwcSrLFhuJU76WKqL%2FZjqK7BD%2BhPi0KJm2%2FeW32ltiS6oAycs6AOSLcoqENFwk8k4ewS3PTaOd9MlmG495VGvXjCcm5g0UHX%2FETSBrLzc9QwJmkvuVhdj3TAb1U8ZGAyMNQj62LLB2K1k%2BAa9sl%2FCZ1cOhWED%2FYxBnkXoqA9pkYxX6QBqXkjL%2F3cWQXFiEzZR9uAFN5tBd9haT0prqqFTb3%2FF4a8qU72j808iPUfSVh8VEWzFCgmLVtdBmPDWl1mcrtWpfOhJSVTn%2FmSQtchV0LpbVxwmKGqraaMcJBC6WRzRxtec9pE%2Bhco1AUbFGhJ3sSCLb2KqLC72juzogBtcqOTikk29BN%2B0Y0cfbXqDgJx6n60RbU8%2FrtMHkUOyteESMfiKzn3TybpiHElWSb5L%2FxZT%2BXvhRPSOaH5eieKJ7o1kpMSfrp37s%2B1J1WWFYnvxjgTUBDx5Xv38c%2BbTBNmB%2B0TaxYZi2d7ZNIGicGGBi5QT%2FsZgvuhWwkqO6YetgovMtADRTDQiaDPBjqkAYkLEUGjQ4fAM8tR9PRa5dsrlt6OGqs3WNRr%2B%2BtXaBeqOp26RtMgCGTblfTDmV35c9QZ4Kh5GPsmSOjyFnyOwoqzh4ntRWotstJt3Ky2dxkenhwCqqeGmeuhBBKekkjdipa7fLh1lqMIoN7mUU8hE4yooa4S0BoBghNObYxegdsY2iYiRmhQk1HpmEvNq7ikSqe%2Be%2FAqwVYvZ929dvHS91j4%2BELb&X-Amz-Signature=c544a6632bedcd3c177880b6b31c695db072224236768553c05799a8f24f25bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWRAL67L%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQD5aQV3hbJLvD9R%2BJe5TbtE1zZb80bjA9KdO8nCptuC%2FQIgaPTSH%2FRw4QpNmzCK4NTcQl5YalRh6a25%2BILpdMS2hLwq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDP1olTUMLLxsdBiRVCrcA32KhrDy7vvtAtz5cyhxAeBORgSEXf%2Bmv1vELxF2DrE6sq3YeiqKJxinhUNJrnjPtMStIIQf%2BjahlAipprG4AznTgPUvjcv%2BxTtj1bicx91sxufgL9cOWLMmup7KvDty2cxBHcBTJ6zWwsFAfDdVoF6oVxk%2BxBhUbbIH8t3TNrsIfU4juzSBqz4HJJtqVqc6bgqB6DwqNSA9cNrmx6EeHMicNfWhxqOX0ffhJeoP1nyvpgfHguvnmCdXJoEX1oga3qVbS2pWcc2buTEtC1eiJhqkm25ZQOxIjmpCTUGr7pYUxdKDGsCa7hefWPnyf4W6%2F1PoKTZJb6jHPZP8tk9ua9YSqQJQJ7%2Fv1SbqZTS3nS7mvuXkE%2B0jefx55GCN1ebHlWTg29h95O9hbzmEHGy9%2Bs%2FbW%2FYw7t3zkTnXQiHr0shOiJnYXybquGNqWD07CQ4FQyPVhrib%2BZu%2BMwqZ8k5uB6ngnwwDfBBJleAtXfGdA8e34HUlNkhG1M%2BJOSUVG%2FCVC6Jx5Q4EkWQ91zYlfJ%2FjnvdcmF7rWgtZgOUmsIkZSv2KfIqo2wsbL%2BVMn6JIzVLKIPNnXXDgHOTt3Byn7sxqm38AnoSBxPDwFwKIV0vrgrYhZaTFXZyT%2BMRoDvh1MOSIoM8GOqUB%2FmaPjIdxq91ZdBl%2FXgkF5o08zvjJdmUHgQ6SPxgjz2KpecAv2j0XWFmxczWdClZWAZrbE1iS1V70omjkcx0NEHtz5I0qe8sCuJ6QxEq5vujT6zSYp0VGh7U0dJE7qlpm1eQA1mzNu9as9r%2F9OCihjqlLYNaWfEXNlw8A%2BWB1heWKlx6DUid8ah6QJMRPkeM9YEVPI1JSk%2FMAJ7xF2uRreeKP98Jr&X-Amz-Signature=dc14a16cc37b40937b5e494778a3362c394aaa545262ef5bc6731a8f0c2ecd16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWRAL67L%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQD5aQV3hbJLvD9R%2BJe5TbtE1zZb80bjA9KdO8nCptuC%2FQIgaPTSH%2FRw4QpNmzCK4NTcQl5YalRh6a25%2BILpdMS2hLwq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDP1olTUMLLxsdBiRVCrcA32KhrDy7vvtAtz5cyhxAeBORgSEXf%2Bmv1vELxF2DrE6sq3YeiqKJxinhUNJrnjPtMStIIQf%2BjahlAipprG4AznTgPUvjcv%2BxTtj1bicx91sxufgL9cOWLMmup7KvDty2cxBHcBTJ6zWwsFAfDdVoF6oVxk%2BxBhUbbIH8t3TNrsIfU4juzSBqz4HJJtqVqc6bgqB6DwqNSA9cNrmx6EeHMicNfWhxqOX0ffhJeoP1nyvpgfHguvnmCdXJoEX1oga3qVbS2pWcc2buTEtC1eiJhqkm25ZQOxIjmpCTUGr7pYUxdKDGsCa7hefWPnyf4W6%2F1PoKTZJb6jHPZP8tk9ua9YSqQJQJ7%2Fv1SbqZTS3nS7mvuXkE%2B0jefx55GCN1ebHlWTg29h95O9hbzmEHGy9%2Bs%2FbW%2FYw7t3zkTnXQiHr0shOiJnYXybquGNqWD07CQ4FQyPVhrib%2BZu%2BMwqZ8k5uB6ngnwwDfBBJleAtXfGdA8e34HUlNkhG1M%2BJOSUVG%2FCVC6Jx5Q4EkWQ91zYlfJ%2FjnvdcmF7rWgtZgOUmsIkZSv2KfIqo2wsbL%2BVMn6JIzVLKIPNnXXDgHOTt3Byn7sxqm38AnoSBxPDwFwKIV0vrgrYhZaTFXZyT%2BMRoDvh1MOSIoM8GOqUB%2FmaPjIdxq91ZdBl%2FXgkF5o08zvjJdmUHgQ6SPxgjz2KpecAv2j0XWFmxczWdClZWAZrbE1iS1V70omjkcx0NEHtz5I0qe8sCuJ6QxEq5vujT6zSYp0VGh7U0dJE7qlpm1eQA1mzNu9as9r%2F9OCihjqlLYNaWfEXNlw8A%2BWB1heWKlx6DUid8ah6QJMRPkeM9YEVPI1JSk%2FMAJ7xF2uRreeKP98Jr&X-Amz-Signature=8d2f398c6f1f4d5178b6b3b7de5d4589227cd7abcfb6f8478c3b09a75b47051b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T67YVD7X%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQDTCBR5Eq7byjjFx1oJDP5nURsI0r4FrlRBCuEV5M9WSgIhAIcGimM3THV4oI66im1H%2B4A%2FIk0teYjWem9IIi2DHJdKKv8DCEAQABoMNjM3NDIzMTgzODA1IgztZZbAQmGVK6Ynj10q3AOX65jXRa969Ohv0FKMW%2Fuamf7DqrfuEGqdAq6TZa7Okj11hgO6%2FyV65Dcgr8sHmqgNb3LKu%2B9rdDNhnR3eZCFbGHlWTkyX7qtg%2Bg86I5%2Bm1%2FidLiFdCl0em6%2FyBfhK77UgTFTPutTn%2B97cmTfEwIPGdprL3OWITMUbv31R%2Bd2afVQrN6yyyhS5JlKZc6koufZnZ445GnzOAa9QnTFJI1iBTgU2TyZLGwdl1I3yWvTFGZyCJIOVE9x0Xl%2BcYo6CoVZW7ncsZ0fJOtwV0ecy%2FLC8YxgvzVSVbmSqYbn0jpgWktvkcminqKFFZsHId2wwd%2BMXFrazo7H0menc8%2FtspRpXqTTG2M8nZBCv0IAYZo5TKd6LpMKIOAvcpRGZge%2Bs8AwHZUcXiMbjJdr3Y50I%2Blv78%2Bsp%2FbVPGLlgn5yNkJ2WS2Oz3ImAMXTSDfJ9p5vYUJU90iKAi3AZ2KgT9CGAyNaL0SjhccTyJZzBYk2kBUtz%2Fek1yuZX56lZ5eyh9gEmYXa4Udo4SDvdhQqhMKj5H2PAVOE7ec7ojiVYjZ%2F4VWA0XnQ4qIhGLUSAzZxfDIiw50lYKOIf09A%2FFQBGaULjXW3uFxzIcY07Wrii%2Ba4GpDX4SCDSRCa3mITC3CahuDDYiKDPBjqkARDKGCn%2BVRPgxssXlPdHA1EUWqNeZSV2hN1QRrxnSJDYWeWUKhwD0MUuwIYIAsu2aNMZJgrsI8NcvLTeiDM8xR8LfYmA786hV2PwNGcGbVkji%2BSlNahKXp18FH%2BfqO6ES4YxBUkE%2Fz%2BLJ4QIWassAKNfP6cuqAi%2B5FFEYv88j1pgVfEzsOc95fBRS9IvHvoKjRy%2FAviwJqT7Ah0CQlXpY4SIJcwz&X-Amz-Signature=6687bcdd88b2b6b5361eaae91f730b10f915d1848f6a63ecc3bdf84b83fb4f61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665SAAAR7%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCyEPwVBMu6nr7dLhHQlmkRypeNvLjC0WGcJkZIIb5xMwIhAIzc2BTqQSS7UzH0C%2BGaU9Z57elX1pwCdT0TlHSiIuhjKv8DCEAQABoMNjM3NDIzMTgzODA1IgwNVRpCkDg3QakMksUq3APntKbMx0Av%2B0mtQqo0CBYyZ3Cy0%2Bsr7xbOMKneCDxsgvA4tuDEWIpgtdk90IaCxOZOzg%2BxUf3HWEW2hvDa8Jqr%2Bsc3jcMwCOxw4XT1oybWo9ad5TOorYMG%2BvQD1vRV98fz6%2FO6eNkoMVWzomocEfmccLQBVNqKWxi57ZbDeH1ef7DmxRTeSN8wgLNBLP3O%2FOVlBmhVf0VA1m2HeQjYJ9vwFl%2FC%2B2cc0EFS64KUncdSvjq7CTPIWx0ChJclAP82chEspwwmAAtNQ5rbIx06xTX1XI6KrgJ0h83sdd8l8YQJqg%2BBaFC07Zdkwz4YJglw5SueE%2BIraHIqhgxqefwg0FGeoyajBU72qOw3Kydy7l1fWATgm%2FGyrJ7S6f7oyYgj9fPa2dwa1tyhZeXbYFxFWl4sZa9HFqyjd6mbI8qZ6%2BFHB3mx07fToxOAnCcwECpWTIoFDt9lSqNBSzSsZDC4PjKzQx1wdmXiVwWvUwgVSbjG8DspA%2Fib%2B3RlvbaPf8c4w4aCLMqByGoz6x79Q6HYYmNMByvOlh9dT%2FIDFtrTIQdna1N2y9YQc%2F%2B0A1n0fXDWGNNVd0q5QUVDF4EIDPZuC2JoXC2vKFN4830xtRFo9eOoAkPQHBqMCT0VwdNj0jCYiqDPBjqkARS9Z1pkR1PEjoMln43Jcfft6CRe%2Fo5%2FPAqE0gIw5VcajwC79T6GRT0LI%2Bfa355cGQ1xhbxWeYl6HAS9YNYuJX3nPuR8nXVqj%2Fmr4GwlypqSSnvj%2BNj58%2BFDxHO8pwgKqRs6g7tH8bh1POV6u%2BMzeh2Hx4D0VJzzn9THwCROF%2FMLYz%2BqIZ6FbIXHVhwJ3jEFXlRYi2BW4U5vD4eu9JXo2fLZJrOj&X-Amz-Signature=5413be231df8a2e28768c584e75b761079e121262a17ded190eb49adf6df9c1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665SAAAR7%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJIMEYCIQCyEPwVBMu6nr7dLhHQlmkRypeNvLjC0WGcJkZIIb5xMwIhAIzc2BTqQSS7UzH0C%2BGaU9Z57elX1pwCdT0TlHSiIuhjKv8DCEAQABoMNjM3NDIzMTgzODA1IgwNVRpCkDg3QakMksUq3APntKbMx0Av%2B0mtQqo0CBYyZ3Cy0%2Bsr7xbOMKneCDxsgvA4tuDEWIpgtdk90IaCxOZOzg%2BxUf3HWEW2hvDa8Jqr%2Bsc3jcMwCOxw4XT1oybWo9ad5TOorYMG%2BvQD1vRV98fz6%2FO6eNkoMVWzomocEfmccLQBVNqKWxi57ZbDeH1ef7DmxRTeSN8wgLNBLP3O%2FOVlBmhVf0VA1m2HeQjYJ9vwFl%2FC%2B2cc0EFS64KUncdSvjq7CTPIWx0ChJclAP82chEspwwmAAtNQ5rbIx06xTX1XI6KrgJ0h83sdd8l8YQJqg%2BBaFC07Zdkwz4YJglw5SueE%2BIraHIqhgxqefwg0FGeoyajBU72qOw3Kydy7l1fWATgm%2FGyrJ7S6f7oyYgj9fPa2dwa1tyhZeXbYFxFWl4sZa9HFqyjd6mbI8qZ6%2BFHB3mx07fToxOAnCcwECpWTIoFDt9lSqNBSzSsZDC4PjKzQx1wdmXiVwWvUwgVSbjG8DspA%2Fib%2B3RlvbaPf8c4w4aCLMqByGoz6x79Q6HYYmNMByvOlh9dT%2FIDFtrTIQdna1N2y9YQc%2F%2B0A1n0fXDWGNNVd0q5QUVDF4EIDPZuC2JoXC2vKFN4830xtRFo9eOoAkPQHBqMCT0VwdNj0jCYiqDPBjqkARS9Z1pkR1PEjoMln43Jcfft6CRe%2Fo5%2FPAqE0gIw5VcajwC79T6GRT0LI%2Bfa355cGQ1xhbxWeYl6HAS9YNYuJX3nPuR8nXVqj%2Fmr4GwlypqSSnvj%2BNj58%2BFDxHO8pwgKqRs6g7tH8bh1POV6u%2BMzeh2Hx4D0VJzzn9THwCROF%2FMLYz%2BqIZ6FbIXHVhwJ3jEFXlRYi2BW4U5vD4eu9JXo2fLZJrOj&X-Amz-Signature=5413be231df8a2e28768c584e75b761079e121262a17ded190eb49adf6df9c1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLPKNQVF%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T232502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLXdlc3QtMiJHMEUCIQDMNDgZdIq%2FhKyqXrC22lue97VfqIDuI0PcFLcuSU7d%2BgIgBsQk7iCBJwNk8R3jzLuL2Yyotr95Sa1H7KrS%2BvJzdmIq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDCfwkRAVQmmT7sjgLircA%2Bj3J5anMtOScZJuRVjCmpkXU9KW1gewJ5f5Z4J2n2hMCHb7rP%2FaoBVXyJIQSTiX3XBIfTJkCtGX13ZoEfNo4WYNjisQQPlVfGGRpZHaqcrP%2FisqC4wkcuTf82d5%2Fo6mzbQPl1HpO0CA746K2dOkazQiS1euHP43UTpbCGDRNFmV86LJJ%2FEuk0374owy%2BNsjupjvPtjJVP5%2Fqx4Uz7IRWDDsplrUc8LfhGz6hESFVeE4MGOBvIilxD4JuDn7tKgEKTn11Fve6A%2BGsfCCJAp30I%2BryYFhV3NeZZeIgFJLOM9crzj9FqzCn7EwUsxoc6WDddx8QVtHAxDKdebcL8%2F%2F5hN6LFWk262eUl52rs5pcYLcP86SWX%2Bc3d5%2BUoGCmP2qYorZdw7VhKmvC%2BXe%2BlnRlyYGxNA6MQbk%2B4dXkPDH1cw7WLWw5FLxRLjIGXKjGH%2Fkd6a3CUz8qICQpKSWk5bg%2BePWFtS81ccvLMakj5t5m2DUzSqTvjD1%2FcXIWsxNZHJ0t%2BKlZK%2BnvZ7XcY2MrDmoTAw0tHj%2FUXt3WXhVtzYWdYDnZi4Ex4vDC5XLfMrkReEasJ%2BEQ6x2Q%2F5I5n76zPs0boigxifWzdLSpL%2BLOffBk4CQADDEHYbb%2Bjjs1GoEMNqKoM8GOqUB6ba7vaA%2BPpChR2da1o%2FILdTAVruzzijz4ICNxa61qTY1%2BXlp0CcmEDYodkuJd1AG76r979LK6fzVnXLmPoub35ipn3yuvFea67QRaUt2%2FtKhfG2ncpa4A0CeeTzE%2Btund85AW26XDg3E98IZboFPVl1FHswj0RM%2B6kQX6mMLSHGWejxHU%2FlmaC9TaUyw43829J4aC7eV87LQT%2FWrkwZF6%2BW9AMTg&X-Amz-Signature=161221efd58f14d55dedd413b78aa7bc55d7670750a7e9b3cb0a1594a58c04a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

