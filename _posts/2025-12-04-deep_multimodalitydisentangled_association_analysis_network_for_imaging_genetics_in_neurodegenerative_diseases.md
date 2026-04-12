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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UA2RQJLK%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHjA6efu1B4gab4iSloxABQuYGu037ZfKX58z8DovNabAiA0WOKIZ6RIIL6ypoc%2FyW24hCZmuhprz8rbqCq6dmXMoCr%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMgUNL48cYV8kx2aRRKtwDTqqdDSUoKsP0mT%2FKKC0HsYPO%2BfxmEZXnuzE7mNpNG78GHIX%2BKEJqSizcfm%2FUbZ1ZZEscucvGqSQhiNaHn6TBQ8wIClSr0uByiNnBxb3jB5Wg0HUL07HwYp%2F4nJwht9SNsQXenLiM%2BNflKEj36uHmU2Pvv2%2FolsRdPfUZTG2W%2FDd369gdolg8OlXiXadjyCNn2z59XcEdpueRst%2BG2cx6wl0MbDBTaNP3fxgkda%2FexS75zCQUCNlIdkmNdyABH%2BJYG3%2BG%2BT7UhWO6fjci8hfCPycwYMWjPwr%2Bo27SI8ovrQB6Z9hiJBdjeydOPy9CSRCM7y0AZ051lpJeTSoQaH%2BnUNsWFim3Q%2BGd9S2HMNz%2F7hp4KDc8Sb7N5SAlaJkHC0fRRy43l78gmszoJUalgoPZkrzzb8vvTU1NHtAEQ2j2obCdyyQKaEek8UBty5XBKJO3ec%2B2TXFw3t5PcmvOROmf2sZV4T%2BEIEl0a5liXyZfth1VAbe%2BZf10MHVW7er8JZHFL3s%2FGUEIPNTi%2B%2B1%2BmoKsxXwg%2FEtb9Uj881QaSrkIJQ7J0qK6kCf6FcMT3W1K31mzPhR7a2yXG1fPDb%2BlNfyUN1vsN1a4KY%2BCr6D356J%2B0%2F6mbkdQYTWKo%2Fk2N0swoNnszgY6pgEQpAY1d0WNSndFaJZqVP%2BCqNBdbIc28ABII4chS5%2BgMtPIx8RhxPQj0LIK%2B3YdyXd2tNzqv2B1iBH0Jnyz4IRR1tB%2BHQM5%2BJOgyg74N9LgkHUooRkYT0QysGmS3z0%2FyS%2FdMkuPsxTCx0a4V1NWjTnReMFW4%2FFmvenma9BxXoj2J1zeS4sKHE2kI2rYTH%2BadsxnZAFptGyocatfQnpVRHkgEtmJtAX0&X-Amz-Signature=b3506a4d2da11fecd53c3cbc7594e8b778a7ec595853e798d082741992138727&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UA2RQJLK%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHjA6efu1B4gab4iSloxABQuYGu037ZfKX58z8DovNabAiA0WOKIZ6RIIL6ypoc%2FyW24hCZmuhprz8rbqCq6dmXMoCr%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMgUNL48cYV8kx2aRRKtwDTqqdDSUoKsP0mT%2FKKC0HsYPO%2BfxmEZXnuzE7mNpNG78GHIX%2BKEJqSizcfm%2FUbZ1ZZEscucvGqSQhiNaHn6TBQ8wIClSr0uByiNnBxb3jB5Wg0HUL07HwYp%2F4nJwht9SNsQXenLiM%2BNflKEj36uHmU2Pvv2%2FolsRdPfUZTG2W%2FDd369gdolg8OlXiXadjyCNn2z59XcEdpueRst%2BG2cx6wl0MbDBTaNP3fxgkda%2FexS75zCQUCNlIdkmNdyABH%2BJYG3%2BG%2BT7UhWO6fjci8hfCPycwYMWjPwr%2Bo27SI8ovrQB6Z9hiJBdjeydOPy9CSRCM7y0AZ051lpJeTSoQaH%2BnUNsWFim3Q%2BGd9S2HMNz%2F7hp4KDc8Sb7N5SAlaJkHC0fRRy43l78gmszoJUalgoPZkrzzb8vvTU1NHtAEQ2j2obCdyyQKaEek8UBty5XBKJO3ec%2B2TXFw3t5PcmvOROmf2sZV4T%2BEIEl0a5liXyZfth1VAbe%2BZf10MHVW7er8JZHFL3s%2FGUEIPNTi%2B%2B1%2BmoKsxXwg%2FEtb9Uj881QaSrkIJQ7J0qK6kCf6FcMT3W1K31mzPhR7a2yXG1fPDb%2BlNfyUN1vsN1a4KY%2BCr6D356J%2B0%2F6mbkdQYTWKo%2Fk2N0swoNnszgY6pgEQpAY1d0WNSndFaJZqVP%2BCqNBdbIc28ABII4chS5%2BgMtPIx8RhxPQj0LIK%2B3YdyXd2tNzqv2B1iBH0Jnyz4IRR1tB%2BHQM5%2BJOgyg74N9LgkHUooRkYT0QysGmS3z0%2FyS%2FdMkuPsxTCx0a4V1NWjTnReMFW4%2FFmvenma9BxXoj2J1zeS4sKHE2kI2rYTH%2BadsxnZAFptGyocatfQnpVRHkgEtmJtAX0&X-Amz-Signature=b3506a4d2da11fecd53c3cbc7594e8b778a7ec595853e798d082741992138727&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THNBYLQQ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGQ7ObNGvGx79GOSgoMINU9akWEoctRhpsFk%2BMkRQ7AIAiEAgO2KbLx9y2Vbv9kTi1dpGUu%2FAiP6uDWL2sVJjQb%2BPv4q%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDA%2FmzbS0n1BloUEO9ircAzD67KzNf7EGZz85rwzoXuTcOM%2FZ76p7j%2BmwyzTQkwq2HoyknANzIOr7Qr7vW19esRFw6rRil0L7d3R2n1Jf7PreM9YCrUbT6ClDF91fDKL4Zf4natvGmBMN16Wq8AH02k42qAspG%2BZbM8RJs%2BLiOBJYUjnkiaDEeIM3RH1QWK0ZiXVNMyMBavaKc0kY4IllprPLCQWN8GTFIOelBC3oECu6jdDEGKOO7Sc%2BHfTyw5G4kOeuWoZiBQOu%2FsiyRBQRB4wBOb36yYep7j1AvEgXuF%2BEC0Fh8u9xaSYdivpB%2Fm%2BYb3vNzHMPLBDRac4GLVDMGvSmiB%2BVSpx3ewoMsCNySwplwX%2FPudE1CHbpP%2B0hqT8GIAMavbPCwiIGTXkpkC07oENWi2Nu3WxQpEAivYMSENOD%2Bz0zTnZy8he2d6r8z76hUsKydjcsef4u8eiRl7Ry31%2FTvKbpIszySGd66AZd%2FbsK02vfaQ6k2SnWfV2wkNFxvA87HKp8jsry7TEOjzyO38nK0myTB20mKdRhJQbV0VpuiLa6lTyBinudtiOI4L6JBYyyjJNLXh4WTWLUZsJ6cquWWni2P%2F1bFwogW8R64ftL7GYcO9fNL%2Fj29Od8BhI%2B5ra2UJFQ4pNGmpbmMIba7M4GOqUBYjBapDuGogy9Pmqv0pY1UPsLJWrmoWiHYkDdO12cy%2BV1GEQZKI%2F9Mw9q2cgrQIlPoXbVelU4E5%2FcKIu0MSluV6ndpowWH6DQF3ZN55eFaads2PZ6rD01b74v8UfpvGNwGArEqiDUk5Tg6zXiXLtYyAc92eG8WyH6Eups0dqErpDTLDwcKByj6j4elTdJgdm3w%2BMqFFRvWPN1c9WzTM%2BsaTqrOa1F&X-Amz-Signature=71b00dfe419e1876cd7c0147d34961391cc048e0afaf285509829e8ef129891a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUBD27P7%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC3TzhU8XvxtBsI%2Fp1MuFVL4ZfZq2xrpOvn3lI%2F46LOSAIgA8wBxAOk2pi9fTrPDuH7wKknAR5YL5QS1mbRnh9Vghgq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDOhqu3o7NAIKuUEkwircAyF%2FqZuBTJwWj13FSfCghZZVEB3MHQpDPvmOdUbuQUMztDA5sNbAsjPcb%2FOQvMuw3rXsaCy5paRtDAebxiNo4GPc0JMm%2BbMt2I8j6xar4q9cRxBf7ntddLK1b2vl5pTLjtyTHuH9fw8CXsq0CViJdreDsPNNy3GpjPv5zXbHfU%2FPWQ8mXKxAERPgEEGb7ondAOVwElSRCR6TkxaJJrNgSMiZyliwCO%2BiAQQfvbGSryEHsstEiXC8F9Yy%2BC6HpeiJ7%2FRSUPbLhzhQKDxIEH9RlSFK1KAN5yM%2BFKy9LsVZ420JNJSvGexNAKGMnRMLuVLD2CV6FGFd9%2BhbP%2BaVWswPLa4RBzqVwTUwvjnZoUA2YN8Ed33Bdmu4m7W4FuC62lr6uF30Pofzf3aLfG0NoudFZGpFiVLEcbuWo65WR0Pv3JkLdliEiPNC7gsfALRB6lX3DTskHmACgLb%2Fcnq6WSKqtJ7aUGp5CbwrpQ9fyzxF3p1RvDr49g4XikIaLHavGsxH0mJ9DEin39zZQWsFZcXX7DTfgAx9PAXk82vpuoToHjemw7SePgVyUl9KbNVFXviHwK0dviuX1uhzzvKi3Eb6kLbUOnnZBA5YLrxdJM023NpLr3M8GbM9xA%2BpSCRXMM%2FZ7M4GOqUBCdmc8LuQBr6ejSGcTODc3SolsPOpBVdlopVJ0qj20%2BXIk4ox1bHAH65E7s1TNFzrAxQI7UaSEZ2i%2FY6ExI5kFbFIdaPkviQJarSg5ta%2FUVlSWjGeyTVBE0qCDUnQRTxjHI3oJXBym%2BHPrMUFRVWNs1KyO2TgK90prIQC52WmsGzlzAqSTRHxJKkVF0ch%2BTeZ3%2BFiAI3JXyYqzZGoWZ9k2LizCoEL&X-Amz-Signature=83d570c8a4a48dfb8a517405d8e49cd8079811712c8848d7735604ef2ee75548&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUBD27P7%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC3TzhU8XvxtBsI%2Fp1MuFVL4ZfZq2xrpOvn3lI%2F46LOSAIgA8wBxAOk2pi9fTrPDuH7wKknAR5YL5QS1mbRnh9Vghgq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDOhqu3o7NAIKuUEkwircAyF%2FqZuBTJwWj13FSfCghZZVEB3MHQpDPvmOdUbuQUMztDA5sNbAsjPcb%2FOQvMuw3rXsaCy5paRtDAebxiNo4GPc0JMm%2BbMt2I8j6xar4q9cRxBf7ntddLK1b2vl5pTLjtyTHuH9fw8CXsq0CViJdreDsPNNy3GpjPv5zXbHfU%2FPWQ8mXKxAERPgEEGb7ondAOVwElSRCR6TkxaJJrNgSMiZyliwCO%2BiAQQfvbGSryEHsstEiXC8F9Yy%2BC6HpeiJ7%2FRSUPbLhzhQKDxIEH9RlSFK1KAN5yM%2BFKy9LsVZ420JNJSvGexNAKGMnRMLuVLD2CV6FGFd9%2BhbP%2BaVWswPLa4RBzqVwTUwvjnZoUA2YN8Ed33Bdmu4m7W4FuC62lr6uF30Pofzf3aLfG0NoudFZGpFiVLEcbuWo65WR0Pv3JkLdliEiPNC7gsfALRB6lX3DTskHmACgLb%2Fcnq6WSKqtJ7aUGp5CbwrpQ9fyzxF3p1RvDr49g4XikIaLHavGsxH0mJ9DEin39zZQWsFZcXX7DTfgAx9PAXk82vpuoToHjemw7SePgVyUl9KbNVFXviHwK0dviuX1uhzzvKi3Eb6kLbUOnnZBA5YLrxdJM023NpLr3M8GbM9xA%2BpSCRXMM%2FZ7M4GOqUBCdmc8LuQBr6ejSGcTODc3SolsPOpBVdlopVJ0qj20%2BXIk4ox1bHAH65E7s1TNFzrAxQI7UaSEZ2i%2FY6ExI5kFbFIdaPkviQJarSg5ta%2FUVlSWjGeyTVBE0qCDUnQRTxjHI3oJXBym%2BHPrMUFRVWNs1KyO2TgK90prIQC52WmsGzlzAqSTRHxJKkVF0ch%2BTeZ3%2BFiAI3JXyYqzZGoWZ9k2LizCoEL&X-Amz-Signature=bfefa472ba21a8c109113f02e72bde2e8c18eaaf4f1e62e74ffa10fdc55c8903&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XVPPD5T%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC2PMAi1fxwvswsfaYdtGau%2Bj0H6kXgtqdJTkhH68NhJQIgZBYJ6MkCNqwBvLiz7Yz3zvE9VUaBZFvfaJh9cckjG4oq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDIJkTImnHQGtcBK5zircA9MbZdlicQ8NRoPPI6zZIdYjBCqoz%2B961gbdEQs4EmUsiEBV2Jbub35fEdEXcndGIA270wHix7UXUe2qJDXm9F9G9GyxXluR5xO30Myvdej9090Pbk0anm9eBAJkxktnL0KbzqvWQmNDI0EjRI4fulFkF%2BbuLKTGUXDe2K9UxJ0oFq2q0v1DCJGFSnt%2BOJk0dqgtIwvk9KzGbcv4%2BPKsQ70Xekm%2BQbpPlTremOeyiHnwvEoblUySrOCUl27DlVa5PYM7VeBAKKHQ0CVqLP5Jj5b2%2B3mhHU0jIZV3I%2BwY%2BRuuOqZNzHpUhP7YgSmo29JAsVfuQqO71zIS8YVlVdVHUfq1e6w%2FgKCfq1ga6b%2BwCb5a55wcBCtaRGT%2FgypXOTd9MrvMILjDRDcUMiSUo%2B1WlzpUbWXc%2BwnILq8HRMYen8lEmjGZycWD6JvPzSC0KPzxdM8QtfODMwk4RJw%2B%2BgIQ3zRPylTzzfpZxFBmKMLb2SpNU460xFVPlcjWAbEMqcKEKHrZxjQAt3Q%2BZspg23Y8k9m%2F6y7nIGwqF3Br9hPhCXyZCg3hWAXUcNg7D44Mzas%2FIcjlnruaam8sFn7b2oESh%2F7hxzw%2B22gYEY6yO59vn3DfzY%2FuPgcspOInuecmMIjZ7M4GOqUBzq%2BVBsrJJqaRPxevgcl6DM3LqBRWFVjVfOpDK1hBtjN841DYCSgnIkFa7TUKCI%2FDcuOMozOnuQhFJ0CHvlXjv9QtZSxLpXa%2Bl5GVlvSWChfJeRslBcDjIP7RNDLd4iNlqezMaf1A9lyL2sIXQWt1fUSrFbETGy8oRB9XnPc8W5b%2BPev4nY5VSu2Z2UwGJb3m%2Ftbwr%2BJDqDSLYFfMNksjoInZoEWO&X-Amz-Signature=3aa3a3e8254f879f2464d4077904f02c39e6172c1412248e7b8eb8cdcb19db02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTQK3I2A%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCV9r3BjvgsWUL%2Fj8ux3VMgmLulXFayLJavgIgTZVRA%2FgIhAJ2NWVD3ZBEg3pusSLlN9hJkOm59YUjE0kMbYtQX9zPJKv8DCFcQABoMNjM3NDIzMTgzODA1IgzfqbiyPSw5k70foG4q3ANe3YlzDLlCV5hxSx%2B%2Bq20bLlbFuwIjwLwl%2BTRRGTbSA38zCPmh0Zq0DK7avzEJrN%2Bw5nVDTjvyWCDS21ZePICy%2Bf4%2FeOxnuPDktSkvkYQUOvi4tu4MMft%2B7PYYy3%2FAOh3SVl3GWPAPU1QOf1jsBlFr0RdIipCA%2FeSEHkp1iV7sD6t1dGWp2nIWyqEN31rswzTg2GeqZTGH7uuJr6XM1LFvpeCE3axnOs1EwhpWqqSo87MVNRdSxkllD1R0%2BDHP7RYoPPrPnj5ZmS4WvxkAtITMUFYTVo86%2FGFaPNYzxcaL9QYgR2jqnel8P9UG1%2FCBVKUTTBizYuqYRIf0yMnF5UwsPeduCp6E%2FiaV8BjUyRtZru2X4Znuow9kVXJAK7uPOMAksoccbXeA20G2lgI4NdByyoMsM2lKlC02jnyIqyEO0%2FCkRIr9Iy16%2BKP9oga%2B6YtTtBnEaG7yhGG5c9UBiIjI95mp4OpUDFXkGPWSNhpwR9nnuZ6QhvDvt9stzLa7IZYd20iTHyZPGfoCGSkm4LQ%2BpL%2Fbo6TuJ9M%2FKpKJQlYeO0K5YBDDM4Um5Awsr3S7R8FFYVYXOEEDBa2M3yVQCHWCVkQOFicWpB7sfFHl%2B6etw4wIy5S3FmggQALngDCg2%2BzOBjqkARX7yafiTHPZ%2B%2F%2BAb5NzE65XB5KoT5JTyWA13kymqEBXI1g71cFi9W1RPy06Ztha969TsZmZgGKLY032uNjTdWaNIglAVwVYTcc%2Bb9ME3oXZWvdtGiFAvo9b6ZAc3%2FUykXoab2oyMYWX6dFsIbCBcskI%2B9R7qBPbJLkugIERUwNbMugkmEwEsTYkoScTHjRxMg%2FY4eIG7tXLP1Whi0BXMSw8zjEM&X-Amz-Signature=0a43fe36c715e113d5646e4b12b1161bf419304cf8f684c5c4b00a0012775213&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DIJIZFU%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCBHHzlGYdfVhAaNqKDn6eNTlDPpLfjhIq1%2FqoXaxiaVgIhAIQV0zWGuTrhslHwvuxXbSz4ufmXQh1nLXDiLlVDLxbZKv8DCFcQABoMNjM3NDIzMTgzODA1Igyj4XUE0lpGkTsrw%2BQq3AOS04H%2Bnij9HkZih8ywptZWth%2B0aCuPxdP1YFQ7L1yPbyula9whd7tObFf7M%2BPR7Q87E%2F6R1p9m1gIUyMYnIJ%2BuN%2FGslGQuA3J7z96WahgU4Wzr6O31%2FH5WeSvwQ34OYqSuM413%2FuZKin9aHwH8%2FwvJ0U40yOo62gDAd9NU9yRDt%2BKcHgpKdDNXACkUb3%2BON7z%2BQFTjhofOAlxC5SDsMg1VI7CQTKx7IWpHF8gkioXzKbfEjtjY5%2BZRqtXRKr8ZeKCRJ%2BdFxnKcVFDdcz4bnd2TLRM4dKOGozyOQO7GiPVySnDy1dU7B5GV%2BDbOMNEbUPu4yCvR3ZBIjqIKkSIM474Zf%2B%2FzBvkSJQab9zh1GO9LmdXYDTAeIwIY%2BOA%2FVAsovCfjz%2FqaH5riEgGwxHFgItljUNvG9As1AIYlzvlgLTIHlBa4WGn9x55bpwUEsAgsx7ESLCovaDbClBh5xta4R8%2Bp0Jt3%2FPg9ZUnxW4xYfdznY1P0um%2BeLcXH3soJJUij7%2BddARhUMmGDw5b%2FBMP7%2FdhpN2Y30nBPkhj7ru3bkgPTd%2BMoMdWTN9VtrdT0Bxz4cTNXPKJu70TjDW0%2FmAcXPCJ8Bz9Fo5W0wFoLHwIP0RF5ZVz1N2f24RSPyuHJpjCy2%2BzOBjqkAWsSgqT%2FciBkrWKMXdW1vZJst2j%2BY4YFMBnne1iFzebQ8yN5tcEFYRk%2BY8l69svAf0cEto0xhEC%2FgVjspnO46aG4RKxGhjWndTFmtUwz9ZXcpWl2tFmUrY4buCVawUtwcV7LvHt2g%2BGve3Qov5sscrNxmzVVEEiJMBpHsBhSlcoiYJCqy%2F3kAM1Xbp2a5RxPmfVIcmxtPKmGziDQvuUUjpSyqU9X&X-Amz-Signature=4db8813cd3dfe43f842b2a8235e18afb0eb2e7d324c9c94df2be5f30224ee03b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EFASRX3%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6T5c2PmO20G%2BhJFjUPEqA%2FHyQ5iH1hFx10G84s3pW1AIgYpPcASKHQmsqsNcvIkfAvPlTojsD8R1Y8rqPDKXOQ6Mq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDF5HIq4Ic%2Bao6bVjISrcA1WjduDUYabj2%2BtgxmVjRHF%2B5L2w8UJq3375fxrjfeLNRvNkf8xUjXhMZyhKdp%2B7o1WAf25AaOYTRH4Bjbu2RsALzrVZeyj0LRWvxryjgblbvA5zILlDEoQ9HCaofFnQNcUivjYp76gEeuKNhuTN3bcnk4AzkTNzwfCLGz2rHgucFem546bMhoWc3UO4MofZImDFdqlH%2ByuXZoHfC53FWa%2FRHy7bzGTJsOPOKZGnVUAfdfT88bVV2v9GY5rwJO6vE6zr77Aj01sVel7mxPyyoLR4W60AdIvjmt2IIcj%2B0lcaWYoUmZp5tm%2Ft5bywV0mVpgAi3JlavTYtwwIdcbYifpAPIEn9dn2FqZroo%2BfteQfOxXLZopspzs2jUDf1w81yeUDVYrY4Bf539OMb51AbTVBC9pvOA0VDiMMDcjaS87G9prETUf8jB9etKcckjAkahTVA3lrwDrk85QEA6S%2FvnGGj%2BoFV%2Bc2ylrgrSD%2FMc7neApxBk3XwivyuD0hMgaNBBXfcYKVXjuJ%2FLQuRWmHGUBCpPCwNZUFK8pySoO75BX%2FHcZEtlGhaJUP15xQZ5lWqJxN1BxKPJs0dT9v4kmKStZrmZiciz3Yq%2BlPD3khZZRkwFjX5ZXErmCfWQmVZMPLZ7M4GOqUB66KgMokxqSkzRVO%2BclaZG58lYd8PZ7%2FlWjUC1cs%2FHZr3XI3sme2kf7kXxMKteA4ZB1rdJlFDVPEy7rbjqKM1lGhmB%2B45qrYrVh3RuPrF67DmivaIi01d8hNj6q6McdSdU5x%2BJ3OwxAIjdYb4byc5YGsGTLjBBSBXAhYOAIM0FfaBMlkDqTMeIFn%2FE7TTeaTL%2FGMIC46cr19behlYJILg%2B2g%2BWE8r&X-Amz-Signature=cae98e4157323f09d37d0a890d6ed3b8006290a78c4c593b6d1ca3bdcd1e3f22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EFASRX3%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD6T5c2PmO20G%2BhJFjUPEqA%2FHyQ5iH1hFx10G84s3pW1AIgYpPcASKHQmsqsNcvIkfAvPlTojsD8R1Y8rqPDKXOQ6Mq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDF5HIq4Ic%2Bao6bVjISrcA1WjduDUYabj2%2BtgxmVjRHF%2B5L2w8UJq3375fxrjfeLNRvNkf8xUjXhMZyhKdp%2B7o1WAf25AaOYTRH4Bjbu2RsALzrVZeyj0LRWvxryjgblbvA5zILlDEoQ9HCaofFnQNcUivjYp76gEeuKNhuTN3bcnk4AzkTNzwfCLGz2rHgucFem546bMhoWc3UO4MofZImDFdqlH%2ByuXZoHfC53FWa%2FRHy7bzGTJsOPOKZGnVUAfdfT88bVV2v9GY5rwJO6vE6zr77Aj01sVel7mxPyyoLR4W60AdIvjmt2IIcj%2B0lcaWYoUmZp5tm%2Ft5bywV0mVpgAi3JlavTYtwwIdcbYifpAPIEn9dn2FqZroo%2BfteQfOxXLZopspzs2jUDf1w81yeUDVYrY4Bf539OMb51AbTVBC9pvOA0VDiMMDcjaS87G9prETUf8jB9etKcckjAkahTVA3lrwDrk85QEA6S%2FvnGGj%2BoFV%2Bc2ylrgrSD%2FMc7neApxBk3XwivyuD0hMgaNBBXfcYKVXjuJ%2FLQuRWmHGUBCpPCwNZUFK8pySoO75BX%2FHcZEtlGhaJUP15xQZ5lWqJxN1BxKPJs0dT9v4kmKStZrmZiciz3Yq%2BlPD3khZZRkwFjX5ZXErmCfWQmVZMPLZ7M4GOqUB66KgMokxqSkzRVO%2BclaZG58lYd8PZ7%2FlWjUC1cs%2FHZr3XI3sme2kf7kXxMKteA4ZB1rdJlFDVPEy7rbjqKM1lGhmB%2B45qrYrVh3RuPrF67DmivaIi01d8hNj6q6McdSdU5x%2BJ3OwxAIjdYb4byc5YGsGTLjBBSBXAhYOAIM0FfaBMlkDqTMeIFn%2FE7TTeaTL%2FGMIC46cr19behlYJILg%2B2g%2BWE8r&X-Amz-Signature=a7f497056eee7939152de6b85bfc124c371c37e22cc454cf9cf31433f7c8eaaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCPFZS3K%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061604Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDMU64GnkvZWQCiH7wkB8%2Br0mdpgbvk%2BETpsjwYVST5twIgByfVg7Bu0Z%2Bu34IPCem2cuilRmomOYJaI3y18S7UwfIq%2FwMIVxAAGgw2Mzc0MjMxODM4MDUiDHxBzImEOCrqJ1aQeyrcA%2Bl6zoXIw9VFXXTp9tS5A93BhixarRsLaW70YeogYeMMoAwaXVpRKSsCYQf1iYEy%2FOV8PAlPraE70njd1EaF8kLtVC4i7siB6OEFxZdcDiC088wLlkn9NBjYnRv785XD0ir8Qs4Qm2XgTqlstTzabRrp7qNysVqLKteduilopmhXuSydFChWyZu8K%2Fit98B5NPfv39SkhpPxQpSZnEQafRXs8aKdTWzklUeDerbnNrLr8ugHhxfGEhYVKP%2B9KyuEuKtsifvNGn%2Bd9pSaLSdLara0YgRFRwjZkhTTaw4aohjlq9Fi7Jn2PSqYwyIwNFFsEHKbMAuPoKCYZWscNbzqQ2DWJ8fgGI7IWCl2VZdISdtdiFi%2FWdFol7EdGX466IXCpZV8cQMbEjuEYPLon5YWYeyGwSOa3vci2KeUW5abFps6X87CCFcKjTTxnJtjpfsmdZbk8liMS8czVWXwQbmb%2FfAku94ewV6TaVkYhr7XdESW8X%2FXDk0QRf%2FPUR5jmN18%2BxO3%2FoIh%2B94Qs6%2B%2FdY64vT9hFezfZNVUSVwt2T1rki2rBoRjDme5ywWQypGovmGr32yg%2FdT91KUiZT6rcyZUZ9OwP3nTl94viPXXjEu0f%2BjwwKwG09odRPOCWjiPMK3a7M4GOqUBBm2RZRWWvYe5c8JHeA8RhtceDESijUmkkR5XMNzRLNlsYBGNfLaYSSCzlSUTjqtaNbX1qG2pSIY4m%2BAAyYIrZbCufygsngZLgT%2BYPeDF74QrFAdbEPvM4CkWrJrazsNZ3XdT0kPCaSElLivgxNLSEndjkVaZ0VFyHRDyJdRD9M0vuEdLFfoqzvOS0axOrhYUc9X8qq%2FU7RLTIKBiocWoz9SRjK0G&X-Amz-Signature=6af0c07235c349a3d1bd4ebd22b522d9e9a703e1f41272e0ecf7ae52cb052190&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4OJJM4X%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHNzPSYKCxAckySSfQD1VwaVNAkf0IgezCrti8eKGBzUAiAvjWEFE4PJYyJR5C%2BvcON81O3uWZ%2FwNvcwwkuD0Mi3qCr%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIM81oLKshjvxymq1PXKtwD1P%2FU3KAQ5YjMP%2BEVa%2FVzfJlKGS4fbDTbhC3Mo1g3ItEWzLhGMkjrZL13Jn2j%2Bl9cO07XEeiwD41HeEocA4m6J4zEA6ZkXOBZfOMcfC5xs6np6EtKtglXh3Ud%2BgPjk5xd%2BOvXEO7rltpUAISckNMiD3MuijGHztHYHqdNU%2FzhVcwDiwjcPaetqujoJtVmTB%2F5QbqgEv1wGIfAr6hosxpBzSK5w1S31ggXxNAlQbp91mDUfMsi%2Fw5M%2FHikqqHTKyskMl26EXHlhMvfrJVPwKBVNNj7TFLS0FZhR5pNjtXSxd5yQ9rkxWXDPOn4RYn4e%2FNnpSk9huE3rUhvSYCdfZuFAfKLo%2FO%2FiuhvmZ6rRe385aS0R9%2Bx8xYtQdLDgEOC0Y%2FPOxXTNu9WDYf44RAXQxoN3u7Vi2G7HBo2pi%2FLDvp%2B1iNgZZk1B4hJukmuuOi0AA2pfcOkP%2BETNdg%2BzecmtvizzeIKs8ytzsnhoxQWlvVhZTnieoeO5hqjBUszbMzNLST2dyvWyE2h9FsKAHStPaTBnRGyz3plBXccMp%2BT5uTRS6zvjNIW9%2F9hnOyBwA7by18XdJLwa20lfStorJuUovuPdUIJ6CJPoDKAV%2BWYWuphDweK%2BblZxHwr4Bmi5uQwhtrszgY6pgHEz6oZo5YP0SNwqBXPSLf9gmEqpO29seJmWw%2B0dRxMlihJ71MU2T7OXn%2BNH7BGKlaaj3JGl6G4HqEZnGjSX5aLn%2Ba%2BbYbAwsAKc9CuUDplk%2FBi7gZU%2FeGUl9UjA4YFkyPFzkkPfdS5IMaU7An5yyVpWr9T3vBFPwS992VEmwnvxfdh3BedGJIUHot%2F1gsBYAW99DT4iO4%2FFhHlL3kAWfgD5h1bK8yG&X-Amz-Signature=917816c0ea56425c6ba54806bc06cb1363df9f89c928001375391e41930eb933&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4OJJM4X%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHNzPSYKCxAckySSfQD1VwaVNAkf0IgezCrti8eKGBzUAiAvjWEFE4PJYyJR5C%2BvcON81O3uWZ%2FwNvcwwkuD0Mi3qCr%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIM81oLKshjvxymq1PXKtwD1P%2FU3KAQ5YjMP%2BEVa%2FVzfJlKGS4fbDTbhC3Mo1g3ItEWzLhGMkjrZL13Jn2j%2Bl9cO07XEeiwD41HeEocA4m6J4zEA6ZkXOBZfOMcfC5xs6np6EtKtglXh3Ud%2BgPjk5xd%2BOvXEO7rltpUAISckNMiD3MuijGHztHYHqdNU%2FzhVcwDiwjcPaetqujoJtVmTB%2F5QbqgEv1wGIfAr6hosxpBzSK5w1S31ggXxNAlQbp91mDUfMsi%2Fw5M%2FHikqqHTKyskMl26EXHlhMvfrJVPwKBVNNj7TFLS0FZhR5pNjtXSxd5yQ9rkxWXDPOn4RYn4e%2FNnpSk9huE3rUhvSYCdfZuFAfKLo%2FO%2FiuhvmZ6rRe385aS0R9%2Bx8xYtQdLDgEOC0Y%2FPOxXTNu9WDYf44RAXQxoN3u7Vi2G7HBo2pi%2FLDvp%2B1iNgZZk1B4hJukmuuOi0AA2pfcOkP%2BETNdg%2BzecmtvizzeIKs8ytzsnhoxQWlvVhZTnieoeO5hqjBUszbMzNLST2dyvWyE2h9FsKAHStPaTBnRGyz3plBXccMp%2BT5uTRS6zvjNIW9%2F9hnOyBwA7by18XdJLwa20lfStorJuUovuPdUIJ6CJPoDKAV%2BWYWuphDweK%2BblZxHwr4Bmi5uQwhtrszgY6pgHEz6oZo5YP0SNwqBXPSLf9gmEqpO29seJmWw%2B0dRxMlihJ71MU2T7OXn%2BNH7BGKlaaj3JGl6G4HqEZnGjSX5aLn%2Ba%2BbYbAwsAKc9CuUDplk%2FBi7gZU%2FeGUl9UjA4YFkyPFzkkPfdS5IMaU7An5yyVpWr9T3vBFPwS992VEmwnvxfdh3BedGJIUHot%2F1gsBYAW99DT4iO4%2FFhHlL3kAWfgD5h1bK8yG&X-Amz-Signature=917816c0ea56425c6ba54806bc06cb1363df9f89c928001375391e41930eb933&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HPDLDLY%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T061611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD5MtYeoRdx1EqCt0TNq4pppSB5u5tfimV%2BxFuds3mfKwIhAJuPRkyKjq%2F1RUCVSGGdDMLtCqBuWbjdRkWbrH0UTtJSKv8DCFcQABoMNjM3NDIzMTgzODA1IgzWYJrOf9u3EhJNRXwq3AOZQWkd%2FzucYNOPURHJj3AGb%2BUELGdEC05mrjDZMpQ6npZMfi%2BEbLSi4ZB50adxqTnMVwlMWe81hjQtUjwmqNIUicCdIuMB3J%2BfyUzYyCB2asY418xDQi5d4JhZX35aJ9%2BzK88uE3z3NaftVy9RqdG8dkQd4u3HZ4I4oZfVgEtD%2FiqPl87xbzUsOTxWXEUT7nt1br8xtzPKYafKTNwcRdyv0OJUwsi%2FLC9tQ5aHkP9whz%2FpHu2HCpvvF1HtzXznmudSlCrZFKNGOKSivVoAD%2Fmm9ollCnjsEXZCbFoJU2c%2FgtVoxzN%2BNuPRgZNK724f19liOuhYpMSF051ZoBmrkIM%2FKbfrnzOEP7AjJB197YTzmdXYj52vNBk%2FDSaXjIl3tQBqnSXSUnYV2wHDdK8GvbvnNKOsWB%2BysFnQRqbbh%2Bsqcp38dDTVxrVAOMEoOAzr1CiHdz5ahXfBIhYRhMQ8DnI5XOnPq6mJM4DOM9lG5rdcgw7IhNSIvO7p%2FxvQ7Nv62Pd040BhqWQ4xIqRLzrV4mEyPNaizlZukYeLTz3oegbmkkmegShaG2whxcw3xJsU3x%2BKg6Ga8plrO8Jc%2FGHq39PnBBKuNL%2B01PaXdQOfVlk7yL782okQ1tpioVXMETCI2%2BzOBjqkARElnEr6DYy%2F1MWjzzfJJqsJ%2BFa%2BGlS81Kgjefb0P%2B5iSxMGHHBb0YufjXMTup42HuUcc6oRy3C9dHE0s8RC8BI0gS2HtC46FfTwa0St5T%2FoSi6zlb5oGSOn2dNaHrELhgzMrLfHJdFnOX%2BTbGBSyUFV60WRhe24sw21N%2FA8bFioYR%2Fj%2FlgiBR%2FblPAIFMNnGR2vx72iY%2BR0g%2F617fSbNTuYLBaA&X-Amz-Signature=ab14d137c4a0c2c94586aa6854ea2b3be258030751c024bf17d6c79d789a9640&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

