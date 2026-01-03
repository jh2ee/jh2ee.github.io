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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWVL6UVY%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDq66EFbD9HLIIgPi1i4V8l2bsP1zDEo1vOFPwsKpW87wIgGXLwC5ME69jHWf%2BJCJbJV25w0hrZqlm0qlNIG3wX6Ksq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDGL7g5pJu9ZdwL%2FwayrcA7ij3EO1K9Qk2Agx2hKbZvNuLL4fVBQdcCpHzNOCpr2Z00H1PPLBLGjpdLp4LRFqYpBM6efzYm7NQwbUrZys9FTCVUX3iExzDiGGBsiY6fxYOAOz7g%2FTLCvzhPOFcegHszAR%2FM8voD%2BNk5SQkdUlCCuJdt749sJnRDtsPeC2gn4entOiIYJXz4uW68aYo4pR4CB4IAwTwHmFR26nAsnqXV23bL%2BOudKACVonEoaNu2cav8Gsnj0t0IokOHckIUhgmfdUwpisscc2OLxgnAiBxXwG304ZN22zpajNn61c02oKR95ltK5c%2FTdwoFLDknO86vG2i4Pkrd4jIMVY2qs2BgcK6CSF8kv2K4GyK4hrmYUFBrOPwPVmOKI1mOxyXqWJcfZBVJCeUvvkBtKnJcBTc1A4DUdL2cpDTepeWZHB4kqUFOPkC8ojkMxBcRn5IVxOcbWOsUzUGt7eOq%2Ffc8bYNI%2B%2B7zG4RAaHltFeARYP6XvCx2fuSXnAqbEsBRUhf%2BiO6V0UQQ4XxULGDiYyVI0zWJ2Pzh%2FybsH42VFPW%2FL84FgxT6vfdRaMCpWgwBHYorTi6CDeAsC70i%2Fu%2BmFbpM9Tw%2BKXxwYfmdyeN2LnbFCfqtKFmhYxtXyxu0rXnjFlMO2n4soGOqUBVeitS4j52YbADV10PRilt3Tdqu44isvWewWWOTp4ZTSlgU%2F3o9zj8mWI1HMOn0yx5gV5S1bsUVDIkcS8ObBPRzu1G8r17thtXuvwbs52Jbjhgz%2BaFnLgQktmM6%2FQCR3URy59qFD0n62Wu4RsNO0dCFOMKojsnRPhlnrEnDpLacB%2FneXGR%2FBeFngshexgFoXOD%2BrXUBgh3rlfinm8ozpTWpIgaNMx&X-Amz-Signature=08ffecc438829b103bbf43bcfd6e46f3524b31ed3cbb244b559cad64ca529b68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWVL6UVY%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDq66EFbD9HLIIgPi1i4V8l2bsP1zDEo1vOFPwsKpW87wIgGXLwC5ME69jHWf%2BJCJbJV25w0hrZqlm0qlNIG3wX6Ksq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDGL7g5pJu9ZdwL%2FwayrcA7ij3EO1K9Qk2Agx2hKbZvNuLL4fVBQdcCpHzNOCpr2Z00H1PPLBLGjpdLp4LRFqYpBM6efzYm7NQwbUrZys9FTCVUX3iExzDiGGBsiY6fxYOAOz7g%2FTLCvzhPOFcegHszAR%2FM8voD%2BNk5SQkdUlCCuJdt749sJnRDtsPeC2gn4entOiIYJXz4uW68aYo4pR4CB4IAwTwHmFR26nAsnqXV23bL%2BOudKACVonEoaNu2cav8Gsnj0t0IokOHckIUhgmfdUwpisscc2OLxgnAiBxXwG304ZN22zpajNn61c02oKR95ltK5c%2FTdwoFLDknO86vG2i4Pkrd4jIMVY2qs2BgcK6CSF8kv2K4GyK4hrmYUFBrOPwPVmOKI1mOxyXqWJcfZBVJCeUvvkBtKnJcBTc1A4DUdL2cpDTepeWZHB4kqUFOPkC8ojkMxBcRn5IVxOcbWOsUzUGt7eOq%2Ffc8bYNI%2B%2B7zG4RAaHltFeARYP6XvCx2fuSXnAqbEsBRUhf%2BiO6V0UQQ4XxULGDiYyVI0zWJ2Pzh%2FybsH42VFPW%2FL84FgxT6vfdRaMCpWgwBHYorTi6CDeAsC70i%2Fu%2BmFbpM9Tw%2BKXxwYfmdyeN2LnbFCfqtKFmhYxtXyxu0rXnjFlMO2n4soGOqUBVeitS4j52YbADV10PRilt3Tdqu44isvWewWWOTp4ZTSlgU%2F3o9zj8mWI1HMOn0yx5gV5S1bsUVDIkcS8ObBPRzu1G8r17thtXuvwbs52Jbjhgz%2BaFnLgQktmM6%2FQCR3URy59qFD0n62Wu4RsNO0dCFOMKojsnRPhlnrEnDpLacB%2FneXGR%2FBeFngshexgFoXOD%2BrXUBgh3rlfinm8ozpTWpIgaNMx&X-Amz-Signature=08ffecc438829b103bbf43bcfd6e46f3524b31ed3cbb244b559cad64ca529b68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOOI6JRU%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQCXOxUFlHR1NhyQzhdz%2BJQBWR9Tfb0fC3rIxB7xWGkTVgIhAOkCMT8iynGQL%2BqndMSBag9KlCaXiHKQ%2FfWjcZkh%2FCpOKv8DCA0QABoMNjM3NDIzMTgzODA1IgzN8qZsKWGZs4t1qDUq3AMea6dtW0YRShEMTVewqFb06QTbCoqxp9HBOojLD96c6hu2r2d%2BLads8MRX3fXl%2BE3iS3GcbTUZ%2FPbxyMhFNhvnBoxREwFgf2QAN%2FITAM2PQ5FxyDiBk2a9aLOOOYpxNSfTyZqAyiMQBVdoglNPWJ%2FvViP6lLaEvLEjNq34CClg31LEaV38MMWvtCnFDBe7Ha8PSX1A00i%2FtyCYVKEUqFVJ1l2uGCiUgZzwla8%2BZX%2FxdUESgra0IoRrer6A8ggL%2FMNyi%2Fo%2BW8iwcG9saiFEI1OhhNZueQuEUeJYIgtZOmFFS%2FkvOnfI2f%2FFexgwWwe2Li6LvQEziURNcsI8ttm07wtsKN9QEg5YmwU4uyZ%2FNrmPHcram8Z0pHVwbhITBkDm83o8KYNzUICebjwzIzq4Ixj0XGhV22z3PT8zVFDEuS8RZv7wUhcwC3PgEOds%2FveEaHE69P2QICZ0xw7HNCjytdsXSxM9hkQOeosaR%2Bji06iFGK%2BGQGpjvX%2F4TIFMvT2nFPwnmk3N%2FhJpdMe%2BvGvRty1NqxDvZFyQ1Qi8NcL1muAuk4t%2FToDM%2FVVgVnWK3xQxNPS%2B9ExORRFxb36xbe1OKWnaRGWNLIuxmrzA0zmQYjgdYc8hHLuvuVVXfxAt1jCfqOLKBjqkAWIastsmxPZZkQmTjxHrtngIi4MM1q8joQLodAjNHxuHRinARps%2Fkq0koOzDvEYXEc8PQzIqN1ZOzAPK33xRIeAZe2a1jbfpB1qCu%2BjX%2BWRwEe7eKQZivlQ%2BHnVo3RayUBrnv407eP5GMCl9VaWpVH5kNFIRJtkIz4ryeA3OwaUo5zPcl9skppeQpyP3ewwTs5QABrr%2BhS64BC3%2B0gaUbNJgaC5m&X-Amz-Signature=9baf5e4317161162d55a26a5ccf74352cae857940b85eb77ffa49b7778041991&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WD3IPZ4J%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIHXUltpCGRVlPdLkg0NFzjFEATBDCZRAk%2FnHpZ5x9KKcAiEAllOqQT%2BHhaCuKugVk%2B3%2B11hTcJVYtLkzRU8cSwCzzv4q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDLPG54WT1fgVQHEonSrcAw6OkCfj3RQpXXHwTUBdVPCWkLYkS2VUd7kn70Z4ZpPjhM3laAEqGsPbwvbINSiV0N0RI3odyZ3SLMaAUD3cenVb7Pdzn5aUpf3Pd%2FMvnx44LUTN%2FZDdeAE2Rr3ZeaPSx383TpjiSchFl2Sb6QMoq09E6uTTIeEw4kjr9IeunTz%2BA5PQTv%2BCq%2BbkxDBStb0dM28ojaHSTC1ztFFJtvNORMZVBJWrDRcQJRidxluwcRUIBE%2FduKzWiAxevotEDgI%2FvR56MQwpR2XuuDnbsnQCQH7fZB6PkbPfaEQTfim8rpLca%2FfvcI0fNcnL7aB%2FbI4YwLx%2FDLve5HEwb7emGWgJzTN5yk44XCBGbI5aO8HZNAhLNFs3QJWvdeoHygNrREK7vCzNlygGZ4DzSxQcl8KyJxLDq8gxNHVTRzCK1ijnyMbDanN3RVPgMmMxqX42Yli4sbiPPvciWW51uMSNnGY9ZGyqnU4cVYMziPba%2FO8ASuOr3%2B7ajwb6mz%2FuMFWrZwZ3SPJfdmwjVqfs6r0qZJidNkPxvrpjQ%2BgyBs2HCi49Svt4kE5Vk7oA529Ok8NSvuP6xIViLTEXIH4hQ7TvJlJdV6ZnGzzJUzSbkvWeJLhsR9SSHSd61NUGEp2FMjXMMOKn4soGOqUB9Ssmd6jT4o9wFtvnafIuFzAUutAOjk5mF%2Bor9QetIJLOjAwW%2FLehaw74s062Y87G%2BXPiZ9VGU%2B19Sit2XyaTZsVDICGjTZcFW%2FQdqYDeqU97qXuKCBiRFW2%2FVPJzCw%2BaGX6uA%2FQgV3axcqVvDFzLaEWIPZVaK%2BfaB9%2F7nUAmX9lJ%2BDBK%2BpMsfGhrYR5ubwcSqbHO0jk7ypums3H0ototyC5JIkWb&X-Amz-Signature=232e3ba9254262865e4ff99d24396fddeb8d4fd4718e0c2c8029da61f25f12ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WD3IPZ4J%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIHXUltpCGRVlPdLkg0NFzjFEATBDCZRAk%2FnHpZ5x9KKcAiEAllOqQT%2BHhaCuKugVk%2B3%2B11hTcJVYtLkzRU8cSwCzzv4q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDLPG54WT1fgVQHEonSrcAw6OkCfj3RQpXXHwTUBdVPCWkLYkS2VUd7kn70Z4ZpPjhM3laAEqGsPbwvbINSiV0N0RI3odyZ3SLMaAUD3cenVb7Pdzn5aUpf3Pd%2FMvnx44LUTN%2FZDdeAE2Rr3ZeaPSx383TpjiSchFl2Sb6QMoq09E6uTTIeEw4kjr9IeunTz%2BA5PQTv%2BCq%2BbkxDBStb0dM28ojaHSTC1ztFFJtvNORMZVBJWrDRcQJRidxluwcRUIBE%2FduKzWiAxevotEDgI%2FvR56MQwpR2XuuDnbsnQCQH7fZB6PkbPfaEQTfim8rpLca%2FfvcI0fNcnL7aB%2FbI4YwLx%2FDLve5HEwb7emGWgJzTN5yk44XCBGbI5aO8HZNAhLNFs3QJWvdeoHygNrREK7vCzNlygGZ4DzSxQcl8KyJxLDq8gxNHVTRzCK1ijnyMbDanN3RVPgMmMxqX42Yli4sbiPPvciWW51uMSNnGY9ZGyqnU4cVYMziPba%2FO8ASuOr3%2B7ajwb6mz%2FuMFWrZwZ3SPJfdmwjVqfs6r0qZJidNkPxvrpjQ%2BgyBs2HCi49Svt4kE5Vk7oA529Ok8NSvuP6xIViLTEXIH4hQ7TvJlJdV6ZnGzzJUzSbkvWeJLhsR9SSHSd61NUGEp2FMjXMMOKn4soGOqUB9Ssmd6jT4o9wFtvnafIuFzAUutAOjk5mF%2Bor9QetIJLOjAwW%2FLehaw74s062Y87G%2BXPiZ9VGU%2B19Sit2XyaTZsVDICGjTZcFW%2FQdqYDeqU97qXuKCBiRFW2%2FVPJzCw%2BaGX6uA%2FQgV3axcqVvDFzLaEWIPZVaK%2BfaB9%2F7nUAmX9lJ%2BDBK%2BpMsfGhrYR5ubwcSqbHO0jk7ypums3H0ototyC5JIkWb&X-Amz-Signature=f390f31183b34145b289e791e2a103abbf59157c24f4aa43617f358aea67a604&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRKGUVVB%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDj9UT7d1f30KO0AGHLWZrsg51%2BcD1hRdbdn9K%2Ff%2BMTNQIgWJlHZav8wAdkjhkzFiwpfV209Rk4fOkvHkn4WI3ownwq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDDQ%2FuolAj3TGzZOXeCrcA9483EkNp8%2F67uEyXH%2BTdg6hmLZTE02WAf8YxJAc5oW4z3Iq99Zc0M9RhtJoGNbbcQ3h2oIigNmhBzwPO0PoPNkLz1w8K%2BRLzzvGeYgtbp1%2FLt9GliZ4b2Ivfr3HjyQj%2Fb%2BZVX6O5BjFZDG2GbSY6i8aXhypZ9KlG6qMT0Cn9fV21%2Bzk%2B0IvMnqGPVZCYTK0%2BGV0y%2FDEQyd7PtKVBDETEoyCXMR0kDRb49XtuoPuu%2FWsHnHbu%2ByrK4OvbtbeAuR%2FmguAYFM%2FzPawzCeY9DunvIYpdGtPUSaqQtcxiCPTNo1y2Lq5qBjpGz8DFWegMc4JO%2F6Aqkc5TceDz%2F7ji5uQu1u%2B4Pc9%2FOhEmUznC%2B6c5oM5uAyGZH2JxLnR7fcJtUw71s65LlvBNzuvRqRRvsHzpLDW2MjTaWZnjVfozdPDmDPWrC%2FrLKbfCd9yMs0kbPg2mdSWPS5bU3oNdfuC%2FtWKgXLLI2WVnu8kK1tEsKgozhALtZJeLUYUSLQZZ6ojaVFPUko8w0xvXx7eOEpnRYA2kpAFfRmEC9I2ogGkanjrg5Pp94Qi80VQ0%2BFarT%2F91HztPPMbIv6U1f7e4txQhorul4YlF3%2Bqhv%2F7T1fIucwcsxOeB8wnKXxf4MI5%2BGoYMNCn4soGOqUBOgSJ0hnC7i3XhB3guSN22CX5PX2gFpl%2FaEbZLxVMPFE%2FZYpqRNWumsLkZHoyxZ%2Bt5C2qQSlGRlCsUMyHUn2HQ6eNXNWMVmsu3xnivSw%2BvSw%2BlWhaZbosjD5K1Bp6OHWJxqEqawS6WjltrHEcSOA1XM1Wz%2FRXNzwcsPjHRLSIKrvQMGrAK%2FvaeUduGq3p6%2BNL3S4brmnHv29KhzJBBmR9ZcrMXQVH&X-Amz-Signature=4820135660e84372ecb0ed3f4ee05eb64c9418fa5da11215a782cc164897f2de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZA43MBS%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQCkGPbsJFgfHTE3%2BIfgRmffQNBMj82cviqLOETXVI8UHgIgachNdxnmGdl25nG1fgeRJ0zeQp1mbfB0%2BGxuJlTI71Qq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDJhVvu%2FDOANaZWbw2CrcAx7aovli%2BZmwbGji6Dw3VtzhShrY9WafYBiOeXJS9tUh6BBsCaKZEsAEn5HK5OxmGj3Nt6rgKL6a4oczV%2FXGHZ2wL%2FJ4yOkMKJV6NI1TgHegSXVLNlk9yPUxw2Mpbl3ERlTu8ZCIbsFjR6YhHf237OrjT67PmFicvqTEL%2B1E1pYAzAo2xrKZBukup%2FHNc27vWVnSKXfCijgQuXA3neIjGMaNA%2FFoRON5%2BS%2F%2Bb9OhhGpQXlvn6IYLJiliCzNFhAZIqqWZ6CtxufVtLBbiSVIfbvXxNQx%2BNgwqOW0ElbG%2BwZJBaVhWjTsTbyBfosU0HftQmciQoIFDG7fVOn5G2ouYUak3at%2BTehMoftTOqWhF88vAOBWtinzY%2BpjbKOHpVqVTGF9Xfd6OJJIy3ko3c9xyayIYPByZqePvTszwumUpebjYYvollPyxtk8i73IkuNGHIe8nHdKtKejDe3f5z02QRTAF8MA%2FoQSGQ%2FMOnk%2FE9gZ3Oa%2FUJOtbdRL6KEspEMouiCe3UQRRQEole44g6WSz8tJrXM3vl3W0hSQfEdH3BZ5FUZiaipATg4B%2Bfd7eG96v1bEbAAxyxs06el4iv%2FeNcZ4KEroz3qUls8Wq8NY0BIMamoGXu%2BMnIn7%2FZQWiMOao4soGOqUB025boHAVO%2FxxlbdjzjVPJB5wzwR5l8529vfdhZaXbAYP8EjR%2BxIWWPrUZaAOo6axAT4Njffm6nVanJJ1HGq%2BqOdTJiJtJ1akp3x7GPocL9BCJNkIqaife0Are6zlgDEnuMVRLTKNs8SGyRB7cMn5BkfBoSXNLqbqihypb9NKYpTqRGeYUfVnE9qu5V4iM4yM1n26FK6K5Hqm0PsqSYdH430qIOxV&X-Amz-Signature=989398a7f32d53fd174844d8cd7d79c4e6b4a3204b0adcf4a362178dec349335&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667O7OY3D7%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIBv1vlRZwA7e3KIGuDKd9Sa3IlDe5gdHUKf5YsOPvOQfAiEAy%2BtVa3Eai3YMDrOe0HFZ9lyjUXPZfuXEViJmC4k41cUq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDNtOYOVPDBnXJXBS%2FircA%2Fpez%2FFwVtLACs32sAVXzKoa6yfma9xt1JUEPBHiBwEEzkT4%2BwD6ZzA6ZImFILjJjxnSS1WHvahQ5Zzv0JkHoyVbeYiEvwgZBTu8lSDE0C7PZiIozXFRpep4itIUdBczTgJxGMdUlc31g4Urmus1cLeUlhejo7MJt3ZBxAM%2F9cowtg9XVA1aMww7HLDCn3%2FCHl6TcEiV%2FG7eja88tTSqisnnvLBXxeT4Vz8dXBoiRUHSUb6OH1FfTFdtGzez0PirQGOPJTrHMU9OQ5jzrq5pd7%2B%2FlMTK9CteD46QUpLX4vwAVSEPqPq4b9tLso8DDMGdCcngpCcGrF6OuzQcZRdaBdJhaeTy%2Fv6R4BeAhuy0FFRRD93aF7uRcETzDm5R0QviDkBFsqO%2FZThJQA3y1LgGV3ZZVVNRV8V33g92gay7t7Xl0iIFDss1ZHoQNmv0Fbo0D3%2BrMhY6nOcTKhTsjg3UUNi5or%2BJ%2BJhK5BMkdpcMd4pU6STmFS3yicZwxq%2FCV%2Ba%2FG5IUFkT5Q6QEG%2BWwMaSlyqD2riGnr586w1LvfsBzfxiW7ResE118D4UG7XkJz62zDXglFImbRsNKfqKKLbF8QKgyqGQP5opnO%2FjC32V1Bh9IMsvX9F10HfIfBPdmMMyn4soGOqUBOLL8WTfxsRHFIQI3ofY2U544DMwkBOTGMTWL4BmLyupTNVlqC%2BtxT58Uy5ihgqe0zxF2YCS03aL66ARTXrmHMovqn2fpglQBoA2SyeOGhP0ZsQfZRL%2B%2FqoRQs3voF%2BCHoP7axXaBRVD4DrNvy2I69sgjLjIDNdixgFKfP2qDgeumCZjk0Q4I%2Br1mzUuNyFBYTam9K3PR0i8HHhQPJCwQ%2FzGkzi%2Fd&X-Amz-Signature=92cbf5e039dfb28ba60e5b54282b33e865665a00e3211b3a400744adcdf26a32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGR6GPLV%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDflHdxIa%2FgtccoIo%2Bz1w5VDmc9Z0hUS3lDIMKZs8GDFwIgNIiUAhT4tWr4Wdpb0nXW%2Bf7t58lAwM5D1Md9Da9tcs0q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDM%2BxuZbWJS6ktVTGUCrcA%2FxucBCvvJE8MOgMtI1nLZiZkfyOGylKQLe%2BqkCY%2Fy%2F3InQogZPoVvqMpQ1jkbbLZHCeGTPi07SQs1MLnf7HSv8ZmwsV3h1tirovghlauTL67IpnCnLtlYqpMmFkOm%2Fz5KLTVZd%2BujLAmXdMHTcYT7VAzUpGzZMf8HB1ao30MYXVmAmMcgg0YmEJ%2FMl%2BKK1b6QaashSLiijuXf9ENXS5ThN8dCfRldCVI%2BEdmeKSNurZ%2Fw5P4qDF8%2FfqqhQbnJSxKllRMmg6RBjOIrkppXr%2B0Nxo1cHsYvTACvAfDegLztTi%2FIJMAlEWNsJ%2FpBicudgPjU%2BkFIAZe0tVbx9%2B2DWSvFRZPQMEGXZLcQw4V%2B2%2BVT1UQsvXQGXU7SAbKXAOPhWLNg9HxLuZDHm9Dvv4wIxKi1yW7oXljq%2FXYxTARMaj4HiMo1WgxbjGfR3D6BHhj58Jfg6AfTIaiaMzaLEiB72etWS3JWrL2dtdOAg49%2Bw4WtYaDw5Em%2FTj%2BUzHpr%2FX7Jjhzc5oaU256%2F72vbyZssAQ810UyWsYZVCaloFalVPNBn8KMPfVh8qapvLtN32JPiQkxBZqaNyS%2FdaJNP4kY3buYYavG5zvS5YHqbk0MArDOfR8VL99o03m4ISQUzSlMOSo4soGOqUB1y%2BZX2DRYFK3sVi4MNs8%2BaTxlqlSG%2Bni6Ih9sa6W26JDpdBbLzyQXFTxnHw0D89JXFiHS61TSQ4kqo8yeGuL75xOOnTmR08VV0Kb3hKXoY9OuEGvi0QufGldF18wL1TpcsLSc1665IY15DrZ8kMmraiiAgn3OVS208Hfg%2FM0Ml44KccZ92hNpivhwx9JRGs8MQeCqfGywuz76YvyAkJbnHXhT5%2BN&X-Amz-Signature=1b8772893b69610723ef648597b093b69ab888c2e1482b41f1068f99cd264db2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGR6GPLV%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQDflHdxIa%2FgtccoIo%2Bz1w5VDmc9Z0hUS3lDIMKZs8GDFwIgNIiUAhT4tWr4Wdpb0nXW%2Bf7t58lAwM5D1Md9Da9tcs0q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDM%2BxuZbWJS6ktVTGUCrcA%2FxucBCvvJE8MOgMtI1nLZiZkfyOGylKQLe%2BqkCY%2Fy%2F3InQogZPoVvqMpQ1jkbbLZHCeGTPi07SQs1MLnf7HSv8ZmwsV3h1tirovghlauTL67IpnCnLtlYqpMmFkOm%2Fz5KLTVZd%2BujLAmXdMHTcYT7VAzUpGzZMf8HB1ao30MYXVmAmMcgg0YmEJ%2FMl%2BKK1b6QaashSLiijuXf9ENXS5ThN8dCfRldCVI%2BEdmeKSNurZ%2Fw5P4qDF8%2FfqqhQbnJSxKllRMmg6RBjOIrkppXr%2B0Nxo1cHsYvTACvAfDegLztTi%2FIJMAlEWNsJ%2FpBicudgPjU%2BkFIAZe0tVbx9%2B2DWSvFRZPQMEGXZLcQw4V%2B2%2BVT1UQsvXQGXU7SAbKXAOPhWLNg9HxLuZDHm9Dvv4wIxKi1yW7oXljq%2FXYxTARMaj4HiMo1WgxbjGfR3D6BHhj58Jfg6AfTIaiaMzaLEiB72etWS3JWrL2dtdOAg49%2Bw4WtYaDw5Em%2FTj%2BUzHpr%2FX7Jjhzc5oaU256%2F72vbyZssAQ810UyWsYZVCaloFalVPNBn8KMPfVh8qapvLtN32JPiQkxBZqaNyS%2FdaJNP4kY3buYYavG5zvS5YHqbk0MArDOfR8VL99o03m4ISQUzSlMOSo4soGOqUB1y%2BZX2DRYFK3sVi4MNs8%2BaTxlqlSG%2Bni6Ih9sa6W26JDpdBbLzyQXFTxnHw0D89JXFiHS61TSQ4kqo8yeGuL75xOOnTmR08VV0Kb3hKXoY9OuEGvi0QufGldF18wL1TpcsLSc1665IY15DrZ8kMmraiiAgn3OVS208Hfg%2FM0Ml44KccZ92hNpivhwx9JRGs8MQeCqfGywuz76YvyAkJbnHXhT5%2BN&X-Amz-Signature=fdb3b6fcbcf87216d0eb15eb746036a2ab9b9083118297e423b82e0c635185e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HA3HD6G%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIBhCtjcKRScGqLCtx5xb%2FlYxbLQ6Ecxt9fmUZsU2WIdOAiEAhJBTCB4FUyTRZ6NpZjITS6QhKiXnQKXQ1Qo7MyjXG9kq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDOA%2B9TXCRpklxFOvMCrcAwRmiUkLt26AkWdpFl1nmM1NjfVVesj5jjenoSpVE7EXUrhso1nfrh%2BrjvZ80NlpJ0Zj2Boymp331Pvx5y1ORqtdvkWcVEIDkpKbxcKJJSw1SB3cDlbWe5h07DcqHegyP6twsQaeZFq4akKPndTsPTJbNbzaG6QrszZaYrXOlPsQqMcwn43Tf%2B1ijysxH7FW0mq3G3o6xNP34UFM%2FQb24RuN4fsCrnGc%2BOYldTd%2FinPZfT%2B6gExjPt3ruropubMhBx1e2VgmOvxAORpxCB08dIXdGqzZrcar4k9cvw5eJH9sZMNAxhIT05gA4CxAYJwrIQxgFs6M%2F5RqMFNDJ7qV5dZl0TJ6tqM2v4EutGkCfun9KHF1bry1GhHihiGtI9RZKmEp2V7l%2BE6fIXSz0T01vwv5n6DU7l4%2F1gtbTAtzatLV%2Ba%2F3H9vlo4kbyOITNvYArD0U%2B8nIsQLXLVWVtFRdrZS%2FW8lCj%2FkNyQLHE73hunTiZRhQP0gCU1ZH0NIwcIsujbbbwMNGcmzYVSb9K3RddddCve9DfZMIxC9xk3xxk8xSfUf5Hu7Ocys9IlGsaKjIp4v0UYnymoluh5n%2BRm9RT0471Tco1XxMETW52iEWBq1D9BhAsgwiz8CH9az1MI2o4soGOqUBWM0jxR19G91HeXM8aATivwCMUJp0KsqyOCZ4TDnwJJhkeel9Cs71W7UUD63iVbfzd8%2BL3DEk9k4IhbACj630CLipwCRahyrjF39b5PfoxNgQAQ9bxVCUd4ZpG%2Fp04GggUh%2FsPt7Ius1ZGv1ZO7Hr1rMy9o1znamLTMfCEfo0ZBmyipxz7uBlsJqxtGpczXZ9mMaeUEglExiXTxI%2Faj%2F1eqPXqZpR&X-Amz-Signature=4fd50e411f79d1c2989b0f1583400cee419ba7dd1a3ff31126ccb96a07ec46a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EGYNYDC%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDZT1n5IUhzHYhpKsHxVrG14vBqHYl1fA%2FrLRITEoAlywIhAMoZHtiKCo1SJVuM7HzeKyNCPW2562pdMtoLKmglTaywKv8DCA0QABoMNjM3NDIzMTgzODA1IgzDFDPU041EQ8dek5Eq3AOYkHO5Nnv%2FuMUPUKJi6QJdONnZFtIs7WJ8AeC8mEk3auARArARBzinZzwA7CVWzLn6w8JpPkw9RT%2F7bECK05yswLgZjaixCh3huj%2F0uQY64OKRFwp2NKeKLkPhOcmjFQSzhz%2BelKlc339amADboK1IX2jC3vtbbpHofERxOgBnXKwurfqJPAp16u1GQY57S55pF2Td2TY82l72PtXpr6gbTnGVPaafcKrsferuBlWQpM0VeXsHu5b%2FFu9WQ%2FcH%2FRLMMBQSRYuzA8YQpGg6BKuQw8PYKElK3HpLNbuia%2BGe1q4XuyjtL88rA6Y3jPzgRrY8Cx6gOtDxU1xQIN9Aw2iyh7dTWOGnee7l9%2B6L%2FzaefOsb3C70iotgx65cgQSp%2FQA8E74HhJRieRo3xER2sJ%2Fp0oml%2BOKCR7BNZ7BY2eDtuGsyCKV9FLSX863R0KhxsHV9DpNVa9R4LzGSULes7n8QQ0TZCpVHdBVNAqRUhW%2FwprURM%2B%2BRh3Ce3osbauN0g3CiuBAnUMOmzPL1D6WD8JoytpXlohSCldOQaZGa9OibBwLh8Dd71HY1Zft1LPvb570Yl8YiDQECM8nfwCdU%2FleFuAz4aSEbmWcZ5wqg%2FQDt9%2B4OWqK4EcZBjf0zXjCNqOLKBjqkAUwhQYYxhq7pdZTi7R4U7PYFz0C%2BjN8nSMK20zdL1meCfIkHTTDYUEhLGovOXMAgFgaqhz%2FzeH2nvZR1oAvhk6RUJvBcWlaVU%2BJDXazNLT9ZksijmcVtPN9alk3hwKwyiIU6%2BhYwVB%2Ff%2BHn92KGgI2geyknRTJsIBBN3US3x9iJ4uBmO6YS9BtClcquUoD7c78xZGYKCfxVT91e2d%2B%2BpmpTdaASr&X-Amz-Signature=52fb488fb9c950ceff9369fd027d0035f8e2d7a2002c423ae4b8ece38d528086&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EGYNYDC%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDZT1n5IUhzHYhpKsHxVrG14vBqHYl1fA%2FrLRITEoAlywIhAMoZHtiKCo1SJVuM7HzeKyNCPW2562pdMtoLKmglTaywKv8DCA0QABoMNjM3NDIzMTgzODA1IgzDFDPU041EQ8dek5Eq3AOYkHO5Nnv%2FuMUPUKJi6QJdONnZFtIs7WJ8AeC8mEk3auARArARBzinZzwA7CVWzLn6w8JpPkw9RT%2F7bECK05yswLgZjaixCh3huj%2F0uQY64OKRFwp2NKeKLkPhOcmjFQSzhz%2BelKlc339amADboK1IX2jC3vtbbpHofERxOgBnXKwurfqJPAp16u1GQY57S55pF2Td2TY82l72PtXpr6gbTnGVPaafcKrsferuBlWQpM0VeXsHu5b%2FFu9WQ%2FcH%2FRLMMBQSRYuzA8YQpGg6BKuQw8PYKElK3HpLNbuia%2BGe1q4XuyjtL88rA6Y3jPzgRrY8Cx6gOtDxU1xQIN9Aw2iyh7dTWOGnee7l9%2B6L%2FzaefOsb3C70iotgx65cgQSp%2FQA8E74HhJRieRo3xER2sJ%2Fp0oml%2BOKCR7BNZ7BY2eDtuGsyCKV9FLSX863R0KhxsHV9DpNVa9R4LzGSULes7n8QQ0TZCpVHdBVNAqRUhW%2FwprURM%2B%2BRh3Ce3osbauN0g3CiuBAnUMOmzPL1D6WD8JoytpXlohSCldOQaZGa9OibBwLh8Dd71HY1Zft1LPvb570Yl8YiDQECM8nfwCdU%2FleFuAz4aSEbmWcZ5wqg%2FQDt9%2B4OWqK4EcZBjf0zXjCNqOLKBjqkAUwhQYYxhq7pdZTi7R4U7PYFz0C%2BjN8nSMK20zdL1meCfIkHTTDYUEhLGovOXMAgFgaqhz%2FzeH2nvZR1oAvhk6RUJvBcWlaVU%2BJDXazNLT9ZksijmcVtPN9alk3hwKwyiIU6%2BhYwVB%2Ff%2BHn92KGgI2geyknRTJsIBBN3US3x9iJ4uBmO6YS9BtClcquUoD7c78xZGYKCfxVT91e2d%2B%2BpmpTdaASr&X-Amz-Signature=52fb488fb9c950ceff9369fd027d0035f8e2d7a2002c423ae4b8ece38d528086&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGGPCFXQ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T080105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQCVGbIgdWeFA2oywUCQZCiqOxdhgeX6COFW3nJwJJS0PQIhAIEJ84a%2Bjg62eXFr6GKLOhrez1XJnDOxXwRIfEnFJp1vKv8DCA0QABoMNjM3NDIzMTgzODA1Igxag%2BJBsSIOQDPJcIMq3AM%2FLO0%2FvGJ2JYTbaLOeBw1uDdCkPcqhoERGzM005W5OpCDh7jxpw9cLYRma6QQfpqggD2CofgMLS8MMiHZIq9X%2FJu15cX2FYWPBVPjdcZUhdg0XB%2Bi3hUw4LA3sh2LWENPpQRP0bEQ6%2BxEe4ZBIpY%2Bj8n6VlL2ESUz5L0yAajBhFeEgbS1wxLOS2prWwLIZ1BptzBSzW25tilJC9%2FVEk9%2Ban0VpYHqLIQA%2F0LzMI0vcjey%2BBF7QvGuBO4bqU8%2BKIKG%2Bd1UbXRK%2Bi2yXpDl2tMl19F0mON0P1CIVn52QHge%2FhgKcO8v5oxMw0TL72ByoS%2BtqELqoJudZLED%2FBrimC5zQP%2ByO0swFIdqDb8iVtkHuvQDYJbS%2F0MHm3VfAT6EnpXDQRfTCnrarvotuzjcW%2FdFwW5k91ScmVRkDFCOpEqIDmkG57ccKWkuPu7%2FZrMh29Ukr2fpe6FO7XG7RSYl4%2BZuSzIN57GWKyQXYHqCS1MH7uO1sisK2aWcjZVGXwO1m4rcB4CKDqZlzQ2QXChDJ8Hf7Zte7QX64my%2Fu5Tv864FPW%2ByKI8t5TGTHd0IEv58Llf9TL4h7Al%2FaxiSfbO7cq6qNcsOgDCeyAlKdNtCTlQO0M4UjvEnc350CxRvEDTDip%2BLKBjqkAfTCp3ubwSkZbjCCXSPlsH9FKKLp9S7gPZo8VUGAcRzH2rJIAmSiYxqGzf9wGuTyaaKaHFYNMDsOH7COh9H6fI7srbnv885nDnfsFZCUs9s8pgwz%2BxHMIOT72abD2yX2MA1Qpswy33x2NiG6wf6fKAaNk8xtS%2BNHJwjVdg%2FdDp9Vv%2BiJsnb%2FbMC3TX2YKzqQXUDVNlD2u5ABCfjOn7AHn2HVT824&X-Amz-Signature=bb8422efecae754e02624a78afd2274fc306b26e69cf41bf28b7843b131c9c98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

