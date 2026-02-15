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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JSLWA7O%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQDat007ROgE6PeOOIPfiqz0Eb6g9uYNP%2FizVQUvATtFGgIgTsF%2F0P0oXOVOjYxcajW7K9g1Q3TZGIS3q6ltY0jkZ%2Foq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDOWlFIjQVnxHPGUh3yrcA4e%2FWNPvB3rimRa5wNIG9mDyjr%2FUplk1LqvhXNqhCwWI5Ydl9COXNahfFxK%2BDcKuuRPYCrhkMpZTlrsmteouHsh8YSRrIqz7aTQowcNmZCA7%2FgIyIV8cTx7jmsFkCZ7o7k7VazwpPzcJWkgLNMmab5gOkPZbKqPgYPcgUwvFD9WmwFmDgnFC2bkbMw3jd%2Fko50QK3c%2B4TIEVN5Eei%2BqQq5SoDXzk8AXKBlXUTQ6BV%2F6vG8hyTgUd4HJfsNfg7JaM8c1qeOjhVC3n92BFphWUOvJxFm8C8di3i0LIAh8vJv90OTLEY2YYsDwluKKtsy6ZqygO7uEblZSPbhgkrAFpcpDl1Njdll%2FgZO3i8FhIwTRXbKJ%2BfeASGeiJkf%2FI2Pbi8l5mQjaFEZbebPuI18cZNXu2YUGOQmUAmshJv9OAT8S8lY18pvRsId%2Bu20gvMmFIObLN41QtOUOkbBaOjVpVI5IwpxmBmKVB2GQdAlclURkE0gaQ5sjlV5JBt49vSrbRsuNTFTxENVvTtjCBlFNys2AgUJpwTe74SctsswUtgz33M8qOdUf0J6Xuu%2BX4xiMyHivKH8AOCXBkA1SYjsqo%2F55uAiuMBQfQXWvPLx4XTmBPPQXLkMuVP6OCJDLXMJbsyMwGOqUBtZAyLw343wVPwx5fcvD3MUUaqQ0ADbi0TcMJ9nRLv5t%2FcbgZHlOTrO3CVQE7q5uwdtvIH3%2BwY09lyqovFx4Xyth%2Fre15fhyPv%2BMZmOX%2B%2Fe8dPX2yEUhGlJcQPYEYiQLEQOfNtXlG225UvRj7gqtPOL%2B9J%2BFfycozjVciObyd1VEQlcy8oxgChgLS4mVYaN0R2jbUhdX7qZy3rjw8DvuTpbnMYGye&X-Amz-Signature=2737fd27ad901b82a5175d8dca5144a79d42b6396e5739c0361280700b810f7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JSLWA7O%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQDat007ROgE6PeOOIPfiqz0Eb6g9uYNP%2FizVQUvATtFGgIgTsF%2F0P0oXOVOjYxcajW7K9g1Q3TZGIS3q6ltY0jkZ%2Foq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDOWlFIjQVnxHPGUh3yrcA4e%2FWNPvB3rimRa5wNIG9mDyjr%2FUplk1LqvhXNqhCwWI5Ydl9COXNahfFxK%2BDcKuuRPYCrhkMpZTlrsmteouHsh8YSRrIqz7aTQowcNmZCA7%2FgIyIV8cTx7jmsFkCZ7o7k7VazwpPzcJWkgLNMmab5gOkPZbKqPgYPcgUwvFD9WmwFmDgnFC2bkbMw3jd%2Fko50QK3c%2B4TIEVN5Eei%2BqQq5SoDXzk8AXKBlXUTQ6BV%2F6vG8hyTgUd4HJfsNfg7JaM8c1qeOjhVC3n92BFphWUOvJxFm8C8di3i0LIAh8vJv90OTLEY2YYsDwluKKtsy6ZqygO7uEblZSPbhgkrAFpcpDl1Njdll%2FgZO3i8FhIwTRXbKJ%2BfeASGeiJkf%2FI2Pbi8l5mQjaFEZbebPuI18cZNXu2YUGOQmUAmshJv9OAT8S8lY18pvRsId%2Bu20gvMmFIObLN41QtOUOkbBaOjVpVI5IwpxmBmKVB2GQdAlclURkE0gaQ5sjlV5JBt49vSrbRsuNTFTxENVvTtjCBlFNys2AgUJpwTe74SctsswUtgz33M8qOdUf0J6Xuu%2BX4xiMyHivKH8AOCXBkA1SYjsqo%2F55uAiuMBQfQXWvPLx4XTmBPPQXLkMuVP6OCJDLXMJbsyMwGOqUBtZAyLw343wVPwx5fcvD3MUUaqQ0ADbi0TcMJ9nRLv5t%2FcbgZHlOTrO3CVQE7q5uwdtvIH3%2BwY09lyqovFx4Xyth%2Fre15fhyPv%2BMZmOX%2B%2Fe8dPX2yEUhGlJcQPYEYiQLEQOfNtXlG225UvRj7gqtPOL%2B9J%2BFfycozjVciObyd1VEQlcy8oxgChgLS4mVYaN0R2jbUhdX7qZy3rjw8DvuTpbnMYGye&X-Amz-Signature=2737fd27ad901b82a5175d8dca5144a79d42b6396e5739c0361280700b810f7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TACYMYWU%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCICeexnpZ0umrZZJ0F0TKBvkSXkmTT2DiSLr%2FkKGRbbDRAiEA6u0dBiSWPBu2WKleIv5XK3xi9FfdmldaTak9KnfEO%2Bkq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDClpdB8PlDnuUanO%2BircA1BnBSxidrPDlLJyPkp7dVAKm7h7gJC4x73CleIhWEfnn0HPKlf%2BRDa7edpe9eWASd0mQC0VaJeZLcUQ2BS1a5mpTKe8uBPlZFAeUBCPWqoe2CTs7lNUVbEMAiTRo4Mc3gV9xjbFQqWvRpZOaVh2xpge6f1TQURg6urbe%2Bqa%2Fc5R5Z1ULt4ArfQ22GjjwdYXeUd2CQ5JnFL0qijt15%2FyhMzoLcWcH0lKVXLaatW0iOlSCKYjsk%2Fh0CKiU%2F4TgsDkdcvXk2aRvz%2Bxk%2BRHEnrtEV3BA23Y%2BmK0y%2B9EK0lipz3wHoCbawEyhTgiWtmopuVZugQOsAow0cGhIF4chyLUVc82nw2GeV0FYglRpbGdqLJ0PWZ7s9dpHF9Tk24Ri32PJiyAIcB5JAZ4P9OvyxGOI4OCr47cn%2F3su6jlWrtDK5xU53xEjHnOWsKb6j9gQBV%2Bri7URmgou2qpzkxUyvNNgvbxsWiRBaU9OPEDenR776j8tcKk%2Bg%2BenekDJaOHS0x1LnhyqH9Yy%2B0WDiYcwdRaopZMbE%2FsoQ7S9xmFbjLxglF1Z7gxLqavspXrv4a39pUnoQuwIMzGxuGN%2BaGZKhPMYAIqsoliidmH0pL4AF4cJLXKZRiSKBCjJyBRCsbGMJfsyMwGOqUBgtu48QndtI9llEgloBAR4YhCniQST%2BUr8ONHv%2BArnNgjxbD9UqQVYrCC2ahWSGc5D2XNeSf1AvT%2BBIuNxteM5%2FAcFWW6F2wf5dqvM6SI9Uv1w779LNBCxVE87tg0%2BVcqypiLchwgs%2F08RBSezSfMnWmlwu5zDdY%2FcOzxU243MepMyjD1mWJ6DhOAbUZ%2Bbbs7bTOnP1SIYMF1fYhPwEP%2BJQNEvDt5&X-Amz-Signature=b39d4305ec2e512d5eb476d32199cf874df594c408b9310b3172b63b9f707ec5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJ7P5ECC%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIB0i%2Bveashbqc2UdBEtVPKf6IqfhC8%2FW4NlS%2F%2BYRYjuLAiEAwgTudfawK%2Bb1Rk%2BeVwEZh2DmhI711zlTr5HicY9Io4Mq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDNvCde6MY9AomvLtyircAw5e5zjuDDqDoWMaVL1OKqLq4EG3mbnCzwNXmB%2BtBx9QOS1kNkbwdMxqEJ7dgvFjQMga%2BH8rJ4Kfo11M6hLU2F9MXKwQIecFxpxIzp1prTAGUL42Ov9Uzk0kZE2gipamxxFvmvUUgkw6db8IO3GKkDg34JI6ItPBkaexXbwopmLURHSEaj6wQ6HqMBiiOEoPXmLk%2FexvvHROaos%2BSY8uNb4djHQjLnnAqqOKPni5PzazjP89gbbkSsFMJbyQVlQfn1V3Ain46B%2FQ8vugl%2FGVeJtxLm7bacZJ2g47wK4EiJK53UeV4dlvKuAOFQl%2F4q2cJuZmyclBOurSJXzun7c7%2FqJKXtV7BIqZ3lNkECdJbC0dXv5CM7cClf%2F8ovObVSPNUrRif28lPkcGSGarLfIV3cLvmIMwxGEgHn8J7eUgzxWGYVWjoIKACvT5W%2BeEqZVTBS1Na1u8iPT0YO2RjIR47nsPdEtvJ6fMXnk9HyKr%2F9YoVUY6mzX5srgkt0dFRzZg2Bo7mqOPfaGovv5i6FLU%2F7qoGQ9OEHVUDD7LnD3gtSuv7LJqIlk4K6l1UMKy6dPthamehem0Y4ZsNkF3Ypsq0gSqerYfW72B35GmP2CR%2FA0B6HlggZyIle2eRICmMKDsyMwGOqUBG6rLU8Lk8T1DaCQrBlORDADiJNxo8vojVBzQ%2BdBVplXgzF0vqOso0a7uFIqxEG4lw6wcLG6lii8L333nYCaJ0IEUUuWaqVbpPW1%2FBBtUAyCPKvgpKVHbVVRqjQevO65sFOJcfl%2BC0IDctpvKbMPgDVt8BzvqFGqgFYmvB4Mxd%2BgEB%2Bk9sWVR7BBO9p0NXmWnHxJDErKYLd5dCqXBONvSN7pcm7PO&X-Amz-Signature=3e0c4fbc7a4f53a92920c82c3b4be52e8f8d56632177f04238cdf96c58c2abbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJ7P5ECC%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIB0i%2Bveashbqc2UdBEtVPKf6IqfhC8%2FW4NlS%2F%2BYRYjuLAiEAwgTudfawK%2Bb1Rk%2BeVwEZh2DmhI711zlTr5HicY9Io4Mq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDNvCde6MY9AomvLtyircAw5e5zjuDDqDoWMaVL1OKqLq4EG3mbnCzwNXmB%2BtBx9QOS1kNkbwdMxqEJ7dgvFjQMga%2BH8rJ4Kfo11M6hLU2F9MXKwQIecFxpxIzp1prTAGUL42Ov9Uzk0kZE2gipamxxFvmvUUgkw6db8IO3GKkDg34JI6ItPBkaexXbwopmLURHSEaj6wQ6HqMBiiOEoPXmLk%2FexvvHROaos%2BSY8uNb4djHQjLnnAqqOKPni5PzazjP89gbbkSsFMJbyQVlQfn1V3Ain46B%2FQ8vugl%2FGVeJtxLm7bacZJ2g47wK4EiJK53UeV4dlvKuAOFQl%2F4q2cJuZmyclBOurSJXzun7c7%2FqJKXtV7BIqZ3lNkECdJbC0dXv5CM7cClf%2F8ovObVSPNUrRif28lPkcGSGarLfIV3cLvmIMwxGEgHn8J7eUgzxWGYVWjoIKACvT5W%2BeEqZVTBS1Na1u8iPT0YO2RjIR47nsPdEtvJ6fMXnk9HyKr%2F9YoVUY6mzX5srgkt0dFRzZg2Bo7mqOPfaGovv5i6FLU%2F7qoGQ9OEHVUDD7LnD3gtSuv7LJqIlk4K6l1UMKy6dPthamehem0Y4ZsNkF3Ypsq0gSqerYfW72B35GmP2CR%2FA0B6HlggZyIle2eRICmMKDsyMwGOqUBG6rLU8Lk8T1DaCQrBlORDADiJNxo8vojVBzQ%2BdBVplXgzF0vqOso0a7uFIqxEG4lw6wcLG6lii8L333nYCaJ0IEUUuWaqVbpPW1%2FBBtUAyCPKvgpKVHbVVRqjQevO65sFOJcfl%2BC0IDctpvKbMPgDVt8BzvqFGqgFYmvB4Mxd%2BgEB%2Bk9sWVR7BBO9p0NXmWnHxJDErKYLd5dCqXBONvSN7pcm7PO&X-Amz-Signature=5339aa96b99e7d997e3fb54259a273a9cf5ea2d9136d04cd2013ee21666b0627&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOMSILNO%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJIMEYCIQD13O9G%2FvIOl626S6xejKp70TPppQrwXodpM29Mkw2XKwIhAOQD8OKHRqNedKIMnFvv9wBjlEn5LXdUo%2FaWp1xKOZ8DKv8DCCYQABoMNjM3NDIzMTgzODA1IgzqkxvIbhTCt3%2B%2Br8Eq3APaWbcAYdQOEEuViH4RaoQQrbPlUm7q5CacArJXp49eeEp3gzBY5XSF6jVH0yOF1aajXD7KB5ig%2FPZoy%2FRiPAZ%2Bf5PRE16q96gRN5mbek8Jt%2FPKpEZx8Es0DAFN8%2Benx%2BfxnDULodC8XoDMI8eDMuaQ2F%2BJ9pgx1%2Bb%2FYFqgW1sGu5DJz3PBjrNM2arjR2Orku6kj%2BdkmkkLGLIl%2FUpPMBdHuG9FbtuUiusJhoaa396W4T0QbTzcLc21xJtj%2BvKKFHvv0RNqS05m6QArN2Q72zfUv0yUTw8QZfagEzFr2xCsh0gw7JxMJSjjkROswlt9iEgsS27p2JIEQm%2BRbhSzf3yPhISxFxkrd1MsvYj1F3vDSOjtR1qQdMpU58tu8dTVhrYSsxwf9uZGcgP9FgtAA9%2BjPcgkRKXDDa3ePSDPq788TbihWNBuLlgC45MfF3OvcQdr%2FhVkqHVvenvSl1lTn49%2BX7bh%2ByL75NwgKgDd75rcK8GCF9XdVhlVv3voHZFblAC6J9OBwFW%2B3QbpLFVvBWJlHpqm98GKNij6RtRlttYBrIBVyAKRZcc6KQ0O1lTU5hgAblP8mEE62E%2Fr3Pnutjhn2PjSOnV1lWZ4JIhwc16sp9cc9W4eN3vCYo%2F34jCC7MjMBjqkAbMS7NfhUyuP4t6rzmdm4rFPl74JoRI0NG1fWum9xhLayPZAdL82rU2QouPcRqQBGoW%2BwD0Ig%2BftowFotXh2MLpI0QNuirXOMfZE3OQo7%2FR6%2BFi%2FVN%2FU8FGhzb5HUmSNNnS76brTXe0DpOSOgym%2B5VtwIwWDosp1GyrAikcfWj1Y3%2F3C9uqKGJIJOH8Jl3hH1WQVJPNssFtb3Qpq%2BE2fY8JuERWf&X-Amz-Signature=72868eb4bb9a2fe975578aa7cd9674e0c97ca2ee5091385e8ea179224226dfd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663V73TUJX%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQCOjjjuX571mK30WNuCe3uHWujm32DW9ZMjlpRV7OFzsAIgcbmcGrZWkqKheyR5s%2FpWnh58%2B0CNDUEpZFjpgRdiHOsq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDGkhDKFJUXgtefksNSrcA%2BW8GVu7WGkcgffJvAmexrlsEP57Rt8xBhRt1qbQxZn%2BtIVNwmGw8%2FuH1jnV8L%2BfP7hrKsSJOYfxrxTgRiZDb0tZ364PbkQyD3UPHGjPKyWQQczMnsVjkCm%2BQ9%2FdADIJ5HKRxz4K%2Bq9j0r82saJv7BpU3Cov9fKCnX%2F1E%2BhNhUAvObscbVh61IzukghWiqTe%2BB4m3QeKzixXvSkfeS5lBVqELAfFbYV%2FgW0d1pkKAkY2dhtQehCkqI1JExtEOPfYkdUJQXOrtiUjeneCfI4W8ILjYsW7pLBTsjqULi%2FLYjw7pqW%2BQi4hrWccxq8ptMcN%2BFtHmVKJkscB9vja4ddIs4%2FuZTIo82GmqyXR5bLvE%2BkSyC1pNRnu5esg3X8if1lKauHPUbi8WtPlQ4rjQS2VoaOVdR%2FkS3vDBaIU%2BcKso3li5QjbH5xHlT6xzWZSz9CZN0GDQs929e6iA7gbFXW9N%2BG7Ue6tZNn%2BN2rQHlzdJXCepskuqyj7Zx%2BvDLPTe5MbGYubYNqneHGYfLF29nSxtEMfvzjc7Mg47jMlnE%2FV%2F52We8lpfTe%2BIECoPOm2bS1ZuYA0ru9rsPU%2Fpmr2qnHHNPvzXJtNXyX7iu%2FcHy0WCm6t1aq0OBnmk6we66%2FZMM%2FsyMwGOqUBaP1IvbJwgcMTRv2oUyDpLgzo6l46IExIgqkshWUZDWI86Ygr%2FObndHi6dkSM3UTUnG4IM2qvu9gvk%2F%2BUnVtl0rcrfwk%2BFDg9prnErWugiEICV1Fwh2RVGfRvoDoklJLARx1z%2BPyfPstn75gu6ITWQeA7344kf4Sw7HI0OKsrEA0kYVRavJTAEDPTxRp3fG3jvBPKX403%2BzSRbX4rkhoduhP%2FUoI5&X-Amz-Signature=bce39300e677108f586f7a30c78f215520988acf75eb9789580de035618f045f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SONBHMEG%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJIMEYCIQDGj9a50ZUwu983ese1SyJB7ud1SOXlaSisq9bJl3%2BSDgIhAIsIjOR3mpirX%2BqCU1JHL2qrO5u8nxtHKt8iS2mgDI1yKv8DCCYQABoMNjM3NDIzMTgzODA1IgzKgEv%2BiKMhe3qh7r0q3APnxiY6p%2FrlXPf%2FPC%2Fa0jXZmPxgo3t5MKyXuV1L4j1NWtJWXBkB%2FyLazvKxeH%2FY35zlL1wu3ZNagHwhaWULSft5CKcWVoF2dKxmr861u%2BLTu7sszIAySFwOyNFOtwSCq1q5ys2Vo3MH2uTdtW4inRUtJllhCwubx%2BLkxHLHB3vnGkaCW1vRNw7tk6cNGSRRHMkD%2F1qDDkZXeX%2Fh%2B9UWK5xI6jYWqlc7VqJEaZz3lQjuymDdopaBuolSbokiCJ5QVMgzVAdXpKDNX1y8%2Br08xQao6yQQRW2TIwiUuqaMPLOA71mUoO6OPxS2idwlWMZeaxejIlIuYb4cWjmS1L4R%2F8lcCYtm0lo14Lb0Nw23AAxliNg0L5P2KG1rlsdhTEF8xzi1NvYy9VA8CH77GVFssBIy4SirkOE1UuvOidURffKDT4Z463hXYOC0YU2z2hA4XuF%2FTSto1vZmK40bioToEPtymES1fGJhz9YVfe4KNmw6d3I0QSXx%2BlfQRsFsaCC1x%2BtGpKNtJIlfbuBpRa18aVrs66SFZ264AcBlsb9kGz%2FDmqoHsW%2FhMd1S3P4tJqabBmt2MBYqfPueU86bnT%2Fcor1C%2B4DDzyp%2BlwhsZT4Wih78PWFDBQPqYUEpHc3wbzD568jMBjqkAeVyfVzHa0VeOqTUgLpU%2FmdxeU8ShRZY7EnWXtCylNLSTqbwP3QVmKnZsOWx3E%2FdKkeGJH8%2Fx5kqMRnmogOaGiNhVBH9Gj7xPBFHw%2BYgNJFrTM9jAM3DiOWWY94oEq4JHt6aRBOtlxOLi2b40ueB2Etig5SzPfyD%2Bi1msLmNflzYdz5Yrp6jlVBJQwt1CbVD2FiG3bfCQoi6degPSaNKdzGudC9Y&X-Amz-Signature=2e0d98aa704cd7df15994cbddc84f2ed1a35439dee2ca533a42558c0347d4a7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642JWK63A%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIB%2BsKvbvsD5eXD8DIzl%2FqZq1ZzQUf13HZbucJT4D8VIiAiBS0KCqZlDZ3mLgt72gR9eMBv1QK2Hnae%2BSC5AIf%2FNGiSr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMJb%2BJNa5RwYoGxq6kKtwDTqjPrrxCmIvDkIfSnVCUmGXNES%2B%2Fn0lkCVIHG71MQhF1VQHlshk0dTbTuzC40EREz2b8h7HgKKQ%2Bkl%2BCoLIbQGzlxLMJbv15ac0j0pu%2Bl2p0wfpJrxRGVEaZtWJJ3NnHf2LEih2aN08KFFiXQZukO%2BSiqKKn9AsXVWSVPv37Yut8ALN0c3tND7M3JXWImghOSxwjlIuBnu02vAvWc9NW47VPaWlBzVLZcGCy4J27Qhw0ce7qd%2FG5QHPwkXlQ3nrSvFyW5woWu7Y01L%2Bdq1HFDB9LtoTp42SomfZ138bd%2BJnfZj%2FjjKWkBHuoMUedQzdx0oFzVQnnzie3ShK6MljOjVxI6ZZWjeTJr0r3X7cV8SPqEooj8QfALrwP6Yg1Q%2BF0EH778xtUl2mU%2B9sulmASSbU%2BF6kTXAMJqfbThjyvpmxCnvBmUk6nkehmG2QX1yTStaIQQLkT8ws72zhg6Os79uGPVJQEAVG0rfOB3ATGLLks9PkR8UXHk%2BnqC1CGKgl%2BQ1oXjyHnpKDp7HD64littvW97A0r7ud6NpxJAvJrfm95yzXTxt6FPdvHyzlyQSmgE8ZNFxrRXuEHJSl%2FFTTdlE915gu5sImg4r8Jg9N%2B79kSwe%2B6HkfRkUhL6pwwgu3IzAY6pgGrnvSfRQpfAjKqT135%2FO%2Fgk4qp6OD%2BLFGyMAqvGvb0BLHWHzuN3pfnpfMftdH9G3ssHgm90NgvgFGufNi4sff8jllD66o0WbpRji9B6UjFYW3pi4GD5n54xKTXrxsWbh2HSQBRc6wuHtjkry9xyUlYLlOzIiFT7pLHykEZd7FfKmKbh5tevfWL5Ijn24fMa4u%2FsIoe6Srl4v9ubcYc9RG18HfA5b07&X-Amz-Signature=09347dc5e65e842bd5818816dad867bcfec9b89290854be6b530ab48157db693&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642JWK63A%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIB%2BsKvbvsD5eXD8DIzl%2FqZq1ZzQUf13HZbucJT4D8VIiAiBS0KCqZlDZ3mLgt72gR9eMBv1QK2Hnae%2BSC5AIf%2FNGiSr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMJb%2BJNa5RwYoGxq6kKtwDTqjPrrxCmIvDkIfSnVCUmGXNES%2B%2Fn0lkCVIHG71MQhF1VQHlshk0dTbTuzC40EREz2b8h7HgKKQ%2Bkl%2BCoLIbQGzlxLMJbv15ac0j0pu%2Bl2p0wfpJrxRGVEaZtWJJ3NnHf2LEih2aN08KFFiXQZukO%2BSiqKKn9AsXVWSVPv37Yut8ALN0c3tND7M3JXWImghOSxwjlIuBnu02vAvWc9NW47VPaWlBzVLZcGCy4J27Qhw0ce7qd%2FG5QHPwkXlQ3nrSvFyW5woWu7Y01L%2Bdq1HFDB9LtoTp42SomfZ138bd%2BJnfZj%2FjjKWkBHuoMUedQzdx0oFzVQnnzie3ShK6MljOjVxI6ZZWjeTJr0r3X7cV8SPqEooj8QfALrwP6Yg1Q%2BF0EH778xtUl2mU%2B9sulmASSbU%2BF6kTXAMJqfbThjyvpmxCnvBmUk6nkehmG2QX1yTStaIQQLkT8ws72zhg6Os79uGPVJQEAVG0rfOB3ATGLLks9PkR8UXHk%2BnqC1CGKgl%2BQ1oXjyHnpKDp7HD64littvW97A0r7ud6NpxJAvJrfm95yzXTxt6FPdvHyzlyQSmgE8ZNFxrRXuEHJSl%2FFTTdlE915gu5sImg4r8Jg9N%2B79kSwe%2B6HkfRkUhL6pwwgu3IzAY6pgGrnvSfRQpfAjKqT135%2FO%2Fgk4qp6OD%2BLFGyMAqvGvb0BLHWHzuN3pfnpfMftdH9G3ssHgm90NgvgFGufNi4sff8jllD66o0WbpRji9B6UjFYW3pi4GD5n54xKTXrxsWbh2HSQBRc6wuHtjkry9xyUlYLlOzIiFT7pLHykEZd7FfKmKbh5tevfWL5Ijn24fMa4u%2FsIoe6Srl4v9ubcYc9RG18HfA5b07&X-Amz-Signature=2549b0eae92f95ed644726c9e29d6180dfdd25f3ffee5a6467df06bf28eb7689&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LMX43P3%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIDK2t8VzzeA%2BmZVsT20WmxtqeQA%2BZ2u3hqFBdnRlM3WhAiBeEMbJPKxtGHjI0nUiTYlEw%2BmSx99W7JhWHfAimcE7jir%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIM7IlLEQBDj6D%2B0NnGKtwD22fLKH2%2F7y5J4G%2BFzBYxervRIbfnR6fANAY1mQZg4gzvh4QZA4l2jJbbUMocki41H8S3x3EIdMK%2BO1OmS5BnNTp4hSIcxT19wV1tYAZusqPbAvJlqPrtMdwP4zRJ0fKtWNsfj7KqatLA%2Fx21jtjVaEgOXkBgWrRRcmGOpTwVvdRYx%2FBvFlv2F22XkE%2BpQOta8HDr9N9VWcVuY8X42iUMze9HqeAC9zk0j%2FwkuypGpYu5YeS17WBYP5i4C6zrG2GOozkaww%2By0duh9IKaw%2BHe90LsL%2F5XendxgRj5ZzvdItS1Zd6ieI1b%2BQE9Vf3LlxphKaRVKasl9I8YF0K7J02e0%2FqgfCSiXGOJD3mbLfdVjMAl7qq8pkqxH4MzOWGh0vlSz%2FFmuLtOZiClFuxjQmgQtskQ3oZ7T7QI51wNumwJRzNUt4jxpl6I9Cv1YlswJd%2FAaDSENbxvPGReJMYGIvSnfdYnTqg6mSyvgy0EfnpGq3Qyb6lWnObbHAEUfJ7jBIkQvIwRzrQAugqGRyE16PWGqPY6QdTXeGrj8DhbNnr0x9j9gbBqlch8UXb56%2Bsev4fN9zK%2BeHFPAvTTqOxTZQ3adnb2EWHyNe7JtJXD1NMlBl3Wd1LOyUVvAgbJjw0woezIzAY6pgFAEr0Aw6mCwCIf7X%2Fb3E%2BDR3ifPbW4K78D4QbPAxf7GfY6QZF%2FAa45deH45i0BDjPRHp2fm4w2zRj3x8nW5H4vupdj04mhaMf%2FFBdr0C3uNtcV2l5%2FHqHJygy3vLVjHy2uXdf7G%2FY7LbAZBFFbd1PMbhNIj%2FrR14gtSFMCjlc4LAJU%2BKgL%2BzRzRYzF6SMttfIGGLKy8lopWR8IkonoAQ%2BIbCK%2BR7xO&X-Amz-Signature=89de27c959e52dbf70273f4f1d5f626e6fc8c72e2716868ed343f76db4f49595&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWAROENO%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQC%2BuUIr5%2FC7kBce4WbQtiA%2F2qwhv0DYQlnq0tjq9mDv7QIgMQInNyBzC6Bfc5ZUU18ErmDaBFfFl5OM2u%2FmO17Wehsq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDKpJTf6QuAJv5QoiiircA2cUWwMFaiJtto2HfxF4a6A8BLpShRPMeMS3sNXWII8TnUHpsoCLc60eHJOn91KBE4QGLu%2Fs06SAGoiNSSOEdjKOmqV%2B6otNIcKp6wweNxlng2dot%2FX5XAkBWjWmmx7d6YEwTK27LtDknxePejhI5VHyPV%2B%2FFBXRV9o6OIXQYYhqMREmvm5FrTxfYcXkk3OdBz4BMatdc%2FmnqhfoKTIWAPFtlxWKQlXgp%2FpVzOcholF64sK8%2BjqddwUL7dZpJXcu2wZlNiIKOcMO7fNeRq85eaXE60i%2BlYIjGvnWJetUt1iFj1VM%2FLc6VHyhuaMN9Z4QxWqMD%2F3XJApVDLjH35LQd1%2FB8BVPrcSw%2BFGbXkO4oHWwM6B79MwoNXqjyMmgLO0Jj0cii16DHBwC%2B23h0xerilgx4b01Dm3976ijuZc01Tdz%2FZ5wucmeKvAllaGPop5nNT%2FcA3qQXFNDmvYWATMnd2TS5bToKioPk5PdSew6cdjmSq3%2B8ZM%2FqExVgWMMHcgsL4gKSdMvUIWQJZ%2Fg4ZpmgOude17kFr0q5kMV%2B1BcvRnAA2gqPb2mu8T%2F0a4SYADs%2BQb4OPam8PVAi5PiC3ncDK77xy4m0McVDeu8NHDs%2Fem7at3NKBljiS94LFcGMPfryMwGOqUBrclT688h5aGYosq4vCyGFp59sqf8dnFCxsP2bIrxYfO5HYCVjjQL6VQTXKxBVGcpAx7jwpaKVkGhKk5kP13RFOxKeq%2FTop%2BboKfJskUtL%2FlD51Axz9m7yEj6NqeotHm98KPl1p78vF2yBob8JTvmnh%2FYC%2Bu8AT2esKxWw6cTJ8DCYrYfhkYNR7klngEKUFXtDoyejkQVWNrNmArjqG31mhXr%2F3yn&X-Amz-Signature=ffd2c89609cbcfd7330680f737f700ced373a6a8b494e094a6975717ecc3bb3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWAROENO%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQC%2BuUIr5%2FC7kBce4WbQtiA%2F2qwhv0DYQlnq0tjq9mDv7QIgMQInNyBzC6Bfc5ZUU18ErmDaBFfFl5OM2u%2FmO17Wehsq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDKpJTf6QuAJv5QoiiircA2cUWwMFaiJtto2HfxF4a6A8BLpShRPMeMS3sNXWII8TnUHpsoCLc60eHJOn91KBE4QGLu%2Fs06SAGoiNSSOEdjKOmqV%2B6otNIcKp6wweNxlng2dot%2FX5XAkBWjWmmx7d6YEwTK27LtDknxePejhI5VHyPV%2B%2FFBXRV9o6OIXQYYhqMREmvm5FrTxfYcXkk3OdBz4BMatdc%2FmnqhfoKTIWAPFtlxWKQlXgp%2FpVzOcholF64sK8%2BjqddwUL7dZpJXcu2wZlNiIKOcMO7fNeRq85eaXE60i%2BlYIjGvnWJetUt1iFj1VM%2FLc6VHyhuaMN9Z4QxWqMD%2F3XJApVDLjH35LQd1%2FB8BVPrcSw%2BFGbXkO4oHWwM6B79MwoNXqjyMmgLO0Jj0cii16DHBwC%2B23h0xerilgx4b01Dm3976ijuZc01Tdz%2FZ5wucmeKvAllaGPop5nNT%2FcA3qQXFNDmvYWATMnd2TS5bToKioPk5PdSew6cdjmSq3%2B8ZM%2FqExVgWMMHcgsL4gKSdMvUIWQJZ%2Fg4ZpmgOude17kFr0q5kMV%2B1BcvRnAA2gqPb2mu8T%2F0a4SYADs%2BQb4OPam8PVAi5PiC3ncDK77xy4m0McVDeu8NHDs%2Fem7at3NKBljiS94LFcGMPfryMwGOqUBrclT688h5aGYosq4vCyGFp59sqf8dnFCxsP2bIrxYfO5HYCVjjQL6VQTXKxBVGcpAx7jwpaKVkGhKk5kP13RFOxKeq%2FTop%2BboKfJskUtL%2FlD51Axz9m7yEj6NqeotHm98KPl1p78vF2yBob8JTvmnh%2FYC%2Bu8AT2esKxWw6cTJ8DCYrYfhkYNR7klngEKUFXtDoyejkQVWNrNmArjqG31mhXr%2F3yn&X-Amz-Signature=ffd2c89609cbcfd7330680f737f700ced373a6a8b494e094a6975717ecc3bb3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VD5YUOJE%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T220111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIBvfQddmBOkpxRS0iSkm020zuiDWIp%2BEb2ilqdhf5Xq8AiAmSfpyqmGWhmpEzqUGdk2NiyNLKuCZ%2F6AJoC4GJefFAyr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMM2JhOnaRJ%2FTy58sDKtwDhAyU8nwZcmzITXTl%2FNXabIp6bBKzR1UshZh7kmhuqngN9CR1SLPR9jvkyXdKV4gKh4cEQ3Ld%2Bwhby2N35aiG0ve3XaQdP9NWAxJ77DQrSPAS%2FJOew08QojJMuv%2FgaWxfwIz6vUeUWQ3pbG9xQ%2FOoeCDBB8Dco9HBNIxWcbKxT50hmgpNG26fWCImmDhqgBV50h8uQkQKyzvht%2BFfL6rnzYFr0HH9b3CU3LTj%2BRWZaCmwWUtcG8CPe8447GqbPq2SI3RU5yYlhMepQfmjelM5ELCRQL4HuKu5JoBE0tq0DTT5HuzhituoORQ3OGx2KknUDdUDZSHwpFv9b6Q4SBigx36cNsWb2%2BIdfQjQPG4BaVx%2B3%2FBYB4Unxzr1OC0VUmVcQqijg0ut1XEAWGgTpwaLQ5x6YjureFrUPmJRy%2BkChjnHLLlnvyqeWCM2g2xndpvhnz9NtZPGcba5ZeyAow1WZdYTZukr1YsiKlpWucFDxNtfri4GYJw4oPB2I3aGCjjg4Bn0BcdBDwP7%2FdV5%2F9Rrdw1EGTOXcNYYG3lurX8xaeQqsaQJKi4IvGdWohzZ4xTOyQIDbCbE8nR%2B0bxoPu6eKMSw6NskG134m4HXUEyFHbdS4iURrPaCrR%2BWcLgw%2FezIzAY6pgE3uAqjLZxkQ8vPVTzVlxdwDZumheQgyMjuWUXvTyFRSG%2FRwJIUSacxPdmUTakwfx9T8azeUxed0loiLeOGp2p0s7YD0JmDrFq3XQiK9fdSTF2pVj1rPVgjJzDWvlcfbMfKLEupAaLbj8ciaxv%2FdOEoBqBx%2Bm8vPooksV5nYlS3LsxHAyEQsQcXT7f%2B%2F8Kq4F9lTj%2FIb34EeAEIXRH1g5dkgJ%2Bh0hwI&X-Amz-Signature=61c30aeaed2b03353e40a581be985ce71bcdcbead6805291d34b776c3a9cfd66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

