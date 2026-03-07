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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YSS7YOY%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQDh%2Bdn1Vx4LNTHtvsTROTsgKcTcZZTJUAdg7HK7Iq%2FXvgIgf3Ng24VDTr0K1Kkc%2Fo4Ut9sb2BI6NpP6G9xHKQ7VyO4q%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDJ25AYVPGChQepJHpyrcA1nLNjzFHyGmUxhZ6BFqhNFGL7PGXnhn7VpiDcoe5FVvBEtHFsV3R%2Fj0RHep6RU0o9PgIqjA5j1HLETofJP9i%2Bri2u3c0W8uRnzhBluJyf5cAsCVyZnU%2F14OmvpGFG5b7k2iQCeYOGz4%2F7BjbNbqulsdIm6CEy86GpeenYaz%2BNDJmLoV1xp77oEhtJj5v2Zk8fBtMjZV7166q2ewWq9j74UQc1SPRgTwlexPoPtdGvVMDaH21pnDO%2BmV7WOkiuNPoYjRilKW5KKyII1D4%2FoF%2Fe9lKxfagqvN6lRjmrvYyxmYe5uI9mT88jJzv0LgYzjN%2Fo6a6nU6OSpoFTS4cuqsPv8fshRr8OidEDr3RdsVOQNZMj011A7VcHKwVIyJuM2602lF%2F%2FtnMlJ5lY71CKw7KfMBENEIL13MeCdb4bn0xI6xgc2lgLORcmnwYyUbEM1Q0PVRqBKcZEu6x3K4U%2Fei2rg6AgMXrPtXimID7Vnn0PTVmKW3pf3YlPTDWCODCXtN2Jq%2BK1z8T9DvXlHeY3Qhe10A7XVHlaVh6yozpZsET4YlU3n7Mc9aNuhjAjxzkU6dZ8fzcfa1Ih4eJbqNThMc59gsxXCZudYlkQV8qkET09ynQxYxNMo02BRiG5uGMMmSss0GOqUBCCIflhZmsff4gJBoKXvjK1hy9OIzhTErDoxVCQ2wMpFwzrqL3Rv%2BDf3XXyzXn1S56LpBkQRwA%2BqTza6T42ORZxr2q4PW9asi3lsENqqkI7e4vaCARfhQ2WTzIo45kGRIltYEenXwXxUXctvYsCtmcMkCXpPJQSp19yXfyxQpAvW2iHtKiYZ5N0tjLqQZ9Mm6TtCo5r2DNipxwRMK2QcXveRaqFpn&X-Amz-Signature=7a0be405344485c7d67feba973529571124ab6d6ff031718257ac932de6a4849&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667YSS7YOY%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQDh%2Bdn1Vx4LNTHtvsTROTsgKcTcZZTJUAdg7HK7Iq%2FXvgIgf3Ng24VDTr0K1Kkc%2Fo4Ut9sb2BI6NpP6G9xHKQ7VyO4q%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDJ25AYVPGChQepJHpyrcA1nLNjzFHyGmUxhZ6BFqhNFGL7PGXnhn7VpiDcoe5FVvBEtHFsV3R%2Fj0RHep6RU0o9PgIqjA5j1HLETofJP9i%2Bri2u3c0W8uRnzhBluJyf5cAsCVyZnU%2F14OmvpGFG5b7k2iQCeYOGz4%2F7BjbNbqulsdIm6CEy86GpeenYaz%2BNDJmLoV1xp77oEhtJj5v2Zk8fBtMjZV7166q2ewWq9j74UQc1SPRgTwlexPoPtdGvVMDaH21pnDO%2BmV7WOkiuNPoYjRilKW5KKyII1D4%2FoF%2Fe9lKxfagqvN6lRjmrvYyxmYe5uI9mT88jJzv0LgYzjN%2Fo6a6nU6OSpoFTS4cuqsPv8fshRr8OidEDr3RdsVOQNZMj011A7VcHKwVIyJuM2602lF%2F%2FtnMlJ5lY71CKw7KfMBENEIL13MeCdb4bn0xI6xgc2lgLORcmnwYyUbEM1Q0PVRqBKcZEu6x3K4U%2Fei2rg6AgMXrPtXimID7Vnn0PTVmKW3pf3YlPTDWCODCXtN2Jq%2BK1z8T9DvXlHeY3Qhe10A7XVHlaVh6yozpZsET4YlU3n7Mc9aNuhjAjxzkU6dZ8fzcfa1Ih4eJbqNThMc59gsxXCZudYlkQV8qkET09ynQxYxNMo02BRiG5uGMMmSss0GOqUBCCIflhZmsff4gJBoKXvjK1hy9OIzhTErDoxVCQ2wMpFwzrqL3Rv%2BDf3XXyzXn1S56LpBkQRwA%2BqTza6T42ORZxr2q4PW9asi3lsENqqkI7e4vaCARfhQ2WTzIo45kGRIltYEenXwXxUXctvYsCtmcMkCXpPJQSp19yXfyxQpAvW2iHtKiYZ5N0tjLqQZ9Mm6TtCo5r2DNipxwRMK2QcXveRaqFpn&X-Amz-Signature=7a0be405344485c7d67feba973529571124ab6d6ff031718257ac932de6a4849&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYR2MZXZ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIG9zsn%2FDO%2FysOdERZQgoq9Omqc96PlptEi62sv1BLUIjAiEAgX6GeGkpKR4K%2B%2F11hqgyjito%2BaUyEc3xDGK%2BVNzmGNkq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDJAFHBCLTi%2BQdrFSwSrcA6l6NzfMTyJoBBvKw87tFZrm4niDvKrexU4XFXP8UW4SzxKY790pNnw%2BvPRiP1RaFNcpJa954dPS8d2BCCJ4OpcmckmBAyMtkIzd5TMeAjZZK50fGJ9%2BdfT2VkxCQ2EWbiTmuLcO5HsBJ5%2FHb4ztxXGXAG401fEcCuY6Bk%2Fz47ZxnisPdC35jq2wz26lHsiSqD1gzl9NlRl7rT6dAg7xKC%2BO6VWqltJqrC7%2FfTvMfr91tvQwM72S9akKiNN1DjcUYkfcimLpZkR%2FJduIhH57OM8QI6QpQyCwURZG30JGtDXMjbHdXXrMjBz4LBI0h6HhII%2BQMuh40Y%2BOhi%2FFj%2FmCRDZ3kSBCDAOhndnZ1FRCTyRKRJilm5FcELCQhOJXYqzcodMR3XRohQtuzIA3P4vz9kOUYyq7oZXMIHb6mMqIYtBshSm5oTvAX5I%2BijnzmpDUOAuwc%2Fs11mhSJp1rKucvSfKLThH1fU6h0nE0DitjwoEOAZ0FCo9oSKhDFi7H8S%2Fjif9DXGvKzJckeONKxL3ob2GmmecWeSSp5EDosDOXivQTnB15Cf0nYzqwEsF4my91qG0WFZeAoki5dJmT2w4sRyV8raI3RrrsTPz83FuzF5Y08%2BNZFSY7EnzMfS5RMNCSss0GOqUB9KDmTIapIMVQdAMEyBWydGDLKTK7ljIgRRsAiNsk75yMqMtTZnZ0RDpqj%2BMpgGzXVQt4r1YZHc8TvLbTxJkQhGUtALGqnUKN0lqcZxCI3zbP%2B2Evilq2J7vLWx%2FFxV7p9Z3%2Bbqs%2F5uuEVbHa0hwfMRfzMH0%2FQ97AeFDvlKnWz8mWUCGCHtFD9mPTMqRTMXYqNE4CZhae4DDaFIASj8Td4wmvXzU%2B&X-Amz-Signature=8c098356a0a43278130737dd9d74bf8c8887cc7330d5ffd0962a43d33be0918b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV2IXWMJ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQCAgQqjtyVDebfo3uOv8F1MTFBcy%2FKpnSmsfFHAPQJe0AIgJxASwk9dZKljF%2BoqxpPFwAEwzht7GHuT%2BosnqAD1tUkq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDLRQCLjm402BPPRqFyrcA%2B%2Bv4kTjWjMZpx8E0i0gCPPXjxJ8GhUpJ%2BpVvtnxCs%2B5IT7wK23lGR0D1p1FBX2rzyc2C7yYZHNCYm%2BJc3pm54tsCcfUMi1fnxkx4iM8FLjIpbs84AT8FdU%2FXhw6s%2BBGqN2WZZmf0PKWBnGp4Nn%2FNDMTYRFQ7vSXMCA8uNhilna4cbAMNXJFp6cLFDcSf%2F%2FqB7SGjxIPJRS9OH08Tu519s2J8sCcjvtdPl9KD6F2a1Nirkns80QQSwaFPFRMR%2F54r3BDh%2B5gjkzu%2FQdjS6ybXCRRBQFdJFyvsNxvtiNwRRiZew76MAIQQA8p236N5ljNC9LX7JDBjOHAvPCCtpF9m1YQmXPg%2BTKYB0s2oYyhhVYKldH8xUYWOCExf0tkP7Belz%2FUB4kqRAC5eWk6keE%2BmP591FXaguKLOIgAe7dK32FJLpDP00doCeFOnXX5fddNqnAIm9eyGfdwRYpXqRXfvfSnRTKIjecA37zK7ulJVLsxJuELkeVq1z743HZwETZs85Uhr4aRLx74E9bGKNYtqbeAuX7OXAzoh5xuO7Chh7zjjR9Bd1obiv2YXKMW79Crx5QdxKjfQnUHVQ%2BPy6fW1ypLyJtxTAVyvnJVkeUpSf1IL1CcTd9dc08BrdYyMKSTss0GOqUBA1aQCXIueSNs28OzQtp8IqfF9fKzBFtN8mFWvF%2FPhVthMILPivKDOX7p3mtzyjNhWKwbz1ZkrYTfuGYWyyjIuE5dfIZOFGN1Gc297ApwVRla%2FdqOqjgXZXVK%2FJymCNXaeEHJVMr7f70k9XIE1Flno2HsVmCXar8ffFw7DrO%2F7CjQH2gPUUe5VXkntS5X3mFgGmr20KvoKeko5f%2BG26%2FyDIFjQW94&X-Amz-Signature=49844b2e5e4ef3a572bb69cd1a31cf9a0ee0a669daa31090d11eca51c0b49679&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV2IXWMJ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQCAgQqjtyVDebfo3uOv8F1MTFBcy%2FKpnSmsfFHAPQJe0AIgJxASwk9dZKljF%2BoqxpPFwAEwzht7GHuT%2BosnqAD1tUkq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDLRQCLjm402BPPRqFyrcA%2B%2Bv4kTjWjMZpx8E0i0gCPPXjxJ8GhUpJ%2BpVvtnxCs%2B5IT7wK23lGR0D1p1FBX2rzyc2C7yYZHNCYm%2BJc3pm54tsCcfUMi1fnxkx4iM8FLjIpbs84AT8FdU%2FXhw6s%2BBGqN2WZZmf0PKWBnGp4Nn%2FNDMTYRFQ7vSXMCA8uNhilna4cbAMNXJFp6cLFDcSf%2F%2FqB7SGjxIPJRS9OH08Tu519s2J8sCcjvtdPl9KD6F2a1Nirkns80QQSwaFPFRMR%2F54r3BDh%2B5gjkzu%2FQdjS6ybXCRRBQFdJFyvsNxvtiNwRRiZew76MAIQQA8p236N5ljNC9LX7JDBjOHAvPCCtpF9m1YQmXPg%2BTKYB0s2oYyhhVYKldH8xUYWOCExf0tkP7Belz%2FUB4kqRAC5eWk6keE%2BmP591FXaguKLOIgAe7dK32FJLpDP00doCeFOnXX5fddNqnAIm9eyGfdwRYpXqRXfvfSnRTKIjecA37zK7ulJVLsxJuELkeVq1z743HZwETZs85Uhr4aRLx74E9bGKNYtqbeAuX7OXAzoh5xuO7Chh7zjjR9Bd1obiv2YXKMW79Crx5QdxKjfQnUHVQ%2BPy6fW1ypLyJtxTAVyvnJVkeUpSf1IL1CcTd9dc08BrdYyMKSTss0GOqUBA1aQCXIueSNs28OzQtp8IqfF9fKzBFtN8mFWvF%2FPhVthMILPivKDOX7p3mtzyjNhWKwbz1ZkrYTfuGYWyyjIuE5dfIZOFGN1Gc297ApwVRla%2FdqOqjgXZXVK%2FJymCNXaeEHJVMr7f70k9XIE1Flno2HsVmCXar8ffFw7DrO%2F7CjQH2gPUUe5VXkntS5X3mFgGmr20KvoKeko5f%2BG26%2FyDIFjQW94&X-Amz-Signature=b9571393fb3215aa59640311556d1ccc3ffeb811ce4de0282e21ee82ad044f48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HN4IMRF%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCIHXJAyjd9zFf8OJsh6ufUv5fPbQoY9fO9lwUywlkq7jvAiBNu6mKfXzGIOK9vmCCFmdgWBN1bz8Fi8bVMgiW1q5VRCr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMO3X2LLMHhSFaFxsaKtwDeFP2wdHwpyUM2JHWC%2BKhbSiMmPcQlfmjK3iK9o5ByU%2FxZu9EviK1KV9ytnW1WkpKRMNAE5NDETXPND8%2BIs1ZxTEkE9rVY8CYAfHo0nXt6p4Y6kFC8RZl5i9NU%2BM9qBgxJx3hjXOdT6pejjoU4Pt%2BTJ4fSldXxFve0J%2Fc4B%2BPjvVG5Z0gIdOViPpjNbGG6BRCTLFxCNQOE2DmKBpr0L4KRheep0CGPO5jE2SMjzwpWr7BTEVGe2vEyy6oHKQOTwO0GmObNE5HaNANJaT2ZrtDSUsPY3as6ryyaG%2BkvBsbf074LJJ5ytllAYP5rosue0krHcKigqVKWaSg5aUPztPkp4SFf7g87VMRtx6YRk%2ByaHtEx71qCBJWTAUxoI9QJIfuxz64VBmuGGx3laPwVfgdc4CO5f3CS69zIkqfZtvI2ealiLRrG6vzEsBQF3TcR%2FFo9MBl5kqYe31%2F%2F6IlEFBqqwIJdQMk4dv%2Fb3ChNPCWy%2FNInCOtu6H3QRPKvmdhEZCYbxbqu6bsFrcptFdelrEuxOqvfx1MUTKDqYL6Ey%2FDYHYD%2FQPMrD2ogqlrvCKmxZjdIOnKmedvDTNSGbnIGUtGyzGpK5UrJP6otWTZsE0AiIw9dn1UfTBOiYjSw0Ewk5OyzQY6pgGT%2BM%2FclAbG5uW1l4t%2BltIDXIdP9KdZ5NmzVLyvAkk5LNgiFIiovbu%2BfFh7zZ5ddho9H2AxlNFZmIv%2BT3Pr%2BWp6xyAXLAKc2AiLpoTsMpzX%2Boj%2F%2BSUtJF8ci%2BBxnyyH3gNqEOJ1TZLnb54o2HBprW0WBTd1KS3TrDtJolvtWCwXeAKP3%2Fe6eXHICyNq8ts8WdU0fauk5jCJ8mZdF8yeSKaXgfcjWr4C&X-Amz-Signature=3dd79cce2a51c4315b813dcbc6a840bb90095201601ef2ea7ce00d96fde7c2c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TP6RMZE4%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQDZtw5Vnwc9bCgfDuSy7DNKoufIfL2YPlUoWeqhg1ZUnAIhAPVwmFY8hjA2Y%2BCCFBC%2F4WsGmmOu%2BGa0WxAxxub3s%2BavKv8DCAYQABoMNjM3NDIzMTgzODA1IgwQvGrgzOiBQgX0IjMq3AOVkuiGq9D87Bi%2BEuQO154mnL0VgrGvUjbnasCVCvTZTVJSZjFFJnkBM%2F86XAc8UmndKZRdaHAXWUwCscIDJ5DrpoKUfiQJGNmzLBlTZDSFFeV3Sxij96pB9LylZB06gvuYlRYjIhWtbaqleQXebiRIRrI6GSzppzTic7I5yZnILeJJFW%2BIyO4q0F8ExYFGAJCfB0jYj3%2BgarSHFHkSqIUeZgdAV9yd1xm4vLqGWX6F2OPQmjiCIJEneXjc3N%2BhG2MB3C%2FtuStB0bylPy%2FnaoffVurj5IwR67GFktCYUqa3LWc4ytvU9uhsbNZptMaAw6tEOjGPWiZ%2BpoOgjXPB1wD%2Fw%2F8tnvzstJFNayh4fIiVUenK%2FCO%2BEgezgynuwAiQRkcbJkZAZbwyPDsOKelgjPGG7YAVKV7ZmvjSoxFUSbXwifRqAJu04OGggM%2BjEJ21kxb4xK%2BLGLCsRemDuAYkg6DfJcYPHXjlU7XhH3xg9Fz%2Bgt5mcJFPlwxbin6y0friXDnebKfWw6WGZTyvTyGt4JFzvCF3PVyFen3hlx2GXS%2FfzLdmDclla0SS8zyvCabDBz8olZzx0j%2BQlms4hLXQdTgPZIxzoTgPzZeRvzDQFr2HplgHHvJpVqBb7bvmgTDlkrLNBjqkAeJsffCVI1Eaxt4%2BpqScWDaB%2BTYZOBgIrzz21JRvkJgbuO4vFi3gHJTLxqHNWk3qimwLzcmhW0ku8yRA9vGw1EzS55g0ZJbbSoljixw0crffGb3m1nJ95oDfInpsCOLOQx9VMO0pdQ8OQ9%2F6hLBh%2FfHDz0FAbnOyv1OAMSa%2FH0QrS9km0elafvc57T98wpBHlooB8hSatfuQ1X2xrKbFlw8MMoEw&X-Amz-Signature=d75e36e10cf47d82929717d660a0dddbf835c0fa5cbd02ff17d08017fac040d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667B5QMORI%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCICijAAQn2c%2ByafCXm2BJ6OTMuTQGt4pzLSWR0IaiyZ3RAiEA%2FIUINtRUNSjBaeTsoVZsigE7SoBJ%2FRtnHQEo4wOLurEq%2FwMIBRAAGgw2Mzc0MjMxODM4MDUiDLvBtMty%2Ff5N8wZreircAwiuTo8LfE79Xxo10yYODy0ZpFKILcw69DKXA8R9PUfziSwgpSmvaViNRR35xlhQ2mQ4HtS%2BpQo74kE3rG4KdM5ADBcQmmvyPK9LsPj5DyMqa9TsSamOggGPBvHvvMnsNr2VT4mlWq4d49r1FO%2FzO1Csh%2FnTU5Ed%2ByN3J8wDElsRFmBFZgIpt5mMU%2FygWLs%2BtRYfh7x%2FW5FAq%2FNTUwBIfostb63FlQN9P9d6Nu%2FpBlUVuNR%2Bey4i32vOQK7EMtrcgU1GGZE8WTHwTlQ8UZaCxiV9ihGvcC561WKMm9uyA0zCThnqZLxr7IY9YFg6IZH4aXHOQDOU2Oj3MAoTQfGGdwWE3MClkW22YovclADHZy%2FJkvVUQbbN3QoTb1QSWcdkihZocxzbLANl1jQixVvEdfWbe68FP8xoJn%2FC7qH%2Blepkqnt4YlGqOVZYMj7fsq7dbW68uBoPuVD4YhPgYVuaQhZZz0C%2FbRYn6tTF7OTqh6iqTjRYR1NrAjd%2F8iSRAlHutvrcbuuZxb9GD1393e8jlkPVYDCZjc3lV5B7ai6weKIuzlXB4LynecC1KzThJkqVuTnQtSncfe7E%2FDHoXG8UjxwBtwQ%2BlKGdzLGBxFLbGu9HdR%2FWn02rRiozqo5HMNCSss0GOqUBPutMKCbXKUw3NbS2p0oj%2FYrj9%2F6FUUZa4ukfu6yRxQdjWyrtEzGTtX3GbJ0TB7Mgq7FjIP3Rtj04QrKHhevq5Il7aW52QY9hqGkdsNgComv0KfHlsg3JWtiZydN23qXxe3ZrznZAya%2B%2B%2BBubiXnxSK8i4xmegx4oj9t6XB%2Fgx4FyChJ01JYembrrhinSsi5FeoEzdZbEkFWAeYtE20%2Be%2BuHaV2Ao&X-Amz-Signature=efc5baa3f9d57f3f7503d4f5e75a388762c625366df19a4c0b80b6cefebea69c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVPTWLA4%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCIHbnmiTHvUtsfKltWV%2Ba5zIVsA8e7J6jCwvz4DVHV2TiAiBm2FWYDSCjuiMbHnnMu%2FYwbdQRWJGCrzMoeHvSidqFiSr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMguU8IauDjf08If5aKtwDRlIqXCBMEqDpI1ueETyaF8ef66RwEEzVDihxMcgkgEftxGza%2BFPIFmGq4vgtRJM7ev4ju943f5asHaikBrPZoL2lK5g3OKbIQUvb3RfnewDeZ2wNrU1bV%2B1XNVu64dkKYIAIvYyzdYE9%2FNGQF%2Bdsce5Zo2FcW0AXiPBLbmQ2gShNzkP2Sx6ay9A%2BWQ%2FkibKtwaJB%2F%2FJ5en%2Fw%2FGtwFZ7lbzFSSMrtBPTgjbfJmbKOeL8lnxm9ShO74o75RQlHNKvMYJjtElSmVYCmmF%2F5ON9UcqkB6ar3P%2BuRZluqHXAaEc82X2zGMa99pah7tQV1W3NTpOFLskpRXkIBJ5wp%2F7ZDj7vPwugAIu9xUOQW1abuDAc0HeAMcjRdlbB7UUykhy1MAeaDG9cI776yh8yBqpg4VEeSQDX%2FglQMQZWO%2BKI%2BcnYwkSRXy5HBV2KP18GdZAstoDCg33NSwbKK%2FWqnxX7SHxIbHebDuqJi3XnahP%2FcYrZHPUUiqVTlbjsvwNeCbH7mIk2hyKSxAQZRhFLZRkiRNcwZZN%2BbXdRy0u2DGGk2uqHVYKRdkzkJyJEw9P1GwktbYziPpjQLQN5bvfzR7qnRM9IYPg0XcY06pjfwqvsyjqjzdUNZrIeG4w6yPb4w6ZOyzQY6pgEPo3VzbuLeaa5Tpby612VbtnupArXN8SY8jn2vxEtqJvKvoIN1GfwCORwFzTS7bNGvQoq2O47S3nxW1FV4QsgL0EHRCvazN5cny5H0F32ndHYfbude%2FvgYowDhvIh9LPTt4Ae2wc8fh2h7fYXJqnW5lfoFr8MolIWgh9L5Pu5QNQxq2CP5m70gkpwbnm6rR5xzpG8Cx3sdH0PR1mstnb%2BOV1ihP%2FgP&X-Amz-Signature=3d46ee15ebd8d71cd5d32ac46ced5ed1a5d55750759d08f8f9ec199a20d4c66b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVPTWLA4%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCIHbnmiTHvUtsfKltWV%2Ba5zIVsA8e7J6jCwvz4DVHV2TiAiBm2FWYDSCjuiMbHnnMu%2FYwbdQRWJGCrzMoeHvSidqFiSr%2FAwgFEAAaDDYzNzQyMzE4MzgwNSIMguU8IauDjf08If5aKtwDRlIqXCBMEqDpI1ueETyaF8ef66RwEEzVDihxMcgkgEftxGza%2BFPIFmGq4vgtRJM7ev4ju943f5asHaikBrPZoL2lK5g3OKbIQUvb3RfnewDeZ2wNrU1bV%2B1XNVu64dkKYIAIvYyzdYE9%2FNGQF%2Bdsce5Zo2FcW0AXiPBLbmQ2gShNzkP2Sx6ay9A%2BWQ%2FkibKtwaJB%2F%2FJ5en%2Fw%2FGtwFZ7lbzFSSMrtBPTgjbfJmbKOeL8lnxm9ShO74o75RQlHNKvMYJjtElSmVYCmmF%2F5ON9UcqkB6ar3P%2BuRZluqHXAaEc82X2zGMa99pah7tQV1W3NTpOFLskpRXkIBJ5wp%2F7ZDj7vPwugAIu9xUOQW1abuDAc0HeAMcjRdlbB7UUykhy1MAeaDG9cI776yh8yBqpg4VEeSQDX%2FglQMQZWO%2BKI%2BcnYwkSRXy5HBV2KP18GdZAstoDCg33NSwbKK%2FWqnxX7SHxIbHebDuqJi3XnahP%2FcYrZHPUUiqVTlbjsvwNeCbH7mIk2hyKSxAQZRhFLZRkiRNcwZZN%2BbXdRy0u2DGGk2uqHVYKRdkzkJyJEw9P1GwktbYziPpjQLQN5bvfzR7qnRM9IYPg0XcY06pjfwqvsyjqjzdUNZrIeG4w6yPb4w6ZOyzQY6pgEPo3VzbuLeaa5Tpby612VbtnupArXN8SY8jn2vxEtqJvKvoIN1GfwCORwFzTS7bNGvQoq2O47S3nxW1FV4QsgL0EHRCvazN5cny5H0F32ndHYfbude%2FvgYowDhvIh9LPTt4Ae2wc8fh2h7fYXJqnW5lfoFr8MolIWgh9L5Pu5QNQxq2CP5m70gkpwbnm6rR5xzpG8Cx3sdH0PR1mstnb%2BOV1ihP%2FgP&X-Amz-Signature=aba490b4bd22379a9818c68c0a99034ae23a2ad6dd8c99b699f940b3a2031395&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MHOYL7C%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQCxcVk43761i3qlaH6yp32W03LRG9yXsyQ5FWBHJ9QSsgIhAKKDei4EcrtbOgc5KDDGapgxkGcQLTThHWufrwsjQmuoKv8DCAYQABoMNjM3NDIzMTgzODA1Igy5GJ9kcHCD0NMEMhUq3ANm8qIXD0UMCwO3qp%2Fx09vm53WFkhkWiOButJvwBaJDoqQ3ORkPyrSSU3sS4zonpcK0b1uOoOjrp26dNppBT1MGmxfB1pf%2BPXQVVdNspARg7Q11yz8JVgMlc3hxH2uaGZTMBaIp6HaUWkG386Bx2Z%2BsMYr8YosZR5KotJH6lXSS9v747%2F5tZf3SEhluglHQF6fBpUYaOh1544XQjCYI1T40GPPqz%2BbwyylesKgb52ajfSkjR0Z0Ljr0T%2Fl6md6VKdrrtsiaGtsx2QuHYXNKSQeM8CH3hGvE8ZhwJbHiy13CW4bbt0A%2F%2BWb3o49OtXG4sWDJZRI5vCz0GakZGhatTlOxZCWy1L5bvN17QMHK6af%2BOUMMJ7CrhAAJSHLUCt7TUwk67PKqFBZ8mFEdQqR0mztqXFr7IgRzesXg3n4tRtUkJAs5NUOAEc8i2VrruQhoQIgzERJsF5xZMUqZJLs%2FbAky0%2BS1DLrHoa9IixTjRdfXT3xJD3afmqwTQIu1GWZv0TTbYD%2BYq5%2B1%2BgPkEaQP%2Bcw%2Fenyb6IdhYpMuQSig8imae%2BKENdituiCRDFg4jLrtxKX0UTVViFbG3oY9V0RRbk3c%2BY8WKg7R%2BPlsiHUUEJDsOWhEktK9To0aCPEiyDDvkrLNBjqkAaZvQJlLjF7ICva3WXUbCKBQnBFaSwuL%2FKzT76k2i29vdF9NWMr9GZQzqxbBoAoUzvcFML6DP8t1Dw0vnOPPd3aJlgOhdQ%2FXa4VGZTv0lIdV3CacLVR10bvn2s40QsS7gWvlx1ggY5rYd2A9gmkIBRM9IOtzhAkUsLQ6PZVMJ%2BXEoCJIhEgY2JvMLQtpGxVNrThSfM9xcnO87YHV8GWURue%2FYdpl&X-Amz-Signature=e0e15ff673f6278f82c6623e9d2253490cb5e624d76e126ee0c5252c9678a827&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666LO73Z7%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIBArUZZx%2BnpcKqlqSqCyRZfz%2FrIuVNO%2FG7pk3Ps%2BTBc7AiEAvRiGeCRpg5zWIAwvrki4NeUycJvY6tBZ78fziH7C%2FvQq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDN78n8laTFQKrlwseCrcA9ZEILbkdoILHxxPl3xp6DGHmg6lHQRGWErMC1d%2FTyq2T3pdAtxrxX6x7wI5vr3EKLiVD%2B6Y7YT02p1AFWi6YthXh1rZajX0%2FR46gJHABprVoy%2F5bK4VU8IcIh7sLlNMKbxFZMdsxMtTxTlolN7nH8FZdrf7quBjg5XvFA7bT%2FjItn0FAqfHRCUuRaPf0%2FhqpliIL2sDHuiKqgjqtNYEpykSLhROfWZTL8lmB7BkguMHHKAFGrPhpgDcB65UqEHI0qBHiN3%2BIBvFdmkUDRur%2BsCp4yReUBvG3aalkoYPdViaQ3Nc9EC%2FOHjNS7HPF%2BETCC2bIctax6m1wLWFzl65ZHLYC8Mzvt1k9yk%2Bgxmq%2FHCDinRTmwfYPQ3UVO9wWzIyQXukWZBLHHkYoXUYWrUdfAmrKcZE534VnJn0XI761ETP1Mz1c2eHegb%2BPHh52mM3eves%2B3s5x4RS54JdOD3NbrOwKsxO5fCJKsIUO90T3o17iD2uVI2SxSUNUDTfBfmNLZc4bGCv3LI8KwWeKJjW60pLxd0W1VOH9wV0S1cobmVKHhC75RqLyNqkXhOXTM9pLn1w%2F9v0SQWF2XbRYYlCspqLHV9hpYsgmLMI2YmZzV%2B0wBd%2BwZ7oG9bu9OJvMOuTss0GOqUBuwJqea76HMxm9n6XLM%2BCgKeKnHXvSmfU7PmVny7hySiaYwKzQdYIcNX4uyrmtROEV0CwuGVR%2FtU60nnI8Q5CAIjdtD8uUIo7dm6bggq7HuvsYEZ7DUzTn9Wu1dr0GIFsYS1iFK9TdnI%2FXV6ajF%2BYQY6OHsoaKDtrm2CImCtIPzz4z%2B6RVvugUSx15VdQKZBaiBJDubJO7IwfS8Me%2FJSaDXvzIcFM&X-Amz-Signature=d5ce792c1847ee66a3862736e3bbd9fd542a2bd65e0791fd03a4295498f5488f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666LO73Z7%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIBArUZZx%2BnpcKqlqSqCyRZfz%2FrIuVNO%2FG7pk3Ps%2BTBc7AiEAvRiGeCRpg5zWIAwvrki4NeUycJvY6tBZ78fziH7C%2FvQq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDN78n8laTFQKrlwseCrcA9ZEILbkdoILHxxPl3xp6DGHmg6lHQRGWErMC1d%2FTyq2T3pdAtxrxX6x7wI5vr3EKLiVD%2B6Y7YT02p1AFWi6YthXh1rZajX0%2FR46gJHABprVoy%2F5bK4VU8IcIh7sLlNMKbxFZMdsxMtTxTlolN7nH8FZdrf7quBjg5XvFA7bT%2FjItn0FAqfHRCUuRaPf0%2FhqpliIL2sDHuiKqgjqtNYEpykSLhROfWZTL8lmB7BkguMHHKAFGrPhpgDcB65UqEHI0qBHiN3%2BIBvFdmkUDRur%2BsCp4yReUBvG3aalkoYPdViaQ3Nc9EC%2FOHjNS7HPF%2BETCC2bIctax6m1wLWFzl65ZHLYC8Mzvt1k9yk%2Bgxmq%2FHCDinRTmwfYPQ3UVO9wWzIyQXukWZBLHHkYoXUYWrUdfAmrKcZE534VnJn0XI761ETP1Mz1c2eHegb%2BPHh52mM3eves%2B3s5x4RS54JdOD3NbrOwKsxO5fCJKsIUO90T3o17iD2uVI2SxSUNUDTfBfmNLZc4bGCv3LI8KwWeKJjW60pLxd0W1VOH9wV0S1cobmVKHhC75RqLyNqkXhOXTM9pLn1w%2F9v0SQWF2XbRYYlCspqLHV9hpYsgmLMI2YmZzV%2B0wBd%2BwZ7oG9bu9OJvMOuTss0GOqUBuwJqea76HMxm9n6XLM%2BCgKeKnHXvSmfU7PmVny7hySiaYwKzQdYIcNX4uyrmtROEV0CwuGVR%2FtU60nnI8Q5CAIjdtD8uUIo7dm6bggq7HuvsYEZ7DUzTn9Wu1dr0GIFsYS1iFK9TdnI%2FXV6ajF%2BYQY6OHsoaKDtrm2CImCtIPzz4z%2B6RVvugUSx15VdQKZBaiBJDubJO7IwfS8Me%2FJSaDXvzIcFM&X-Amz-Signature=d5ce792c1847ee66a3862736e3bbd9fd542a2bd65e0791fd03a4295498f5488f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UN52LYVE%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T210928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCIDSdjFoiTRDrXRNELUIfQirpCUvn9nLWAdRIv%2Bz6Kh%2BqAiAufZTNHx0F9MjO05TTGTKN2fDpdEM3ydGqmQ7lqGTOSCr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMKOOlbmCeVd8bom6wKtwDwweQZJr4p6VNMP8zwAO7ZrUlXHSUtpsp9KmtfL%2F%2BIz7MCSpRMugKqRcFvSXyB7aqdpukVjo9fIRCf%2FxNgdnpT4NNhJH1VkHwCUzmNI1ieZkhvBoV%2B4A%2BlHRXTgIT3QDGw01jsZwgkWT0OLGrirkaF7NN8QdNeulc11Yr1o0rYESZjaKLzohMF%2BlrH4Y9ypDVl%2BWLAzxkAtz%2Bxsxae1ln7NVoxdHEG6EtoK8%2BwXoTVfJoHTxyE6zJVOz8%2F8R1s1HLEROGbWCCtn%2BvBXZ2%2BaaNSOUMtUZ1nA7oUzpJjNQYBuzbzordqNNVV9O5bOj4PiikMG8q5FM1Y4oIRWtxLSFFIfprZYIYnheCYwCegrbIu0Ks1PQjoKQ8CaC7bgaKKnpY6WCpSh98qdS5qPeLvblWBPt9HIzVQKWgnaeGcJVcjtMAUryrx99NBQjp0AH0uMknUc0UktCXaynlTnKGaCiXt4fBRpgmkDVz2ACRolXYHV4VNs80kIi2WMYUhdTyWxyjVx8bKYM9iruJX%2Ba2DDgWp6uyv72v7DaF9KLvmPbfmVUl6T%2BFeJ72iLFSZ5lGqgTQQLRSP2be1mcRfhopxUnH9grxHUupE6tu8YQ0CnPwHy3b0BtA8iHgG8Ss9R4w6ZOyzQY6pgH6bIcimuzfQyI5RfbzMCuYq%2Be4KSnrqly4ljqCpDHG6aJjr6S9d7PONUag%2FtngHITogpv63ZNYAV5uokOdmKU2Z3gVdvoFOIW2%2FoZUP8zo6uFYDrlgGzRyL25LTENkr4JzZH471I2RqiapkF9OmfTGKPeno2F3hdevvkFXSH%2BnYhpCctJGnfM%2BUXLZ36F5hK7CJRbACdLIdKHXz3PiJotIc%2FmaRbVO&X-Amz-Signature=4ce8d1f47e105bac40c2dc268aae5cf9fd895dc3b4e6021f55de3fe115197d6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

