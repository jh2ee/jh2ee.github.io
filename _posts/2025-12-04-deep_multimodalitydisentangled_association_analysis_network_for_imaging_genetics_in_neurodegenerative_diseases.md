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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IAGFPN4%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCrPHYCpNT2uFYWoEp%2BkH9dSZ4tmqUYCizxe6%2BLsepJMwIgcpgoEGQ7eqTgCBPPAIlrKrGrQmyTLP%2BXGCoNVVsJxP0q%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDPK75AAckB9JT9oINSrcA4VzZmIyZzlBYVE42USOvP2HuME9dazIJQY00wZmme0EVV2A39lsCh0pcnlr7X9rhQ57%2F3xcp8NcqUMuPCBwyRRyvmuYa6YVyzd%2B%2Fi8PEFXUKGH5gUrus%2B8YfVwvdzLEm8dm70wA9CTlQuCDOOxaHN%2FTtQxQVIFvaGPH6GEhvvdTmCEZ56bcNe5Ji24c54Nd8lkjXOkcRUWWAuIHLluzHwgk0SblbD3F%2F3TjLWnj67R5VfBoraOi7eu1x%2FrmjtxtPSKRRxt5gKQDAZucKSsRwpDUHDHqILxcP8tsFnjoDP5e8soNsp9t9SYWVYQM%2FoxW8q2ygJPeEpMHPSvUF5Rpe%2BmSqxYehwoDx2%2Bb91HsTz1XXpuaSQSQhtmdKP5MDrYjiWNziH3%2FJCyiPI8%2BVzEWYPNgoKPrhYAo5uRvaV0r0LiCOk%2Fqa5sQiRJ1ZcCXS%2BSbgvhcRFywxnaP3KZ%2FUviW6%2B1DGOWDSaUn%2BVRe2rbcCpjwvhrS0NWm3NNrZLQWGwF85JM8GEtUFTXtMmVW9SEo%2BTMjgHBxKY%2FUDASdIhISuIHWoDGEc5kQHfd5MD4gVV%2Bwfn4EUo7TnuiV4EKOVfD46eWa7Nf%2BkvQlKaC2Gy%2B104RHELiSUtKQM7nDuq4bMOOsn8sGOqUBHEtcjdqGo0t4zsKwaBFnMnPvAYltTV4eAz1kUWjghkFCeZ55FvyeYBiOxsd6rUjAFl%2BpQ9iajQU%2FMRnsXHf%2FL5u4oPPsxhGzW6YX29w%2B8C%2BxDuSt6YWQ4xKPEFadAU%2BNhDu22OOsv%2FfqdQycJ7V0I8HnuT8TIMB4YKKk65u4FwUQqzj6LIZ4GD6n%2F7XfdpmPR699IIsCVDsNEjJy12ABFyZKFwIP&X-Amz-Signature=448e6898055035cb7b90c0463f5c7f554d5a8dde7cbd656b439d962bbfa6671e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IAGFPN4%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCrPHYCpNT2uFYWoEp%2BkH9dSZ4tmqUYCizxe6%2BLsepJMwIgcpgoEGQ7eqTgCBPPAIlrKrGrQmyTLP%2BXGCoNVVsJxP0q%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDPK75AAckB9JT9oINSrcA4VzZmIyZzlBYVE42USOvP2HuME9dazIJQY00wZmme0EVV2A39lsCh0pcnlr7X9rhQ57%2F3xcp8NcqUMuPCBwyRRyvmuYa6YVyzd%2B%2Fi8PEFXUKGH5gUrus%2B8YfVwvdzLEm8dm70wA9CTlQuCDOOxaHN%2FTtQxQVIFvaGPH6GEhvvdTmCEZ56bcNe5Ji24c54Nd8lkjXOkcRUWWAuIHLluzHwgk0SblbD3F%2F3TjLWnj67R5VfBoraOi7eu1x%2FrmjtxtPSKRRxt5gKQDAZucKSsRwpDUHDHqILxcP8tsFnjoDP5e8soNsp9t9SYWVYQM%2FoxW8q2ygJPeEpMHPSvUF5Rpe%2BmSqxYehwoDx2%2Bb91HsTz1XXpuaSQSQhtmdKP5MDrYjiWNziH3%2FJCyiPI8%2BVzEWYPNgoKPrhYAo5uRvaV0r0LiCOk%2Fqa5sQiRJ1ZcCXS%2BSbgvhcRFywxnaP3KZ%2FUviW6%2B1DGOWDSaUn%2BVRe2rbcCpjwvhrS0NWm3NNrZLQWGwF85JM8GEtUFTXtMmVW9SEo%2BTMjgHBxKY%2FUDASdIhISuIHWoDGEc5kQHfd5MD4gVV%2Bwfn4EUo7TnuiV4EKOVfD46eWa7Nf%2BkvQlKaC2Gy%2B104RHELiSUtKQM7nDuq4bMOOsn8sGOqUBHEtcjdqGo0t4zsKwaBFnMnPvAYltTV4eAz1kUWjghkFCeZ55FvyeYBiOxsd6rUjAFl%2BpQ9iajQU%2FMRnsXHf%2FL5u4oPPsxhGzW6YX29w%2B8C%2BxDuSt6YWQ4xKPEFadAU%2BNhDu22OOsv%2FfqdQycJ7V0I8HnuT8TIMB4YKKk65u4FwUQqzj6LIZ4GD6n%2F7XfdpmPR699IIsCVDsNEjJy12ABFyZKFwIP&X-Amz-Signature=448e6898055035cb7b90c0463f5c7f554d5a8dde7cbd656b439d962bbfa6671e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YO5ZDGBB%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCwKX05GfHrPbvUZvenkqp1CzoXcqaNOwQ9e1G5nS1cSAIhAITtr0%2F3w8Bza%2FSLdzjV7ZCzrQXUcFEb2Aa64Y6NvKg8Kv8DCCMQABoMNjM3NDIzMTgzODA1Igx6PGDsPLEjYbVDoKAq3AMgwn7axLvLV22M%2FKYV3%2FPsa0PNUHw%2BDGxzF06u7QOhJ7sGhJ9Eg0oey%2Bdj7%2FSwBiWQNRMIigtOXiDpJZOtawpFzJDnUBGy%2F3K%2BY%2BjFj%2FZ4AR5mOKgayj1JSvuZgtIYgtS74hDSwqeTLDWYn5VQVeDrS8pa0yn0Dewez%2BSzvJJ8t6gndldhgMaQCrxifxYcLLpnCl9KskQD3zDzMZPRhfIk%2BZDuNAUy%2FKi3UdT0TV%2Fe%2FOVMPc%2BX9MLMSSHLrHZeK0HkV1FK3gOsTOAyejIb6QrMzmliGINbhBdH0utrApFXxma9kpuVSyBzv606hfdJnWsnASMp4X8V8BdFkumI%2BDnCqv1QmW%2Fp%2BfPKBMA%2BpNEqM7fSCaQHfW40hwbW%2Bburd04f73pgvVlrZfQ6x3bg2p0yKbhL%2BjPOrn6pBQMQ8fRCreWyHfxUa91Otrbo9N9zY5Tgyk39fOgDXBRZooIOOgmxgLWCSv8Hpddg4u5ARup6tb0zO%2F1WKUthKc8u7GOiW%2BPm4q5NjphePl5fZxaTrbE92lMk%2F2x%2B2C5fxwnDwRvjSwzyUYngyyEi51%2BiCx1VVuTNE62awAm7Mbn1RpDz0VvLRYutJatJpJH%2BbPAIAuRHDERqhF35gPGf89ldyTCjqp%2FLBjqkAb5BwOTNM%2FEyZ7iLuKQ694RgAc%2FSgWEgvf7nNlSHmH2Xw8C7zkQgpk%2FVKcXpAuSz9CsJiImYoxfbdriZAWpurW2ZQ5i0MQYwoa%2Fqp0IPv6dq8fpxHevOClD0IDv9Umlvr8UfOrGjKlHKSP0tFJXzdrmRUxnlV8Qq12k%2BcFj37oq%2FNQ%2F1slbbJy6CCLMW723IEaC1dSk%2BFcFndRg1N48sNjj28vvJ&X-Amz-Signature=0e69ab1392ee249ad841ee597edde695b1af7b746d789010b497e7ba37c3611a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THF27AS7%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIHgBgnO8EtFtkOii%2FTDmZt9lN%2B5Bxk4DGSL564lMpo9yAiAxKFNWZk6MDzl37p%2Fd%2FlJJAjD8c0ztYLaoilYIChJ1Pir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMCpB6pFLEJaHWCcspKtwD4pq3X2WCuDYAMncRB6uq4a2tl%2BlaRu1I%2BiFMK8%2BBvGH%2FSCmORqXOHNnJbNf19cn7TDsukBASvzHLBkCtkM7bKdc647gQHgDsIWvw9qmY5cDWU%2FVlb74RaoQpsOyw7OINSbc2fsHoVBwlJN9xZEBgfegSBh0IbpEDmDNf6Oms1a83s%2F%2BebaeKQ5hChgKAPCP%2BQ4%2Bt%2FGHhAdk2FvseNaA3nQdAg2v%2BG1UAq%2FcOke%2FDPkXkazCr7jG6sw6rUNr1dF9aEsUgu5e7OE5sljjBQ%2BkzFs2REim7QsSwV9ZQh%2FQDnS2gOYx95h8jrYgdFTxRI5ZthVv%2FQttoDkDRi14vGpUROL%2BlQ0KAIg%2BCKxkWkGl%2B0fA6LsI47Q3JXmBmokDXuDHyJckoPbRtFp9QX10rBhwpeq12QedRmX31hwBC8%2BOwEsG3xSfT2Ks3urqY1za0CMVSgAx2gECQa5ButsU0oFqSMdl7ZR81fksACG5eU7M%2Fapl0MbRaj16Mo12sSyzyb9iCgvKSE0fPdJCPLzPhlCFAT8YdaELll3mmRMoOezM2zxS8HJHbrn6ONqFNrBB%2FPMSWRStD2qWJoeGyGMGvzWhIRFdN3H7XYeSkHfUOL1BdeMivvro7D%2FAyTHenid8w%2F7WfywY6pgE9hsa%2BopFItVlNXVQPlVaCWv16ABBr83UoxLZ02PHCqqJSWFFbm1ZACoK4dDshKhCtsDVx3SSJ7ufVWqc%2BbxpaxVU36k2HCJk7xQlYMLSzrrNRiI0KGCW5sMC5IT%2BvlzLcFEWjshvAGnbhNf9UIphfw16jcSx8L7WghAe1ao8jAS%2F%2F4SqwwI6J9ZQn5feohHtlZt86%2F%2BJ7fkcgM1wUsfCvlAsck4Lu&X-Amz-Signature=0eb6a3c3c88b69955b6e00b801d18fe51b475f69726411c29dfa6e22742bc1b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THF27AS7%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIHgBgnO8EtFtkOii%2FTDmZt9lN%2B5Bxk4DGSL564lMpo9yAiAxKFNWZk6MDzl37p%2Fd%2FlJJAjD8c0ztYLaoilYIChJ1Pir%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMCpB6pFLEJaHWCcspKtwD4pq3X2WCuDYAMncRB6uq4a2tl%2BlaRu1I%2BiFMK8%2BBvGH%2FSCmORqXOHNnJbNf19cn7TDsukBASvzHLBkCtkM7bKdc647gQHgDsIWvw9qmY5cDWU%2FVlb74RaoQpsOyw7OINSbc2fsHoVBwlJN9xZEBgfegSBh0IbpEDmDNf6Oms1a83s%2F%2BebaeKQ5hChgKAPCP%2BQ4%2Bt%2FGHhAdk2FvseNaA3nQdAg2v%2BG1UAq%2FcOke%2FDPkXkazCr7jG6sw6rUNr1dF9aEsUgu5e7OE5sljjBQ%2BkzFs2REim7QsSwV9ZQh%2FQDnS2gOYx95h8jrYgdFTxRI5ZthVv%2FQttoDkDRi14vGpUROL%2BlQ0KAIg%2BCKxkWkGl%2B0fA6LsI47Q3JXmBmokDXuDHyJckoPbRtFp9QX10rBhwpeq12QedRmX31hwBC8%2BOwEsG3xSfT2Ks3urqY1za0CMVSgAx2gECQa5ButsU0oFqSMdl7ZR81fksACG5eU7M%2Fapl0MbRaj16Mo12sSyzyb9iCgvKSE0fPdJCPLzPhlCFAT8YdaELll3mmRMoOezM2zxS8HJHbrn6ONqFNrBB%2FPMSWRStD2qWJoeGyGMGvzWhIRFdN3H7XYeSkHfUOL1BdeMivvro7D%2FAyTHenid8w%2F7WfywY6pgE9hsa%2BopFItVlNXVQPlVaCWv16ABBr83UoxLZ02PHCqqJSWFFbm1ZACoK4dDshKhCtsDVx3SSJ7ufVWqc%2BbxpaxVU36k2HCJk7xQlYMLSzrrNRiI0KGCW5sMC5IT%2BvlzLcFEWjshvAGnbhNf9UIphfw16jcSx8L7WghAe1ao8jAS%2F%2F4SqwwI6J9ZQn5feohHtlZt86%2F%2BJ7fkcgM1wUsfCvlAsck4Lu&X-Amz-Signature=b6d31568c9257198dc18cae008e4c9dae6b29e9d5fa840abca82732e1708336a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYVKCSQL%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQCrDmCNN7fn1ZmcLxD6B4w1s621wvAPgrgxjDUG0JGn4AIhAJhVqBAGmqh0zosMD0faltriL5qsEHyWXKvXEEuITyMXKv8DCCMQABoMNjM3NDIzMTgzODA1IgwRb%2BJO8UnIUav%2F9U0q3AMbeJhiiuY%2FyH2%2FIz7hmNWF29pEY%2FwgWFPH7gHpWyc%2Bg0Cpwf1wU529UE1XngQEal4jt3EnpEpb9WfuRd7tYkH8d4xIqmtU5NXnuRYF3Ci3MMxKJKgQqbTjc4maN4G8uD9AnIDA4YydCr2jSKx43RZutRtwV1CSVwp6qSubJgCXzLA1OpmP7UUt958snkXe0Tnx%2BmjdTunESimXw7sB026cV3GzPjPUIR%2BsPwmnKVINFimkKi9R8XgttgCUXrwcwp24uc9cYaOuCghFod7lJTt%2FNBVwSxFKkSTI%2BowV0%2Fkvo%2BRIWmIJTBdrnwIBS7TlssJu0L75Uypy5kQg%2FdUyPpCu%2Binh4hwpP9AnA3fLaoF3Tvus0pzRpvJ%2F0nYJc%2F33gTRzUo6U1c1t5j3j6GBHAropGSkfMAHCIzU%2BOAAurneyb9X5KOqzt8YMfevkvIZ%2F70nbnXh%2Ft5YSHymxzE%2F3iY2D1CFH0iavpR7Ks7NTKmuqU9kMrEqa64Ey3%2FE1ociR6NbfUseMuzx4eHl821rSFZxQvhSenNrEkTNAI2%2BWplM3dv1h1rJDqOwIQESxklW%2F5cwG2zjGDIFAiUQkzHB0z5AS33xjuMwbXIFSO985dO8zThq1ZhcEaWq6%2F5HA0TCTq5%2FLBjqkAYv%2BqybSLfdln8SaUJMDnanVk4e02AYxZ%2FYSI0LYLGTefR6KQcK0g3etM4WTAV35DJi43onhCZub3WeeZh%2BwJwe77LYhByOYscsB06YRqQmVK8jOZW2Bom2YyQhVbhctIqwKrw2jIpIron8Azbqdv8obFD40iCzoO7XmzwUgQkUZ5tbI095O0eMxtbephtoIzcBFvm7e7iAEvKBMerTHCv0rA%2F%2Fh&X-Amz-Signature=dc71558a85c9f95c23e9038ae397eb31cacf84894497cd6b4e7acb19fc42c31f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZWYI4EH4%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIAIv%2BTsMfyFH4qgIgtYMOmO706oD3rl28c%2BWRi2H2fh2AiBhufvkVBOkCoPrFCSW%2BH4t6KHcqkho3DQnXyXZIxvQCCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMneucswzRROYaW6RxKtwD20J7ESqgFK1CSWS%2FtSWW3byoX2jM5hl1BVMRhwg%2B7Ggu4YmuTPVSTxCa0w9eofFqpUmJ0ftyGcnp%2FyV5Bbd2wKK2bT8vrVVrbt2Hur3O3b5L8VCBDlqka9tzFif0CP0hOruziy7CNxJyEngfMKqcgdJ9R1izddro0NzRfXtJ51%2BZFlH%2FQaNB04OwJuokxxe%2B%2B%2B2ySG8dOeJcizFhXYP%2F%2BCZvlATuuEt0LPDafXICtkk1Kog8uR%2B8u%2B9RmJLtx50RhzE2JApUHcSF2kZ56G%2F8ZFOeUwcMnOIihqjacY6cNbKPd4fL9edpWW89s0xnctqEf94N1rF3rZdEBxTJKnFWH%2FnUtBS97jnuyGA4Jo2GWwzEBNviQEvzyBJZDp%2BSamg%2F0WPw4RguzCHSlXIuFB%2Bfnh45z9FE1BGp2pRE3Wi7gYMo7wtVXYcUAY8MpBL%2BRv7KR7vcM7XoVMQYDiImGPRGmDw9roUZg0sJMhsuvULKyTu6FknMVFZ%2FlYDkehZCtbDIB1jgl7iDxxSRi8GeIUGenHRL9VzMo6ZFBvEeZkfnh0jH00Jrsvh7re%2FCUjnIEcYBVmF9gV1x333cJxtugKSUYjvzvfRKKcPpgfMSioLFD6RrfRLPoPRR%2FwoBBJYwhK%2BfywY6pgF4BlJ8Ro3qatYwuYsNwDqajIL6AEzDrblkPCNoXqi2et0UosdZIJ6nAKT4oA2%2FNtVtz1bQWLN0HJh8s054CdfgbwOXFUQg5QFnVyR9cNOB8XOqghBS5uyQEr3wn2BbShTmqZN%2BGU1LxwA9V5rsub%2BaIFtuPNEMhY0%2FfypE9wdbqLojrp3EbQkBFNIPsxt6x%2BgScDPVRvwwMR3vBdOGPQ2qr24vqo2G&X-Amz-Signature=f909fcf54185131738db5fb949c5cf78a62563d4e68994a139997765ac0fae88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667NED2BR7%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIFAy%2B6G68KizOSgGZOTDwS20zE0Yd3WLyPdEFoDQ%2F0ZkAiBT29f3EMoj31Fu64iVT2H3YdBl%2BhWrFn86Jq6NjTvnKCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMesINTv4VBQD6Y%2F4JKtwDUKxl2TJa1fa5Ygrv3oQAp7JSz4FVGne6h781Fs264oh7cXNxe3rwZrhhgumNkpbAY9cH5E8Oysi6og2O9CtqYqH7rgztCgQsQgBR6FsOh5BZ6uaZitryxf9EFcT5kTxJ0sJpUnBRTBlbhEuUTyTGRw0EVb%2BiJqC9bCkLdYE0s%2BASEUgtf9FUupZHG2qFNrLOwfjn9llFgEkfQ42GORyQgjxEjxqMdYm2mClF65dK2Tvj5b294ju4JEwpQ2%2FEuwTg8czGsN5JGtwUZyUgGFmGu%2FQELtPt1iJDRl6E7%2FW6waJXZEr6Cc4mL4acKPkkUolqKDoHHjkck1z4e57gc8YJ%2FY%2FpCz9rugbImDJjstWj5gFTqGws53V6kMAUNXZK%2FPGt%2B6qndK5fzWzQuj1TezOolH%2BQg5vyauA0mxLrap3bX61F3QHRzsBwGl%2FlDG0hl1itaAKGaqI4mVqbpIC%2By6Ajx541PgggSDSkYK4hAlQolB%2Bxxa5HcKqDtYMRL5MVwmXs697rLpQw8tAEiDU7DXwmLJYQn2LmPVWTnvMhKhJEs4FCxSKCFA4%2FwbH9P2qNmMlTe37xKYrbZDtg%2FSLtgDo0QcaEgF45mhWOF0lHVAi3iQT2V4AIci8FjwHy5Wcw4ayfywY6pgGWpiq31J%2F5cn1e4SLxrK0wYXvhgP6V4V85TrIvaWdPhFeSBdNg713nZ0t9weKz8DgW6X9SA%2BV8qNqh387zXeR5qx0%2BmrrQa8Byl4%2FZ8XR8%2FaxGxHtkBbO9%2Fw32ATxb%2BQu2KpzPJY7GRMSzWGYn4W6o%2BT5FmS1KjWyLxgxjTBlFpdkuKGnPz46H95aj7Qm4t7TDhw9Fsq1Z9jHuXJez8XKjbJi4yOJx&X-Amz-Signature=5bb0e42f6882a6826823071af45b81a78a4f70bf8f0cea312c84353fb7db2a50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JXOCILJ%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCzsRrIuKPdAOy%2BTTn57XjWzmCNcxZZpXGI89hty9ssiAIgDgBoKibNBSEiYAytBsfn8nGp1HBHjjreSx4uHiD2cs8q%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDJm2ub8M8jGSSnLVACrcA%2BScwZKhyg18SgJMvP3XYgIGdHGY5%2F9xqYVNgCz4iPSePipRGKOJ1HN88iUAmGxWGNQzllFHqITZK0Tep7VZkaaub%2BD7Wo44QnSqCNIV3Yy9gZJE5ESFqfAU0WpqPTgiIN23gFVjAVIbZr5HPgMniJRFGFpWzCQg%2BiXgh9hiepO7GS8gU8csBvgz9O8wJOOOQB%2B8pjRp%2B2omcN3MHx3QKnCWQz4oBa6meMZXOfbvMz0H%2Blm%2Fh8xxGgk6JIOPuyrQX7rJoMieWtRXOltVoAFbCfJahR2%2BaZrkmZ6z2XqIHjB8C6ddswZHROCc20RVykmkJkF5uP67MZfA8aILz3n%2BngObVV%2FaJ%2BO5rsTyg9W78qQ82X8ZOu%2FTEVn%2FOY0%2Fmdi1PZYBwg0p2yC8QDSRTnbKaN1dT0ikLixUG7gUfMPxzMZIZnfe4xXjl5zpm%2BXkzfMXaJdyOyxmbr60ewITZGj5PovtQU81%2F4Xy8heCMFVlKdJyRw7dKdyaJ9SdXT6c3buDJbyMe440u1DxPoKgIusyumrOKBjpMcBu7h1oIvTGGNIT2SlhvKSDz%2BF994aPNKFx8EK5bzXay1qN%2BKNKOdlcBhvLXaWLxEwnS5mq0q41mx0JLCl5Ng4OfjzVzbejMIarn8sGOqUBni87dDldAjP0p%2B4PO6V8GX%2B%2BFEvkuE6jN%2FrYI%2BjRvXEgaJISGn5sPO%2FFacSbp6tcj5vpmugHsXKELVQCpSfm2m4x74la2CvwjumbDURCFGGjvRpC9W6%2Bl0CGoL82vpQKBr6bVV%2F1m9jDqE6rNeWUQJ8ZCwb1hc6d99RYCcJnL6RHZ%2F02U4VTcues1vMk%2BFILAdSR6MMA2req010oJiD31FlKLKto&X-Amz-Signature=71ea40aedbda882fc845636f088f21a49079ac506325e8bde8a64524451f6746&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JXOCILJ%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCzsRrIuKPdAOy%2BTTn57XjWzmCNcxZZpXGI89hty9ssiAIgDgBoKibNBSEiYAytBsfn8nGp1HBHjjreSx4uHiD2cs8q%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDJm2ub8M8jGSSnLVACrcA%2BScwZKhyg18SgJMvP3XYgIGdHGY5%2F9xqYVNgCz4iPSePipRGKOJ1HN88iUAmGxWGNQzllFHqITZK0Tep7VZkaaub%2BD7Wo44QnSqCNIV3Yy9gZJE5ESFqfAU0WpqPTgiIN23gFVjAVIbZr5HPgMniJRFGFpWzCQg%2BiXgh9hiepO7GS8gU8csBvgz9O8wJOOOQB%2B8pjRp%2B2omcN3MHx3QKnCWQz4oBa6meMZXOfbvMz0H%2Blm%2Fh8xxGgk6JIOPuyrQX7rJoMieWtRXOltVoAFbCfJahR2%2BaZrkmZ6z2XqIHjB8C6ddswZHROCc20RVykmkJkF5uP67MZfA8aILz3n%2BngObVV%2FaJ%2BO5rsTyg9W78qQ82X8ZOu%2FTEVn%2FOY0%2Fmdi1PZYBwg0p2yC8QDSRTnbKaN1dT0ikLixUG7gUfMPxzMZIZnfe4xXjl5zpm%2BXkzfMXaJdyOyxmbr60ewITZGj5PovtQU81%2F4Xy8heCMFVlKdJyRw7dKdyaJ9SdXT6c3buDJbyMe440u1DxPoKgIusyumrOKBjpMcBu7h1oIvTGGNIT2SlhvKSDz%2BF994aPNKFx8EK5bzXay1qN%2BKNKOdlcBhvLXaWLxEwnS5mq0q41mx0JLCl5Ng4OfjzVzbejMIarn8sGOqUBni87dDldAjP0p%2B4PO6V8GX%2B%2BFEvkuE6jN%2FrYI%2BjRvXEgaJISGn5sPO%2FFacSbp6tcj5vpmugHsXKELVQCpSfm2m4x74la2CvwjumbDURCFGGjvRpC9W6%2Bl0CGoL82vpQKBr6bVV%2F1m9jDqE6rNeWUQJ8ZCwb1hc6d99RYCcJnL6RHZ%2F02U4VTcues1vMk%2BFILAdSR6MMA2req010oJiD31FlKLKto&X-Amz-Signature=9e5cfd8872b1aa13ca045c209a95f8ff978991b6a3d83e475bf6c7c907253fac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNP6D4KL%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQD8Mi0pr6Pivsz9jOWFUaW408myvPf4IzQbPRRjgRhEawIgFSXnKT2srl%2BOftO7zF2mIoBlkullPF9LrH%2F8v7QrW8Aq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDIw8F%2BPe5D%2FNGlVlmircA9GEFjr5HO%2BqE3c%2B0ZKuj1t%2F%2FGPW5yF3ubC9ysy7WWalHDXfEjH8uOZ0MojEZ18l8f6lSlfztpelvibICAH7GwaZv2eqPw%2Blg1gLPF83ZToXE6I%2FiFt3yt1LnQHqxPkH3Qm00ppgfBaP2sD55pzwvG2CYAE9ky4QqzsT9RReUXaSNazXdnmvF3AkM2nEHQiU6bcgRYnO7MXhOEgF%2F%2FDQfMqVuRzECWj24KueSrFBfu7Run3h34Ucsk7Dar%2FGEJP0qMsT6Lo7HUatfMzqFHMGYTecJUN8OM%2FlVkg%2B2ljI7R%2BftUA0UWGrbl11xbZ9JaWTdIBpCR4UtfJBKxi85%2BPlPT5dv3AL4S6x3jJqWbyMovn1XrsA4xZvdFsn3LPrTO1%2BTuKMTusbTDisP5icauPKb2sAFh7b%2FsTrttFs89tuceU4YnzA1I6wJgtztTPZwUxX%2FgjAIWBHeDP0qTnJGYERpN7rB8iVgTIQr2ttN7yNV7duVZ2t9gXnwPHf7U02oCt07zu1qqpsYZwEetPc0CNAS3QcdmRLMRD0kUREVvxQGTG7L4M%2BZqOIjP02Cyhd4jd0er07eLDA26J%2FXMNTNfZRJ6cyhBYBY%2BNfuIOHd5IJeB%2FiCR9qf5KH9yKguQJ%2FMIirn8sGOqUB5MW8FpgR%2Fz%2FLBNPKgjPLDLefFWqk7zPGFHlCTLc1KWoin1t1EHzMUj%2FSxe%2BnFXAB5Ea7vVv3oYAqNAMOtRA3PuEH%2Fwq8kHeeDQ52GjVupAxEniAEKxrnS0YzuSPfHeZe%2F36kXYKrqlitB1ZwY4M2fXWfGxECjTaPFWsaHpw4inR%2FKRtjGIpLzNuvSKSqYh31UWcQv19XJLeiij2ZlsD2i2mdii9F&X-Amz-Signature=4b231b211f8d98148626c84df7bce668f8be928578686c5a82db407381703022&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MOUX3SG%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQClTfWrJpdKuLiprFxPRhDri98YXLv%2BJUqje1rdjyU6OgIhAJanYED8vNWwoQ8pFHMe8z5tbP5jgAVan%2FDAmJSu28kEKv8DCCMQABoMNjM3NDIzMTgzODA1IgzyNEUbzSR0D2oZKysq3AOWQf4daZIQsYJKAYDlYB5DVKj8btUAc54DqnmDHyn6uFWwIveU%2BdI0e8JAFjTO68BjBOf9xuaEYkjYDOCIcV3hNm2Npv1nK5InJZl0hNPM2%2FUpAmdw1I%2Fop8W8EsvUHzuTEPdNQcGdWVMVA6phsa%2FagSLhjhKJ95FG1TYu4URIgu3Xjt4QWMzHwfgZ8cNriTUezzMi9lBQXJ1plVIuZ4rv5INJ4CjxNchiGZJFgMUGMy54fPcAyuGI%2BRJh3fa3JdxGn1KEWHQHuv3AjIgLkWxOoOvDOxCMrumExgVka%2Bds%2F2%2FKR2NpAkVz55NQdwD0x6rJDqeovdzX0yhQh8q%2BGl3P%2B7LEanH2xXeDP1UEP%2FIFZTjaUs2DNtsNBZCcxJKI2ZVVnOrnYhyu8ue9TKXF%2F%2B2Lhsz3N6Xq5a9jetJ2HTbncrEd%2BhSeKlyV9DAki02pjx%2BPqks230Gd2Vc9j5%2Fe4oVCsoQskkSDJfcgnUcUxGQUP9tex14tYxYdSJbhtCPWJ7lxPNZSbRjnGUwM05BZr7i0jog8TDtnFRWzbVw0aXQrwZ5htV9ck53laZ1%2FIxNCkrhvrhW5F1IK6jvjYzpNPJ9rFDNqW%2FzsPSf%2BApi2wEirgSXcbbZui%2BiVoxOmuDD1qp%2FLBjqkAVu%2BDmzeMzo8ZcY77NDFCPGZPFXCCec91OTaEBds0%2BcqImwkosrqFBZz44FYnLPqbry%2FoVacr8iL2tNX%2BrM%2FWYuNenym1%2BXnvy2YQ3pRdx42Jbw3ueDI%2FyW5CTvGZsJNLcGTHf6PmfMP7jrcy4bPYyDRjYReaAsct6a4t7n5GIuJmMLQGQ02NFCHaAcL%2BctOeZqBiQmr9Zp1Y15z2nHWre%2FgmQZA&X-Amz-Signature=75de5b748e744d192e4da50370e202bfdfb9e50dbf9c64b40370de528d194f3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MOUX3SG%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQClTfWrJpdKuLiprFxPRhDri98YXLv%2BJUqje1rdjyU6OgIhAJanYED8vNWwoQ8pFHMe8z5tbP5jgAVan%2FDAmJSu28kEKv8DCCMQABoMNjM3NDIzMTgzODA1IgzyNEUbzSR0D2oZKysq3AOWQf4daZIQsYJKAYDlYB5DVKj8btUAc54DqnmDHyn6uFWwIveU%2BdI0e8JAFjTO68BjBOf9xuaEYkjYDOCIcV3hNm2Npv1nK5InJZl0hNPM2%2FUpAmdw1I%2Fop8W8EsvUHzuTEPdNQcGdWVMVA6phsa%2FagSLhjhKJ95FG1TYu4URIgu3Xjt4QWMzHwfgZ8cNriTUezzMi9lBQXJ1plVIuZ4rv5INJ4CjxNchiGZJFgMUGMy54fPcAyuGI%2BRJh3fa3JdxGn1KEWHQHuv3AjIgLkWxOoOvDOxCMrumExgVka%2Bds%2F2%2FKR2NpAkVz55NQdwD0x6rJDqeovdzX0yhQh8q%2BGl3P%2B7LEanH2xXeDP1UEP%2FIFZTjaUs2DNtsNBZCcxJKI2ZVVnOrnYhyu8ue9TKXF%2F%2B2Lhsz3N6Xq5a9jetJ2HTbncrEd%2BhSeKlyV9DAki02pjx%2BPqks230Gd2Vc9j5%2Fe4oVCsoQskkSDJfcgnUcUxGQUP9tex14tYxYdSJbhtCPWJ7lxPNZSbRjnGUwM05BZr7i0jog8TDtnFRWzbVw0aXQrwZ5htV9ck53laZ1%2FIxNCkrhvrhW5F1IK6jvjYzpNPJ9rFDNqW%2FzsPSf%2BApi2wEirgSXcbbZui%2BiVoxOmuDD1qp%2FLBjqkAVu%2BDmzeMzo8ZcY77NDFCPGZPFXCCec91OTaEBds0%2BcqImwkosrqFBZz44FYnLPqbry%2FoVacr8iL2tNX%2BrM%2FWYuNenym1%2BXnvy2YQ3pRdx42Jbw3ueDI%2FyW5CTvGZsJNLcGTHf6PmfMP7jrcy4bPYyDRjYReaAsct6a4t7n5GIuJmMLQGQ02NFCHaAcL%2BctOeZqBiQmr9Zp1Y15z2nHWre%2FgmQZA&X-Amz-Signature=75de5b748e744d192e4da50370e202bfdfb9e50dbf9c64b40370de528d194f3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZ6DIA22%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T181550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQC2AYaoirZdWXyUuCznKNl5MMYAWFDSecGlbxDKC8rXQwIgfOPy%2BPzwvLvMYwiuEpu3BSz5HtYXlnDN%2FG06eMWdGmAq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDI%2Ft%2FZiHSKJfef%2BodSrcA%2FytfwnVysAT7JKrOaHAkqUhsPiH6MIv66U%2FplZHe9qU0mrerveyFIfEWBeR2HTk%2BLrZNpTT8eejho8bDgJCDiKMjKd05KiJmN%2BJUYrquYCdOOspQXtR2DJOyUHTZyMZBM0IG1XiVsaFxpa1bV0khHvr9QXPDajFgPDQ2POF2Y6rIYz7890sWAkVv9q1HP1l%2F9xVCy9AGK9Jj8ICA7RkTLs7TEomJsSiaZxnOsrQVDT%2Fud8fXwqMERZXmDlSDaoHbaKo3iith7AzKziPOhU3F4UV6Ni6VFGm3t0SZhkkD%2Fs9EY9tzxF9f%2BLe3spAIdXl5rvcB%2BXdmvlx3udPfNUGiWakc9UCI0qFpYK9HL4BgBdVI11LRY07BOD7sj8hxCJ6PipbgRxfriqp8jXmQ9dCowyAuZCFjDIxyZp%2FwRq86INjfU5hoiEhn6W4R372GEfSbe3c6ZOuV2rZbji2oQmI3UORDMFl3PIxOFooGFBrvHOZiL6nl4lBVDOZ9E6cPS468jeq5sGhldYCwWS3bRYcS0bHs0cUn%2FMkMgrZIVp2c3T3RqqTxPQUUScFdu1aIeXCyX1juM7B%2BF66MjEoLTLRJJsYX5DiclNoMoke%2BnfPrC6dWx7MQW7HXClIzbf%2BMMKsn8sGOqUB1Z%2FqFKn4qbc0tCkY%2FaAdtTwC9m2Y2uvz859An0R2Wz90xfDEiVjkKz%2FwGvb5PNEqplT7pV3TE36PHQUAzxANz1eOfF4DJXjIHQHDNEt4bzRY60zakBdQ7zUZdnwLVe0SHM8EkukaYBjg7TXcYRbAcefpQjI1KkvdIEv%2BRoWycwEL63tdWhpL%2B%2B5sb2bk5mYGwRLfbwmRo30lCOZNZS4wyKXsQR70&X-Amz-Signature=a900bedf25c622a6db7651f02cfe23faf832912d537fa2c6b08229a1dabf44b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

