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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOY74VCC%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T032951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICT7e7koa2RQpQWMkAMMuTCTXGe7WCrHizAV3BP2KssgAiEAw5%2F5z4VFP9pzecq6HiM45t3%2Fq%2BrsMTaQ5Zb7vPHwcmIqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC4Ypqbw2mx9QFF5BircAw1SWV6scbDZnYH%2FxLzKXBeQ8WUd7SHSq9HrC%2FGa3L%2B9abBg0b5QQD4aU04QaohkHCh12RCXeo%2BzceZ2zk2eGMrt1B3QA5BMY4hx3bAuIj%2Bmqcdre8gIgx6eaP0Pvq%2FOJuVrksjZaNBFIkbWMbrUd6Pm73DzJWiKbwfY8GJPQVcBpcWSFGX6QC9CVL430O3KGc8x408c7OwnpokzV8UD4mlgeeuN9hN2P2DpRSjiMamE3NVqQX98J7IEwepWvhwT4tLhh5O2dhu9dbkMLUvZSZS5k%2Foi0AAeAiKDjtvVfv1WZw8k70sGTbJmQs%2FiQ0JikS0Kd7WN2briDf%2FsJmxiwTJ3ocmTa8nf127tjHNDDOsc9NmZ1DKMl%2B9LDWl4QRS5d3D%2FbKQ4xPbwSCB6dNcttAlteFZy9RL0jSB3CLLUKk4of1DpdSNn2xfFs0AILpySL6CviNolp%2FyI%2BQunpdemmNYcaJpcCeIGxZAVilx8rya8mV%2FleDfelE4qViexPWp0E2Up7EYLwF2lrr4qsUsROsaGhwx%2Bor2bIBkwF%2FvdeL7UKlyWMsqrfidd%2FC8v87RwokVbd%2B%2FRVR8uz2K3QgGfnf65U1SJApNO%2BJ%2BChPjQgDQrVmT9tGfEKDi3jXt3MOmjmc0GOqUBjTsto%2B6RgR0aK3Q8Ax24Zj%2B7uwm3BsKjPjnaphl5JOXmFPZ%2BJXH4kMuZGHFIxpVsEnjF7VKhTBYPFwGziP%2FZ6Dvv0j2VqLlajw%2BvqC2fXxlOvP3YsIeZAoG4WRKrYLNG%2BqGUgb8fvzq2ZNmzD9OUWI%2Fc0XLsnl%2BNFRMAa1F5kvRmyD01Cbd0xP812rqlAxeJFCB%2B%2F517k988bKGacrPLRE7xUzMX&X-Amz-Signature=2d7b7f4af313bf22b941b080cf5d0afeac2e83b400706b6570a6474a777673ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOY74VCC%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T032951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICT7e7koa2RQpQWMkAMMuTCTXGe7WCrHizAV3BP2KssgAiEAw5%2F5z4VFP9pzecq6HiM45t3%2Fq%2BrsMTaQ5Zb7vPHwcmIqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC4Ypqbw2mx9QFF5BircAw1SWV6scbDZnYH%2FxLzKXBeQ8WUd7SHSq9HrC%2FGa3L%2B9abBg0b5QQD4aU04QaohkHCh12RCXeo%2BzceZ2zk2eGMrt1B3QA5BMY4hx3bAuIj%2Bmqcdre8gIgx6eaP0Pvq%2FOJuVrksjZaNBFIkbWMbrUd6Pm73DzJWiKbwfY8GJPQVcBpcWSFGX6QC9CVL430O3KGc8x408c7OwnpokzV8UD4mlgeeuN9hN2P2DpRSjiMamE3NVqQX98J7IEwepWvhwT4tLhh5O2dhu9dbkMLUvZSZS5k%2Foi0AAeAiKDjtvVfv1WZw8k70sGTbJmQs%2FiQ0JikS0Kd7WN2briDf%2FsJmxiwTJ3ocmTa8nf127tjHNDDOsc9NmZ1DKMl%2B9LDWl4QRS5d3D%2FbKQ4xPbwSCB6dNcttAlteFZy9RL0jSB3CLLUKk4of1DpdSNn2xfFs0AILpySL6CviNolp%2FyI%2BQunpdemmNYcaJpcCeIGxZAVilx8rya8mV%2FleDfelE4qViexPWp0E2Up7EYLwF2lrr4qsUsROsaGhwx%2Bor2bIBkwF%2FvdeL7UKlyWMsqrfidd%2FC8v87RwokVbd%2B%2FRVR8uz2K3QgGfnf65U1SJApNO%2BJ%2BChPjQgDQrVmT9tGfEKDi3jXt3MOmjmc0GOqUBjTsto%2B6RgR0aK3Q8Ax24Zj%2B7uwm3BsKjPjnaphl5JOXmFPZ%2BJXH4kMuZGHFIxpVsEnjF7VKhTBYPFwGziP%2FZ6Dvv0j2VqLlajw%2BvqC2fXxlOvP3YsIeZAoG4WRKrYLNG%2BqGUgb8fvzq2ZNmzD9OUWI%2Fc0XLsnl%2BNFRMAa1F5kvRmyD01Cbd0xP812rqlAxeJFCB%2B%2F517k988bKGacrPLRE7xUzMX&X-Amz-Signature=2d7b7f4af313bf22b941b080cf5d0afeac2e83b400706b6570a6474a777673ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUTNONWG%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T032951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICKtIsHLzv6kwIFHdKqJGHD2VIg8WyaOcIDz0LDGdXIFAiEAwR8Y9ixteSJwhgzR6dBbYC33yoFR9ohNAEiCtTDSQiUqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNSRZ%2FXpLG2DCzQ6dCrcA8TDHK1Dk%2BrklfW483wT3qOp%2Fj62X3B6zdOffjxRkF%2FRWptlTdilLtG6JL2hBVTlGg74qq00QjHQ%2By1PlXAeXIYwigIPdZTogSRkdxVuVIeZrjjbA5LJ4kCli48LzBXG8yo4lSpHQNZL4uco3nZqUrdTABx45OyKTKHHcV0ec3s06brbocW8j6mSeCJIFSCWAr0Rwm1T7fa3iETNW4%2Bw3uDmD0LeHmYV%2Bd85ub1CVL8dgnBe0t6DNGLXtVNkQcIJxCfVTyDQ3huE7uxGiEPatOZyYzXE%2BzT7TjEH1K3ZoSC%2B%2BQkjp%2Bx2dSNw1vGOSWFLqNwGTuehYCmeoyVAUEZ7tOhNaCHDXb2OLt%2FWQxtTegTYfrceVilNTOeLHmoR%2B7L3GsfLkHxyDsXWFNDmSQ6sAHa%2B6p4EtAX1dIP7nYMeyH0qr5eq681z0CtAvJOtVVc0fcnJlXS%2FtIEsG8ivzNplqwpUVXAN%2Byd1c%2FJNRLXuHQpHM22rNsMr5KhkAqnKeCJdMgkMDOkA68hpCIqy0jfigh7g5riBST6oYgqqN%2BSuyqTbalDlUFigFRXfLtKizA1p2OWdNeA%2FrbpNiK31ziyWSl%2BHb1oM%2FC8a8h0ep4Ftd0pJSJfADu0Hgft38eMgMIylmc0GOqUBF1NkKH%2FtU8aa%2B%2FQDNKN%2Bjy3YC6iLY1nCbos4vzpsByeYT6ynwSIhc7x8%2BR4GaaAb7Woh6eecD6MQZPCqABToMo%2BVV6S98n0nqLnBC8fGRW6F4MGMIDamyIDQKsboYSr02Ki%2BYFbH%2F6zsImONAXDm9YcL722qHDtfiF5EfH3cvYJFmfHhaTjmq7ep9Hq2RjDO7PJl3pddg1j9EqPhWbCIMm%2F3AgKF&X-Amz-Signature=aab6e1d6ce5111fb7b09764711e3a9ec25099f5c70683c7a2f53fed72c155c41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CJXMQVS%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T032957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCekiY0NefkXi5B7%2B%2BJL%2BOkFVB9%2B0UL9Ss5hAedczT7xwIgYRc6QgTTDTE96YK4pTlV4K%2BHbmPNZJYV8DDeUfeL4SAqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEN4j%2BmjawZ74g01fircA8ob2vD5vXH3XXKgScngQ%2B8F0%2BqKlySw6QYlcxc1zokMsLTTkqsCdalweyvQlBBXI4W%2BN7cODycl0iQ7YS1rEgb9PHbkPRVDTSJYCO4la3FXSaSPlrRZY%2FfwzEUPMj7ml7JpI3Mrhu4SZ6%2FBtsPz4u5TX%2BVtfwB7vMpK5G38HjWtxqrEuIZaQCDhNm0m9icfF0MiKA4HrcxliaRI3MNTuC9vXk3gZnFwI4IUggho3xF8h5CJ2c%2BEsc5m4JzXLJ3pL2I1Ghh69GbNPV5%2BbQIpVA%2FycrPOzUE3RlKtMcnPRe%2FTIpXpZ%2BYU0ncYS827lGaUWuEcp9nPJpg%2BMqRyLmFwT9twWWcJNge6EBfvEFby347O9HeZz1Ftfi02qhaWHS2RiutpqkJwfCXDo5pJSwtomTLnG5UUu%2FEWJeGu1IG3lYhN90XV87s9eJx9vqI3zNlFFQsdtI8QcEV0yvZGfVsgOt9gR%2B2OokdUiIAXZkfZ5l9Z2nNzFhkpVJrO97ETuspXRabJ1tQWCEccAmyWd6VAzZnJ1BAjGh%2FooRtEQsDe01r1uQiSOWIu9%2Bu1Gt3WdvTGVYIJr0OwAysg%2FOVylVkN8sBFn4PmzPl6gW9mLGNaBx689IkVq%2BmpJlYuiLcxMIWkmc0GOqUB8xBMxPoamIxL9rYaozQjUkKjuCKcbfspSoyXBDz3LBX0zpqJeJbPxk2Vp%2FfvO5RY5r39%2FKCj64bUJknvv6e5cUeE%2Ba6aNx4%2BOKhUb6FwQdYXwdEV%2BJ30vA7NWYPVY6gTNBkrDu225bmYW4Fx81cEzSfxWUJ%2F72rFvCPJ%2FrxQnqs5HiUbPw%2F4YZgvwEP1GABAyQsTbKOyUy1C5pRmOzdyznfie3u9&X-Amz-Signature=8a26a1d64ca5e43ac3e2859008987c31733a4aeae9cdef2a2ad3f8abc8eeb050&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CJXMQVS%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T032957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCekiY0NefkXi5B7%2B%2BJL%2BOkFVB9%2B0UL9Ss5hAedczT7xwIgYRc6QgTTDTE96YK4pTlV4K%2BHbmPNZJYV8DDeUfeL4SAqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEN4j%2BmjawZ74g01fircA8ob2vD5vXH3XXKgScngQ%2B8F0%2BqKlySw6QYlcxc1zokMsLTTkqsCdalweyvQlBBXI4W%2BN7cODycl0iQ7YS1rEgb9PHbkPRVDTSJYCO4la3FXSaSPlrRZY%2FfwzEUPMj7ml7JpI3Mrhu4SZ6%2FBtsPz4u5TX%2BVtfwB7vMpK5G38HjWtxqrEuIZaQCDhNm0m9icfF0MiKA4HrcxliaRI3MNTuC9vXk3gZnFwI4IUggho3xF8h5CJ2c%2BEsc5m4JzXLJ3pL2I1Ghh69GbNPV5%2BbQIpVA%2FycrPOzUE3RlKtMcnPRe%2FTIpXpZ%2BYU0ncYS827lGaUWuEcp9nPJpg%2BMqRyLmFwT9twWWcJNge6EBfvEFby347O9HeZz1Ftfi02qhaWHS2RiutpqkJwfCXDo5pJSwtomTLnG5UUu%2FEWJeGu1IG3lYhN90XV87s9eJx9vqI3zNlFFQsdtI8QcEV0yvZGfVsgOt9gR%2B2OokdUiIAXZkfZ5l9Z2nNzFhkpVJrO97ETuspXRabJ1tQWCEccAmyWd6VAzZnJ1BAjGh%2FooRtEQsDe01r1uQiSOWIu9%2Bu1Gt3WdvTGVYIJr0OwAysg%2FOVylVkN8sBFn4PmzPl6gW9mLGNaBx689IkVq%2BmpJlYuiLcxMIWkmc0GOqUB8xBMxPoamIxL9rYaozQjUkKjuCKcbfspSoyXBDz3LBX0zpqJeJbPxk2Vp%2FfvO5RY5r39%2FKCj64bUJknvv6e5cUeE%2Ba6aNx4%2BOKhUb6FwQdYXwdEV%2BJ30vA7NWYPVY6gTNBkrDu225bmYW4Fx81cEzSfxWUJ%2F72rFvCPJ%2FrxQnqs5HiUbPw%2F4YZgvwEP1GABAyQsTbKOyUy1C5pRmOzdyznfie3u9&X-Amz-Signature=fcbd7b66f03a324cf901cfde0e7e470ed5bec9755766ed3ba85af7b9343ae5b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46677YT2NII%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T032957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBrxfdOJU%2FAKJ3zfGU%2FMF5K5QcHnuPalcAP3ClpHcChRAiEA%2FGVTm2q%2BIhTbKdJte1S7z8BJTlI5NpOhsEB%2Fr7U%2BAvIqiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPdr%2Fa3R8%2BfxtWQ8vSrcA6fcpujxTMhEL5ty1EafT1V45wVyz4EPLWwidq9AzjwxjAdZoZarVc17BnkgIJCXdmE0096WrZzALjzAIpVkZowKCB2C%2FSH4dRW6jHL8Y475YzpwecvyTXTFSbLYDfYw8BDPqYJHHYCl6R3LLOno15ZCF5Xl5WREFDkZZX4iKHuJOM2PDnk1MonOWEG8T2t98z3yIToptPT8Vta6IdNppQJ1rafNtX74i0emXQZz4C1H9%2BY1wjg67yRKrcckBKrgrnPDAY1izbApoqPXhsaDjnawuu5jWFNYZT1F06CvsIbFzqfkrx94OFzhtHcCtetB7p80ih3Omcsdr44agR0tsNklzKYX6cZFKaqvx4FKKrsaSKkjRGL3Tf%2BmRa1j8SbCOx6wwDtVBcwIuf1Gn6EZ6o%2FmohWv8yx80p6nnBFHMgSveewq0IJufnYT6s65cxsU1DNmpw9frqImR4AUgVkucGuSxvfBhSYVeMP1Y%2FxAnaNPQqA%2F6Hgtgh7xCdc2gfg%2BvKyMyOPSKiiLlLQWp%2BjFGIwTiqNmo3RzbaBeC4tJrVL%2F%2BfdwPs7R%2FS9wTZhxQ7pyZxK5NMZYuRZlrX2yzhca3qFTK1Z2el1Upd5VdXksk3tmfeVx2rQ6952vEagXMI%2Bkmc0GOqUBKMmuxpwNMIt5%2BbwMyA%2FmBD5tWLqaO7E9ulUoIzfcy6yG6caAUQRlCsUjkyS5B1McgKehquPPPDAQ8kcTe5fnN3tPeJ8y0I8vQIDYl0jAHCyc%2FI6W%2FLLtT4VgXftySaRq1DDGMgplT6h2U3IBiRrRF6I1Qe8Q9Ftra6l5uuh3M4L3QAqXApn4F4Sb1PFP1C%2FbcINkhR7pJkiBzyyKewcGmSX9hvC0&X-Amz-Signature=84ed9750c5b2f4a035010ba929d4ad3fec357bf6a97df519881a0d4093b81e9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5RBRZFA%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T032957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGhp%2F%2BZuDPanJe2hFmdPYIwnuUAXnIXi3Fey5mZEACq9AiAeibOaR7yB0BL5aWTEslHXYm6mWsr8SBNw0jiGY6LrGCqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6C8IXKkgDs1Mpw5vKtwDkUtxJhIxHxduWIyaDIvjIekoxxFy3SPEKehxbKWdac5M8FNhmQWjl%2BH0JZGzpdxXnxZOusZqDt2gUmyM7hGp2DrzYOjw46QZbSQXNdf2hQPD8vYLxtoySKc2KDNhlQXx%2Bs%2BmBa3xw2sFNLxtv80wG30YKrbRESc4M5GkedPX4ITdBx9yGuiR4G%2F08t7sZ7ixnAZQq%2FuVJZfiLlIYnqN3uEzDn0Rx0upDDtFw10qwwfexpLk1Ob2m%2F5jJ5Xhyhl3ME5YL4Q36Rf%2B%2BrfNyr8t69MbzO6ljo8xo3NOr8bnSeP2%2BJhVTZtJqRyvnQrfGe7KKjx4prj1QETMT9iQdmyAoSOvED7l2HSIH5x26gKFHldAm4sqLWqesFRSk%2B%2FMVgDAzOp2PwvSyrStsqxnSYKF1%2FQW8xs7OQuPoaczkOOUrdp%2BVShiR%2FxpMGfCAzvf6wQeH%2BBVuKwRzqv8mxa3UsAH4tGnOTh3kpikFGe6elAjyioFpJSZ9DVpgEkoKK6OKI608WA6oXyVfQmu3LAH2HJ4g1BJDuDanMgap4t2TPKfL2uXtEe2QOX7YzsAfiRIJ2ihbkCuLT%2Bqcry3Iyi26YMzS9Chb0Em46Uh1WX9tXVDLsm10%2BJoWJGEz2ZvtDA8wyaWZzQY6pgEzs%2FkPDmWrsvviqXxdFWAV5F1oxsUSwdkwIayqiOrlad7UywCKdjgQCmdj2zR5jkucgM651zFRdPBi2dGdWWhmY%2F%2BMnWgq2eMTRCCxx%2FEyB4mrf%2Fr1fN%2FOTfRdaO%2FWtfBHo0bpqcndACzrS%2FVSY%2FzQ1mWUIh2GTfqDdPQVMBXMAcPj0MaXUx3B700cqx53eVbDPhCmHKgLEinleoyXogppt88U7dVC&X-Amz-Signature=1a0682e519db7c8a60567842dd66bb1ec299d9a40b8a01ff5609591d0d9aeb69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PSW4OYQ%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T032959Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDkynmjyJNZOwU%2B6Y0SmInZk3xSuY%2FJOSCFHP%2FXgd3NvQIhAMsLfL0N%2Bv5RYBfISa7rLa0Je%2B750VTmQr64J2jpr0e7KogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwpW8Gp%2Fb%2Fw%2F4bJfLIq3AOR6x%2Bds8anpbVj0Dwbl%2BFuuKdwkrZT5%2Bze30YNpPRwAVd672EO1pXUpFjxJjsfsLc9K2p1OuOXMahCRW%2FC7CrqIAj5nE%2Bd%2F21ehB3xkFEftkQWoU3t%2BdyffHKsuxFi1%2FCOpv0U6umxVbd6neUud%2BhYR5ERYlIB%2B4xqhXfQxaXGIbGkf%2BsXe1zRFVxpnZE8FIdyUg%2BvgQNpVZbindPV%2FfILHFcHMTZbjlLMDY0nWwEKnUzsVbSpwOrbRBo0R1uNf5b9ExCcBn2Xsq1oAM1w30fN8pECMx0Y5gp2SCD8fW6NwMmYUpBgToSHZ%2F%2BCgO8fRUQGaRYbXNRnGbw5APJfXX%2F4h9xg%2B83w3%2B9wfVWFMiBh80rAve3i03kJsI%2FfCkOFIOQKs%2FVG6k3ZrjiIv02eDHt2ZD6owNdnAB3A7AqOuCEJZ5ZRrchw4mMLPYVGMXgQaYueV5TXYda33SVt5EQgVJfGtpSZQzKTZRHHEcDC%2FLK0r%2Bdx8VYKa5ovY5QUplE6mkk7U0nvxhvu%2FhpmttOKdUFKJzEbdNDD3OirMLfCdvr35QXlC1NnaP%2FCoCUOoJ4KxXQdD1cm4%2FAYto7vrft1OGm7LkPLZgnklvOUl5nhmplOPOgROLwj%2FOCG0AT4hzDzo5nNBjqkAcJ4JxWNqFZ2JigTTt9WhsoOedX5j9P2Toe8VtbnmzAxVZ7G8cLLQEXVC4Ua280ZllHqueZWm%2FqeWXtr4ofNQ0TjzqL5lM64AW5IePRh2Kv0aKkh37B7keGegdg%2FeBLeczdUl9DUZPOKa5vK%2F6z0LNvypT3u0lOo3Q3TxMUs%2BGENQjiKUkYvJYWjylRs7F3IiOMomStTR0XJ80%2FJ%2FAifOJOR4sJE&X-Amz-Signature=bd83e7ba3d08f1036b30c8c96d50845419525ce5867d5856c3982090764d02d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PBC4BRJ%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T033002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BIg5eGGCmS%2B6JyVMchupoY7umjkd5FJqzc4d2mS%2FXVQIhAJJk2kv98RB8%2F9MLZYK4M9tBhCh4Ar6TC9prJ%2BHdbUxWKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyDgwVNzeeKNA3FygMq3APB0X6uQvph9rCaykcK%2BVmnP3FyWEAN3OjzT6V83OLxrxX%2FD4tRyRvFvEYu0I8p2xYHL%2FEP8Qxs2M0zQMZ%2BR1kujcANbLGzC6%2FOqktgjADTx6vz1wWkYuHMMuGoIg2URXmGdsf6e1LLNDAqdTR7Xu6eX6IdwcD7jbWVnMm1Bs%2F9PKDIhYfK2p%2FI4L8ZE3s2pzygXWIxmqoSk02iSyU3LwkOKbqB9wiM1RwbMw9RNQGzAbxTagFpplpwNv7M9H0v4%2BQI7RhfruJiR78j8ETi7mgPvocElcEQbk3VBOzp%2BjQR2KKFTWd0M7ES%2FsqinDRJhT6uKdi8Bnx4bQ0y5xNliIB1%2Bz74x1SrApg9Ji8zhbLcDFseUG%2FUW2eNngVdCSr6JW1bpfD7gcIBYJjYvLvQCkXez4J2w2OPF3Dt3%2BSd67DO86Se%2FCrqmIa6kCtf3SAzKFLQKWNSa70qtCCoRDyZKK7V0MppFAcOZJfpA0XAebyHKhTSMyRnMbSimQDTrEetXzlmFL3Z0L4rvVcgj1v8pGR5yYClYA4ya7%2B1qdgUPPbz9nM4CQdwds088KVW9DWYKdE4vhoonV47CnZuOIKrsn7we4f8b5AI%2BZ4ZROLcPnxx%2Ffshi7WGIFtuUfvblzCdpJnNBjqkAcAd42xVRVkISIikWG7sNdCmcH%2FfNcW%2BuQMYaOs3HcYBXRy4nTYPOxAMV4VcmGJwlKWGf32eHQbVs5Uh%2Bjw0hSHY0xvj7xQqMRxw2iSdmYy7JItwtUKhK85YP0Ro2rnnM9MBx9vtwCNgB9EAu1cyeWvLQsZZ8cBU6rtmo1vm%2Fn39bPnf%2BdH6%2BO7jilh%2B28ma2%2BtpW0xGAUc7Af0F%2BNrIYrmZUmus&X-Amz-Signature=1cb8005203034e12e139347d027431e8488d0ec365c23b814071f4319bfbb352&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665PBC4BRJ%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T033002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BIg5eGGCmS%2B6JyVMchupoY7umjkd5FJqzc4d2mS%2FXVQIhAJJk2kv98RB8%2F9MLZYK4M9tBhCh4Ar6TC9prJ%2BHdbUxWKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyDgwVNzeeKNA3FygMq3APB0X6uQvph9rCaykcK%2BVmnP3FyWEAN3OjzT6V83OLxrxX%2FD4tRyRvFvEYu0I8p2xYHL%2FEP8Qxs2M0zQMZ%2BR1kujcANbLGzC6%2FOqktgjADTx6vz1wWkYuHMMuGoIg2URXmGdsf6e1LLNDAqdTR7Xu6eX6IdwcD7jbWVnMm1Bs%2F9PKDIhYfK2p%2FI4L8ZE3s2pzygXWIxmqoSk02iSyU3LwkOKbqB9wiM1RwbMw9RNQGzAbxTagFpplpwNv7M9H0v4%2BQI7RhfruJiR78j8ETi7mgPvocElcEQbk3VBOzp%2BjQR2KKFTWd0M7ES%2FsqinDRJhT6uKdi8Bnx4bQ0y5xNliIB1%2Bz74x1SrApg9Ji8zhbLcDFseUG%2FUW2eNngVdCSr6JW1bpfD7gcIBYJjYvLvQCkXez4J2w2OPF3Dt3%2BSd67DO86Se%2FCrqmIa6kCtf3SAzKFLQKWNSa70qtCCoRDyZKK7V0MppFAcOZJfpA0XAebyHKhTSMyRnMbSimQDTrEetXzlmFL3Z0L4rvVcgj1v8pGR5yYClYA4ya7%2B1qdgUPPbz9nM4CQdwds088KVW9DWYKdE4vhoonV47CnZuOIKrsn7we4f8b5AI%2BZ4ZROLcPnxx%2Ffshi7WGIFtuUfvblzCdpJnNBjqkAcAd42xVRVkISIikWG7sNdCmcH%2FfNcW%2BuQMYaOs3HcYBXRy4nTYPOxAMV4VcmGJwlKWGf32eHQbVs5Uh%2Bjw0hSHY0xvj7xQqMRxw2iSdmYy7JItwtUKhK85YP0Ro2rnnM9MBx9vtwCNgB9EAu1cyeWvLQsZZ8cBU6rtmo1vm%2Fn39bPnf%2BdH6%2BO7jilh%2B28ma2%2BtpW0xGAUc7Af0F%2BNrIYrmZUmus&X-Amz-Signature=cd30ed1af370cdc4ce00ddf141bf69d1bd5b032c59955ded079ecac9254367be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CW2SBO3%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T032950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH%2BK9Nuj6%2FljrDetFPMeS7khj2s%2Bg03J38%2BQdRleaiz7AiBmO%2FAJxSLuZcdoVICN410e%2BrCOLg%2FchOiqGlIhienXPyqIBAiU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMPnkkwAVy7UA5RcpFKtwDGXHR0KXZjgpfCNsTLDAGIjP63hK0SRKE4g5c2jNf%2FRJU9D0IfxSV5LiWnn17K2OPc0shTQfRTVxsIcp%2B8tzroCrehY7eEUpAQ2rNzDv%2FkQGj%2BxoklkV9QvhE22%2BAwRCfWLl4HHxUWFgzvC%2BVtD8QTxKeKi6mgheiFU81DXkVc7sZiW4fIYOUYH2N21gU6jcTRXBdBTkFVw8ljlnxNxSRyDYFYNBkqSO9GHanLzszVk6Ax59ld6wfZDKH0IAfq0bWKEKV7aVZcRjLnFHpY9YqtABJb7ggt6KXPIsXTIFIzNU9bANsE9lS26jw8VcqFcQ3grMVEGOAmWvuzaqf8C8b4uerU3uAOEpdad2NR3I5%2FvkOirlJ4npkJ%2BvBQ6SMXDD6sZfEbIyfcMTa9cg2FUBomnRlsFHIjhIrWdCPR25CV1Se1JssAafkdWOPwox18RW7I8KclQAFbN%2BeNQqlYU%2B1aR%2FbdK7SqliJnOqBNjCMunQ%2BJ%2Ff0IOEmZ3PviuvJh6dIButBVJUG0QK4Rs9rgoGqW4QIPgFajUgKKpLMHpZ%2F4PsA79T3JhgxUuUds1iUaZzicJTsz%2F17%2Bm4GqXsuX8is%2FU2VeTa0bEAMqJ6WbtYYPqhl3kvhfVYusAEVuj8w%2FaOZzQY6pgH%2Bf0IlE8xABKllT8BE9czQKJqfdV6iVbnBKju%2FZGWfUMJMZrwHjCFo3ekCVWwyVK2qVXhb332qtU6x9Z%2B7JOb2%2BcjcK01W58kDloNTu%2Bnx4BLSgtplleRcMOrg8bneYQezoPIZEGaYUswzKFIFdSX99%2Bc1bkGGRrEDqlaf9ZRJuMlQZ0NiJPJldRgOCOn%2BiDvxda0dY%2FVIyHWunXABUbLmr9TnYrIM&X-Amz-Signature=a13c2ca6cbbe3fddd3edd03b3552c9e6331d79ef5d5d21420d579bb8a55ff841&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BLVN2IV%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T033003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCTL9ogXvOPFLrBV70psTLRa1HoTnlO%2BEl6okLld2aGtAIhANE%2BLjVx8%2BKcDp5EkXN%2BEooQw9ps9dS0Kr9is%2F%2F2pW8kKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwgCECnN74t%2FptP5Iwq3AP1myuiZ8KBd4qInC9bS12jcLLh6Cikh%2FFKU%2BSy5yms%2FYPOyFt%2BnOgIpw8L4V7C3cMZUwAEXk4wy7vtHdu0LeFLaXSIr2fBJUMMULx%2Bg%2FU9ysEqj2Ux%2Fywc6zhmNvuD%2FdILSuf%2FkFlR7FGDQAJmnwzzG%2FaFR%2BV%2B%2B05wTKLSLtmUulH9KWYafojrCdiWfp4WBix6erwfQTihPBOW1ueV3i%2F54hfApHRQnMjKYLACvbMCW9m38MSmZPo3%2Fdal5LD63cLdK4lxtWqL8nBKIi%2FYChP%2FYi9wiJFTdf7tMFrgstlPFHbE5GykHCmofE%2FYxhifBCcdXg6oR2z4%2F2EW03mFc%2BdiTjH%2B2tMWd1f51NgurR0%2B%2F5qoXuxI4De83Dj8AFKNOktu%2BcpvADiOfF9GqnC6DST0edb0BC5Umr4p8XpUUn%2BgW7YH6WBFZ6vg%2FSJM%2FuZu5ncb1UNqwAbiIMt6k5SG5PixJrVpPs7BtUOkja6Rsa2vSIXVI4XvqDZVhDpDh9VsKRFF2i14WCgHcXkzAyjNjaRjy3zGI%2BIyGcNh0P8urxaCySrPs5mFh6q%2BbPFtfhW95Lz%2BNpDOvz%2FND1aCa6smuY%2FQAe3YXAz1EotnUZG19leyaev41t7Krxtly2XQkzCXpZnNBjqkAeT6d666Pr4VUCYjmN9gGa4AA4F%2BvCjd7ArIUc34OU8lRwwkzHcGrlPIu3gaFXGAHR5exfnMIVwW7FPE2ZeI2wgHXGKZkQthULItZ%2F%2FEQX%2FwYomufQrXTK1k8DqBgi1MC4227s%2Bzp2ABjVzRvfmf45vjb2lZFMU6NWtoqfZL2w4cJhX6u1V8uTWP%2BqpI5rMSwXKen2sdKCBGMeCP36C032YUWI59&X-Amz-Signature=0047e219f2645e8f370ac1a4ecb44de85b4a085f8acd505462fd96b45ff36ae5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BLVN2IV%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T033003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCTL9ogXvOPFLrBV70psTLRa1HoTnlO%2BEl6okLld2aGtAIhANE%2BLjVx8%2BKcDp5EkXN%2BEooQw9ps9dS0Kr9is%2F%2F2pW8kKogECJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwgCECnN74t%2FptP5Iwq3AP1myuiZ8KBd4qInC9bS12jcLLh6Cikh%2FFKU%2BSy5yms%2FYPOyFt%2BnOgIpw8L4V7C3cMZUwAEXk4wy7vtHdu0LeFLaXSIr2fBJUMMULx%2Bg%2FU9ysEqj2Ux%2Fywc6zhmNvuD%2FdILSuf%2FkFlR7FGDQAJmnwzzG%2FaFR%2BV%2B%2B05wTKLSLtmUulH9KWYafojrCdiWfp4WBix6erwfQTihPBOW1ueV3i%2F54hfApHRQnMjKYLACvbMCW9m38MSmZPo3%2Fdal5LD63cLdK4lxtWqL8nBKIi%2FYChP%2FYi9wiJFTdf7tMFrgstlPFHbE5GykHCmofE%2FYxhifBCcdXg6oR2z4%2F2EW03mFc%2BdiTjH%2B2tMWd1f51NgurR0%2B%2F5qoXuxI4De83Dj8AFKNOktu%2BcpvADiOfF9GqnC6DST0edb0BC5Umr4p8XpUUn%2BgW7YH6WBFZ6vg%2FSJM%2FuZu5ncb1UNqwAbiIMt6k5SG5PixJrVpPs7BtUOkja6Rsa2vSIXVI4XvqDZVhDpDh9VsKRFF2i14WCgHcXkzAyjNjaRjy3zGI%2BIyGcNh0P8urxaCySrPs5mFh6q%2BbPFtfhW95Lz%2BNpDOvz%2FND1aCa6smuY%2FQAe3YXAz1EotnUZG19leyaev41t7Krxtly2XQkzCXpZnNBjqkAeT6d666Pr4VUCYjmN9gGa4AA4F%2BvCjd7ArIUc34OU8lRwwkzHcGrlPIu3gaFXGAHR5exfnMIVwW7FPE2ZeI2wgHXGKZkQthULItZ%2F%2FEQX%2FwYomufQrXTK1k8DqBgi1MC4227s%2Bzp2ABjVzRvfmf45vjb2lZFMU6NWtoqfZL2w4cJhX6u1V8uTWP%2BqpI5rMSwXKen2sdKCBGMeCP36C032YUWI59&X-Amz-Signature=0047e219f2645e8f370ac1a4ecb44de85b4a085f8acd505462fd96b45ff36ae5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZMLSCC2%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T033003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFK1ZaF0gbss2NhlgyeTzoP%2Bp0eEIY4y%2Fom%2Bte5Fj1aKAiEAr3KFzX0kKmvCm470YgzDpdlXWnbxyDjGhzPeVCxTD%2B4qiAQIlP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD%2BRMueJlNMWsEVjUyrcA0Y1YYhyLwBTnxXNKa%2BE%2FAVyVWtzd5Xp6rY4U21aGQP2xjtPI1gdlyQpil6zAEUeE8nDQ%2Frh9Kk6CUamPSsKGlivCccgXDFXNyaTvTlXg0%2B%2BnNQ%2BxIu%2F82h0OrV%2FX%2FPp262hB%2FOzVVYKpJutJob2pEsILnU%2Bag9p4TLVJ2OQ5mBjVhvHvs%2F4FFwbpG0ZyrQql8E7yszwd%2Bfz6fv%2B%2FhvLTGwn0j5BHAl9Ty0SUgxYr%2FGii52i1gtSgTPqrPL4YUJ286SxsEwRBrSRIKzqqESv1Mns%2Byamfcfj8rvmXE870aOOpuKUfBHvPK5qUaI6Rh%2FVkwCJNhuUNbCIsTEqrnl50rjFZf47JlT2PhEB0j3%2Bx9yHnmQToX6stK0FWpsyRsX03kC6TDh1utqDqgJSMCMO0FlUT32ye1QpQa6gobhVBPprfekPYRRPObyvtCt%2FyuFD6OudEhS42TKLV87SCzcdX3ZzrSKyfWwR8NDYjAfGSN8PFeSuELCXTj5TTbSBllXyB2lnf3L678l5%2F%2BkB9waV9ApTNmKIBgioB5bEMQmuBxjTkIfvKRlWTCFdhBSwKFdC4sufyyna011eoJKJplhvZoFL098Ns%2FEvQefFm5kR%2BfNsfa9DTIow%2FIywu70xMJalmc0GOqUB27SOOrWa8XEU4jqpHXiAXGLspCazlyl%2BA1%2BQAuvMms8bu9%2FujMQpnOOk4cSWOe%2FDNIdhKQ6FtwY%2F%2FqIZQRBb%2F49CMMVZNfDmxk26vi4bmlWZUVA0Eh%2BibjCk19PLYRSGWPSNA8xS4etZioqzuv0RalcjEhw41us%2BgjDkqutgmgmpECs9eugamA83JrmAYyWYaAJvzIT%2BWu5O%2B7naOupPZLehdJZD&X-Amz-Signature=7324689069c261e3550dbfe791caec21a34dcce58bdf36fce85ce0db9113f4ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

