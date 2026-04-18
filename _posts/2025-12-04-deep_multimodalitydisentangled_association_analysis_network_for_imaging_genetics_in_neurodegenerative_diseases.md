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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645XNDZVG%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDlZGhbPjriiGDLfyZG%2F%2FWofwE7RzGeGmRBu7exdi8CPgIgQgDzFvcIwKfFThITE0FoBzV0%2BRplT6%2BVz4QmE%2FRErZEqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGXXUQRoyvuRMSnJ3ircA21LvSQFcSUOfwxV5vKpA1STskE%2Fzsa5GvUsSkP7RsLDMTYvOFRCLDidit2n3S%2FWaMbF7BtBcMIdboT1lYDSnvPlxwDzbUlGpzjIDWuxonwP7yvQaKD9YXQIioDAryQ1HixLbCQXaXwCu%2FF6fyzHeJZaImawAkBr%2FpOOvvdX62ruz74Sjb8ntynAZ8IrAcVTLFuHk%2F%2BGbHkOEHnGTe1y%2BDLXgik0kbNQz%2BoQcfpwnCkOsfl5We0Ow63KAlf2%2BU2Mh9FDHcjKVAGkZ2ChnKRhhhDGkbzhJFyYxJNoeV6VFkU9a1El3fKDld9cXCqDl1nWeuzTI7aGzHyQ7CCspY%2FSWkwCibNZfh58ed%2Bh7WcKi02Pf2wrTDczSx5NCFCWH5OvI3yojMX5tzukr%2FSfhSz6JKn%2F5g1PtT%2FBLW%2FN14g1F7SKzQYFILFU7i4vx38UwBJ7k5dHO0f5dXcTkx97TIWAddwm6d0IenDslplRi8reYCTkseZIUaJ1RlXYvyzQv0%2B2D209Ad4ju6uumD5YScaRAVNDY6DSCn6YfVTTGcuddMw07%2BuCs%2B2Uem2PiISIZJHCD3nV7eotqcxY8elS0myXYIlm%2ByIBxytG1H%2FN6R5w0yx26nf%2BbJHWT47INt3zMIrjjM8GOqUBSyeQX4lFZrU8LKL0Y0%2FcRhoF488zKaa6NagTa4cZdV5TB6aDM1PY7O5UnABQsVp9uzax2K64FM0uCy6LjfB81J0KUzzABvizpoxT%2BzJYdkdnrOyxBnIj%2B7BZ%2BoJtdxzq%2FU%2F9k9j2CR5A2KrrCn7a2BwG6WVXEz9dArCBSmaXWq9M9GxjosnrqRKNwEchrXBp9UhrOgnpMSPwB7yv7mfudE3UnADi&X-Amz-Signature=8cd07563f3d31e62b696483c58f730451d220027a5ae125d5e1aa0b59c983835&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46645XNDZVG%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQDlZGhbPjriiGDLfyZG%2F%2FWofwE7RzGeGmRBu7exdi8CPgIgQgDzFvcIwKfFThITE0FoBzV0%2BRplT6%2BVz4QmE%2FRErZEqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGXXUQRoyvuRMSnJ3ircA21LvSQFcSUOfwxV5vKpA1STskE%2Fzsa5GvUsSkP7RsLDMTYvOFRCLDidit2n3S%2FWaMbF7BtBcMIdboT1lYDSnvPlxwDzbUlGpzjIDWuxonwP7yvQaKD9YXQIioDAryQ1HixLbCQXaXwCu%2FF6fyzHeJZaImawAkBr%2FpOOvvdX62ruz74Sjb8ntynAZ8IrAcVTLFuHk%2F%2BGbHkOEHnGTe1y%2BDLXgik0kbNQz%2BoQcfpwnCkOsfl5We0Ow63KAlf2%2BU2Mh9FDHcjKVAGkZ2ChnKRhhhDGkbzhJFyYxJNoeV6VFkU9a1El3fKDld9cXCqDl1nWeuzTI7aGzHyQ7CCspY%2FSWkwCibNZfh58ed%2Bh7WcKi02Pf2wrTDczSx5NCFCWH5OvI3yojMX5tzukr%2FSfhSz6JKn%2F5g1PtT%2FBLW%2FN14g1F7SKzQYFILFU7i4vx38UwBJ7k5dHO0f5dXcTkx97TIWAddwm6d0IenDslplRi8reYCTkseZIUaJ1RlXYvyzQv0%2B2D209Ad4ju6uumD5YScaRAVNDY6DSCn6YfVTTGcuddMw07%2BuCs%2B2Uem2PiISIZJHCD3nV7eotqcxY8elS0myXYIlm%2ByIBxytG1H%2FN6R5w0yx26nf%2BbJHWT47INt3zMIrjjM8GOqUBSyeQX4lFZrU8LKL0Y0%2FcRhoF488zKaa6NagTa4cZdV5TB6aDM1PY7O5UnABQsVp9uzax2K64FM0uCy6LjfB81J0KUzzABvizpoxT%2BzJYdkdnrOyxBnIj%2B7BZ%2BoJtdxzq%2FU%2F9k9j2CR5A2KrrCn7a2BwG6WVXEz9dArCBSmaXWq9M9GxjosnrqRKNwEchrXBp9UhrOgnpMSPwB7yv7mfudE3UnADi&X-Amz-Signature=8cd07563f3d31e62b696483c58f730451d220027a5ae125d5e1aa0b59c983835&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBOSL3IA%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQCeEZ5SPiOj6d7Uy7PecHTAqzRJ4HVxiuKZQ5%2BYEBy1oQIhAPChmnrFJfHWG4JEh87f%2BG3n98SKDAOgQcm%2BjMJV0r7rKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzF7roPH0CCXXwZP70q3AN0x00doxViPu1C2rnETsAOUwNzoPpyxTsAmWTXO3RmNh222TnUPN%2F96QDTyDCsXqidCteOJGkh8j37rwIUM7ldlV6%2BYELJHKRbeHf1lJd4pHhd%2FrNNKauMCdVL6zGuUIJKSwYI%2BHSBxwfL8mmFDzmQZRxuiCUMCFjs1j5KOys21FBb9Fr1R%2FGImMrHlF8UcEcThm0aETkeyik1lSfa1EW0OsKo%2B20B7FUT4V5F2yfWAW9Uh%2BeSFnppms3gHr8dcS8268PCrb9%2BWHgLnScgcoRmRLvkmY0%2F93jlESGdl4pyQBcGpiRPwe13kSg8JkQNaGqUJLtLD9YTkUMubsZvyfYcMn2VrLJdS3w%2FDVYiRp%2B1PB9YYDUdNyopG7rTpTaromjKQeaVCdxbp9HxuwYJQ8mdeRAQrjOb5U5Kt5WgFWBVPQTKxmDDwNaLYkpg%2F%2F1JolOxGzcsQbPee795SJfM5SsWuOLAdnrcdHgNsczkxCpVAtVvHY0Rb2QVZ%2F7uc0mgNgq3jBfELBNncVWUTkwu9ShsSGlN0MfxsnPBTQj7oGijaNPIzRmPk8DUr%2FBoRb89Ko8U2MpB52RrSUlDJ2gca2Asj18K6uQ07zDowkzmuOriG4YuEyuG2565TXDGVjCV4YzPBjqkARlv6wCQGO4iXtsuLwc665Y4BRvBlVU2iEbIKvXyt4BI0l9dQC6E3nED1qzcAa2k0mFw8X82rJCObXTapoEjU4AQwFCiRGJrKXeAzhxnt3RNjZDnlrNIsDjamlJCNi%2FOfk%2BI4yqp859BXsiQYRYy09r82vf%2FPKpNvDRn6yzkwfFz1L0ZhjM1LfZusKfhEpz3dgPp0FDzrU8vG%2By5qXhfqvC7ApdM&X-Amz-Signature=eb6ce7256fd030df1dfd248573cf049730325612baa37b2a911943c4bdb82bf3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FB43Q64%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQCjdn75RFwBqDB0F5Zge%2FrqvDTGaIAIO6fShSMekWv3bAIgeqLU%2B4iOs%2BVGFLfF0KPZw99Cc7YbDPOUReInN2XrDwUqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNNgfB%2FRr%2BCgSTGr1CrcA6JdBLNBkvUvCE%2FWhBZJZzlLQ34T3%2FcpPkzf1YogiS%2Fuares13RCtCSbb%2B%2BWLaMVO4RBzFR68NLmx64XPDhLAPCSb1koJSR7TF%2Fgt4M4LfZp%2FyCRrya3dbzGbIA%2F4NYydopJDJr%2FGw1fM3poOFpSHfQ9UNBnubQ76X4yTecF5hp%2F6yX5Vp%2BoxEy1%2BPSS443%2BExy6pfMa8KDSoXLiIw%2FZf%2BXV45t09ZxaweK9fYLUBsWt%2FFXUsABjai%2F0%2BNNhZlSbsa08p9YNkxezaxSFcQ2YXXNG9xv6DiWZemGz3apISVpmux2fFPgA7oaE8wnG%2FL2QKFOBkk%2BtUUSCbB9L0CEI%2BfOA8C7mO6OkXJWh%2FO506Wg%2FVMOWDFmm%2B1K02jFwpUB1owAbe3tHwmbEGJUIevrQVAOPrYjTn67VlWMN%2F3ukMfCdtDSttraKfjQYPIaDp3EQNjfVAhDMl8CyrquP6GpXyCqMH9Y6WxRRhfujkDM6O1ofddHaxCnjptktcdsRynu6UIJsuFgKUi7QHACEUsspCKOHwgCM%2BXFd0jCtipGw8maDo1EpJIFwX6RJQ16H7PVzpVKmXBuXKSmqMHyEpEdcGw9vxtjCSYo5fQoPz9vga6W2drZcj07Cjtic0py7MLDjjM8GOqUBvuWNO4Ek%2Fi22P%2BUhixTTKyOsySvDoSRoGSPmQoyjub%2FAOUd17%2FtVZyCYy6odxC2iZ%2FrkSPXZKc86bGNOGlw2VHqaB%2BK6YQDVdyQSnCcJZa6nu3zZN54PgQaQKE5UmZWdGn2sr2GfNqV9O15o%2Bl7LgQoPHqQzifsliikvB4fW%2B0pWOoyeEh6rcXkbLOsiNRAAFYkpEloXREr5C7Cxms1pBIPwcmLL&X-Amz-Signature=22fd3cdeb6dcd754bc3b3fb213e0c7a440fb2f1e822d4fb3799983fcba68ceef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FB43Q64%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQCjdn75RFwBqDB0F5Zge%2FrqvDTGaIAIO6fShSMekWv3bAIgeqLU%2B4iOs%2BVGFLfF0KPZw99Cc7YbDPOUReInN2XrDwUqiAQI6f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNNgfB%2FRr%2BCgSTGr1CrcA6JdBLNBkvUvCE%2FWhBZJZzlLQ34T3%2FcpPkzf1YogiS%2Fuares13RCtCSbb%2B%2BWLaMVO4RBzFR68NLmx64XPDhLAPCSb1koJSR7TF%2Fgt4M4LfZp%2FyCRrya3dbzGbIA%2F4NYydopJDJr%2FGw1fM3poOFpSHfQ9UNBnubQ76X4yTecF5hp%2F6yX5Vp%2BoxEy1%2BPSS443%2BExy6pfMa8KDSoXLiIw%2FZf%2BXV45t09ZxaweK9fYLUBsWt%2FFXUsABjai%2F0%2BNNhZlSbsa08p9YNkxezaxSFcQ2YXXNG9xv6DiWZemGz3apISVpmux2fFPgA7oaE8wnG%2FL2QKFOBkk%2BtUUSCbB9L0CEI%2BfOA8C7mO6OkXJWh%2FO506Wg%2FVMOWDFmm%2B1K02jFwpUB1owAbe3tHwmbEGJUIevrQVAOPrYjTn67VlWMN%2F3ukMfCdtDSttraKfjQYPIaDp3EQNjfVAhDMl8CyrquP6GpXyCqMH9Y6WxRRhfujkDM6O1ofddHaxCnjptktcdsRynu6UIJsuFgKUi7QHACEUsspCKOHwgCM%2BXFd0jCtipGw8maDo1EpJIFwX6RJQ16H7PVzpVKmXBuXKSmqMHyEpEdcGw9vxtjCSYo5fQoPz9vga6W2drZcj07Cjtic0py7MLDjjM8GOqUBvuWNO4Ek%2Fi22P%2BUhixTTKyOsySvDoSRoGSPmQoyjub%2FAOUd17%2FtVZyCYy6odxC2iZ%2FrkSPXZKc86bGNOGlw2VHqaB%2BK6YQDVdyQSnCcJZa6nu3zZN54PgQaQKE5UmZWdGn2sr2GfNqV9O15o%2Bl7LgQoPHqQzifsliikvB4fW%2B0pWOoyeEh6rcXkbLOsiNRAAFYkpEloXREr5C7Cxms1pBIPwcmLL&X-Amz-Signature=4546857ddb598629bd0bcd286a301b3771ff712f72e184539eba89c3f774920a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIKSQC4F%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIHS7zZc7gOGExcMju%2B17nCYHdFoHnXZNKw4KNCKa195hAiEAk7Xqx4vJ5zFVEcc5gZwdpuTTk2vvxT1%2FMzm%2BFeLk9JAqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGmvtrEikMDqH8xiZyrcA9JhZgbDtCvFuygsdbXCp7865RW%2Bg2XaO5W5eXGl0nZ%2FMz6DvIxAVcx22FH%2FYfz5OXPNYyZyUX1XSKQBlPdshHys10vNYDIUSIouy7InhcDZsQPxz5x7glctUEiSzjEXqpjThLhQyg9x0iT8rAfWH9U567CQY%2FHuyfOMa0ZNtadONjEDX9qInzBPP7qWbR%2B5nRIUjT4swWTWB25agSk4EIO93Yj05afAAf4cSSyhastMAX3mSbgu8BhlGGVXVnh6yAV1A%2FOaZEz7X0TUpp7tzrrC0xBXDfUXL%2B2MWDj0mNqSkaZ0DYfvuOWt6gALHF5vQnBzoccxI5eBiOZ1TSahoSyTk9i8s4CoqajlxT81s%2BJ7aNbwniInyq5ZQy1ps8GsOMPCLTNqQvTQAozSHCLjgW2vQ1acDhHvhuWSFxpweas%2Bdcs2x0uspIXdx0T1Kcx%2BKAfRv7rGxtS%2F%2B%2FGtjKT79OHZyx77Rq%2FGynF%2BhZf3B%2FnOze8OfXTH0fefrhfozWGWmpPOPZOnsYJRvKA9S9yOP2MiVGouy4Bhz%2FX7nl3%2FiAneQz5bG6eAvzvqjNUx2veWx3hBhn8NukNZENWULVdPgHSjZ4nQkNwQiHfi9HoEzyN%2FVKwat45bLCBi3YnOMNjhjM8GOqUBZ2XRhmJGtEo2X8mfXM0TylsRnoDinaPtpUuHAgRNZQwXvuHXrrPCmtUEDJIGj1zATelcBf8ftIOOu5JuRZ3%2B%2FlC%2BzKCx36sqNPxd6fZg563pV%2FQvD2mAV4i2%2BKy%2Ff1TyebZSXhZlRiffeKXfP6TDhiH1cNu2WLeoWK0uBaalJI0fzIO9plswTobsma79ITaiDp9Epa9U%2B%2B2FmbKIwZKvOCI5masV&X-Amz-Signature=adc492671b7f23e535b00f8e05910d291686556e0bde9af7cb29328b934a6cc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6Z7ZWKL%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQD3yDPaerRI55uUGZ6WgO1IGqLPJknxT1wGaV6%2BuNxMSwIhAM6PfvkWMgeNKC%2Fq8nrE1GK5xx2Irb7%2FTojnpICp5sSiKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx3pmYDcKKLA41lwbEq3ANjEnabNpZpugopYFxRs3IRQQVWBOAIspu57LyhvTTWFzViBO7n4HvSqSStdqLUWkew528pxQRnhkcaqy%2FJbV%2F6OOjJ1JH0h%2BQ1FwZYzqAJHwCw891caRZHwKA8tIzndcjR%2FvgPhn50NmztvZ9jja9Ukii8%2BIHpLQU2kJfPUiRQEs5gv11hs4mDPEE48DuAyvMobQHep2sEoFaLlQllMdwooaTfF80o%2FmwBNZTgsHoesW0GEuAPplFvz7NXQv84k3Oz6f4W8USsbsg%2FNr4eNKpaEXu%2F23Ysm%2BtcBYi%2F4rlXIXBg%2FCal8ddStFJBYeYWW6%2B4foJS9T55QT4OGCIya4D56%2B0XkjLY%2BIoaMELHzbS3Ahu5tD8%2BT7wqd1EeL1mLw%2BlBfmVb02EJBulkAGMHGfCgcYi8SD2JnvEuS8VI3skMPgPh5I8LZX7KtWBhmO%2FyAeFK0H12Fc7CzJFpwqzfO%2FiKVtNy76Oxn4ebao1%2BSF9wx0rtUt9oRRc%2FLigEZ23ywrDoJh%2FSYfSQ883qyc6CHntxdyoVY%2BgwNU0xvXV0gqU4HWg2CDn%2FjcqIA4o5lDle79dyKdFBf%2FHCwLtVOLp99zKxNaz9GVsTnvIClfS%2BI0n0GT8hk3WNi6%2BghoKXYTD34ozPBjqkAdezzNjRTgu8XxFZE3%2FdtOClSletuNSrAbqvGwyfcoZqg%2FmtGo0xgZBoBum37XNDIAaZ%2Fb7jDmNPn6UrjWsCP0ytiwaSiTFcObgilUtXf8y7PuRSZqGDiHogMTVBu7FzL7DXGoRRNH1H9rJy95Caf9Bl%2BaF6Ranx%2FengCA8SIKI6mDsWa%2F5hRlNwA%2BMNUZJhnccoFlPDywPGp2pzhojlZnYyC%2Bxa&X-Amz-Signature=86ebd62a1d978dd987d90d04f87d1d2fad0492460e0a7d7c16d060d51eb9c60f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IVCFC7K%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQCRKgwam1%2B10Dx09bUqtJnlyuWpL7yaFEa3GTNvwnS3PQIhAL0gYnLrnThTpL1ByiAKkwXRJc7ypp4wCUwcg31CSp0DKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzwH0GrdOBr7mKTjisq3AOtgu%2B%2BNSzGDgJKNMkWYHXcr2b7%2F6941N2xdXJdQJI%2F99%2FUcn9tpF3R2VSM4kkwiYPt2ue4ls9lh6zpbY86m8dNPLgZcmNT6aAP%2FIk68icSqbydfb2f9vbqnu2Ji4iWs%2BIBkZacivS55nM9Uk3rpH9q2lEPk7rDfyRCpyBmUmElgcCLGSBnxIuYqk6hBqcmFB6W84%2BjD2xatrCf9WkMa5uqdQ6zGNcqiwUP3a4tnHzrZZkDBlzkyTA%2BTFM%2F2JBmfgyZICTFJXJPkNhllip5k32wEayYlXzcKpJzefW0PekSEhderXmIaisN53lc8WR1wqUESX5YUTkiJ0otjXvCTpGMVlpIiKCQFlQmf9avTTIqAlplpuGiFFkFqCIX4YpyvF5%2FTzITnibgplvWFwhhjcMNX5cCx6YnIu5Qj3GuYto%2B1u5SjVjkq87NvZlHdA1FCGJ9RFio7SEVGuh4r4Omk0h1v%2Fg9rfPHSXZst6ycII8NJEbEveSnxHpcYZTpPzhOXO3FQEP2nu4LTfq7XvhCbQ%2F35ylmHHgmTChzXmM7zTzz4NhvS6%2FJhCv4YqTT04SuwrH4JlKNi0hdYxCnti%2FxCAPcSe8J7uSYJnQp3Pbht8Xs0PVee16SosXCQFNFbzDc4YzPBjqkAVCwqDcGOMf3Plv2QvmB%2B7xOzC0YtZCUNmM9uvbGYulCr6mvxnXNF1WMp6HeY8O60niACzRuQTiX9020lAvov%2F3eINo8uPS7lyjgimCfyDNHFRbNtuzHBroVmzTflJI3wmzNRxh5ka%2BZx%2BOvohOcC0GDcP9XJ0TEdrmQBwVJLINtpfyDvyEHNjLI%2BMatGHiVgh%2FmmxhzSTpSWLUscq7bQbVXusCE&X-Amz-Signature=be47183aacdc8bbda7af7bf042a5520922aec5eb154308412f7f8d8f08184b20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVOKH2H2%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIFSQ%2BRBTvAeDAL5xG97WCdJ8Kr5WBlNp%2BF1DYfZqNprnAiEAySE3Z2gPAyV%2FL%2FKTR%2FPb%2FiamtSv74EnO1LyJgwX%2BxWAqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFEElNboU%2FqrSRnskSrcA7dt035D%2BUU5c7zlZCFrqqMQQtvQMkav%2BL0Veu83KsBccxcuwBk0tE1I0TcA4G8At2S3IIbCau1fMNXHgUdZt8h4%2Fwy9fmkKT%2BlSclgasfMWG%2FEv4ysmVaGcNj48qddsLHOdTyRtUjk2%2Bnd7eJFrs3C2V2pxDY8lw7E3%2FM543oKr3dafo3jzJwlfmIsu%2FCc%2Fn8N5ro0b4rDKvlJPJ78Vad%2FmROTCnnzPBrfMrKT%2BOYwXScNV%2FpAkGIMUh0dpFJyeUdyEjPHBXCD7XsB0NO5%2BlOOixlRJhyKo0GlpskmXfJMrWM6aotBdwe1OLS9fzpHfUqBeBNXXrj0TqEM2bLJLWEgsF9nvKRb618uMzjc%2F6lKPJt8dEzZa1C2WHRjE65GeguUMAMmfjQsGsG5oFCGvlmPgC2XD9OtHRh6%2BaH90OgIP%2FxR9ha5C1GwHQOp0weoZb2BcXJJBzkl%2FA4VI9kKDLNlWDhTu8mE7XOF%2BOlQLL99z%2Fi1usHGMTzzvZ42n%2FCIPPSlclw3tGEjkCALXIExG%2FMibc%2Fh72jQT0yN%2BJXpSoP5nMMlIAco5RySxArL5qkEDCEKZUn1N7TeiwfFjexscHN%2BFd%2BSPSU9eYDird27rCC%2FTw5yLFJ86%2Fl%2BnmqaZMJfijM8GOqUBYfRTIyyBmDglRN9s8ArpVRI8SWiH1iSKnX59htTpXFy%2FSqiz%2BPD15Z4qkNVYJLZ1Su77NUKEG5a7bdzKBqnQxnk5sCcDHl5ex2j6M66QSMH0t2Qddsh1d1QJv2CSfhxlZV%2F%2B7iirDgPAH5S3pM2OeK3LnOr9PJGJQNnKy4gFpMiItBgbUs%2FmsZRUB0oZhglsYx%2F%2FFyVLSup6M8PeOa%2BtVhN0cSyl&X-Amz-Signature=f082f9c21c891745f4bb6364033000eea7001372b7820585f65a13bbb7be2ad4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVOKH2H2%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIFSQ%2BRBTvAeDAL5xG97WCdJ8Kr5WBlNp%2BF1DYfZqNprnAiEAySE3Z2gPAyV%2FL%2FKTR%2FPb%2FiamtSv74EnO1LyJgwX%2BxWAqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFEElNboU%2FqrSRnskSrcA7dt035D%2BUU5c7zlZCFrqqMQQtvQMkav%2BL0Veu83KsBccxcuwBk0tE1I0TcA4G8At2S3IIbCau1fMNXHgUdZt8h4%2Fwy9fmkKT%2BlSclgasfMWG%2FEv4ysmVaGcNj48qddsLHOdTyRtUjk2%2Bnd7eJFrs3C2V2pxDY8lw7E3%2FM543oKr3dafo3jzJwlfmIsu%2FCc%2Fn8N5ro0b4rDKvlJPJ78Vad%2FmROTCnnzPBrfMrKT%2BOYwXScNV%2FpAkGIMUh0dpFJyeUdyEjPHBXCD7XsB0NO5%2BlOOixlRJhyKo0GlpskmXfJMrWM6aotBdwe1OLS9fzpHfUqBeBNXXrj0TqEM2bLJLWEgsF9nvKRb618uMzjc%2F6lKPJt8dEzZa1C2WHRjE65GeguUMAMmfjQsGsG5oFCGvlmPgC2XD9OtHRh6%2BaH90OgIP%2FxR9ha5C1GwHQOp0weoZb2BcXJJBzkl%2FA4VI9kKDLNlWDhTu8mE7XOF%2BOlQLL99z%2Fi1usHGMTzzvZ42n%2FCIPPSlclw3tGEjkCALXIExG%2FMibc%2Fh72jQT0yN%2BJXpSoP5nMMlIAco5RySxArL5qkEDCEKZUn1N7TeiwfFjexscHN%2BFd%2BSPSU9eYDird27rCC%2FTw5yLFJ86%2Fl%2BnmqaZMJfijM8GOqUBYfRTIyyBmDglRN9s8ArpVRI8SWiH1iSKnX59htTpXFy%2FSqiz%2BPD15Z4qkNVYJLZ1Su77NUKEG5a7bdzKBqnQxnk5sCcDHl5ex2j6M66QSMH0t2Qddsh1d1QJv2CSfhxlZV%2F%2B7iirDgPAH5S3pM2OeK3LnOr9PJGJQNnKy4gFpMiItBgbUs%2FmsZRUB0oZhglsYx%2F%2FFyVLSup6M8PeOa%2BtVhN0cSyl&X-Amz-Signature=02514cf481c4b3d49ce84ca4dfb23b1519e2a5ff54c3d34bcef476ce703cb860&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4L6VQMO%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIGPEvEikxWLE0Hb1tlF6C2tbi7ImfCW32EPdYfQoHbb%2FAiEAkK1PVECRzofaWxPvsZwcaPi2TGOfiBayv7rFthfA5UIqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB2Hcgxpzm7L6xb4BSrcA7IXxG3pu0bKrW2V1aQURJLx8PNVS4G%2Fe9q7EOlS%2B3FpvV0U%2BRt%2BKTC3EsNKEN%2Bq7ROdgSgHCc2SdxI1YWpa%2FVQPX07tuKlyI%2FzqW%2Ft67C%2Bm%2B5vJLYsZ7fK69JbI4nW01O3mJE6%2Fo0VEcs7IlmTI8%2BSc4Wj5U2LeZM7OBzGIwdN%2BUUtqSRlrbPWwD5WeFlxDmySEAxamNICN%2F5JvUE9mXFJn3d%2F5zALiFbJZWIdWdpUR4LXkED%2FH3P%2Fi8JKAi4EU1pW0Wv%2FI%2F29FUeimsDdOTHcQULGyRGAWDFcurYzupKXUtLrPX4Xh477JN%2Funf9RGBZB960XTRMQttdmTcRICIv0045Ce6MEusKn%2BN10J2PcXkypUbFw5ghQGlPz0Ak%2F7VEMErwXujQ5VRix6LhPx2hJuDMTANPIhehAnBwZ0WIleuCdOJENxtPIRqTRmBnoZTqwwiQwiQvkCeLVAroabXF9718McnVjB3fRH54KawOKFSuUlP5la6kUFzDI4PAt6NtZYES3dwxMOAW6PIh1h%2BohIyVKGHM6%2FcPOurZy6B7axFDDuGKrbzoh3VpEer2iSNbuOxbXny4z4snaGc5Fqa50i6cAPQGaAc4vzovecrlh5sfcQx2oH4Yf2STebMPXgjM8GOqUBw8wxDMuh4YDl1cgLU3aESFRjh1VZKGOjeh0%2BZTYWllzFt%2B4iWewPvdNh6UCUIgEiUAV%2BYkkuE2JsIA4sF7gLkcjYXULORkfljigwXLo2ly6T1NHJfnJ3NpFieTrpjwwJOuFj9s23Bdpkzm4XynbmlrxJQUvAgRsLmv14or4j4ppHZlKQosPje6DHGOh%2BnDNFWzx0TYy4zEh3vkST7ah6TlXQ7T05&X-Amz-Signature=16dc31688825c04589dad8c3f6eb062bdd72704d40e5bdaf1d723352c01cec0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7QA6HYF%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQCrFrl6YXQVTybL10KYtfNJ0cgJCe5lb426TJiuookYJAIhAOwSmGhIoY2VqK%2FxKX35jtBoFr72dLlFpmkKZ9FeGWwXKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxHmfeyb4%2BtF%2FG9h%2Fwq3AMKsIDPqd%2BxJ2NnhUYnCmIW51rMq2Ma2XqgTwFEu%2Bd29XoYidyov42T30fCFhO3tBYH88MevWexXY4t2paTZHtzyKsARYZl0NWbg0LH3svemHUKsO2xrFVpbUuDZshhBLwOqdIzYwD3kQzjnMH6Hn0TJ2PvyJ4jOPmjp%2BGzF4kCkLuzVwrYacMMHeR0FPE%2B%2BBzcemFtvPb%2FoumbB%2BMZ6%2BL4Q7xAK5LkYxzBBMpEaUg2rikp7Nt%2BwSM1DH05%2BM%2Ba8dXqVaxSga8lZngbl%2FtpUYpcBgVNkVTmu00sQ64gu5mOPvd%2BttJgw5efoZMMhbQVBCfeldC8A6VhmJ%2Fx9gM1Yp3nM8eCcj54sTHhN6q3SnIacCgeK8hc1nxWpER0%2BVVQOF6psljUpnmEcJocM5uoFAmOQ7L4gVTkewv%2BK21nt%2BJM5%2Bp4agix5bCX9tv8D58l%2BOd%2BbQtX0ZeEWxiNpWO2AyHJL5LhUB1pOdp%2Fk7yheDRyIPEgSNVW2BkZnz1PX6IcSiF516htZOTl7KvBiyQjD9LmcHGgF1x%2BUkDo9aVcs5OFgaGa1lnFOimlECUJ83HFoQys68bzVftvQffTmqlUN5dSiVKXSD30ItEv8vSSQUzWC2NMw88UPlpZ7hJa%2FTDF4ozPBjqkAaKKphMVGlg8GYz8iKYZNDfoUqC1ILhmvIjwdt68luQDfWyX2Q%2BvT59mQP1kMg05vHTOwkIoxGNmuGFy1FP3YXdie7brDPRwIToSjahlQFZgniCeMnp%2FiFq30j2YCR7%2Bf0RmlkmP2yhp68itVJMNtZvrO4HPLrinQM0zYQvx5zCygO87rW%2Ftkq%2Fz1G69noM%2FLFi70%2FOWahpn3e0wmVz%2Fc3Vpsi5Q&X-Amz-Signature=133fa1dac2b6db5ac5c81afbb364fe8b0057d74c4d590eeaad48cdd615e4d105&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7QA6HYF%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJIMEYCIQCrFrl6YXQVTybL10KYtfNJ0cgJCe5lb426TJiuookYJAIhAOwSmGhIoY2VqK%2FxKX35jtBoFr72dLlFpmkKZ9FeGWwXKogECOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxHmfeyb4%2BtF%2FG9h%2Fwq3AMKsIDPqd%2BxJ2NnhUYnCmIW51rMq2Ma2XqgTwFEu%2Bd29XoYidyov42T30fCFhO3tBYH88MevWexXY4t2paTZHtzyKsARYZl0NWbg0LH3svemHUKsO2xrFVpbUuDZshhBLwOqdIzYwD3kQzjnMH6Hn0TJ2PvyJ4jOPmjp%2BGzF4kCkLuzVwrYacMMHeR0FPE%2B%2BBzcemFtvPb%2FoumbB%2BMZ6%2BL4Q7xAK5LkYxzBBMpEaUg2rikp7Nt%2BwSM1DH05%2BM%2Ba8dXqVaxSga8lZngbl%2FtpUYpcBgVNkVTmu00sQ64gu5mOPvd%2BttJgw5efoZMMhbQVBCfeldC8A6VhmJ%2Fx9gM1Yp3nM8eCcj54sTHhN6q3SnIacCgeK8hc1nxWpER0%2BVVQOF6psljUpnmEcJocM5uoFAmOQ7L4gVTkewv%2BK21nt%2BJM5%2Bp4agix5bCX9tv8D58l%2BOd%2BbQtX0ZeEWxiNpWO2AyHJL5LhUB1pOdp%2Fk7yheDRyIPEgSNVW2BkZnz1PX6IcSiF516htZOTl7KvBiyQjD9LmcHGgF1x%2BUkDo9aVcs5OFgaGa1lnFOimlECUJ83HFoQys68bzVftvQffTmqlUN5dSiVKXSD30ItEv8vSSQUzWC2NMw88UPlpZ7hJa%2FTDF4ozPBjqkAaKKphMVGlg8GYz8iKYZNDfoUqC1ILhmvIjwdt68luQDfWyX2Q%2BvT59mQP1kMg05vHTOwkIoxGNmuGFy1FP3YXdie7brDPRwIToSjahlQFZgniCeMnp%2FiFq30j2YCR7%2Bf0RmlkmP2yhp68itVJMNtZvrO4HPLrinQM0zYQvx5zCygO87rW%2Ftkq%2Fz1G69noM%2FLFi70%2FOWahpn3e0wmVz%2Fc3Vpsi5Q&X-Amz-Signature=133fa1dac2b6db5ac5c81afbb364fe8b0057d74c4d590eeaad48cdd615e4d105&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634KPFOEK%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T083331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECAaCXVzLXdlc3QtMiJHMEUCIQCYRtjCE%2B6zNga3l4oUPhE6SOrsVhVeb%2F0NQvSZ7za0NgIgPsXVXYb5QifmABu9bewak6dB5MB%2FXhhEojTXSKIBGDsqiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHQ%2BVl2WCysnfP%2BXPyrcAxmNAYQFZSW8yqsEiEmN7Wf5f%2B4UCyK8jakT%2BxzVYPns4u2%2FKKgpJ%2FTfb4KMIQLeboZGnWAyEcPSQ0tcAOF4h2x%2BeS7Z1Jux7f02M%2BQycRzvbnKD8Vv2%2BjyYV2BwMYFbjF9feBewZ%2Bu30X3CAHFEsqo3zjc75K8bEKiffCHKMMsnrMGQq9JtzQXA9dZFBu7fiZsulghYrdzZD8Y53SpS%2F8sCHtnJtC1IymO2vjow2Ka4MZU2g8sCbIOr3kUyz1ytP9fqIa2Q4O4i4H2gnq2ICYRmLrw7ds9zV%2FAZ1tH72rSLoeEJAdizSPOmd4DuEP6Mnpv%2B4yuFEVkRKno17FWVoxL1JiL8H9x0kcpitwMfNhUMaFkINHn19Ve3kXCme%2FuoUDUvjsn9pZEjHlCBBiEvY7ELVTPTKHUmL9WVjFE2gcbOXKtger9IW9pqNnbWdwLcX04%2Ba1Z9WzWTE9oi22AxaExToVIp%2FFGO5%2BbieX6lsm8PDvo76h5jGUmS1Zy2f2HIUBcVGBReb3nkxLygYqq2V0vBsrT77UJ9tGvOPzKnEF2rxhbuwpOJL6KL%2FveNfIONWBUcmc84094CfZh%2F3pmU16RPlZmvmkBOC2SLHJ7H4izukQAYym9JHmE75zLHMNfgjM8GOqUB8JFpIMV5RtFyVx3rsAao7fBxpsCR11IO1wQn1y5FEFWTaxCB7WOz95K42ajJObsaje%2Fc4dNrHK8xSNgTv8qJRboTEpTKcTBRDBPTKtep9pVlyv26%2FU0D8CHUP2Z5PBfjdB53BrUBiwsZQmN5FlazR0nl7SdPa2%2Bb4UUKdv7s%2BBzULX%2Bcz6en%2FHsnjoRKjkjwVxUlV4urMeQkGRGZOkZ2Pj0Vi4Hw&X-Amz-Signature=2ccc609ffa9fb5cd5ec7efd5c77d78781e510c6d5166ef7620fb1fefc1125963&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

