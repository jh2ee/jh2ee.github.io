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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466325SSCIT%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDaV9LcIXPIsaqcgikpptkppkLXHWETMOtsR5v1B3gl2AiEAjsGt2Pvb8I2z0tn3%2BCce3JNWxvMtD41EtblXUVkFFyIq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDGU3%2FCIG%2BUbW4cKRzCrcA4wqNtM%2FVzRFMOxqqb2e303bWJV3jPbGAnqgUaBp1Jdqi443LWH3RqYOrZchUW1kxGS5mH48YdEX2z2Alhwr%2BVyHZ0fpNJ5MSZGzkBp8qRLNRNysh9sFjaAwOoy%2BLzIyaz%2FqnA3ziD2k0mXMIixbkh7RAj2HwsOgCkFQTrXntyzGFXc8IbND13iE%2BFlBZe3lnJ0ZFsimypPoIGEKybWCWQj036cE%2F9ywleZVlrWGJRer6gpB8WsLaRIylZ9fnPL66uM4UJoBpSA3scxC2%2BCWZxepZlXR1eWzRHDIXS%2Fk%2FzVDRTroLq%2BH4gSO3ZeMyrBdF8hMv3NSMGVV3GASW1E5nzrRvESVrmldLdVBk6bSihlpB7em8NQSXoc%2FKkXUR9gzeM50rhPbVWkP2CLKDGDCxpy54WwnNUDhp%2BsFfGhPSTg3G8frSlE8FeUJOYNoWc17PDCPV32RBdDwb91Ev6QWZhI1CLswMr60WYJyB6s3iE0lqamhctAoajeQ4P1cQqThtSi%2FrqC4yxbsySP9ZD78MB1Glvz%2F9Jzz%2B4kyfwpdVx21zURkF6u6pBxxZyTB5DtnggDf%2B7Bim8n%2F19JfAPwQe4buo7VwHzWsslMIEtE5tzyVKTTQEZSvSZu24FA%2FMMWFxc0GOqUBoOxjHQdss6n6U6UurATNcRltC95w48kMBQlpAYB1LosbdV2axtE7LCTPllN7AbcZH2uh0yWNZGQZRULvD2O3GgXHACy%2Fk3jtlGa08L76sALCj0pWyjDgrwKlXzPgrIXJrbuTCe5m3DiXTzJLz5tljEibHC73%2BV2Q8YTOm5HG5b8fCB7l9KdgZ5wtKOMGngqOIm%2FyuzdFybLTXZ31jsY7KCu8R%2FvR&X-Amz-Signature=66714f1ced4e99cc88109f9247c469c181bcd633421953e598748d79d5cbf72f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466325SSCIT%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDaV9LcIXPIsaqcgikpptkppkLXHWETMOtsR5v1B3gl2AiEAjsGt2Pvb8I2z0tn3%2BCce3JNWxvMtD41EtblXUVkFFyIq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDGU3%2FCIG%2BUbW4cKRzCrcA4wqNtM%2FVzRFMOxqqb2e303bWJV3jPbGAnqgUaBp1Jdqi443LWH3RqYOrZchUW1kxGS5mH48YdEX2z2Alhwr%2BVyHZ0fpNJ5MSZGzkBp8qRLNRNysh9sFjaAwOoy%2BLzIyaz%2FqnA3ziD2k0mXMIixbkh7RAj2HwsOgCkFQTrXntyzGFXc8IbND13iE%2BFlBZe3lnJ0ZFsimypPoIGEKybWCWQj036cE%2F9ywleZVlrWGJRer6gpB8WsLaRIylZ9fnPL66uM4UJoBpSA3scxC2%2BCWZxepZlXR1eWzRHDIXS%2Fk%2FzVDRTroLq%2BH4gSO3ZeMyrBdF8hMv3NSMGVV3GASW1E5nzrRvESVrmldLdVBk6bSihlpB7em8NQSXoc%2FKkXUR9gzeM50rhPbVWkP2CLKDGDCxpy54WwnNUDhp%2BsFfGhPSTg3G8frSlE8FeUJOYNoWc17PDCPV32RBdDwb91Ev6QWZhI1CLswMr60WYJyB6s3iE0lqamhctAoajeQ4P1cQqThtSi%2FrqC4yxbsySP9ZD78MB1Glvz%2F9Jzz%2B4kyfwpdVx21zURkF6u6pBxxZyTB5DtnggDf%2B7Bim8n%2F19JfAPwQe4buo7VwHzWsslMIEtE5tzyVKTTQEZSvSZu24FA%2FMMWFxc0GOqUBoOxjHQdss6n6U6UurATNcRltC95w48kMBQlpAYB1LosbdV2axtE7LCTPllN7AbcZH2uh0yWNZGQZRULvD2O3GgXHACy%2Fk3jtlGa08L76sALCj0pWyjDgrwKlXzPgrIXJrbuTCe5m3DiXTzJLz5tljEibHC73%2BV2Q8YTOm5HG5b8fCB7l9KdgZ5wtKOMGngqOIm%2FyuzdFybLTXZ31jsY7KCu8R%2FvR&X-Amz-Signature=66714f1ced4e99cc88109f9247c469c181bcd633421953e598748d79d5cbf72f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666C7UZ3V6%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHVsAVlwsffT5in72UQUiAceWmCL7LadzXMEcowpSyHkAiEAo1tdqxlzVPs2J4DdezND%2BmxGjVwWhreNsf1%2FdUhZCuMq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDCaCVPzQUzVgNslDGSrcA%2FppFAY7i%2BKFillqzMaMtMw8dgNEuXnty76BrSxfrKoTyriMGoPYOhpNubYpuo308NwlntVEcr%2FFyfw7NksF%2FOycnsdt9WjLHokmP0UGvuCMpgLuyQXCmTAV4SEaSr3YbcktACwlQNkqSbrjafzAiiBmlyzrgPsHa%2BJHhtK0oA3AQNEG5LKm7R0ixat4nmTUnuDotLeYk0HkJSCxGG7T8dOHrg5L147jbEFReqMDv6WMFwXyVjzCbTsLdOSXHuZtVP2PwwNgBVvi%2F8eeEyG%2FWzHterrChFr7ZiSqshMPP7gt%2Ff%2FnFEqF86hJbXvBPIQ7P5PiR9aZHE8cJWF76%2FeUG3nXbKeNZ73WKNS2zfxInrizmOWl9R2Q4PJgdVnYF8tbh77gU27OQ4wp37aciBP1qPLhgO4%2F8wZaBHwwAMRNmq6xu5LrWnPJrIVpxE5QYX0qW6WZzXz1jL2Ol%2FMzWzvoUbLrwjESvlMoRFqKl92iY5cqCLm5tOe3D%2FlFMBj%2FB2H5z%2BcIy6d68y4skLoj4ZjZBOQ3p%2Ba1G4CjKr9YMhOb8oK%2FzW%2BOLTEO%2BVDvtTWPoHyu5SDtv4lY4hkrZgo240r0rR%2FGCj7TeLrVagysN%2Bqdb1Yu4R0UKiGZFxHdPPXQMOmExc0GOqUBeBbfYon2bzlUIkOfz6Yalvw09xCObB%2F2DznIedNNzspr%2FPcaBWSljYtL5pPDdn8Evz36nEBRM2BeClkaPOq3ivUgknY1s7lop90nEg3oTYuD54pIuBa68j5CnKkaO4kQVOR82pNbBg61KSwHD%2BPU3Vw1T5D0TGE0Hx%2F49WJyq2xRt0uCptNBEwVqHBHeXl6fPAq455ybMCjvjD5gPiA9nrbwCp2g&X-Amz-Signature=97cdeef760585c91603f5d08e645ec0fad9a590c19b772468638f36269f875a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZQGNCEK%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBhAwUdX7YSgE7AhWXCoaPuq3DPdrzVnw0Vr0a7q6iLBAiA5BHFvgUipwRUtbrSBJ%2F6RbLzEU8%2B7mTtDYfVJtY8sYyr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIM74l2VIxg8eL%2BynbAKtwDe43PncXj53WfBaov72rgEmsVuFq0%2F6Npvu41A8Y4705H9cwwXiK8wmOGlyYcGQngZr4VdOasrblYIeCy0RmyaKDcbCc%2FL80ZCvjRjkKwiPsbDfuMRYurqMPleES9os%2FSAag6PpDo7rFlRi6EVM5l14smZMfGILZdtuJsoxk8gbBoaZNBc9neizpchQ7tmsKhNE2MODeobLBC4uJIV3r3j94paAqelMhnkPMF0G9y2R4Gq4LI5X2%2BCcYieu1BtRN0JD9sFvD6o3ZztD69oDaucJeZNQyTb%2FlMVa71TvgoS64WfWPg4D6NZAE8trvoUtsxtLqbjURP1FBC61XYwwN%2FfjqK5rolWytou5SVSDL8OWr6yDA9sweYl03G1sI08iy%2Fz%2FYzE2rWU8R8FDTamL9Sh20jL%2FJp6m4b%2FA5Z7fTtUwvVTh30dIm%2BovqJbGnxxDYl%2Fwiyvxhf70JYUOfBG%2BgYlbajgwvgcY0fb9ocKjRH5%2FXbvbizcMqw7LP3JmhU%2FY7I4VF%2B8ajZV5TwmKfUSPzzmCCloQs4s0D8D5xc8fSPwSjYFdtWnykNIlSUlWWYOu430%2B9hJxSZg7mkqWyD4M5ZKcOtyi16Kl7oF%2FHUpxfvQCgA%2Bu1Gol0Ci6miiLEw44TFzQY6pgHNelS9JXSC4P9Nk4eppUwGtCrnu5S2AMTQGPl3ZZRXj%2BGudJJs%2BOi5J0njmIde8ccp7ATRnRl6YGtnVcaWMO84VVLROReknaTQiwUCl83RBmsLgNLD0fMBXfw%2Fu5hjGS0J4UVSO3Uar2LClRoj66i13pRqBm3eMVNMcoIr52pGIEjhgbkiLA8eBOfZe32DyOW1L7TafqM8uz1UQ6c6qd%2FybQQ4i13W&X-Amz-Signature=a7bba287acd859cb74e7651dcd83dccda2b817a883be098db8b6f6645f0ec457&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZQGNCEK%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBhAwUdX7YSgE7AhWXCoaPuq3DPdrzVnw0Vr0a7q6iLBAiA5BHFvgUipwRUtbrSBJ%2F6RbLzEU8%2B7mTtDYfVJtY8sYyr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIM74l2VIxg8eL%2BynbAKtwDe43PncXj53WfBaov72rgEmsVuFq0%2F6Npvu41A8Y4705H9cwwXiK8wmOGlyYcGQngZr4VdOasrblYIeCy0RmyaKDcbCc%2FL80ZCvjRjkKwiPsbDfuMRYurqMPleES9os%2FSAag6PpDo7rFlRi6EVM5l14smZMfGILZdtuJsoxk8gbBoaZNBc9neizpchQ7tmsKhNE2MODeobLBC4uJIV3r3j94paAqelMhnkPMF0G9y2R4Gq4LI5X2%2BCcYieu1BtRN0JD9sFvD6o3ZztD69oDaucJeZNQyTb%2FlMVa71TvgoS64WfWPg4D6NZAE8trvoUtsxtLqbjURP1FBC61XYwwN%2FfjqK5rolWytou5SVSDL8OWr6yDA9sweYl03G1sI08iy%2Fz%2FYzE2rWU8R8FDTamL9Sh20jL%2FJp6m4b%2FA5Z7fTtUwvVTh30dIm%2BovqJbGnxxDYl%2Fwiyvxhf70JYUOfBG%2BgYlbajgwvgcY0fb9ocKjRH5%2FXbvbizcMqw7LP3JmhU%2FY7I4VF%2B8ajZV5TwmKfUSPzzmCCloQs4s0D8D5xc8fSPwSjYFdtWnykNIlSUlWWYOu430%2B9hJxSZg7mkqWyD4M5ZKcOtyi16Kl7oF%2FHUpxfvQCgA%2Bu1Gol0Ci6miiLEw44TFzQY6pgHNelS9JXSC4P9Nk4eppUwGtCrnu5S2AMTQGPl3ZZRXj%2BGudJJs%2BOi5J0njmIde8ccp7ATRnRl6YGtnVcaWMO84VVLROReknaTQiwUCl83RBmsLgNLD0fMBXfw%2Fu5hjGS0J4UVSO3Uar2LClRoj66i13pRqBm3eMVNMcoIr52pGIEjhgbkiLA8eBOfZe32DyOW1L7TafqM8uz1UQ6c6qd%2FybQQ4i13W&X-Amz-Signature=bdeabe8040e6e5cf3367c137fd503c479d96eabd91ec872d289f1c0d13b56d7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UD6KQVA2%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICHaGIm1N7o4SoX0dKaEOME8NV6a61jh%2BJgxyWXmoTluAiA9JTGKwZxExdSf5uLc93YXBBio1pS4OypvZY1dBpQohyr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMMu7XQTZNRxcX7CGtKtwDHx93wc2W8HWawTQJ2KIG%2FYtHEV96uYKD%2FvYTj%2BYzCgbqGV01kXUjso6cFGlN864Bxb%2FbDeStLv3NblYJ78FGX6BenJZYfd0wQHyfg14mOzB6fgQU9BFtoAJwfH3fn3x1wK9L0x8SGilotDfQ8gBbVHKplzCo%2FAJDhM0HZGCXHQw%2FQOlRLSjIqiVREbP3%2BC3%2BL9eVbFgIhWkG4XnzbDm3CWJQMircDcR5ZjE57PYzILLu9JOOqimtuK5pHorafRz54OwbAjzr7bBucAG2jhC9eFysNHPgZu82jGaIrEbt47K7B8uyXHOhAEcr%2FBN1vyx7ClsqliLvidrCeECOk%2Bn3jBEu%2F4XbwDyolQROttRVwoXtY%2Fz80Lo3nmbAqUd%2BX%2BeqdFaIL%2F%2B%2FC%2FiNYa7LaWW4R3MgeiA1A7KwwSZ%2B87Zg3H7LAHiKyNcbxj%2BK3BDynhwiho%2FjgOpP7GP2vgbW75I55qQwqhUwU8kU5omPuKapmEtL6ntf099GnAgdTbjhNMGai786ZBya%2BEnSFAVfdZ7X7Jj6%2F5hXWwwuYD2%2BuF4VGBGbfc%2FWCiqc%2B5cGt5FwrPEVDosKzADO2DB5wVIlaV%2FVdsyxbmUX7Vvoqdx0UAAeHQA7NYs2Cdh2MgbST4IwtYPFzQY6pgFEa07FuzckFlt4GWYWmatWEODei7B%2BpEIkiAw9lfF1tbYrrxXofQDKuGmaZ%2F1eFEIn9Fx60uxxevAlg5G9WFtudivOOe5qO%2BM9irQKv3yMc2G%2Bf6d959IW8tjHc9aDS4YJgCGAf8FX1z8yAbA5has75ccoXjUc4j9vourv2VbrCs7NN%2BcVFaZawBSpqQYWmCzdQGyifbmhwOgWYpyTRbQCd%2FJH%2FTrR&X-Amz-Signature=093a4d5628637b4a1f49122f13e3f9e3b930c385c1ab97b55d449ef57a406dc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULLH5HQX%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCUA1m3J%2FEdt%2FOnOZnJ6CXmMUwD9PKnGtSzmk74eEqsDgIgf%2FfosYBrmZmmR%2BTtntKDtB7dY4hPGaz5Fjp2wIXThWsq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDEMZg69NQ95wQWIkHircA7CIOqTFhJEsUTEE6POmz9%2FT4w58usX9Xd0yR6gSL4I43uG%2F%2F2yIhf8O1KnSYqUIv%2F3Mr7jiBEdIEbKVTZX1J0yYRaH2zB91%2FDxKIT6%2BkjTuiRVtnuqhXrvzfoDnwWVpwbWsoqCytmCsqos00utOwpYAcdweehgps2t7LvDuDmq3YFy0i7YBXY8G9neClJl4uvsulmJSMitBix7BOtOpUFWbUi8sOCO9A7bF230CHqBDmXAy6W7GxUMm5bjR0kxnUQSFLqDIkDINs6BCW0ExwqO18jU8yZoAXTyUyCE2SNOIbMwv8N2oexnUP4mTblWSeZxlulXSPGumkvfM%2BqKUQV7Pw2RAmJRsZO%2Flslo4gZSuXZbJ1TkGK9wVf3eWAcvrBcu8bKYXLGYQmC0i8EaAE6zFX6cVPb9USStdaLc9NfZY%2BrdQBe1AeVAYY7UT5XLPaGa8Rw7myYLFLscljYqEERw9ia8iOXDcsGFRqFQ5LWi5OJGtl8kQJkf6BcbH%2FtBvesCVplNaQOlMoniJZw4Qj%2BgclRseWgtvmRQ67Eba7ULzTuCr4ZffbpTqDpKefyUYyDWJhRd2HyA0NAVRmwEBqqGBkOZBtCDYjckLlKQiRS%2F2rdFKzyaU3%2FB7H6Y4MPCFxc0GOqUBDH71cP%2BqmdV7torX9ppzp78An416HQ8HmNBFJKZzIv5%2F9FuqRvRRYjFq279EknIyerZaOem0lIswgxAJie9GaXS12NRJK3ujkBbfZ3MWY%2B0wkJ4icaWvfj0Q8IAXTcpz921wkOplBl8cmpZgf6zNnb3CiEyLavtAqrXKPYR%2B52Te99gixGKEx5DkovVWsLfODzIdnd%2FtsnjE8LNygyLtseX2hTqG&X-Amz-Signature=23e6b2a80584a0d36b150e6d0bae2a96cb07408c82270ceb3a050592694c695e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQYDWTBE%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGB8BW1J2%2Biw4%2FrOThwFLdOTp9TsitbyDfnFV4Yhr8MoAiEA%2BdGX3EJ6hV8YvhfWbu2aX9Pabh6%2BV0lFU5r7Fp3AnWkq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDE5A3aFKJww2lUwdWircA6mSC2AnleGBTrXTJzvVriuckegIahd7bmLWRCxQ5L5EGLUkqJBKq6s8BIUcjOxLS9lNan3A%2F9tzdfqDysEuK5ncUm%2FXZCPSeXNeWyeVnEGUIXF8y7Bjl7UhmJ8rBwJ0sulTGrFOnkxtmWc0NslOQvivZB3QgYNhVmRLxUyk7eeKwqlwXAs70slnFq6gXRprUfFrqMGn3QaI%2BV5T4Ehk6OqvMaZS0vluURhW67jo2%2BzsWpFjtMvoRvVIMt5rL01iHBO0K2eSUD5SL4MVMJzfd18bp4mCjuVmSVZTjchhKta46sRt7zNmEx1sEvL26jhSux89EkHZfkQuxPhtn8ytkybr5NwilYEEKIRTAYoC4jYIOQTqD6HXOzSDTHCv63E5AIhyalqGU3twf5mFhXfk8wVzBzQDbANQiwP6MAs383kd3TIha5WNs0H6XrO6SmNu6yOPFUeqHr33TCWhWRET6fRPiN60s2K7dkKEobjAW0Rkrgbyv530PZFEIOIrrtLCGeDOrejac0VTuETTgILCGs5uy%2BF3XAinObJWnQdDLOZlSJ%2Bt%2FBoBAiuUCz6uh%2FA9RmOcqgNVtDYsGsX5irvh%2BKkIHDfrc09pDRpP%2BAwtB7JC9SW52nKW4B6p4VU6MJeFxc0GOqUBL7%2FSY%2Bd15GXYH%2BfgKKE37EkqEpOPRdGpc82CiVT3tZagsc%2Fo0PtleEoIwoRWDgQVLBYAXQTY%2FBGIcmWLMRHb4c2OKdf1fskEFF3Gjg6pGu6anNFXppAeq4iVsnyRL4BR%2Bjq6s9MkuYATfIz1TNIjmgXzQ6yIr8ubCNdaYp%2BwL%2FPJWLYDz3k%2F1QwyEayvN2YV0j9CRJ5OE0MxLEWUNPwwLpncfHKk&X-Amz-Signature=8b8496715e4e8b7b639dc0ebab33841b5f8e0e8711eb3bee3bf581e4c9e04d7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Y7U3QBP%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFnpvgBN5gI2S4Q1HYnPkH5tXlkeeh4oADC2ZqyXT5BsAiBeGkZ94Ln%2BLb4M71ZpH%2FOY73jhxVnLruRo21rJ1bdKlyr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMRANVjgg%2BM%2BRxgR5eKtwDIvbO05MleCtJ524GD2VVqwuaynXCltu5at4kpvBJSNnADM75blL6zWG3taxQ94IofNqliUxx3Icjm5zgU45HzTbTi36ABE%2FXPbXpbjLE5LLi%2BjzrQrWzUd9TtHnZXufLlGexGfYw071Y0qmlbHpqhrs%2BDiIq8%2F8f2QDqa%2BySHku6xpcTWg0uGC61jeHbdJEFbFVpIRW9ikeG6Gy1ZFQyvgLE4rXmmRnCD30AnmBoK9dQ7ffiDwUfmHRYWGD7oZ7xY%2FXckFZ0RewMZUy02P0A1FwqXrjlKJVM1Qbjq4dAI03bQQH2Z4g5Uo9MkWY9%2FYp9SvJok252deIlVvP9EeDSSNu201dQLZLgg0Hv7rg%2BeOt5HGI7vFO7aJJPU3A6h9H8Ga%2FEf23vitsSdAh9tt1IqkeNNK5VI4EwiXGDx7uTgFFFK1iVhekff%2BK0eWkh%2FxXw4keBBwn85Kvk6lF%2FHTyzdh1wWGOv%2BGc7OiDmo%2FpqM8FNxNqBNTGnBK%2F53EbY9xhpygmUO0X8xS8sytuK9dsokV%2FRa9qpMW8tY%2Flswf1wyLLGZvJQofWDbjVKSt2qHjYHE5ZqzLcOCSpwXZFlPvisc5G%2FU36SVaqbc4uJ8kD4IUbFeMY8gk27JhANlvkw5ITFzQY6pgHDVLlN%2FopYAgV0H%2FJC91tRf2mqit0SlBZbIJPMPKKSwLSfCHKjNBqBWA%2FfDsS4FVqsnJNQ4zE0HgUdUgosqxbqJFDzYX%2FLs2WC8wnHJZ5e4peI6dVI3%2BaRHRCQzPzCKR7TvElUStrhHrUpOWyMHQwm4f70AcZiCkjCnuf6SeioB8vDFMO1M%2F84KrBIQV3SyZxfrg6o1fe1ajwvBAba5NEFHf3r2vlY&X-Amz-Signature=10151f150bf6dc5082fc5085fe8981a4ef9677999f47587070fc61d08e57fe68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Y7U3QBP%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFnpvgBN5gI2S4Q1HYnPkH5tXlkeeh4oADC2ZqyXT5BsAiBeGkZ94Ln%2BLb4M71ZpH%2FOY73jhxVnLruRo21rJ1bdKlyr%2FAwhbEAAaDDYzNzQyMzE4MzgwNSIMRANVjgg%2BM%2BRxgR5eKtwDIvbO05MleCtJ524GD2VVqwuaynXCltu5at4kpvBJSNnADM75blL6zWG3taxQ94IofNqliUxx3Icjm5zgU45HzTbTi36ABE%2FXPbXpbjLE5LLi%2BjzrQrWzUd9TtHnZXufLlGexGfYw071Y0qmlbHpqhrs%2BDiIq8%2F8f2QDqa%2BySHku6xpcTWg0uGC61jeHbdJEFbFVpIRW9ikeG6Gy1ZFQyvgLE4rXmmRnCD30AnmBoK9dQ7ffiDwUfmHRYWGD7oZ7xY%2FXckFZ0RewMZUy02P0A1FwqXrjlKJVM1Qbjq4dAI03bQQH2Z4g5Uo9MkWY9%2FYp9SvJok252deIlVvP9EeDSSNu201dQLZLgg0Hv7rg%2BeOt5HGI7vFO7aJJPU3A6h9H8Ga%2FEf23vitsSdAh9tt1IqkeNNK5VI4EwiXGDx7uTgFFFK1iVhekff%2BK0eWkh%2FxXw4keBBwn85Kvk6lF%2FHTyzdh1wWGOv%2BGc7OiDmo%2FpqM8FNxNqBNTGnBK%2F53EbY9xhpygmUO0X8xS8sytuK9dsokV%2FRa9qpMW8tY%2Flswf1wyLLGZvJQofWDbjVKSt2qHjYHE5ZqzLcOCSpwXZFlPvisc5G%2FU36SVaqbc4uJ8kD4IUbFeMY8gk27JhANlvkw5ITFzQY6pgHDVLlN%2FopYAgV0H%2FJC91tRf2mqit0SlBZbIJPMPKKSwLSfCHKjNBqBWA%2FfDsS4FVqsnJNQ4zE0HgUdUgosqxbqJFDzYX%2FLs2WC8wnHJZ5e4peI6dVI3%2BaRHRCQzPzCKR7TvElUStrhHrUpOWyMHQwm4f70AcZiCkjCnuf6SeioB8vDFMO1M%2F84KrBIQV3SyZxfrg6o1fe1ajwvBAba5NEFHf3r2vlY&X-Amz-Signature=1e160d2fc7cdf9995204634a2e48952d8349d332137ced396d2d9f2fe51eb85c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPS6MEJY%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCwQUhzEVSCTvEW%2BZOjs3SUS%2FbwVZWo7ulNnJnVtYu9kQIhAOXSO28dIHeOEOLgWt%2FhhdUZiQiYPfv5mwJ2VOcDhsRyKv8DCFsQABoMNjM3NDIzMTgzODA1IgxV8E4tnQZrsDwAR20q3ANivKV3Kh8oweabE%2BEyFzwBhHx%2BabFJbOg34elX5xq%2FBdbvvrWdFVARSf8OpfGLxssZSLH%2BkUMt%2BRxqIHrC5w63deLlx7oLomTIzclGIaQWhIPV8F2%2FvF1QwaFssZO8h%2BamNVLqT%2FEZMXPhX3c%2F3usejrYconyMHi6K1kgsoCWftCwfBkK6R98nqIyab8NGMQ5X%2F5oqy%2FB40MLSJUqMVtqnVuGSDTdGIwzxvOdMItOjtP8KSZDyqg2BQOGV5c%2BKrt1Io%2B%2BsQbrgQE4Mt39kVQ7j%2BkPfHWblGgjhDoTzMZJCATcU2KyUy1%2Bp6P3fLm9M262gbVSEElhEmZ2eM1xUGYc6NSqPifbSLsapv8OulHATKx3L%2FktLazaCAnNXhcOZpnWtKoQ88aV70e%2BL0uEoqlEhrjkcxqdzsSQLsvOIw5x%2FfS4nubnc7O0JfzxVKCFVEQBzEzVN4dZnXHl1irOGm36wbi8tot4cQvbzRsExhDSkebrUw4iWUAPfyx8hujY%2BIvq8YFRSE83pYP4dr030hxrmQGz4QzhZtvUWhL7Akjdq68%2FBxTDtI1DCyKhsvleWznA6w4YPJaNb8RrhAlFgSlc27xPLOsRaTJ%2BNpSZho1HBnKQUiqxhPux1C5%2FC2jDmhcXNBjqkAb0U33Cq6Wy33%2BT4kOCf65vVq1nQIfZVP8y7e0Zb5hAMNCeVORE6dF3VujqiTI%2BxWb%2B3i9W43D4OQtocLQrRjn0X6odczUh2qZZFgzV8qL3HEr0BYJN57oRHrpLUHCZaiNyEooLAoBzD%2BmgQVzjj%2BMxvrQTJTgykxYeYUBpNRodSdr9Wqa96n1%2F1v6HhEQRbX8WxhbmBU3UiiXSjnmQrrEnPAI9%2F&X-Amz-Signature=6b10e1b7dd30ce00c35cddf83463777a70b0847f9be3176b14be30e47e4fedfc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V24I6UCX%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQChiBh8HPtOtl1laBb%2F%2BYq0oT9fZ3PwQUHwdJFuebYEBgIgN4GOUPaVgpR9lUT%2FmVui2wQL%2BII%2FY7P31TNUC7IyQjYq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDJMuMF2z07IFzExAOyrcA5Jjzx3KvXAtRHuuyHT3JGdtTQ3i8%2BwCMcYsqzP4jDHz03mEQTvx3twMAgBCRe9pgp3RVEV8Oxtfft04z6q8OhTuQWGCdCod%2B6Z%2BbEPj%2FhDipkzuEKkyKHHtI308onLQN%2BEeaH87OO6Y8n2w8ro%2F%2Fzaicn%2FMxTlSS%2FrYAzEzfVmNZ8b2cqwmi0u%2F7zJRI0lZO9eH4wPJRDkkLMor0VjRgfeAgo9JftURVWgG9PlcRepyN4y8uLMkOrSI%2FQrdyvhOj1JXLsnpHtMfe4J0VZH4NklYyJx%2BTu0tKV%2Fxdaq7WB9Nb1uJCCWdL3sH4fceEkRJ4XKK%2FgWgUu4sn1%2FEElMOCWr%2FSI8XqtrwRg2G1yW8bgPzke6Memxn4b3bCwYELKUjrt85tiNszhyXaPrm%2BXVoS0CaMBGJl7mrwEJHFs4huWVohasH%2Bhg5gXcBjBj5ClbJh5OR%2FFXlxNXgFqxGDeqy53UCo%2BCQEGqu3CZ%2BsIvk8pRUDRHYagW7gFeyhyyVKxtnXqbXAh%2FY1Kke3oqPT%2FhsSp7d6Hv8TbN22dO1jpfV2QlmM6mfd3QfnC95P2S65eG8qSiFcVUYZEIj1M%2Bfi7UcOadVgMSYP03YjO3sjjHztDgJklxToFksMD32ih8iMLGExc0GOqUBPc2tAA9YmL34psq22HtnXKNQC6c8v3Isa%2BLRvcx2mfzpdlktdnZOEq3NCMSAO%2Fqu%2BUOObiZ3kopV7AxVi1TB0jCVjtu3gEaRlw7ubRq8ias%2BvWU6saMexLJr7BTw33DzqcbWUIZepWQPQ2YLiTAi6R2BgVvpkf9kKzki8rOoO9qGWCTw7Gx6CZkLiLsEKArO7LgoJ43v0Y6vORxcu9D6x8pa5REb&X-Amz-Signature=756052cf842e44f975d302891c445581f129a00e805efc2914758b92618473da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V24I6UCX%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQChiBh8HPtOtl1laBb%2F%2BYq0oT9fZ3PwQUHwdJFuebYEBgIgN4GOUPaVgpR9lUT%2FmVui2wQL%2BII%2FY7P31TNUC7IyQjYq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDJMuMF2z07IFzExAOyrcA5Jjzx3KvXAtRHuuyHT3JGdtTQ3i8%2BwCMcYsqzP4jDHz03mEQTvx3twMAgBCRe9pgp3RVEV8Oxtfft04z6q8OhTuQWGCdCod%2B6Z%2BbEPj%2FhDipkzuEKkyKHHtI308onLQN%2BEeaH87OO6Y8n2w8ro%2F%2Fzaicn%2FMxTlSS%2FrYAzEzfVmNZ8b2cqwmi0u%2F7zJRI0lZO9eH4wPJRDkkLMor0VjRgfeAgo9JftURVWgG9PlcRepyN4y8uLMkOrSI%2FQrdyvhOj1JXLsnpHtMfe4J0VZH4NklYyJx%2BTu0tKV%2Fxdaq7WB9Nb1uJCCWdL3sH4fceEkRJ4XKK%2FgWgUu4sn1%2FEElMOCWr%2FSI8XqtrwRg2G1yW8bgPzke6Memxn4b3bCwYELKUjrt85tiNszhyXaPrm%2BXVoS0CaMBGJl7mrwEJHFs4huWVohasH%2Bhg5gXcBjBj5ClbJh5OR%2FFXlxNXgFqxGDeqy53UCo%2BCQEGqu3CZ%2BsIvk8pRUDRHYagW7gFeyhyyVKxtnXqbXAh%2FY1Kke3oqPT%2FhsSp7d6Hv8TbN22dO1jpfV2QlmM6mfd3QfnC95P2S65eG8qSiFcVUYZEIj1M%2Bfi7UcOadVgMSYP03YjO3sjjHztDgJklxToFksMD32ih8iMLGExc0GOqUBPc2tAA9YmL34psq22HtnXKNQC6c8v3Isa%2BLRvcx2mfzpdlktdnZOEq3NCMSAO%2Fqu%2BUOObiZ3kopV7AxVi1TB0jCVjtu3gEaRlw7ubRq8ias%2BvWU6saMexLJr7BTw33DzqcbWUIZepWQPQ2YLiTAi6R2BgVvpkf9kKzki8rOoO9qGWCTw7Gx6CZkLiLsEKArO7LgoJ43v0Y6vORxcu9D6x8pa5REb&X-Amz-Signature=756052cf842e44f975d302891c445581f129a00e805efc2914758b92618473da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDYJBWXM%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T112341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID92IDrxFejVZz7C78H4AOmv%2FE7sPSuTguhf9szFtjO%2FAiBqzjxnw9YXLLl132dbouIhrdDIwuSmcE1jku3JKbyn4Cr%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIML2AdgNwtmelBDU5IKtwDlFgwTEhxc%2BKRbuqhRcSuwuS%2Fb695794CkPDhs5rHbYm7AybYL4%2FBKBAHLGHcf%2BrCGmPnJHn7qUYka1wQp5KVXkaYm%2F0KTOXL98eacEkfkC9rWjOvkpElFTgm9DPw0uoGgUhASBZw0MUedEnz398%2FrNlV0hSozfcCNPAcWmw%2FeZDd6PTMjUX6Fsk5qhULulvelZ6jSGqXtQwz7TErljA1MINI3nypBWPhFYwsFIZw%2BX6TYTDtZgIgKgBt81O2nR%2FoxsJ3nGgoOOTBOL1we6M4hB4ZQ2hClkMwTx5yFFbHBEgghhFO4X%2BxwNCHBk1pQVw2bsnmd12jENmPMgTv0yXM5RGLJwTdkak5yn8ivf50Av6SMuShx4olA29%2BFaeKN6Os7xMQaIFn6Euy0%2BPkvXZcgxtdyQStdZm3dxfQzPwA5rU94yj5GbdVVOaLDFid2pE1ZApqvJs41WRJfMfh9fq%2FoPEJpNY2mOpL%2FNX5POAJdeqm72jwmhLNXmtugmlHOYHSVA%2FnuEIx08dFLcWBSvAmjguUhWxXxm6eHcHtdOipX0JQfq%2FHx6fgWK%2BVjIsXSv6KknL%2F3nLkCSijRih1MY8XaaD%2BLuE8vnLlxardztfFqmyCX%2FvznyIrl1JazZUw5oXFzQY6pgF1qk6Bx8MgfPih6AyCqYhSaW%2BQMjVVYSMOrolf%2Fft53IisyQ4IUVJlzbvDGwmadTDGvlUS6XD4qeyedqV0g8nLSTbxqyCbKCtUH8JiwTf6dDYMUs%2FvZ53llPmTEFYAaYNvKxnKsDuxNZ4baWhLnP72R5REDEW8uD2EzZx%2BZc1KCJrPWs%2FkWEeJtJscTMC2%2BKsdrhI%2BBnWGjtML5bBNhPwSfE1ZUQ%2F2&X-Amz-Signature=021eae61d75be658a075d110d86d9e80b15c9dc32e0d1025305634106dd366a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

