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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SING6VY7%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQD55GJUFdiOKjUoteNFIWgWyEVy4n%2Fmp3K9QRGfUm6iRwIhAIxnqJE7aq2PN6xRMICXqPk60klNBPCgNLKVLhq2eOJHKv8DCDwQABoMNjM3NDIzMTgzODA1IgwwXcG6olAHwi%2BxILoq3AOuREyXDM2dN3OoksIeT%2Fo%2FgFzHuScu1nU8enNnklV4tI53eZcErl21X2WFKRKsta%2B4%2BN%2Bc94%2BTT9hK1fSA%2FMaVRW4yCOxuabirxkB4d2yoExbA7BW0xM%2FX8GdiWxP4DTdAfNbP9pQAq0PMLwhjIZ4ouLfMmpSgf4e0nE%2BMnLf%2BUxIyi5eRSDAIMaiaKYeQXkEDnjxunSkhbnq7ur3pn%2FrafQHyZyeaa6SUoSA8Cjup64NGIm4D2HA7BpulWbMDDnssKfDKi%2FXoRp%2BhpsHGWOawDhByNmwlRpAP7fYmq5eIiCbf%2F3N5%2B%2Biexz7KoPmVedFlKMlleitVEpU320YOIR4RW3Gq4hEAMn7QjOtnkmW00CuzsDUraW2C6J69GQ3Q5%2B42gE8FPeA0SUaueFQzBzVSaJweEJeSHYblXX80eGNo7R54m7lsuvkcCkn5sKRFfFdN1NMGysnfCd2KhvKe6BbSxSRTkcnh2HbrMCMlcCZUHQoo3DDrOS%2FynHOOr44rIXFOxH4VEAIF6GJBrK%2BTKks5LjDQPmy4ClA9wabyYApKmTW2hcYlxbvkfjSMHsMGPxV%2FytbdEMxV2kzgZfLsai%2FO9On2nycTfBm7y41oxgkYEKAH2bRZ8g85nZY%2BCjCqvPbNBjqkAcb7A2XRFSowbxKAxmepjxw4zdvFvuOx4sbIkbd2%2FS2PYMyG2wno%2BqoFlMkTIbGvMdxKWRCWR68bZffposh46tgeJkjwFLO6OW%2F%2B5X%2FDCxTNvOI6UdkFokEfSrURosaI0V92UbQ5mRtjEXGnmo5dD7rhtQ8sCXsgJASg6gSUhQkAwpo1mlXncJ1tG8d6p%2Fs3WU%2BT38Qavz7mYhSLglWkjtwmjTnW&X-Amz-Signature=d20e280cd074ffcb676bd1050b8df9ab156f53d86512af3a584ac68bf261d310&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SING6VY7%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQD55GJUFdiOKjUoteNFIWgWyEVy4n%2Fmp3K9QRGfUm6iRwIhAIxnqJE7aq2PN6xRMICXqPk60klNBPCgNLKVLhq2eOJHKv8DCDwQABoMNjM3NDIzMTgzODA1IgwwXcG6olAHwi%2BxILoq3AOuREyXDM2dN3OoksIeT%2Fo%2FgFzHuScu1nU8enNnklV4tI53eZcErl21X2WFKRKsta%2B4%2BN%2Bc94%2BTT9hK1fSA%2FMaVRW4yCOxuabirxkB4d2yoExbA7BW0xM%2FX8GdiWxP4DTdAfNbP9pQAq0PMLwhjIZ4ouLfMmpSgf4e0nE%2BMnLf%2BUxIyi5eRSDAIMaiaKYeQXkEDnjxunSkhbnq7ur3pn%2FrafQHyZyeaa6SUoSA8Cjup64NGIm4D2HA7BpulWbMDDnssKfDKi%2FXoRp%2BhpsHGWOawDhByNmwlRpAP7fYmq5eIiCbf%2F3N5%2B%2Biexz7KoPmVedFlKMlleitVEpU320YOIR4RW3Gq4hEAMn7QjOtnkmW00CuzsDUraW2C6J69GQ3Q5%2B42gE8FPeA0SUaueFQzBzVSaJweEJeSHYblXX80eGNo7R54m7lsuvkcCkn5sKRFfFdN1NMGysnfCd2KhvKe6BbSxSRTkcnh2HbrMCMlcCZUHQoo3DDrOS%2FynHOOr44rIXFOxH4VEAIF6GJBrK%2BTKks5LjDQPmy4ClA9wabyYApKmTW2hcYlxbvkfjSMHsMGPxV%2FytbdEMxV2kzgZfLsai%2FO9On2nycTfBm7y41oxgkYEKAH2bRZ8g85nZY%2BCjCqvPbNBjqkAcb7A2XRFSowbxKAxmepjxw4zdvFvuOx4sbIkbd2%2FS2PYMyG2wno%2BqoFlMkTIbGvMdxKWRCWR68bZffposh46tgeJkjwFLO6OW%2F%2B5X%2FDCxTNvOI6UdkFokEfSrURosaI0V92UbQ5mRtjEXGnmo5dD7rhtQ8sCXsgJASg6gSUhQkAwpo1mlXncJ1tG8d6p%2Fs3WU%2BT38Qavz7mYhSLglWkjtwmjTnW&X-Amz-Signature=d20e280cd074ffcb676bd1050b8df9ab156f53d86512af3a584ac68bf261d310&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HCKEKCL%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQD33jL7D5jaLIUlLMi50hfH8CufyEUZB5GzXk%2Bs7kXHRgIhANgNnBzYMHhCaRzd8xFDZ05NznqxAn1O%2BjwgDK7jXeWFKv8DCDwQABoMNjM3NDIzMTgzODA1IgwA1SCRvZiFAvVz9AEq3AOZljRN7MifTcS1tRVQiLPxWYXJBGNqbyEMZQ24rg2EQtr54iVmkqQPmeOeivLG2s44%2BdDz8UT9%2BS6YRbaX6cHhkBX2lIF32ff7RBd3WykwQMNCMOpZ70RT0SYc%2Bp4%2BWtB5YX9CeAZO4kabA1H6VoolWjzQDzZvg8FDSfpcQCNywgFj3FLlW0UnFl1f3bo0JtnPhtJu9vg%2BrhUQ4x27xKKo2VDEX87jZIhXL4TgWYispgYOJvPbh%2FNvVUQBvQZFlmwgxLCbZ8YMoSf267DEQRa31Oe0IYO3diUcILP%2BjrXyH3dw6E4rvYU75lncdgvTdrIEiD44II0GecwoYZCPu8zabnnvre4tYuvq%2FI81oriZ4SKIXHkPsUe4Z1w2Du4yxni8wzZAVmkQgdj%2FFZPebHGeTsLjvLxs2hGbKSkJk78SsKY8K7yrjX3edPm9rU2tdeTtSVMPDwzFuUKKPhiBtK%2FtB63y39OAOd3eRa%2FMEOy01ZbpdrPRI0NP2dhsXNwhVDS2HCGsxJeK9iLWMnBmWbRhwTeCFgZapHlHU0rIFvU5gqQY2NuT8t7Qhf%2BV68dWl7CUR255Dollw5TxO8%2F37Ksmg%2FU0TdVO%2B%2FvJxC7UFB2ikWwbnwT7W3mWEfdtNzDeu%2FbNBjqkAfMiZURSPat%2F35JFoK2mhv%2BTJC5y6sxgCOxAwyiQBU2rRrgVx0Y3vC7OP6fvITHI0yk13QxbswTGc2zNYHerkkxzimTg5j3ztqGRHmCinto%2FRQn%2FUuDjAlLSzhhKjVw%2BdQnRpRSrP6GYAlzJYv7efxeYzLN1MR4sMFvLHYtCETBoqKNr4WWjv05ocUcidyXIPtUBM2BDVl3EdvmVJBjwgRGXXBaP&X-Amz-Signature=8a1280057ba3e1c97cce7f48628500f53356e443ede0fcb63ca6fe5b436aba1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBO4T24K%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIHx9hQCGJyu%2BlozpLS5AuFOHRyQau2DCPMbloA2jXCOTAiARE4QCPS8zejeylsSt0nVKa04HDbJp8a02mLLji%2FWX2Sr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMA3Rtakwdwi1YQvf1KtwD6WtRnjikOTKHDYNBN9DrAbgnT2wJy%2BuOsCd%2BEWxmrucVKFXJc6Qpdre8lHv%2FnTIizWxpAJXf9fdE9PhSkqF4mI4zwlnr4QBhazPqDdUycggUJyjR8laH5R455jMX%2F8Wtlflt4mD5takks2yBCzBxVRy42uYzcfWlRSrxNm2FWJJUBvFaDZ6OgFPQcLAVXGL2NlIujG7tmZcILUmI17LvNd7YmTnR1bLx0ZUsOaE%2FWQk%2BW%2Fccadylh%2F9WpXpGsgqgYHf9CEvcUu5GQl3bZI%2Fm08xHf6eGxSR%2BktNd2Of%2F15Y5pJnISRs0rvAfDP34TI4%2BqWjs9O9Ldxpz2VAtWMTlFSzWZ2ri0QtPMw9c56H6iTXBQcvXJ6pwic5femVt5GXqw33OflyWVM3kYrdvoBmIIQV5BD4CDeVUWmWrZqRBYrj4lkoWF%2Fp0KsawcFZskakH%2BB2q8qiue6fzvy1RHxtnv84jjiqlw8Q5fwITyreRPOhJze%2Faq70UjUrF1CeunkcU1VEPFLcaST897%2FxNcJjPFSWQ1kifZVFDHe60H9OaUKMISi3GO%2BZcw7QhvhhonM0mx2c8W4eIcFQpOS6fmmPOriLLsyJRZJtNl0MJfghQOvZH5EgeUOmVEnrDNfEw0Lz2zQY6pgEVk%2Fvcw8nfQrYx5ISTEONRTBDWt9P5SFPsXaeSThLVlrHF%2BaRLYx5VajZpKctYNjiaKh6qklPIErs1iDjZKN70x2YpGuexCNt%2BabnH3HX00wOGcv%2Fq6COjAdywExPqqo7KOxy%2Fel9hrEMiBjLheUYuD%2FVKs%2Bcd7CSiE%2Bb7Td%2Fy62ZpCTlOHJve4Pu0THzNXYN7Rd068YWCyGUZQpQAD%2BDaQzlVcnfL&X-Amz-Signature=fc63b1d9e60b8948b0ac4a37d1401413d94573d682b8fd4482df84886c342b85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBO4T24K%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIHx9hQCGJyu%2BlozpLS5AuFOHRyQau2DCPMbloA2jXCOTAiARE4QCPS8zejeylsSt0nVKa04HDbJp8a02mLLji%2FWX2Sr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMA3Rtakwdwi1YQvf1KtwD6WtRnjikOTKHDYNBN9DrAbgnT2wJy%2BuOsCd%2BEWxmrucVKFXJc6Qpdre8lHv%2FnTIizWxpAJXf9fdE9PhSkqF4mI4zwlnr4QBhazPqDdUycggUJyjR8laH5R455jMX%2F8Wtlflt4mD5takks2yBCzBxVRy42uYzcfWlRSrxNm2FWJJUBvFaDZ6OgFPQcLAVXGL2NlIujG7tmZcILUmI17LvNd7YmTnR1bLx0ZUsOaE%2FWQk%2BW%2Fccadylh%2F9WpXpGsgqgYHf9CEvcUu5GQl3bZI%2Fm08xHf6eGxSR%2BktNd2Of%2F15Y5pJnISRs0rvAfDP34TI4%2BqWjs9O9Ldxpz2VAtWMTlFSzWZ2ri0QtPMw9c56H6iTXBQcvXJ6pwic5femVt5GXqw33OflyWVM3kYrdvoBmIIQV5BD4CDeVUWmWrZqRBYrj4lkoWF%2Fp0KsawcFZskakH%2BB2q8qiue6fzvy1RHxtnv84jjiqlw8Q5fwITyreRPOhJze%2Faq70UjUrF1CeunkcU1VEPFLcaST897%2FxNcJjPFSWQ1kifZVFDHe60H9OaUKMISi3GO%2BZcw7QhvhhonM0mx2c8W4eIcFQpOS6fmmPOriLLsyJRZJtNl0MJfghQOvZH5EgeUOmVEnrDNfEw0Lz2zQY6pgEVk%2Fvcw8nfQrYx5ISTEONRTBDWt9P5SFPsXaeSThLVlrHF%2BaRLYx5VajZpKctYNjiaKh6qklPIErs1iDjZKN70x2YpGuexCNt%2BabnH3HX00wOGcv%2Fq6COjAdywExPqqo7KOxy%2Fel9hrEMiBjLheUYuD%2FVKs%2Bcd7CSiE%2Bb7Td%2Fy62ZpCTlOHJve4Pu0THzNXYN7Rd068YWCyGUZQpQAD%2BDaQzlVcnfL&X-Amz-Signature=18da7b41831980a987a85b2d4acb46a7dba74fa8d796829552ee9dbb9f65df6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYATUGK7%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIBfUvvmSKXF1mkuNodODkb%2FRRni9%2FjEHA2y%2B5s2rTc%2F0AiEA5yCOrZtkfIpV1NDkaPW6%2BFYwfZ06%2FNFHp%2F1m0J63GBoq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDD1VVVKi06%2BbDAaIBCrcAxg9Byqdq%2FBFpn5yO%2Fuvb%2BQtSlS8hUXMQZ2UVQtMmrLjuCqf41R7UPQM%2BCl8gs9brSNfEun8%2BmHJzcNaarq1%2Fh1gFP6HidvjKP5BveuhYoc5vBNY8LrlOc9QSIhbfEGkEMMt2Tbi5Fhy7zIwQ1tRUUeLS1A%2BRFCE2pQ7PwAC9SHl%2BvTkmtmIZvk3hoqk3MRI0cQuOFzACNILWXqZXGy6QoK3RkSPkbLrn%2FRv%2BfXrkrgyhEZK9BSxI2COZmROEJogMLo9M8gpyT%2BYWbzydV2r6lSmHPQOGZNjLsUURE2YnNV17uS7e0If2Svx9A3TMWgjPqX6ImlExTkfDNT32Qmn%2FAFXnMau9QY4mT0X38ucjUFCOz8jOzM6waFTgi%2FqTfJojmDrEsUk9dnj5zsr1tNvfMUHR8OpE5MKylBWp6HRL4fu18oqY3%2B4xK9nsWvVMoVgxTpgkEm2u42S8KLI7tU5TguE7Emp3sH93s2n%2Bw24tFO8LkChmUO%2Fe96D5uwG%2FFuhQgsrt8%2BFmKYnOm43dI0uyMKD%2F0kJbHtWMlIwJi00iK3KBNJF50BjXI0pBcoFzz%2BZ7SmF6ijW83K3GscK1nUoI1gf5Z1Y8POGEH9wbBuSn2bqk9EOjEtYVV3vwvQgMLW79s0GOqUB1qR%2FI5DjSXNEaD%2Bb2iQVey9aJT4VOu7D6vJlZ32tSDT42KjtaNPT5eVoLlrNinVoXKyfcU6i26PYUc8iHNcuakjtgJgCksb4imXMFIxhOwS5hxfZJPIw2s4dYMl19XE%2FCPsxRtbvpmlJKlXlF3pST07yIdr6uODp4HljpgQ0xXz%2FyCxFDH2h1GZQKeNSQ46d%2BHPQda4r3IQ2YM6n669ecc1tzhGN&X-Amz-Signature=67e32ff2654cbebafce09588a214a835adca2bf853dc2a2716061d0031b05265&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QA7MYV2D%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCMKMGK8j37R6UX9CRL2qb75OH%2BaK9aHLIM9zy8cyFhvQIgReySy3yRhzMKzpTtdMf53PKrEXcI8BgTNxw%2BtPN6Vn8q%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDHCLesC%2FiF5GMi1QfCrcA9WoIbX6hVqfpw7xVRHhRomvdSWdMsTqjm0hFMK3vFu8%2Bc9H0KfQw7Sjon8jJ2Q1nU%2FG%2FJA3OA%2Fj5Vx8sFH9v%2BXjXSWl3in69nHMRlXkpz%2ByF4NrDN4rxAyL%2FY2%2F92nWT3Jwtl6D4N%2FTBMEo%2BFlWb2A8NYrg31Oqe8s2yQYYdL%2FUJ7ZDhHoxWn%2Fme6ivY7xAac1YyyDPUMPQKrVQtGBSFtb0EPKuOVb%2FY%2BJRShfkx3cy1UJEyHPQlwcoULR83Wv%2FVAhmIeFrI2QBDsFuUwUKWvOyiZn52pkPt9LzFmH%2Fneb4d33Cuy2hFnROQaFnaAtJKuXp6N7Fj7KVZDGrQ43Vt8hsVZUI%2BZWGt5m5U7dTiy6PJluCqDJemZtXqtV08lhhZYUhhyR2p%2BE%2FEty0M%2Fr19%2BcyrrieamuS1QH8vjp%2BLlK4zO2W%2BLqaYhBTTaR1EacF6GFO4kY5N%2ByDno5JRcdPQaXaA%2B%2Fso9A2coCyAT%2FdnmTSuTIUDPTaOxKdTcnVLdDIm0Zkz1JRXObLS79Ncyzdw%2BNkp%2FK48Xf1ORX%2Bl20yxqgrZWuPhM86k%2B%2BNHO8GVM0zXO9VS23LiSeSMoJ2ALdG4KL4jhZIAaR77em%2Bvl85D3XLTBgbDW1AfG89WIuQMKC79s0GOqUBJ5uh1kKrBipSuTMIZPN43m7NCZI4d7opBj4WOcreHnLimGYKPb0G%2BAOebspetwepTv2hQGHNc9LpHa3KtbjpHcn2Jx3UbNXxwYTPsKjFS%2B2jES%2FJOCIGoesn2lKU8TevGCRlhaHCBuMcSfCS8B9Y6UHIvnbrQKCrhDjiGcthK5mwg%2B0xkyEOMFEdrSxHVAfSJ%2FJDgZbtS5lpR0EtZuJuYeJOl2nN&X-Amz-Signature=8342784042cb9c8413888cce0228fc4393d30dddad81fe63a0d736575d76919f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662R5FHRWN%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQC5zbcfuT6oE13xCbXDk5Vif8xuMFoSZP07H%2BJhBc1elAIgY2YXZYXEGhWQWP2njPHJrJcckqxmy5KnIR7PRAE2yJoq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDGMuSb9AdLwmGSlhJyrcA8LJ9wzN3BiWdE56G1UOAvUOkOgbzvViP4DXj%2F5oKgHT0qr7LQDTcqwqSnlJ6HRkUb7GqfuKfdXlcnDUSLvHT8QcOAYJ4fqyEhUpWPoGuWbKah2hN%2Buy3eWySJh5%2BUAwXDuVA2W2Z%2FfQYlrFgX0r2nQLeAFncRLj6CVaqxKQJDmnM3AmHgbM4rsIW1w6bmhot3VNiguxcU4BhNejesiLR43fASH%2BIs3Qo8kJaC68q3iDXI4OSTqnVS8SZajYtns89EVlqmoSMMno6N3aeN1CwJwxDU5gOVjYfVVKIq9Qds99Nv1gZJuEPa2vy62TQISim2XXh%2FxLr%2BLTtap0Q6XcyCSV4ek%2BKO16dJfQE78YiLk5zwkhz6zfKKNNO1yIDb177oqqElWvgLbsYfR%2B%2BU%2FOI4iaBlwfG4Eygd6GT5JIHu%2F6lbSjrUtQfrji2GNf%2B5Zx%2FQnd0wpdeV%2BG5Dd4zbfM7szFE5hBj1B4p2qPnyaPv%2BjJ78p3NYxdRSV3cH2IX1JlyubU3Lrd2Pne8sR49j%2Ff7%2FzNOdp5N5Lmnr7%2Bl7ObNnwp%2FIjiKymu%2BnjCTR7MkolDrADOFjLXtV3muvphVAnCBNqDcM7fkBUHC4O5f6lHc%2FIMtKjomu%2BaJNQ2IkdnMPq89s0GOqUBJZyVvoX8Yq5rIC0uNoxgBrto%2BQp65v2LGXKOZBm%2FkEuuM%2FsAE9GkgOzxykUquKhPpF2Jv9A0AKTFXVa9idTh6E5hd5vLp0Xlrb9KcMuOqPNKwuGrGSxz%2F29KdrYaKwTLxdnjRDWh8YQ%2FsA7PGgcpbDWaUowbc1D5s73JafVKbWCFXMnkEYMvMo1hf%2Fv2%2F37gMsVfox3buOg2v7IEVhdhn5nxddNa&X-Amz-Signature=2b5da50b7ba29dc80bc712ea6fed1bbc8a79ccbdb601220972ddd41f1dde9837&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WE7K6FCQ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCgjj6YBuh%2FsjdRz%2F%2FiPOMgOHCJRkIXup2tLx0M1chnxgIgdUktrTDGTG1VIpTK9eLXP%2FYR9QtM5nk2nCVzAhd1oT4q%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDEzxQQEn1Kb1JvRnIircA0LLD0WIY7ZK4a%2Bl2mIe0sjKxM9P18AP0jmTiNpUbLVIhuSkeMtwc%2BH3n4lL4%2FfQqaYoxYVpzoGuhz1R%2F4Q8bCyxyf0zInbPnwNcWLNuY2SS6idDOOgU9qswdtO0hg1KOZbDACd%2BoeH6I9sQIUXUMI1SfXmDQaoyFL1RpIRQg0ZdqPRayGsVvXvW24ReXu%2B%2FTPCE88DKMo4VHiqMhI9wtH2Kx0i7fAIgshjky%2FBFZtbxey9mBJJ0nGNu9zQzUT%2FPmpUVZupFCtTTxNbjq2IvHfWAT46PFdfUaOWEUFhvvK3u2enIYu0DlMtm2wvLqLk3ra4SLK%2BbcHLOlAH6myuG9lWH5%2Fd%2BDH0gQ8HKrP39RMxjxBhB9e6XlQOXD0NYmUrtN0NF2BhhPKddAvlMzlqX8qpkTkN0BgMBcjUc0TaOd0%2FKM0a1fC%2BAe1Rrt53U9DG%2FSKdogKSx%2FjeLruOH6Jur5NLXeAgoK3ACrXrD%2F8YORy%2FM6TWoFVZuRHoYNJGfyIh4ve8lTxOFNJGme4zpRKnCoO6owZpaCSL5ZfuMLAv53%2BYaTu3iMKZu7APAGetM7mEmLwEsgF0vt%2FlR8E4NgXC91kQQ4CSsR5de8DqsEHKi0mZAEHV9QVekqVhpHknkMNC79s0GOqUBFg6AuVbHHQrSR4jaGt8YGn9NBckW%2BxIby4c%2FAEX1QnNHC232Wj9ONksn14uJIQmxZwNOngk0hkNxRJANH8Kz%2FtaMaikJsJcdZ3q4W09Ae1laIu7vsMw7znhf27cyoR4pRzBYOQtWGDCOCnsh8z3Xtsq40GX1kMc7NSkT4OQZvTk8gZ9pvHaEwfuBT7JKji9QvDrvvyZx0jkgMjGPT84RtAZmKasY&X-Amz-Signature=3e711fa928798ea675e46b923d8ba878cf276a332c6b5c9c30610c06dfdef328&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WE7K6FCQ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCgjj6YBuh%2FsjdRz%2F%2FiPOMgOHCJRkIXup2tLx0M1chnxgIgdUktrTDGTG1VIpTK9eLXP%2FYR9QtM5nk2nCVzAhd1oT4q%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDEzxQQEn1Kb1JvRnIircA0LLD0WIY7ZK4a%2Bl2mIe0sjKxM9P18AP0jmTiNpUbLVIhuSkeMtwc%2BH3n4lL4%2FfQqaYoxYVpzoGuhz1R%2F4Q8bCyxyf0zInbPnwNcWLNuY2SS6idDOOgU9qswdtO0hg1KOZbDACd%2BoeH6I9sQIUXUMI1SfXmDQaoyFL1RpIRQg0ZdqPRayGsVvXvW24ReXu%2B%2FTPCE88DKMo4VHiqMhI9wtH2Kx0i7fAIgshjky%2FBFZtbxey9mBJJ0nGNu9zQzUT%2FPmpUVZupFCtTTxNbjq2IvHfWAT46PFdfUaOWEUFhvvK3u2enIYu0DlMtm2wvLqLk3ra4SLK%2BbcHLOlAH6myuG9lWH5%2Fd%2BDH0gQ8HKrP39RMxjxBhB9e6XlQOXD0NYmUrtN0NF2BhhPKddAvlMzlqX8qpkTkN0BgMBcjUc0TaOd0%2FKM0a1fC%2BAe1Rrt53U9DG%2FSKdogKSx%2FjeLruOH6Jur5NLXeAgoK3ACrXrD%2F8YORy%2FM6TWoFVZuRHoYNJGfyIh4ve8lTxOFNJGme4zpRKnCoO6owZpaCSL5ZfuMLAv53%2BYaTu3iMKZu7APAGetM7mEmLwEsgF0vt%2FlR8E4NgXC91kQQ4CSsR5de8DqsEHKi0mZAEHV9QVekqVhpHknkMNC79s0GOqUBFg6AuVbHHQrSR4jaGt8YGn9NBckW%2BxIby4c%2FAEX1QnNHC232Wj9ONksn14uJIQmxZwNOngk0hkNxRJANH8Kz%2FtaMaikJsJcdZ3q4W09Ae1laIu7vsMw7znhf27cyoR4pRzBYOQtWGDCOCnsh8z3Xtsq40GX1kMc7NSkT4OQZvTk8gZ9pvHaEwfuBT7JKji9QvDrvvyZx0jkgMjGPT84RtAZmKasY&X-Amz-Signature=5e1d6e539b2596a89610397341071f052c116c67a9071a6da407293a2a791d4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Q55DDNQ%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIAe7bK9ILvBGkA6xJvX378jy8eiKKH7Ldr3J5AzIaCbaAiBQA%2FGMU1Mr6PEohwQ2ngg%2Fj8nb3MmsHypVm4AKN6Oamir%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIM4yedO8sTsq1sMQd5KtwDi8pIa9Eetg0CcN07eVjiFF%2FNz7jCEHIpR1yi%2BpN%2FxkAMvWlhvfcYOqvYxMak5tfxE3OQBPHuQnf2p8fHIzlpVQN5jrBRz2YyqIhuJWSUOAn90zefrmU8j5wEMP8qRWBebGdAjV32JLg%2BoTaU6kw9mbXMFO5OTtBlLceKthvhah89Gv7xXJ5R%2FX3j0eBse2uiWajwlR2NVxOHOuYaKQwQhUpuhxvMAxEFgjptQQrs%2FT%2B%2B8Boz%2FKE%2BkW365MHbuoIjJYcVtAxgw%2Bz3DFi3GUH%2BM4CM3dwHbV8B8eOQ3GtQWkB9EnpRX1aR6cU3ldkjh8uyH5xfLn8cdgDdPYk93A0B6k%2BvKfOJeWEIP2QQuNGwJ8G1bk6DDaxztjg9WqA2BZFWvsTlYJ4%2FoSNjLKZkvPXfu3VCL4C4O8PqzRX0qn7hpXag%2FRrgavhWTeAnGu27t71AG%2B2J%2BKrnkBgGEZGOD9yrPKgIGHK57CucR2DLrAcEwAHO%2BqD5zueJuVzp5V2V4qAOHoX65xJdzK%2BfBdjhDT8yRWNPeoAEq8ZLElwJt0PnmgCcKeZ%2F8AmotrFzCWTsH%2FSBl8eZM%2FEAOZ4bBuY1hBmL80Gi5AAL4riK%2BmSoDZst0RoxpBWTkYgSm8BPkhwwi7z2zQY6pgEFMJUig0sfA94GifHtU1KP8gIkyDttwe%2Bz7jOvzNIpikRMRoiJ73TNUPn8ZUSAtBf30NLx8lTAlVENNaITTdLl33VraUP0lRPyJbi8lzG70lBrSdahOsz%2Fnrv%2B8D5RJ3%2BAPdx3SePPPwVM030lxpkzSpSqgMmryeO5SgSl3WKnMgvNdoICpbtBrsA3x%2BWrT777q%2F19TFwHVV1bAvxLP06zNtOICUV%2F&X-Amz-Signature=f4b4325af7bb367fb73849d99d4e6191a95997e7dd666597e2fca8ef4098a838&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CY5VKBY%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIBv3VKE49dUTnf7FyzuFgOWpTifm3SAyPKgi7Arcljb1AiEAsBisT4Bo%2BssOBjy6IOHHIccLcQgsnXT42M8MaHezYxUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDAQbFx9b190j1DlrPCrcAwMEQqjjq0gXbOIXkLEmfT7qXdp4L8mpcHGWxvd6oU8IKN63Z%2BKilTFXpmpwt8DdcQuzcaMM9hkAV7wBI9GXBwtjEv8sum%2BYEOznxF9ffttfTb5fqR0AnHPMQQme60Fc8POdyDM0jr94iX8x603NLuPpO2EV8faqwAK8zxrFt5RhZ4LWmn%2BrHEzHSbzM7yny1%2F70cznWQweSNHyMQIfW2i8chCKAKvLl4GK2KQEjEw1aLXciJSzwNg%2BQYCY6UYiSkpFS11NVmYXYyPTLrhgWt0UIblE%2BpjYPEvC6%2FiVzmgfGlSAoc1SmjbdVpIKqfPFtVyVmnSIawyHfzxaJS8hFl83XtwX9cu8UzfGKS95iUXwmeXfAm0qCEdmfzZOCLfrmnPCoo8RgQ%2BWJft2EJ8Sh4iAUWwPjgL5jcn8CTsoQpQ5LEs9np0ZAsFHSIzVdXuGtGaZ4iTSvAjoHxB21n4DgCsuhAtIXOiBv8zpB4xfYrQTGfm9r4V5enfJpV%2FbB451EUI4W03RB%2BwWMfAkZcK68Del6C%2BCzs9VEkLJ7yRc%2BWLBNLn%2BDTZ2%2F6vt%2BjHD1XfVDWwh5Pjp8RomdwO0%2BcAoLx2D29PjwtXyPZk8qNlZbqgKFTfMXTBVr3ORS9ZruML279s0GOqUBLvVRI52X34kWAJs1Xz9HEbiGWtUTpn83ymPq5XgdlW7IdxDsdPGa6v4EoYdDUZd3bGPE1kHuMFw9SmlUxGMAs4hj27qXd%2BDZOeoWmvpWTAd9Abghx2fb7dTknvi3cVLquzzAsh5AuJ95teMkJidEdNz4uGciVz3Qm0SJtS678ug1xV%2FNn0VgeeA%2B13IHvSuS11xgLXhHJkjYdC98u3GlIZN1O0vx&X-Amz-Signature=484ba5ab8cc5c4de0ededaa4a9dd6e2e01b0abf53ff117f35f85ad876db59d4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CY5VKBY%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIBv3VKE49dUTnf7FyzuFgOWpTifm3SAyPKgi7Arcljb1AiEAsBisT4Bo%2BssOBjy6IOHHIccLcQgsnXT42M8MaHezYxUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDAQbFx9b190j1DlrPCrcAwMEQqjjq0gXbOIXkLEmfT7qXdp4L8mpcHGWxvd6oU8IKN63Z%2BKilTFXpmpwt8DdcQuzcaMM9hkAV7wBI9GXBwtjEv8sum%2BYEOznxF9ffttfTb5fqR0AnHPMQQme60Fc8POdyDM0jr94iX8x603NLuPpO2EV8faqwAK8zxrFt5RhZ4LWmn%2BrHEzHSbzM7yny1%2F70cznWQweSNHyMQIfW2i8chCKAKvLl4GK2KQEjEw1aLXciJSzwNg%2BQYCY6UYiSkpFS11NVmYXYyPTLrhgWt0UIblE%2BpjYPEvC6%2FiVzmgfGlSAoc1SmjbdVpIKqfPFtVyVmnSIawyHfzxaJS8hFl83XtwX9cu8UzfGKS95iUXwmeXfAm0qCEdmfzZOCLfrmnPCoo8RgQ%2BWJft2EJ8Sh4iAUWwPjgL5jcn8CTsoQpQ5LEs9np0ZAsFHSIzVdXuGtGaZ4iTSvAjoHxB21n4DgCsuhAtIXOiBv8zpB4xfYrQTGfm9r4V5enfJpV%2FbB451EUI4W03RB%2BwWMfAkZcK68Del6C%2BCzs9VEkLJ7yRc%2BWLBNLn%2BDTZ2%2F6vt%2BjHD1XfVDWwh5Pjp8RomdwO0%2BcAoLx2D29PjwtXyPZk8qNlZbqgKFTfMXTBVr3ORS9ZruML279s0GOqUBLvVRI52X34kWAJs1Xz9HEbiGWtUTpn83ymPq5XgdlW7IdxDsdPGa6v4EoYdDUZd3bGPE1kHuMFw9SmlUxGMAs4hj27qXd%2BDZOeoWmvpWTAd9Abghx2fb7dTknvi3cVLquzzAsh5AuJ95teMkJidEdNz4uGciVz3Qm0SJtS678ug1xV%2FNn0VgeeA%2B13IHvSuS11xgLXhHJkjYdC98u3GlIZN1O0vx&X-Amz-Signature=484ba5ab8cc5c4de0ededaa4a9dd6e2e01b0abf53ff117f35f85ad876db59d4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFGAAF4J%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T211747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIE2wVC%2FqwyMKDOhoI4nia6sbB%2FYA%2BDtTlQhJ7v277pNFAiA3dY93O4bXQLfVhGGoDNB%2BBuDpRS6ki%2FFeO4YtupJ5QSr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMXZ0k%2FzhDhg0vi6zWKtwDfXDkxihKDkMsFWy%2BPMtmNeLH26FKUeDCFUSHZJ9t%2FRhrhCJ%2FQJAIDaG%2B7hdr5q%2BfwKHusvat6yffDv5bxWh6By4HSLJH4c5%2BAEk54GaZnZwH1y9Yjaglr3z3v9n5y0b2i6v8JGBIhYOx%2Brb95DsZskBm6DIOja9hAknSqLMUDHpA0ulfChqbnB2Dbdkp4eodVGabRIFo7C1S606V0BUOwZquiLCaSjpG%2BaGW23QEsNbO%2FmBpD4NAa30s5m57lcaLkbEPfFA8Y3I%2F5Qp9YwE2J1seZMTAtDkUilcFJ4KBus%2Bk37P0%2BCbfV0BrrDa06udm4X5tUmNl3cGvGxoozKUH6zArTnSZSFD2WgsmdkLaJAY0b4SJmVO1qcY3Hxq3LnV7fyLssE9XBmRExb0MfB6wFGCaHmOD708QmOsLHV%2Fcab2RhjalDwCrzC33hsn7axSkoP4Cjijyy2z8HeP%2Fx%2FP05K%2BKNfkiqPq3xp%2F4nRSfVHLWXpxqdB5c29QL6PTS1gTDeQnxlBrZJnGmEgELcQPPS%2B7mlOOICQDKJd4g36k1x%2FDlZ8t0TPgDwkIYb3V6TQpeF6OdSl4HcZjrPi8%2F6GjyKhHXxL%2FtdHaMd%2B1NQEDdhfsc%2F1TJomKFiJ7XQ3Ywybv2zQY6pgH3MbZB4IPim6dN9Jb6B2zjPVIXLQczz6V1ybEo6k%2B98yfnu9SOAqrx6izTTjT5t%2F%2BNWiWGrLvbVB2RhCELcFWh%2BApNbVcnB%2BEVZRxiNPVuSy679sCvVbnDRLMNs0916zhkFS1p3Ugko0k1PfU4gaBWFGUAyaHgybxVUfvoJ2E7eCy03GEEs2zT8J1yIbvEfi7UDnh9UiTHvPZgJII6iVzHJLPRcvE%2B&X-Amz-Signature=ff9a5d20c7bfc5afdfbf42a562328411ad4a5e76d1e2819dac9444ce641e8087&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

