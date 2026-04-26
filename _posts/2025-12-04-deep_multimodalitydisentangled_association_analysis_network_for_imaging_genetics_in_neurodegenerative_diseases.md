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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SV3GIGXS%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCYqilLvmAwDbfT8DTVnKcBV6gRCcqhV7%2Fdd95uOhH16AIhAIWF446FRoy4cCCM7B%2FRYCIb34qxhriiVj2MWFc25oeOKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyN%2FZfDl7Fbnsd%2Brz4q3AM4aLbJhD9LQeWSVWjzL%2FmYxTiD%2FkR3m%2FFtW86kXNgHfZqulzESTVZWIiZBnJ13qbJA4YosiemN9G5LlOabvh0HGacpHm58qEoXlqudVErKxk3U%2FjcQYui6%2B5lWp63KpNKTSGbAO8Vp%2Fk9gdbg6QyiXRMr%2By9d25LzWuT4LwO28J22du26pVaOMltK6Du3cLyCsCozBie3IRY%2BWOR15IMOUdZDGROyXgs88AoCVll71LDKScb8GekOAxCNnrhSjvTa1Mj3AoRgiF9kLFW%2Bom2%2FYsPe%2BEqGEVUnE%2FpHwjKCTiD0elEmCzJreVjYdwyrdZfmgngsj7wRq6krEGHQhg4IhGjn%2BXrotILfGA43HhKYy2K2jclETnKyPPmxDzoZgSAETm8CcOfoLkZtzLIlJueL6YVER%2BNY5AMlFGAFNZEd3inwa1FO1e4oXhUMO5lMq47hCf19BqoN98tUsJ8gPOnBY92qFEufg9Gh2EsfbLk44OHZbB3YP4H5pLhorceEWekLUock5LB56JClMkoSKPkLbbrymvhZJYs5oDpQ7AYrvRwoL05TrvkSugNHsjbDen8sONgey9YVPBdO63hMDl%2Btdwb3%2Bo2uD98HFBGzbB8PKa7zen2yTHHXLL5CApjDq2rbPBjqkAcdHq5hE1uXQjMFgg%2BUNkK8Nu0p57GNUkQG%2FQlgYPSdXN%2BZyfcTMfzeMcvMA8oJ5oxf1l%2FNnqr9XZjzsYaSf%2Fwm%2Ft%2FC3XhoP2Twhko9vbA71cVtFOa2IObzdRnReTgWBL1Z8QDuWn6xaur7xuhtTm%2Fg2eyQUe58IRTEUyU0cpFLGMobxRMCyvTDdaUAZDy2FWjqST9DKPf3o50MWyLZAjUyaR6tZ&X-Amz-Signature=a3a76a382b5b9e82c97fb728795fb2c38c67cfeea4d3eae75a7740f8bc7338de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SV3GIGXS%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCYqilLvmAwDbfT8DTVnKcBV6gRCcqhV7%2Fdd95uOhH16AIhAIWF446FRoy4cCCM7B%2FRYCIb34qxhriiVj2MWFc25oeOKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyN%2FZfDl7Fbnsd%2Brz4q3AM4aLbJhD9LQeWSVWjzL%2FmYxTiD%2FkR3m%2FFtW86kXNgHfZqulzESTVZWIiZBnJ13qbJA4YosiemN9G5LlOabvh0HGacpHm58qEoXlqudVErKxk3U%2FjcQYui6%2B5lWp63KpNKTSGbAO8Vp%2Fk9gdbg6QyiXRMr%2By9d25LzWuT4LwO28J22du26pVaOMltK6Du3cLyCsCozBie3IRY%2BWOR15IMOUdZDGROyXgs88AoCVll71LDKScb8GekOAxCNnrhSjvTa1Mj3AoRgiF9kLFW%2Bom2%2FYsPe%2BEqGEVUnE%2FpHwjKCTiD0elEmCzJreVjYdwyrdZfmgngsj7wRq6krEGHQhg4IhGjn%2BXrotILfGA43HhKYy2K2jclETnKyPPmxDzoZgSAETm8CcOfoLkZtzLIlJueL6YVER%2BNY5AMlFGAFNZEd3inwa1FO1e4oXhUMO5lMq47hCf19BqoN98tUsJ8gPOnBY92qFEufg9Gh2EsfbLk44OHZbB3YP4H5pLhorceEWekLUock5LB56JClMkoSKPkLbbrymvhZJYs5oDpQ7AYrvRwoL05TrvkSugNHsjbDen8sONgey9YVPBdO63hMDl%2Btdwb3%2Bo2uD98HFBGzbB8PKa7zen2yTHHXLL5CApjDq2rbPBjqkAcdHq5hE1uXQjMFgg%2BUNkK8Nu0p57GNUkQG%2FQlgYPSdXN%2BZyfcTMfzeMcvMA8oJ5oxf1l%2FNnqr9XZjzsYaSf%2Fwm%2Ft%2FC3XhoP2Twhko9vbA71cVtFOa2IObzdRnReTgWBL1Z8QDuWn6xaur7xuhtTm%2Fg2eyQUe58IRTEUyU0cpFLGMobxRMCyvTDdaUAZDy2FWjqST9DKPf3o50MWyLZAjUyaR6tZ&X-Amz-Signature=a3a76a382b5b9e82c97fb728795fb2c38c67cfeea4d3eae75a7740f8bc7338de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664YSYKCKR%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080819Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHrciW6nwpfddbTkqQMIkuCRAWaXYCK7%2FPCZuFtzn3tDAiEA4GaeHSsiHyeSjcs0BxoxOIvSMdTL%2FTtc1JHdEzqHbewqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJZHnqHezkIRy5kubCrcA1aF5Y278JL5CsOi58oLAi7TmdkXyzTPDthgx8QPMtNEg3g8c36trWmd4I379M27j65SUMSyzIxk2CiTLALs563t78uGNM%2FgPr9dmbXPoQhiPTN%2Fy2Rt%2FOnjmqGH6Ay03ckIV%2BiqcTRtX1frabOk2QPB%2FvZ7epd1FozBJMorCEoalFFP%2Bu9w9PdURK6Q7PcRjhEDckCGZ4FsWiBTaGAo9cnmHq15aC7Ct1fDVwY0Z9UxiGqHf2GX%2FaVIz1xPx6Y9mCY0gwflOXosihBN72qLn%2Fjyz2tkXHkRtYidF7q%2FEcW2vT5WEyCBLG07mRG7X4kTeGkTD8kwYsQaqcVe2p%2BGNl%2BMdGuhgoZsInVnBE9JdR%2BfZfZIXCdQgV0kkRrvpZHXdX%2BOsXeE%2BsXzmy%2F4RYIsaGV%2Fx59HO1jrWNSjWXiVbqcnmuB7eYFJ1Nv7tJqVYPZeGeV4m4dj4%2BEb1KCdNMsHUNCzHToMP%2Fg61H3%2FXCglrDnKfJkKPbkEFk44QiXcqx68wK%2FGc6Qc%2Fje5giVXTk4QR7FYrSHcyaaIaiSarihm9buKvKOGrw4BVYMy0pWTSWOYQ2l5OcHvTevInbHluJO0cgU1cmi8XF2WqpCjJ3hWddYd1f8XLG2DJ8OQ0KBPMJncts8GOqUBGPc%2B8Mklnqz0j2slLHcSrQYCQQluMNd0sdUHArcO6cm%2BaILXES%2BVvs4y2R0Jtqcm3BUA4fG1Dmdl65JucUw4rrJRaRqItStN4Rf7GIe%2BdlT2Jbmvlm75YVGouKEb%2BZineLPGGWzHWvo54RsCd1ujWIBRDVjEn6U%2FyCmVstKXxr0hZrpi61zpHXW0BUxfe8hYL0T%2BrEWQ276yafsf2hFJRKcqyD4S&X-Amz-Signature=0c214b2a2b9f394b2441910d36ec01f4926580604b6fbed2747530366ffa9c89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOCW3AG6%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFRO9XR1OTFFGgNrRebLCBWydsCRmW4mEBBsSxckeBxqAiAzltttBk84FFMhdawTa5XS6EdjetC7fXvZL8nwsemj%2ByqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkUeWuvNqfdS%2BuEmdKtwDgV9szhq6jasghIC3m0Tot5LzSNIP%2B%2BfM4xbt78qH9Fr7Q0G4FrpzU8H9ZTIGaEycdMJClClRInahjUZKdTtC4HLdBsU2RMz9vmlcqBKRwwVNaaQwVb4EqQN214P4qEkLdBOSVl8nywWJvpqAaLRZ6MF5PCaqNd8OBQTuhUZ8%2BAIzCLNHN0ocvDgFT3xtq1ZDa%2BykPg%2FCIfj7Qym0dJJcnzbJkVF9SLMyjhBthmMRaeTGyIZty%2F1JSyBlLzo8vhwOFAemHq1MnVO7CiUTr62Kkpn8SkE8y0JoX6bU1JuqHKOPyeCr8B3Mh%2BRN8SmNbcFOwWsNC5P2D1f0cIwT%2BgexsDpE%2BK9RDFcBSSoqx9PvYyxvqggn%2F91AF188xam8kwSrhU7PVWxnBODeGXtFTlJ0G24ya0u5o3Gvh%2BDkeyaTRfhhwqULCD4k0kkoOuRQ%2FtN2hlXcZatE%2BLqIhfWXxLA14q97TgrT61WpUgQdaJQzacZTwDEo1nk7WF%2FYUkmd%2F9K3KYq84gHPwhgdPmolQjAFGIPvhUTdLWn%2FeFa8qHbHu%2FjBLPrvFskNKI2vUt1WK0nP%2BDmH4cSO5gk2LiERHXHiRzQ8XfmI%2FV2YYu935j3CYU4vrVlowrtm6TLumZAwgNq2zwY6pgEB%2BeHpxngs4h%2FTyaCB9M1LwkMS2IxmKcYwRBw1jSRuI8BFop22guNtFdKwjd6uyz77TkncZZCq6vQ2VTX7jO%2B%2BGPDPy44oFCAzye6Ygfw8ppl04mVQzmp3mjha2u6ViLaBceIqiLO8byFd6oZ6t3t6MJkRWyboIdafDJTtKy%2BtusZQ6o9hN7DltopvHpzaIQzXgZKfpNkDW3kZ23Q9KKM7S11oVFkJ&X-Amz-Signature=465b377cc1f081daac31201cf5d5581343edcd3c43d5b6cf9cddc4d5fe23daa2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WOCW3AG6%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFRO9XR1OTFFGgNrRebLCBWydsCRmW4mEBBsSxckeBxqAiAzltttBk84FFMhdawTa5XS6EdjetC7fXvZL8nwsemj%2ByqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkUeWuvNqfdS%2BuEmdKtwDgV9szhq6jasghIC3m0Tot5LzSNIP%2B%2BfM4xbt78qH9Fr7Q0G4FrpzU8H9ZTIGaEycdMJClClRInahjUZKdTtC4HLdBsU2RMz9vmlcqBKRwwVNaaQwVb4EqQN214P4qEkLdBOSVl8nywWJvpqAaLRZ6MF5PCaqNd8OBQTuhUZ8%2BAIzCLNHN0ocvDgFT3xtq1ZDa%2BykPg%2FCIfj7Qym0dJJcnzbJkVF9SLMyjhBthmMRaeTGyIZty%2F1JSyBlLzo8vhwOFAemHq1MnVO7CiUTr62Kkpn8SkE8y0JoX6bU1JuqHKOPyeCr8B3Mh%2BRN8SmNbcFOwWsNC5P2D1f0cIwT%2BgexsDpE%2BK9RDFcBSSoqx9PvYyxvqggn%2F91AF188xam8kwSrhU7PVWxnBODeGXtFTlJ0G24ya0u5o3Gvh%2BDkeyaTRfhhwqULCD4k0kkoOuRQ%2FtN2hlXcZatE%2BLqIhfWXxLA14q97TgrT61WpUgQdaJQzacZTwDEo1nk7WF%2FYUkmd%2F9K3KYq84gHPwhgdPmolQjAFGIPvhUTdLWn%2FeFa8qHbHu%2FjBLPrvFskNKI2vUt1WK0nP%2BDmH4cSO5gk2LiERHXHiRzQ8XfmI%2FV2YYu935j3CYU4vrVlowrtm6TLumZAwgNq2zwY6pgEB%2BeHpxngs4h%2FTyaCB9M1LwkMS2IxmKcYwRBw1jSRuI8BFop22guNtFdKwjd6uyz77TkncZZCq6vQ2VTX7jO%2B%2BGPDPy44oFCAzye6Ygfw8ppl04mVQzmp3mjha2u6ViLaBceIqiLO8byFd6oZ6t3t6MJkRWyboIdafDJTtKy%2BtusZQ6o9hN7DltopvHpzaIQzXgZKfpNkDW3kZ23Q9KKM7S11oVFkJ&X-Amz-Signature=938bc5bf4817435526b6e48ffc663b5aa985277732822b028941a671de818aa2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LGD6BOS%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHwbI0zeWuonmoCwKMiwuFUprk5D1DcrsWyfMmeOc33WAiAX21JiwJnauDF3mpxj%2BJRBHtCdX5mD0WDW3DTDGL1tmSqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMiRh7k9As%2BzCiHuz6KtwD2606lUN3q9U%2F9JrBo5XEEHguyxSdbjSQTtXLx5G39tIYSQaV4qNgRHcuHQ1ZZty3JVNWSPmB1Ltax7%2FdnPqA5qUF30a5NYXs87qwFZix4YhrMi20viLoEYHrXa5Y9MHm6my25JbaRgVxt9GX1cRhoaMqLClneOYQ%2BpvD5yuFGd9XXa3IopKYGyqzi9etAq4K81Q%2B3DyriOJNOurOwxxFRzWrNGSCq9n%2Bq%2FRvLmRRK%2Bkm6%2F2t2pWpDDTS3ytMG0tZluAP8Jr9SFCeRfqNlJ9znE3udBCgdknjXd7HQFR28xG2h2ZWdaofbe%2FknB5CxqDUtie7AYmeunQILFtOGugy9j1cV5e9VXM%2FfE0yp%2Bqg9%2FeDmkj6Uj1kl70CBEw9WJR231tngBQwspPmq%2FVS3GowxSWaEb94FEoZLB6uLhONakTXjWOvVVT1Ijy30lhmIfTclS6bosrB6L1%2FoGhcf4Y2Sd4P4u6hJZdaYDbcDhZQVCAMtRQkPt4UQgmYUesPHNzynVZKR2Uqpx%2FBeuqUYC%2FVsyXkzNAGG5XSCPm6EaD2D50gdK%2FqQSVYMwZGYcIwS%2BnSzNZgxlwvNkqY0c1DQpxO%2F7UYqihjLKb9coGCGjiINv63Bx5KW401t1wHJ0AwvNy2zwY6pgFBqWzgGb1cHhpCtRTVfFDwS3L0LZPy%2B8F%2F9UBZJBbxw6XYCJ%2BmSCw7Kp7W%2BG3ixzFDvcCwHNWsYE%2FvDCCzqiFtiodOGmblq83KMJJWsveQSJt6FuOOSr%2BAEYFd%2FRb%2BxDJSWyqnKhO53kFnvfQmAPDDA3SC5dzqFWaCWp2hEp3IsKkjAm21Djb42vhv9hRiqoVVYN87EMx%2FMzSDtrcaAw95qqKe%2B5kv&X-Amz-Signature=ee8de3c02ee2e69539ab7f9b1a59f83115b45aff7244df52ebc111057eea973c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSEIJCNC%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBKcIjEs%2BhC2nq2uBa0EjEUEXvxYP%2FIR0gJisFXXljUTAiEAkOmhAQ5T05aSqJfjFbfqunrDrRtXYOkVouvCza7ENsoqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBZXjhzlBkUlLeWWryrcAypVC%2BAntOi82GhyRhqIB5JK8fDlLov81pk52dWH%2BUrN2Sx%2FJC1H6s%2BGXt6%2FtTetpMjrJvivaAe8Xwcs9i61DOnh80DlpcQssa3uY91xFQ256bkAUJyrW0%2BLCS2KKYQnAhcSN5juUI%2FzknvlId9TEaMwFFmcNTtVh6VzhY5Jr83X7NfzIEjsWnx9PoESNG4VbyqfHJVj7m0NefYj3WRPdcbvEsBJaS3UfWyWVbY2y1O014tiLyfHScGzeozzTuJim8XgGFTzYGgtFlDFx2Hg5yiqGMVJHHokErfklylBl3xJed7ATk6hjPAzjlyJKc3swi0AVV1Lz4yQgQsT9sxMIevCamBBQCnGDcGtYSSMe67iws%2B2wxn3UJkKAQTWknEaxvBJ1CJaDx0cPuluiMIHWHOyjcJAlpwgrhWbfbXWK9J6yV9yiKo4FNqOBQ%2BoR0nMMWZKmAeRFa2nYuN7KPRyi719BrVkTTmEM%2Bq7qWWmFPnAzaJlIz2cuofDitGvf1C9Sfi8SSRiUk5yh6PPYeY3jRyx6%2BqlhsA5p%2BRdCq9TVgA%2BwLsINOqHddZ9oUmDai%2F8Ju4dHQD4%2BXAPWfTHP71XvMY6Uz5%2BGO6xhYI%2Foawh2nMOdi8Llik3FKaR6vAhMP%2Fats8GOqUBUgRAMAgXJFRmEtZqZvorU27nhqdi0tzkUM0od3lS68A63eAVaD9OrfkSF0yW%2B8GCR24l7scGKvCBGRLh6EzvozH0anoGMuVT5WeWuu6EpQyqw3fwKtSt0%2FXYo2Z6L92j1N2gDHnrvMI8nH3rtkk%2FP6B2%2BZRC4ip84OI3rbGzJPmGQ%2BG8ZCJhOc6mO1gFEUlotF5lxlfNKvp0e5BrraiqEcJamGJN&X-Amz-Signature=10d3c70c305672d4e7e4b9232788c56ad2ed5502e318a573f78b4e9622c31ab7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMPMGTGE%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080821Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICJMAP7KrmkFTA%2FHT7U%2Fomf5WQ1sKxIUbnYgf14e0d3oAiBWYmyJjEdp47Ifa4DhX91DwMyXCuS%2FPOMg4fw1PbZfkSqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BcVuNqHeDyaGBHkVKtwDmuXwXQps6g1%2FB6Q%2FwcTh%2FlvtwiLzR7Wq9NR%2B9ooQBsWD7hSEt%2F5GU0GpAkGC%2FBqUyPhKiPhXDuYk07vTERtvLb%2BkpM7R%2F5nHDGr3lUaselOahJbyrH6hkKvAhU4H9xFLDS80lCM8v4wY%2BDLGLSJyMNbqrrxHnJ0vmGvxwZIjujrdi2BeTz76RgYEk%2FtgCpxKBeyW59WZOyEZwOkoy8e4NClg1WNICkY0GHBcAsev%2Bopka9afNbo3HcUFNjUsBmyHNzK1rF0IF9llMMJeads8yqBHLP4umrWk%2FLD5AtCiSgGj%2FXAQ%2FBaufDy1fH1UkA%2F0gJHCepFsTTdlr6QFBpKR%2BkbHAHkTk7dwsn%2FO2PMVQRoSoqzPYFTiHesziR9rdCCbwjtYa%2F6t0POsyQ1PK1mmHPuVaZJ7q3IvbKfZF%2FC99kbb8GwwuIlHXBB3EgvtFxf1QSYWjklSqlALZuzVYKO6GA7v%2BjmEogHSpVqiKa8HCkW2PsU%2Fmp6PNUxURMvDmxlc%2FpO2bzlC%2BsQV%2FqOr5CkwI3Wq9ApSibqTSP7uZiThI%2FqPGecR3yn%2FYkSpVMqTpRVT%2FyQAf3pgfOwJgG%2BZFfVTT6HY4aP1mgnrbLxHnkVQEKIbEGxnV0tF2knKHjEwytq2zwY6pgF03H2lAmF1dJfMeeXPJdIt3%2BQnCG1gzE5nrwEudHXQSyVT%2Fy0YV68f131ldzxBM%2BCq2AhPCxJ6GEGZcxY3nqC7CR2SRpNl8Gtj3nIoletN5bNwA%2Beymt1gT8NVY5UU18A96UqlSjbhEer%2BhgUEh0ZQ6fInTwFKPw4ZMZH%2BroT5Qim%2Fj5pPZ6O6seRXd9l6FN5sZtfsXNKULyrPb8KLbZ0Ium1p18A6&X-Amz-Signature=22ea449fb76affbaaf26a4c46d5ffd0ba8a2208a87e0d3c52ed08ea377a3314f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623RRM725%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB07S6BSQUC9QZFZfo8mSIO5Z6gmQA094ncPxdUo0tI9AiEAhjWPLkUhCAur2nl%2FA9fqPM9mDsTkNw3LnOmBXNU5b6EqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEHh%2FgGKcI9KewPnNyrcAxKSK2zFCmAEpN27EpWEwqZ15tzIOSIT2fC1hahn%2BJDxjp149MefS%2FUTaR3kObQTuqIkWAXIWB0vdxuZoAK%2FLyZTQGHRTax3KZ1k%2BwQUZ%2FnFFHPWdxUov9SxjiE7gE37pHKXaN4ZABWDw0ku3vyf9Y0uMU%2BASRy4J%2BnYanS1KH%2BQqzad24cWLQjcE1spGJSNtpCnwEgpSf78oXeQgpIY5mkGpESC6jJ5%2FsH2Qf5j3LeruBJaFO0uKNbGDlJjpa%2BN9dXGUiaN08QlB%2Fc6D2%2BM422fnjD%2BTkOI8b3rOvQ2ZP9Ef3HWr3t5FiMUqeTT1gIplBNwliniiNecNiTFYgzfdFPFxOuE%2FgZt%2BJtz0nRs1Tmd6Za3D6PBhVSn0FEGdcC8cUnaHPG8ZdZNbPP0vgIfchO3cUP9JYwTGmVkc%2FeTgY1xgFFMRXPdjYNUbtnynTrijGpOn5y2k6eH%2Bctfz2KWZuOrrZv3L2upPBuwo11OOVeN405lU%2Bg8zNcxkUkObah95WxZ8O7q9TMqy28cDpXcD5nFDx3kcCacMUb9eggb0zne%2FDYGSqCk%2BC20w4dfqBDVVx0sWNyQeoZDdYm4VfjYoxiBa1DcyS6rkFTPsVk8Rzzy38Vkq8Ec9euNSfC3MILcts8GOqUB6%2BiRdkfyecTTEyRduSeq%2FKBpEMAuYXr0DjZQciv14eSu4dIj2q2O2X4w9D87HSHq5MryHogCZvkbYL71Acx2DCq7GPHeAPh2D5sxBV7S1vQLgsfBmbpYJknC9uFT6AjO8%2FEJBfergl4IoS1IxwECAIjqWdfDLL7qm1rZgzRvcSSmEd%2FygZONFIPTNs1ku6oHAsrVWJfwMcHDzTPvnE%2BuTfJ3P%2Bfe&X-Amz-Signature=3fa6e4322c3f1676dbcc313e52281e57b94cc7f92a5540a8f1f16aeb0e291d7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623RRM725%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB07S6BSQUC9QZFZfo8mSIO5Z6gmQA094ncPxdUo0tI9AiEAhjWPLkUhCAur2nl%2FA9fqPM9mDsTkNw3LnOmBXNU5b6EqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEHh%2FgGKcI9KewPnNyrcAxKSK2zFCmAEpN27EpWEwqZ15tzIOSIT2fC1hahn%2BJDxjp149MefS%2FUTaR3kObQTuqIkWAXIWB0vdxuZoAK%2FLyZTQGHRTax3KZ1k%2BwQUZ%2FnFFHPWdxUov9SxjiE7gE37pHKXaN4ZABWDw0ku3vyf9Y0uMU%2BASRy4J%2BnYanS1KH%2BQqzad24cWLQjcE1spGJSNtpCnwEgpSf78oXeQgpIY5mkGpESC6jJ5%2FsH2Qf5j3LeruBJaFO0uKNbGDlJjpa%2BN9dXGUiaN08QlB%2Fc6D2%2BM422fnjD%2BTkOI8b3rOvQ2ZP9Ef3HWr3t5FiMUqeTT1gIplBNwliniiNecNiTFYgzfdFPFxOuE%2FgZt%2BJtz0nRs1Tmd6Za3D6PBhVSn0FEGdcC8cUnaHPG8ZdZNbPP0vgIfchO3cUP9JYwTGmVkc%2FeTgY1xgFFMRXPdjYNUbtnynTrijGpOn5y2k6eH%2Bctfz2KWZuOrrZv3L2upPBuwo11OOVeN405lU%2Bg8zNcxkUkObah95WxZ8O7q9TMqy28cDpXcD5nFDx3kcCacMUb9eggb0zne%2FDYGSqCk%2BC20w4dfqBDVVx0sWNyQeoZDdYm4VfjYoxiBa1DcyS6rkFTPsVk8Rzzy38Vkq8Ec9euNSfC3MILcts8GOqUB6%2BiRdkfyecTTEyRduSeq%2FKBpEMAuYXr0DjZQciv14eSu4dIj2q2O2X4w9D87HSHq5MryHogCZvkbYL71Acx2DCq7GPHeAPh2D5sxBV7S1vQLgsfBmbpYJknC9uFT6AjO8%2FEJBfergl4IoS1IxwECAIjqWdfDLL7qm1rZgzRvcSSmEd%2FygZONFIPTNs1ku6oHAsrVWJfwMcHDzTPvnE%2BuTfJ3P%2Bfe&X-Amz-Signature=6a07af88746186ab78d0ff3c3af9489c4c0a03bc07be193e726d108408f89afe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDHN6UMS%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080817Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD5TslNFW0%2Bi77kZkLV3rNHC2MnefE02IHLj94pkogIQAIgE4ervRH4lfZx5MB1ufijOiLwdIUrXa%2BP%2Bpb6yY1sniQqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGHMWX5GalAKUHIqpircA%2B6b%2FvuPCc1R5N2SUZ4ew%2BPfUrrekHWafnA5b2C3gwsJ%2BnCPuG6zSHZCRDmbZu5zQT5VUW9XRyKMvyS55zx7B9Id9wCG3nWpJmLzII1O9pMJ0zUwF0oq7m3RtSHT1cM1ICKDxb7lRdRiGBVxBQi2%2B7ienK%2B%2F8mifktaTQuoienYSjWefmlKiDQnnZPZnqcsg7%2BHsL5r2yJj5WAVJL1DUoXERZJPGODRN1%2FlwQakb4iXvjvd9%2FIc0iNQYDBFJIFlDCxPtjZfnmfNmiHML90qpbT8XxdXAGJUsK8anUDW4%2FWzWpQqd1DlVjgHgKOM4kdQNLWN0ADOJaVvw5aXNbNnaVCwFwbOyiwkyvOruSo5l5u2kLtBa3VZHxsMcytFbEp6AdmSp8FSTF%2FzLLW%2BoE5%2BMQBsBeHx%2BHqcntpghix0finbavc4KlhhqmNPZn3equAf0gz%2F2iBNfzDorikWMqiQ2VC%2BualvOQMUyv4fQ%2BnU3mtjSIHr1DFckpI76fVrwcEEap6SIytvzu7P5sWLoDbi0PRp%2BUkaDdTlAqixAZAXqpkNHnkPolbRtrtU4LVedox2dt3DUt8M0LYR1RZTWIdkO0h7Zmn1yQgAsDTn1mRnQU1gp2an%2B%2F%2FS2O%2B3r8GphMMfats8GOqUBziKNBdXngfay8zff90dSUz1qOQs85eOi0WlJ5C1B0rlqFUfRoAVpn00aLroGqXDksT14WHB9NeVn1cGqTpEY293Bu8ZzFeioAB7kPBBfkWBtIWhouD76ZauFu2VcWYy0VRSCfxg1Rp49cJHOnY7%2Fko1ihzmw9lr62CZ7l%2FO9X%2BzeOH707%2BGqgZaD9yL3IuR%2BDc%2BXytY4ZvxGKW6iL9u6%2FGjLhdu9&X-Amz-Signature=32561236be18c4f7742ea67e8ecdfadd333df62e54c6afcc57e03fff981d115c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AHM4AWM%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDh0k%2FZE7xjHNYD617DLKOGetERT6EbAVcK37PGeDzE8AiBEx7FFWIhMNCgGOLXaeTlKJcESus9k3ZM0pthHQabWPyqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BTK%2BJLGv8Of%2F7YEDKtwDzDszBcCwXAEfa9vSSIpmyzQr6LSWYyRspOBCc%2FfiWjnXYeZ8CNP%2FpTP3on0DnModfcVWnOtUhM18y%2Brbeb3tr8Ow0AgjPkA9o4brXpz4cVhYbbWONY%2FW4ccH1JM%2BJMvVNanxa7OCQN4%2BA4yuqFhnaZgfp%2Fdwe5JPmgFQT1FjbPJ0UtUMtPhEGqwncpMfab%2BeuRyzZEzvR4XuZdiwtdKsPhQL6fWgerCjVWtU%2Btqjs%2B3VrMXD4%2BFrHf%2F%2FDMSa8Y%2BiquTvtQzI%2B4ZXCdLte%2F3skitmWT2eHmzNJhe%2BRMtqgMSRatt27wBCLmnW8RNh8rocGRI%2Fa6hQsoFIJRgLDU07foUkMG%2FAovG5C3ONlK1DsuGwd5ZAsX02z9hXa63c2tIr6Xr1D7jiApq5SA3EV%2Bq2VsCUU6uErC7yjZAWlkuKEx9rw5hnO9bq4huqp13mMHqq%2F7c8rkONf81xzVykB4o8N%2BgCwWfo%2Bc0c78mcQXvIyyg82RqnTDInDTrFP7ROLCPeVTgqMnzwBVcrdYqCfaY%2Fkvxy1hMUfIP5Q5N%2BkKlV04wOXMBG7U%2B8%2FoqkZKHVhWDGKzCxL%2FMVjuokc6n8q7Tn1XOmC2dkKouG%2FsHRp3sIsqLch5WRbTbQaLPrblUwuNq2zwY6pgHQ4UNhIiohgLsOXYTP6jij%2BQ%2Fh3%2FG1uizo2jswZiywCq9hMZWYhJtY01HGPVXUVrzGnufTMZWy977BKYO19cc%2BBOAKCyTv8lc3CUPx7Aepdp%2BvYlwTJjUCJNsvguFnOr6Ffs4SMlLO2ztiSnmimznBhBcrvGz0tVcRayd73DmsBBiHG1VM8qUBnjtx57li%2ByLBQKoRqar5jImGupdQCqMgbgo3Mn52&X-Amz-Signature=6539d99d448a993e2fd6f51023811c32d91e4b3f8d25ac343ae1f16cf98a12cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AHM4AWM%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDh0k%2FZE7xjHNYD617DLKOGetERT6EbAVcK37PGeDzE8AiBEx7FFWIhMNCgGOLXaeTlKJcESus9k3ZM0pthHQabWPyqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BTK%2BJLGv8Of%2F7YEDKtwDzDszBcCwXAEfa9vSSIpmyzQr6LSWYyRspOBCc%2FfiWjnXYeZ8CNP%2FpTP3on0DnModfcVWnOtUhM18y%2Brbeb3tr8Ow0AgjPkA9o4brXpz4cVhYbbWONY%2FW4ccH1JM%2BJMvVNanxa7OCQN4%2BA4yuqFhnaZgfp%2Fdwe5JPmgFQT1FjbPJ0UtUMtPhEGqwncpMfab%2BeuRyzZEzvR4XuZdiwtdKsPhQL6fWgerCjVWtU%2Btqjs%2B3VrMXD4%2BFrHf%2F%2FDMSa8Y%2BiquTvtQzI%2B4ZXCdLte%2F3skitmWT2eHmzNJhe%2BRMtqgMSRatt27wBCLmnW8RNh8rocGRI%2Fa6hQsoFIJRgLDU07foUkMG%2FAovG5C3ONlK1DsuGwd5ZAsX02z9hXa63c2tIr6Xr1D7jiApq5SA3EV%2Bq2VsCUU6uErC7yjZAWlkuKEx9rw5hnO9bq4huqp13mMHqq%2F7c8rkONf81xzVykB4o8N%2BgCwWfo%2Bc0c78mcQXvIyyg82RqnTDInDTrFP7ROLCPeVTgqMnzwBVcrdYqCfaY%2Fkvxy1hMUfIP5Q5N%2BkKlV04wOXMBG7U%2B8%2FoqkZKHVhWDGKzCxL%2FMVjuokc6n8q7Tn1XOmC2dkKouG%2FsHRp3sIsqLch5WRbTbQaLPrblUwuNq2zwY6pgHQ4UNhIiohgLsOXYTP6jij%2BQ%2Fh3%2FG1uizo2jswZiywCq9hMZWYhJtY01HGPVXUVrzGnufTMZWy977BKYO19cc%2BBOAKCyTv8lc3CUPx7Aepdp%2BvYlwTJjUCJNsvguFnOr6Ffs4SMlLO2ztiSnmimznBhBcrvGz0tVcRayd73DmsBBiHG1VM8qUBnjtx57li%2ByLBQKoRqar5jImGupdQCqMgbgo3Mn52&X-Amz-Signature=6539d99d448a993e2fd6f51023811c32d91e4b3f8d25ac343ae1f16cf98a12cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRXLSVKS%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T080831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEL%2FyBrWNNcynuLblw4yNlRh0mrDxxDn4iZ728Q%2FG5GAAiEAmbPgETeQHSx0GaWDmYh2M%2BMpsXMFd71ze259cdgp%2FmYqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEggWg5Pq4EdZgIz6SrcAyHwjjS%2BCFWCaF2OpNRKcgKt26hm6%2FTdkkzV9IeNMaCpA1fkBEp0wNT2%2BUbzJHVErdTkI68vlvEpT42w4CV6lwssvnSQEOrotGWGG3DXo0RDdB9Ryx1ZvcNou2UjlBMcKEuZrkBip%2BwPp9I%2FiGIO0sdeMXCTE5p4LPt2bzaFUWNBrKR%2BKCsO11LG1YspIPAsPWjqhrO3KSxX7WQbgwZTKJuSy%2FbKd%2Fmd28hZA6NDajRhCxPcHzXPoBi2c%2BdthsgSanTbAhzevDX13gI7tHsZ4xpQbRuykf%2BQnqz4oRFcM70NpzutDaEDkwSGyD5xPl0L5e9hh7tsyUBjXjS0D1NBTroqDmhToXcQ4LTVfS7a%2Fue9n97BIOFmkNgY2ofPlTW4mVbVWrt1laDIEWQzKqXFG2zen8w4eLF3dciTCc98Jotz9rQllxBImc5tQTOQS23JqZhmgG97SRivhErlFdweyqlZ4Ta8nGfSCK%2F9SKevGdv1iBhHdbQjVfCzky1tUsOHm6gNJq8lwY%2FxurX%2FiqJEW%2FTKMZxWfny4nABFuY5HMsn3j9cAoZm8FxFsS2Xd7z3ad7J7G9i38ryef93dur38AmU8V0l9f5Vs8dNqaGwGl6aMeJ2i2hrbNwB5iXVqMJ7ats8GOqUBkV52TJo1c0ZQVUrzdYcQwH%2F68fy5ZeV3yzZsMx4JrJr%2BwperiPdzqDX14C5FmyFvwKHLbwrle99v0RAigK3CcSW1h6dh%2FvRPXLvN5FKeM%2Fdw6t92NnozDCwjBl8xjsHn3DjIQI5gcfjFJQxRMAuK8FXtfJcrgkjFSe%2BvTZwos3jMWwfeewHH0NPRxytxy7Ter7dsKnLnmI%2BE18mmHEaSsXMTqjMv&X-Amz-Signature=75b32af5691e4d22541d0baf39361a7a09af3235f24c766d1873a188860443b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

