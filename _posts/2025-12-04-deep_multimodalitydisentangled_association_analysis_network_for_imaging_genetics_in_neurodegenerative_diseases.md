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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRGJEEFH%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG%2FQdG0Z4I6lNXqSScVqHH5ETagvP2TGeDzsZZuTjjYOAiEA40Dp7hKJrpiVKCzDKfbz72ewKGISj1nBdLqevtLYpikq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDOmFrO%2FzJsDNrg%2B%2F%2BCrcAwQYGFhVxRt3%2BVMYzQLsuug01SUozSwwcg9DcDW0kGpt9E6%2FMfmsj0H45KQjbtH1bIA8JDN0gscVeXVoE1Dabiq%2Bcv%2FVwHnaGZlYDBoEXX%2FlN2W5TL8QjWrcOltuREQol9q6dHF3uFdSlCfOGwj26WSdsR73L606ycebTI%2BxmEGwjCzsSGya%2Bz0vYPae3DSjYCvbw1mxEFh3tpV8yDotH6GJE6SSIrfqXNSNN0k16%2FK1GXwjavu2YuCmOw2vef%2F8b4pR5mMgYpl7M61CMxE4ufalW%2BNot2qjcepL3hRY3VxxjzO3JAeiTaovDTDfVlKD1sOgJJY9o3fXzrBe%2B2M3FotBBOHw7%2FYsLnUNjczSwHPMtybDxXZAQb%2Fex%2FyngUJz8efL3qUs5wiAWIvRStCDE8Ay78HLMgRZNtuTwEOaS8lICPItAEvKfsnFb1mWOqViQODFndUN%2B8vVip75fDOA2IOSDQSd5P84%2FJ7YuMeNKeSE%2FSErDiefamBHzq6xUwhvApf9kyndHmXp5Osj7zTdPg%2FjfnPxSbOrlvHHO4VDaaqRBnRl03dS1yyumRmkPG%2By10VowPWWKty8%2BX%2FkcnaqjlVybiVEeRUJ%2BS6XJpF9mN5sSlnsgPdWD4t6JrN1MIygrM8GOqUBJg0jTuCW6WGEBPGBS574WnltqdFcz4BAR6BSEd3KJSVgKA6QF3VHZA0qKnXdqcVHzoahLuF91XH2DYOETbJTZdq4CzU8LhXmn4g0VKvaId0hse5JWBNpBDykWuOJMvfK1eapTOpP2c89BKUProbbzG8QGsGDe5GqjHs1iB9L8L9SQuFR7mHSrbiL3Jr2tDpb7bimIs4eZsKwnaXPGYQN%2BE4DYM6R&X-Amz-Signature=19109a89996d1182fca8ed012e73ccfd9239a8ee9adc9d9246c1a5934041dbed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRGJEEFH%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG%2FQdG0Z4I6lNXqSScVqHH5ETagvP2TGeDzsZZuTjjYOAiEA40Dp7hKJrpiVKCzDKfbz72ewKGISj1nBdLqevtLYpikq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDOmFrO%2FzJsDNrg%2B%2F%2BCrcAwQYGFhVxRt3%2BVMYzQLsuug01SUozSwwcg9DcDW0kGpt9E6%2FMfmsj0H45KQjbtH1bIA8JDN0gscVeXVoE1Dabiq%2Bcv%2FVwHnaGZlYDBoEXX%2FlN2W5TL8QjWrcOltuREQol9q6dHF3uFdSlCfOGwj26WSdsR73L606ycebTI%2BxmEGwjCzsSGya%2Bz0vYPae3DSjYCvbw1mxEFh3tpV8yDotH6GJE6SSIrfqXNSNN0k16%2FK1GXwjavu2YuCmOw2vef%2F8b4pR5mMgYpl7M61CMxE4ufalW%2BNot2qjcepL3hRY3VxxjzO3JAeiTaovDTDfVlKD1sOgJJY9o3fXzrBe%2B2M3FotBBOHw7%2FYsLnUNjczSwHPMtybDxXZAQb%2Fex%2FyngUJz8efL3qUs5wiAWIvRStCDE8Ay78HLMgRZNtuTwEOaS8lICPItAEvKfsnFb1mWOqViQODFndUN%2B8vVip75fDOA2IOSDQSd5P84%2FJ7YuMeNKeSE%2FSErDiefamBHzq6xUwhvApf9kyndHmXp5Osj7zTdPg%2FjfnPxSbOrlvHHO4VDaaqRBnRl03dS1yyumRmkPG%2By10VowPWWKty8%2BX%2FkcnaqjlVybiVEeRUJ%2BS6XJpF9mN5sSlnsgPdWD4t6JrN1MIygrM8GOqUBJg0jTuCW6WGEBPGBS574WnltqdFcz4BAR6BSEd3KJSVgKA6QF3VHZA0qKnXdqcVHzoahLuF91XH2DYOETbJTZdq4CzU8LhXmn4g0VKvaId0hse5JWBNpBDykWuOJMvfK1eapTOpP2c89BKUProbbzG8QGsGDe5GqjHs1iB9L8L9SQuFR7mHSrbiL3Jr2tDpb7bimIs4eZsKwnaXPGYQN%2BE4DYM6R&X-Amz-Signature=19109a89996d1182fca8ed012e73ccfd9239a8ee9adc9d9246c1a5934041dbed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTGHUUR3%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCz5djyle0Bp3KQLQYjTqJFqseFuR2llFXBDExECWSBhwIgNVzT%2FyCFCPOxcUFbyKc1VPIZ3r%2FT9tGgk5or5PP5aUEq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDAP%2F%2FUoF8gqmx%2BwTFircA1cIJQnLpR4Em8kJIl7VJOJcT1rIV2TOzWHFrxPegV8OwEeFR%2FrUekuqBemHEtUq2TxPqkyB1FuI7aWfXs3MSMKCJRYWHSP8dg0IqclfBQ0%2BeVVl7R19wf3dAgbglWmOF4lo0%2BykscmZ0beNXpOuh1faTOtGxylx3zlMd6lfcbOLRc2rJ%2FUzmpTohC9SBhuyTRSrA%2FYDPwV05hA%2BqXw6N9v8r3s6Vpm%2FyuOERwDdxVMo6ofTMhFQLvcufdswCOdtYQlwCDVEWonR0XwQ53yhjvunuGXo9oMzJ0FQ2w3OomIOuzPNiXzRKc9EgicnFTdrv4YhfhXQMFp5wBprc5vzd8vd4wVz%2FURLwiaoOICtfZdLgeIFWajo3O1OnQz3H7wUnvr%2FtOHBHZgIKWlSh1HhG4aHDv7PCuRjn8Q2ckiicnw%2Bq6bU49WXkQ7Ev9XPFOmrBbUL1FZIS6JJHA%2F76YGpMkiHmVWtKDlGRmCvJb8izGiWYS2ldPRszt4giHL03K%2BPDDAVhVQilPDIAzkHEHKjjRh%2FpPoXpLeRkjFG5MavXAg2fcKWjajt6Ypw2Z4RmSnLhDBuy7g9CTCanLENASoRSspZOr2tkJ3GW6LeaHIacyh5ybRNjGyk6v5MmGvjMM2grM8GOqUBii5aDJ7v%2FrfdcJx6%2FDF%2FkqjOVgllFiW8DrRchBbp8FI%2Fqfu8CA4AFpNp6TjqJQiwz01xGxokr5mUb9NoOnu5gasZJIUQUq9n%2Fp%2BTo6AJb26k9MnDxUTUv5ShLyMnIncUIq5OwL8M1dUYd7UoeeW72X2zlo8bevLMQ6uwmm9BjH4JKUT%2B8yb3yRpyvSRuFBk6LtaMCNctZGlVMP6q7aJqLzDhGtmn&X-Amz-Signature=f306452e97503d83e0b2edb5d97843536f65740ae03ef94374846dd34a598a1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOVQOCEP%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICRaYiZ9zcBy8VkwYrMzUOQRm2awZnF%2FkWSQT0ixgGiJAiA6X%2BTnh%2Bd7rgJU0pMHFw3CXJegTc0jm%2FjjKQcfQ1se1yr%2FAwh4EAAaDDYzNzQyMzE4MzgwNSIMSfx3TQJbnnaRqi2YKtwDhC3oTht8r6Ki20wIcEvjFLPSiLRYQeQXfRUoczrcfVm7hYzvR4ccW%2FQ4ped9tRQ%2FxrOWoD0y2kc6gx80IllaOn%2FO99%2Fpj6fyEVosO6XeSnvGB1nQiBqlWBOY4uBTMDPEkBsezucNG7IB%2BhzAaWL%2BFwl%2BuOhxuzwz8HbWGnoz98fMSoPBaL31mCWusAcCO63ixj9Fz0DkKZNmJArFThlypvJtOBnrfKawOOaYYq5Z40Wp7UExzvUCqtTG13vwNIonrBqAAgZu3FV10NIgIPkP2tsVmsxTxYBTU5w%2FsnbSdcOd7zrbDCfgmlt36gL6Mb7frb8UNro4BM3DR4c0QZi%2Be2MdnnimQCSBdsYtSvSPcrKCQ34XnozH1xsI93F5GwHeaYcs6f5HID9ZlY5chwyFrY8eFRQkgQLhMB5zqrfc36GvxMvKehNpW3rHUyYM82GuCHpZdC77miTFMXyw8EitfhpVM%2FU06%2BAozu7iwWvV4zBEc9aBWAvHynMsgvfYmAfG4bXQRsMj1keBn%2BhZKj7E%2Brbn78INqDafsQViN55Z0Y6YP%2F8h4%2F3T%2Bi6dOHz7okbf39TD2H%2BaWE07cZElP3wl%2BtkcSxFykqa4bfLLCGsDxllh%2F7TpL2wzdHra94Ywkp%2BszwY6pgFA7CrvdHjO4Q5WQvOhAFetiN11fzy9%2B1ys8jK5EW4TCm5dRiI5fxFm6cuXnLphvzKNwLvvIxMc3heBU5rXgBOXiQvQAOiIOZ8902B9GFivH37tXOCWKrUQcpwb01IkiwzdQrqvW1cBpQjJy2mwNj8h%2Bs6xc2IZ2fS1pn2Jgn5jnRZzoLPV%2B6M8x1A9bLkVTuqTbyv5JmmUd1C7g%2BRmvx8jrzdGg2pk&X-Amz-Signature=f5a0a0c05c3b077f633be2829df441c7cf87f161bf8be13f7ff185d99fa50967&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOVQOCEP%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065506Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICRaYiZ9zcBy8VkwYrMzUOQRm2awZnF%2FkWSQT0ixgGiJAiA6X%2BTnh%2Bd7rgJU0pMHFw3CXJegTc0jm%2FjjKQcfQ1se1yr%2FAwh4EAAaDDYzNzQyMzE4MzgwNSIMSfx3TQJbnnaRqi2YKtwDhC3oTht8r6Ki20wIcEvjFLPSiLRYQeQXfRUoczrcfVm7hYzvR4ccW%2FQ4ped9tRQ%2FxrOWoD0y2kc6gx80IllaOn%2FO99%2Fpj6fyEVosO6XeSnvGB1nQiBqlWBOY4uBTMDPEkBsezucNG7IB%2BhzAaWL%2BFwl%2BuOhxuzwz8HbWGnoz98fMSoPBaL31mCWusAcCO63ixj9Fz0DkKZNmJArFThlypvJtOBnrfKawOOaYYq5Z40Wp7UExzvUCqtTG13vwNIonrBqAAgZu3FV10NIgIPkP2tsVmsxTxYBTU5w%2FsnbSdcOd7zrbDCfgmlt36gL6Mb7frb8UNro4BM3DR4c0QZi%2Be2MdnnimQCSBdsYtSvSPcrKCQ34XnozH1xsI93F5GwHeaYcs6f5HID9ZlY5chwyFrY8eFRQkgQLhMB5zqrfc36GvxMvKehNpW3rHUyYM82GuCHpZdC77miTFMXyw8EitfhpVM%2FU06%2BAozu7iwWvV4zBEc9aBWAvHynMsgvfYmAfG4bXQRsMj1keBn%2BhZKj7E%2Brbn78INqDafsQViN55Z0Y6YP%2F8h4%2F3T%2Bi6dOHz7okbf39TD2H%2BaWE07cZElP3wl%2BtkcSxFykqa4bfLLCGsDxllh%2F7TpL2wzdHra94Ywkp%2BszwY6pgFA7CrvdHjO4Q5WQvOhAFetiN11fzy9%2B1ys8jK5EW4TCm5dRiI5fxFm6cuXnLphvzKNwLvvIxMc3heBU5rXgBOXiQvQAOiIOZ8902B9GFivH37tXOCWKrUQcpwb01IkiwzdQrqvW1cBpQjJy2mwNj8h%2Bs6xc2IZ2fS1pn2Jgn5jnRZzoLPV%2B6M8x1A9bLkVTuqTbyv5JmmUd1C7g%2BRmvx8jrzdGg2pk&X-Amz-Signature=a0b1ad04f67f1281e6c72c41a27d31864ffd98f0c94c10f6ef3172b8a6da0fb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657CINNOZ%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID%2F5L1RLBCAipoFDN57xVMh0ymxNkERBOiTK1PhUUfLOAiEAtZUuZGk978Nyk2mtC6l%2FJN%2F0yH%2B0kJkHE2L6%2BxN7y6wq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDOXGQfx%2FoJYbi27LPyrcA8lpOKkkKvsSMPHGLbEjxXLhPzKJCnHgEMH0m5FT0KVZ7z6vE1PEDouTYaDaG8k2PzhurHEcxuKyI9YvLw0x8vWTvAH%2Bnrlne2stTnf1kkxdZ95ON68qPOJ%2F1R60GcLlcbaYvBYTyBjZ8s0Mi9gUlc%2F1TCScBc%2BvkMq0gya2opTab87i8dDcef%2Bn6lXW1C3fYwuLYVxh13bgLMNq4AG4vsL6GeDixKypcvCZ7SNvx3pFq2zN3HjxODRE3zQWhNoVgHVAWAxni37cQlBtA7hWahJLoeGNMHs8SGF6SzANUpqnuO7OgRbf8lbSrVRdBy5iooUFwxmrviaPqtN1J2s7yYQM2h8UwxjEdnkW7xEgPN2R2rE8IdMg8Hg5J535QXm0CQq9%2FgmAwCmyqlZJYYCMT2to3NyvzKN3DYmtooe6xNZSPOEGiNFaUNuaUSGKeIy5VQi0Y0q6OUeSLwJRO8MJwbe4PiP4XZ5qE0t%2F%2BlZGhbxQNCnj%2FWFbYGuYWeG12FgQtPmvt%2B2dUl%2FahT9fVvq4wFsuD0I%2Fg2nUS7DTiz%2BtNmPL0QITnvWv3umoiyriLCWd70IIFKA6T9qJTJ3nrUKz83frx7stx909m6JtNUXIPZ8nUtkWfdwYQNfk5t3oMIWgrM8GOqUBP0KGM%2FTwG6lim%2BUY3JybQhp7H8u%2BowLqVI1HX1x95vDCyGwjAmWV%2FloxKupy5HBJKoTfyQ6QOGMqxXc4eeXkIh4BNddubF2EycfIFj6Dn8MqOv7zjNcdSiqevpoQ%2B%2B1J7mvTYhPNbHm42xNWzXJ2Zmk3tKgdloP8ONEXqAnmkiYSd%2BH6K7a3TUCjMH%2FCB02QI42HXCnFnEt4OL4h22n9M%2BYNXkCb&X-Amz-Signature=9c51ece88b48d63662f539e84d79331a98b157ed345a2980505018a0562cb248&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQZZ7GE3%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065507Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBbkus3hkehsHOyis0EP0XXgStIvDnuyhVZJUsQ45owvAiAeX6csUpEIaTR%2BlAnKuEm4rjkNtZf8ti%2B0GZg%2BKhpaiSr%2FAwh4EAAaDDYzNzQyMzE4MzgwNSIMcSTNh%2F82K%2BCbOMvoKtwDEhJKwWOJcdYywnXosbgxO%2FRXmHsV7wlxIZJbBOYg%2BGQquzf7jf3%2BtbHK7NvPhgcnBXsoA5iHD8gFCh5DKwM49xPzStnnrAy%2BnONnHFhIMapCoXY%2FEe83vB%2BwleIfKVxCJMMnoQdGJ5JId7DI%2F98VZtxpwMC%2FNRZavZz5uHQuAsB9ElIz7JQ5TShoyJDb4GwMR5%2FK10UzVT7NFedgWs4aHzY8rAY62IgRg0tDluwTGgfGDbqUrZq3qvWb8Xg8OYY5q5YUDVNVRr3PDaab7Zmz0aPXTnsPT319562XVAhy%2BZ0nC2TF7aDpmG74TedgSFl3Mxs6UhQ1P2pzLL6hW2I3dhSbvXrB0wIZWedvJzESPq6R%2BS7%2FrmGroXYIMHeU%2F6xaCq8tkClDxHaEN%2Fqzlo0Y%2BYZvWZ0EM%2BXvIr52tIyzB6MCZomOCkMAuAuEumW6oQUIA%2FwII%2BJ84%2BSkE7pGEpkfpcTOL90r0TXyTua8Tq%2B%2Bt6GVs7Dv9gJNHUhoZx2MgbRMYQpdRPvpWcWpB6d4YDL%2FY%2F7%2BEBqOvM4SxA%2Blfte15LXfY7Ptc86jTauyYGQMDz9PHTzhLNXSsr2VLwrFB%2BNdVJrDOE5EvQkH4%2F8mRdn8gXhoC9dCNVpMqtqAFIAw0p6szwY6pgG%2FL4jWJ70mHA8L77tt6%2Bg4tR0giv%2FtXnnF8X8frihsh1kq3NiFEpi8qs8SA8H4t2j2wgiKAYRsXNqx6Top7MXwdNfOxEOSMt0N%2Bu55pZeIQNsID558Dqdy0prxKJ02Fv31771uEPWovBnPaGCifCgJzXe9yjXmjwEKK8bicNZNh4Dqs87Lsqdedp9mUQNPzZnlx9d4mtIlp6tPLMDIp09Yz6J5VmHZ&X-Amz-Signature=90252f440a0d86f6e2d3c444dd323e2485e34d66e0dc15ac2275ffeaf37f7359&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUE2KD2T%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDhj18PHtWi4pz8B34pvfmeHbpMKnxXcimnVDEpseV%2FegIgSQ%2B4RJFHXZgUdHVZ9PAZF171xTuGVEzwnsgKKBSSpeEq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDPe4dIcn%2FvQhpZfYBCrcA6NrVXbqWXJ64%2BaMlQ75NgavJOhbqETyGkLDujpUz8NoQsec9zJXHK92jQUX%2FzZXYzZCNB%2FJUQgR3cIHoXiIQbOgiANOs8TmP3RA4MAXNIs2UyoRR79u89k0wUdyNVgRnvRMm74Zlpxv0FrfJTSW3faoeJ3g66OLk7wjGm53ItLfm3ODX1Jv89mI5wnHFibv4PF9ToBdr8ar%2BTIvLC2L3D2W92QaLeyZIYLgT5tHj5goXEfg5hkAI3ACWCU0rswluMmuSJDtDBlYaU77bapH9jFA70WDugX7W6BS8%2BWBJqdhsXXUOwbmgdbjXnlUGld2ZjgkebwQ8%2FkRNaNaqAjYq52ADQRtqfM8i%2F23udO3Vw2v585uj3v25IGgaV0AkprhqchVmK%2BNQuuR2pvQPIM1oCmbLqpN74TYR4ZmC8%2FHV2JdY%2BhuaMiDG4J6WyrnOTXOtJRJ2GViTh7ONc6Cse6AQ8rr2WlD34gL%2FoKT%2FQoE41C6OHAuZMueTPdI0qot3P7XhHF1qa3YyYb3BIzS31vQRxo8nQNiPgIF268eN2hBig%2FxbcsWlqUCtr5lAefMjrPcEcMYzcZtQGdP%2FRzCQhx%2Bbd9qPThIPl7jD%2FzupSIkqxtavEs9Hn5yLmf4oR5PMPKfrM8GOqUBPltxpZjBFJ1g6kRUIbntYY1ULUNdk2a%2FEsiXtr9LIOwSbJTZtBjWNWFMI4utq8oWXtdNppEhy7%2BJnh4YYRZmprWr1YiqZLceAflWnlUKiJWgSIwcF%2B%2BU%2B5czCAHsYu2yMsIYSFI2PQBv7BDdM0r%2B9nHZ1eoidKrTBa32aovbi3IAlWPnR1vQCg%2B1WDEnGQNUNJPZpww3THHFVTowi0uQE%2FWmJcDF&X-Amz-Signature=31d68b7b4f37aabc23b8d4f985d55dad0ab52e745b6e83f3975428fe46c1bf13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZI2QOX3%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGwJpMEh%2BwRySjc03Nqq99NZcNOvEGsVASBZoveSJP9VAiEAzcD9w9CK17AJNDvryCQ%2BTLv4q6JV0Ih4BgroVf4uH7cq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDBxAvVtfCl8YaBpPLircAwAMs6uxLKO76xVCo3rjtrZ9jGH0t3YLCV9dOnRImPAOdq4WYUEoJew8bG1RJIL1PoAPjoyEZr9OoW6gKajPj%2BqrOC7U%2FfHVgUTK08N8cjVngE0MRUGwoT5py%2BYWcFGD1Bd1lUzkW8bTbVfDiguLI0DXf4bGlM7fAi7K71lXM10rzhkg2il8z8r2fg5Dy1ocm30k%2BC6qIGMnLDRw0jRQZ0%2FJAzxooSFmYdsVFWHEP8YsLoot0Af5OH9Jf6OSBXFIGnAqk0qBQh2SM6d6p9gPGDUtrd%2F3cPSiNPag4Qouin4Ur3WlVwqGtwhJ8johqBU%2FJQiwwErHpm7lDSKyovsm8P1jfQ5HpvlGA3Xqi7pOJqM9ckWTSulRj6NVTDBwnw5CqHUvFMiiXj8C5wslSbECuANlv90aGnBWUPIDn0DjwFb5H30JHFDPACJYuQUJxuxBkRs8mTipredIaae%2Baohmm2Cw2JH7%2Fv179f0UI9IWpCDqsEgZEJ0bjZUeObzH2R%2FOMhA3i15MIVToQraDEWOeXWJdo%2Bp0CKIaDNaWDTAlJtt23rsDBLZK3FJvu4BcYHlkQ5s5I3RkfbFlGDDBKhDj9u%2FdPSVEnXIGCdyFh5bJLOFn5nUlkQCAJzwHK4aNMI6frM8GOqUBhRxiljKeHVYgQD970V2KLlAIZbKZuWwcvS5if00lHFBwgfYi5lP%2BfgnjG9wSUemJoo2Huny07Yk%2BmDgqh3TPUbcJpsuCb9lYhieQY6fFEUbVslNvncayMcskp4HOPiM%2BuJDXk9VWQ3GPakoPcFsasSUkGVXWcYgHqHk9Ka1GYOjgovW%2B5CE3PcQ0xCBd%2BZjYQH6KrI3QOAiUfbdXD6VlpOms%2BcOu&X-Amz-Signature=8f178999c00f370bf000b7794d74562bd01fedde499cc11a3fd684cecead13dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZI2QOX3%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGwJpMEh%2BwRySjc03Nqq99NZcNOvEGsVASBZoveSJP9VAiEAzcD9w9CK17AJNDvryCQ%2BTLv4q6JV0Ih4BgroVf4uH7cq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDBxAvVtfCl8YaBpPLircAwAMs6uxLKO76xVCo3rjtrZ9jGH0t3YLCV9dOnRImPAOdq4WYUEoJew8bG1RJIL1PoAPjoyEZr9OoW6gKajPj%2BqrOC7U%2FfHVgUTK08N8cjVngE0MRUGwoT5py%2BYWcFGD1Bd1lUzkW8bTbVfDiguLI0DXf4bGlM7fAi7K71lXM10rzhkg2il8z8r2fg5Dy1ocm30k%2BC6qIGMnLDRw0jRQZ0%2FJAzxooSFmYdsVFWHEP8YsLoot0Af5OH9Jf6OSBXFIGnAqk0qBQh2SM6d6p9gPGDUtrd%2F3cPSiNPag4Qouin4Ur3WlVwqGtwhJ8johqBU%2FJQiwwErHpm7lDSKyovsm8P1jfQ5HpvlGA3Xqi7pOJqM9ckWTSulRj6NVTDBwnw5CqHUvFMiiXj8C5wslSbECuANlv90aGnBWUPIDn0DjwFb5H30JHFDPACJYuQUJxuxBkRs8mTipredIaae%2Baohmm2Cw2JH7%2Fv179f0UI9IWpCDqsEgZEJ0bjZUeObzH2R%2FOMhA3i15MIVToQraDEWOeXWJdo%2Bp0CKIaDNaWDTAlJtt23rsDBLZK3FJvu4BcYHlkQ5s5I3RkfbFlGDDBKhDj9u%2FdPSVEnXIGCdyFh5bJLOFn5nUlkQCAJzwHK4aNMI6frM8GOqUBhRxiljKeHVYgQD970V2KLlAIZbKZuWwcvS5if00lHFBwgfYi5lP%2BfgnjG9wSUemJoo2Huny07Yk%2BmDgqh3TPUbcJpsuCb9lYhieQY6fFEUbVslNvncayMcskp4HOPiM%2BuJDXk9VWQ3GPakoPcFsasSUkGVXWcYgHqHk9Ka1GYOjgovW%2B5CE3PcQ0xCBd%2BZjYQH6KrI3QOAiUfbdXD6VlpOms%2BcOu&X-Amz-Signature=88ad1ad866cb3a21c71216a4e4d6e2c1be4d9f1670c376a5b3095cf1c2f89e4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667U2P5FFJ%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFcKrO2kT%2BgtCakFKs2GO37utnSu0bA7g3ObYEEphqq9AiEAgmPS7BkBIfleK2trSk3ghiSTanktYO6osalQe%2FxNxFAq%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDJcORhip8egVSNNU%2ByrcAyCM02b2MzEUr%2FO3LUR9l0SKK%2Bm7K8jwW%2F2oqqIwrmDaUmTbCVDpTz4zm%2BXxV6OP3olTGT4Gn330sa%2F4MQGXkybNKVuFLrmSDSPqJMES5zbfGfsaCSeybaXr7NC1lENM0pWR2HDbj1t6mptaLpeLj7xUsbMlOPR%2FaBUy4l0fr%2BuTEbhNUiXRTFlwYkT7%2Bk1znYPqeyETtf9n%2BuFtPkkLoHy20PPj2xDs%2FI0v%2Fl5NJ9oYKpFud89yeAd2PouiUb0%2F6N8OE7NQGKPm8FrzWqUjoTXd7Zv56TpA2cqa%2BqpHYA1IT2%2FInvwfWcgFU0jPdaseOhaU%2BaHi1hP%2B7TdZr%2FwvPpD8%2FWK%2F0tDUlUMuxQpKlkQQ4%2B7ZwQom%2BeKbybFBp2CRZKEgdXqzZXdFyDvU4d2FwNgA4MoRItjIrT7Acqgjch3CSIGMQTBd1SqebUKEkVnU0UCidb%2B245xNzzPguP5DXx90vkmNqX4doxnt4AUUrQjhMU3065zvuCU%2BRW8LguP0LSc1DO7IXP3%2Flf1OYUcm3quUmf2XAJxaqq2QmzBiGNakFViVRFTnqTD2E%2F7jgYZP9OSCC5lm8scOFV9i4aDQK75qhrq%2BluoklhzDY4BJV9f%2FdjlJUu%2FO4kRh%2Bay%2BMKigrM8GOqUBG5BzaUBiA%2FDEq7ioz7WbdB%2FYaxTgnuFEJlZcDEGIPS9SrxgD3gTj6CDoXRX%2BiyajLT5fH51GyBAhQNJ5fa6JcmS8PBYbf%2FkbrOFMZ21fIWtSCl3pJFT1s8dVfduNSXasler5LamW19%2BAKFw6wYrKmbg9BJExANgwOxboDztyjQhHTKNcAy%2FQ%2BMmVzSedqGXRoxmQx5nwXWGJXxEnT8gZMByr71Dp&X-Amz-Signature=3519b56d295b1230c3fd34707c2d5a1d3d5b10a9d3effeefd78e0d673080f34f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622YXMR2I%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICupsoHSdoxkqccGGLcCOwugnXrsbThDt5slH7VewZ5RAiAgTum6lir7%2Fb5IH7q6wHPw6HCqBhelpgpFu3xXhudT2yr%2FAwh4EAAaDDYzNzQyMzE4MzgwNSIMEbRVQdQ9%2BK6nfrv6KtwDsBrOEf3onf7V%2FTcQ8kS0ra7%2BUp51T7jT9cL9tQzv3I2PIoRnlyXNwYdfrQvI%2FISk1AF%2BWbxig52pAmp4ml%2F7wVmaMH0btVGjJ5J6qy7IivLwJ8GoXFRgo%2BxBKyBm9H%2F0Mloz5zb8W%2BJxx%2FAoxVvHRrPDwRQuef%2F1w14I7SXHz7pM0TbqlfZK0g5%2Fe2918tOrsHCJiHfXqUtLUZaiO226eELhTljSmM6lUL5I5u6PMBkvSMDfaEXoJid09eKXP2TDkAtZ6gfKsK90Y%2Bgj%2F06WwQ42KACB03NTgafv7%2FkGnB4bcok5ZbYbxDadqQi1v2SsVa3J22RSgsCX0%2BasEZtqAnMWwX9ZL6zkbdn4Y0kfg7Byy2%2Fmcv4d2Z24k7nDet8nGipEzpzBWB6uM2befVlVrrWIug%2BgmsGtl9LOskreFRaCC32ECh3jdW07KszNKlKSMaNXJ2j%2Bsv7WwHY745gRy6AP63%2BlaF5wkNwf1zWJ%2F2dYzTZeZVIz5D%2F0XUug1FoLn7YTMBXVOVt6afH9fACGF0W32JWzh68HVisGHFqkhEDubP6SdKwdJIhJ5uNBemZqFavM3PfNrcykkpAOb%2Bg0tU7AQQl6LyHbBtI9mW41SNUvyNpp2Xeg9JL0CEUwwaGszwY6pgGgH%2FjsLngbHNXMxPL%2FIIvxsE%2FYloMsO1%2FLJ9IC%2B7fJKqbkvRqCFHeREwot6ii6QUD620BwP5qNvogWT9cq6SCyLdUPfecLAgJSJyZirD5VA3el8x8HMqLe5Y8AOcrEAL%2BRBoDklpEw7BjtXavEvUZWTv%2BUXLFZ%2BRfieNoIfqmTFpgx3OzKapEuC8b8ypI8nfHiWu56JTBrrHneu2J5wDA7F9%2FHQauL&X-Amz-Signature=8322b275087bfc4def9ae0aa92a7bb995aca7d9487b1da4d76966eb656fa32b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46622YXMR2I%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICupsoHSdoxkqccGGLcCOwugnXrsbThDt5slH7VewZ5RAiAgTum6lir7%2Fb5IH7q6wHPw6HCqBhelpgpFu3xXhudT2yr%2FAwh4EAAaDDYzNzQyMzE4MzgwNSIMEbRVQdQ9%2BK6nfrv6KtwDsBrOEf3onf7V%2FTcQ8kS0ra7%2BUp51T7jT9cL9tQzv3I2PIoRnlyXNwYdfrQvI%2FISk1AF%2BWbxig52pAmp4ml%2F7wVmaMH0btVGjJ5J6qy7IivLwJ8GoXFRgo%2BxBKyBm9H%2F0Mloz5zb8W%2BJxx%2FAoxVvHRrPDwRQuef%2F1w14I7SXHz7pM0TbqlfZK0g5%2Fe2918tOrsHCJiHfXqUtLUZaiO226eELhTljSmM6lUL5I5u6PMBkvSMDfaEXoJid09eKXP2TDkAtZ6gfKsK90Y%2Bgj%2F06WwQ42KACB03NTgafv7%2FkGnB4bcok5ZbYbxDadqQi1v2SsVa3J22RSgsCX0%2BasEZtqAnMWwX9ZL6zkbdn4Y0kfg7Byy2%2Fmcv4d2Z24k7nDet8nGipEzpzBWB6uM2befVlVrrWIug%2BgmsGtl9LOskreFRaCC32ECh3jdW07KszNKlKSMaNXJ2j%2Bsv7WwHY745gRy6AP63%2BlaF5wkNwf1zWJ%2F2dYzTZeZVIz5D%2F0XUug1FoLn7YTMBXVOVt6afH9fACGF0W32JWzh68HVisGHFqkhEDubP6SdKwdJIhJ5uNBemZqFavM3PfNrcykkpAOb%2Bg0tU7AQQl6LyHbBtI9mW41SNUvyNpp2Xeg9JL0CEUwwaGszwY6pgGgH%2FjsLngbHNXMxPL%2FIIvxsE%2FYloMsO1%2FLJ9IC%2B7fJKqbkvRqCFHeREwot6ii6QUD620BwP5qNvogWT9cq6SCyLdUPfecLAgJSJyZirD5VA3el8x8HMqLe5Y8AOcrEAL%2BRBoDklpEw7BjtXavEvUZWTv%2BUXLFZ%2BRfieNoIfqmTFpgx3OzKapEuC8b8ypI8nfHiWu56JTBrrHneu2J5wDA7F9%2FHQauL&X-Amz-Signature=8322b275087bfc4def9ae0aa92a7bb995aca7d9487b1da4d76966eb656fa32b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HNJT5PG%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T065511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCYBjfdZ86%2Fp2enFhj4ts%2BhOnaRSY7zzZwJEuPtk4nVlQIgGAkggfkINilZ5vOVoHQbtPNIZlPKMFkbqDN041NS%2Fx0q%2FwMIeBAAGgw2Mzc0MjMxODM4MDUiDN34XksAyt8rEmUyAyrcAyGuiY3scQdtpr2BYSvpHzmdtytd%2FqgmItEd5D8H4t6%2Fu2B5%2BBi%2BkallwGLDbyy23C%2FY%2F6ZqQW7rSHljred%2Fko8lW34w8sej6BaSYvsCvdwXVDvm%2Fz4w%2FBFX0JLM2Xuiw4B6v%2BNjdUPVOtgGhqbqAVhFwRtgNwhGkXTSMeRdq8rcXfP9XHgloRJ03I7ERCWNhAxgCvqFmJbUDhOsX%2BmxGiJ8KHci6owxK2cn%2Foq62Ut6KJwpFUN%2FumWnhQQvD%2Bb6t0JzLfbz6WcJjJnkVcGnLpLCkI4ZbBdY5uOKFQZ%2FiNdL6KqI3UZzSjyiqTxHlRNTANobBiyp0sypnzmzHZPQ5WHo0xYfc0BMQ6WwQ53rXCay1ba2ZWrSeW1Va%2BccAMKiKETFyQ9AkLbmY3tRvuYYY%2FcC1HsNGxegZc9TNbJmDKkOThqt%2BICSUIOPOGMaVYGU1%2BcR1T%2F1Nc%2FbMv8RKC9a8j8GB3eFRQHM0c3jn23c5eDaXJpYRqo%2BthtHKIsi%2B2OfB7ocdpHbl3D%2F2OhJHjCPEyUw%2FQ3jTts322aB7y3bnusV5QL1YYHU6yGmV4Ih2ufs7alzLHd%2BQm3EdXJlU97vabQ%2BZl0%2FVicoWcnypCZitZLxn1PUCPfkyT%2ByLyJxMPmgrM8GOqUBn1xT7NAh8jb55gE2a3fPKB5rmlpUEdjafqZ19dbdGJk5by5FrcRv1QgNFTMkNi3RYh7ne32gpksCHsa2wQuAtkEwILMLpgJJiStD1YGkaqmHYHeYumQSL%2BMqi339yvr8H%2FPgdhoNqSZQgTsQ4Zq1En3A9SXSCGx%2BfM0KDIDBFKzRhfDwtZl8gd7k4Quem1bHJpfj7DDOJNLxL9%2FMUgOJkmK1Ydir&X-Amz-Signature=8cd42430e0620768faa8b8a46da6bfaef9e4c7dbe19c620272122a0fdffe6bcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

