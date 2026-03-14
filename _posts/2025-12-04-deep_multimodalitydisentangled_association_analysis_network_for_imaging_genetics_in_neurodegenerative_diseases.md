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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664U356ILG%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBR1d%2BjJsPyZF0hWPQKHS%2F9cp%2Bs6HwXN8Uf7FcKawr8uAiAwACgbKb7GHp3mVlvj%2FTfOlCa2XZoCQ2Cp4r5UVde0oSqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxE4gluMxNqKYqEy%2FKtwD87HYE7gRXkm%2FQouK6KDWb9W%2FAGidnch25clCnf7rW8mBaG4xfOMswuioCb2v8PSFGMJYKBKsaXEvhWt9PI7ru1VJmMRD21yUshxkpNY9qb3M44L7yPEvRKoyLE9L90bVVC3Vz%2Ff4son2mkqJTbIfxIQ5YLZEhPhgDPS4IV8uI0sG4mDk%2BeEXzsG1%2Ba%2BDYp88%2BL8ilAvL1KJs0V6Qu72ihHQOUq8ll7b10tzfI7ML9gj7m9hfBdGYu39Feb5QtRsrnC7McuQR%2FOXKxUn8miKtta25k7oWgJcEL4h4nzL2q0AdU06BOVk2RsI0t45ZaQ%2BHhXAIChEbepEbC%2F35v3eCPcA0Tt%2FW3J3%2F8Iej0%2Fe1c0xl8jkQSkzn51MoDyUnKaH7jvjTS69N62hneCtFyEvvFuKUhY6wS4fLRIK%2Bv8pAKulEE89ZLOLcWPVVpNN8kSMST4ofRKQmiwDgzyiAvU9u0H6Affl6WdKFNIZ6mKUYw6Xhu61OpyUab0ek2DWJQ0mm1brmDapSr5ogDsTI2dlIBOC1Yv5CHfo0wAkrI9quxTyjAwBON3idUEi28wWbXQhwjmZdrS9AX8pAaJSIlu12hC85SRh3NAVhP986HMUF94uzZZ66t1j8yoHN%2BCsw4s3UzQY6pgHJ2maHV0cqvE3RcTMmHNNcDGennSL7fXcIw4a%2FTpnUOrULujdebM2hBYnMrJ17ws2QIk2xpVVPIOXVf4ONMataWK49%2B7OWtSzrAnbX8LkrwXOeO6xC8eLKor%2BhX88baD%2BIaFb7M2sQGrxIci0171qQg6Rw77Qtarz6pkjcHpux6zT6m6IgvGAv9Ui2%2FDqLB281CpINXDAQS9829kv%2FPq%2BIsjeJ3Pni&X-Amz-Signature=f2844daba038d8a38e43fb2299e6737b930afa4b70b4181923ac61d900ae8d76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664U356ILG%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBR1d%2BjJsPyZF0hWPQKHS%2F9cp%2Bs6HwXN8Uf7FcKawr8uAiAwACgbKb7GHp3mVlvj%2FTfOlCa2XZoCQ2Cp4r5UVde0oSqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxE4gluMxNqKYqEy%2FKtwD87HYE7gRXkm%2FQouK6KDWb9W%2FAGidnch25clCnf7rW8mBaG4xfOMswuioCb2v8PSFGMJYKBKsaXEvhWt9PI7ru1VJmMRD21yUshxkpNY9qb3M44L7yPEvRKoyLE9L90bVVC3Vz%2Ff4son2mkqJTbIfxIQ5YLZEhPhgDPS4IV8uI0sG4mDk%2BeEXzsG1%2Ba%2BDYp88%2BL8ilAvL1KJs0V6Qu72ihHQOUq8ll7b10tzfI7ML9gj7m9hfBdGYu39Feb5QtRsrnC7McuQR%2FOXKxUn8miKtta25k7oWgJcEL4h4nzL2q0AdU06BOVk2RsI0t45ZaQ%2BHhXAIChEbepEbC%2F35v3eCPcA0Tt%2FW3J3%2F8Iej0%2Fe1c0xl8jkQSkzn51MoDyUnKaH7jvjTS69N62hneCtFyEvvFuKUhY6wS4fLRIK%2Bv8pAKulEE89ZLOLcWPVVpNN8kSMST4ofRKQmiwDgzyiAvU9u0H6Affl6WdKFNIZ6mKUYw6Xhu61OpyUab0ek2DWJQ0mm1brmDapSr5ogDsTI2dlIBOC1Yv5CHfo0wAkrI9quxTyjAwBON3idUEi28wWbXQhwjmZdrS9AX8pAaJSIlu12hC85SRh3NAVhP986HMUF94uzZZ66t1j8yoHN%2BCsw4s3UzQY6pgHJ2maHV0cqvE3RcTMmHNNcDGennSL7fXcIw4a%2FTpnUOrULujdebM2hBYnMrJ17ws2QIk2xpVVPIOXVf4ONMataWK49%2B7OWtSzrAnbX8LkrwXOeO6xC8eLKor%2BhX88baD%2BIaFb7M2sQGrxIci0171qQg6Rw77Qtarz6pkjcHpux6zT6m6IgvGAv9Ui2%2FDqLB281CpINXDAQS9829kv%2FPq%2BIsjeJ3Pni&X-Amz-Signature=f2844daba038d8a38e43fb2299e6737b930afa4b70b4181923ac61d900ae8d76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647VTM6CF%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC7gdqF9zKbIZdFjWw4n91PPg9NzYDLdlv17duncn2ZxgIgP9CnRWu2sEqsxQ%2BY%2BRx6f36XZmdBTdirMKv05q5NB40qiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJxJNvy4EMRIz%2BBl%2ByrcA8SuXpXyCimeqFs2aw%2BZGNWUtYzldD3LiuTUE5h8nWXxX%2FKMqhuAq2726%2F2mI1K9LK%2FFfiY28C2dtulVSfrJoMblr6bi5T0GN8dOsD2Qlke9AgHHRGVlSaB3fsF%2BUFCHfMb72sluREIqUnOqI1n2dPOj177PXQDuyfgHhi41OYAuqw8xCZ61tneyoiGgyRXYzUEjkcH33Dw6FBnYQHB5CWsXhBFbQYgt0XXcgjDhcAa8iWxr88lEgI6wmGOG1hBMuUq%2FgcSQZmoYtYi6VpmnGTWrh0qvjuuogiC6Gp%2F0AZPOPy9dCi4yu3dKXSsfh1Ch2Q%2BmxA3QOzbnnJDbIol7vFGB9aXnF%2B5Bz2k0zRV6bGRA%2BRsPh7fTXbdUbGj4sXhDeXlIDHe%2BwoiL5pA1duOnGPxhL%2BwmuZpY1QPBx2uDOGVyow6qkMfX%2Bs5VA61K3v3Zq0yp0kj3aXGilHKmIpzLhbzEgUelQB8dL%2FC1PxRlDd1mw3IPmSYAnUZZAceubiXTwPuFKWtQ1pcWoQYf5aALPsqbDiGWEgNBPfDH%2BK8MYqAyh89sPuXY%2BpZlqyjGXiXv1Tn1C9wd2xWq7WC%2FZa6BZYWwc6Lz8TSVEMhL3ZgsUzYwsIreOdv0VB7eXUgGMMDM1M0GOqUBT3BgEL9EpNzqiGY0rB7I23R6aGFNq9%2FiOHlnQUC3bzFYIjOi6W7JbPEUHB3mNQJa08J5Zs46zrp1%2FWLMnlOkLvWMWnsYLqVxBdi%2BGTDdl5pdO9O4EzSz99UXy96kQi5WAIwOroaHiI3i004267vMjfv1%2FJzi3Y5X3VUIHSgEsal08eNGhbi48l2SUNVVXo1dZhIjf89IyS7B5SIkXN31UL6yrth5&X-Amz-Signature=2aea4395a188d4efbbfd8eea73958f3b533200d6f8e4bdeb4b91f537f4e1e330&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MSPLVUO%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCg5lBvNrfgVGwHuQRVs5K7fzTpqydOsPQEcmbIb9AVCgIgExnJMlzv21hnID2VXjIGoYXHF6ZcUqZQg5rJy5Dsg2IqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM4087%2FirRbX4vHveircAzSTpD4SDTuJ39q0lO%2FYWVbRwszZJuYwXKaxtMWWLmIz2aRPETXWq3ci6XSkZBsalnO9WYyFPeeUAIzGURaqgqcEkgBEXN%2B4UddQoGbetUWc6%2B1QiYrQN2c0AX1Q4594yRoLheo%2BUqxwLAUfmx0NR07luXptt77UhPjDibGCowEpXz46QjlWttVR9kcH%2FojeVu5NSp%2BquQ2sqszh0HK75bMjp67UqON7LxPNffHvrWznsddLxlr61LBCh6noggDxqCaEvRdlKd6lCFyrOpF1C6xeqI623cY6d5IfnGUgRrFkDsboWqiNxm3gMVxX0%2B8kz8QCaA3g%2F5ZH%2BnV%2BcZUp1PMPTuJobrbwS96khbwBgKXFVDiGgSRJnMJqySMp0sWy8nMM7jO2P99RJRgRnasyW5PcM8tHWBsqnmyK%2BFdKqN0%2FWuOf6tAPYyJOB%2BHu9AZlI0dYq0baJXChQLSdJo%2BbJ%2FazA%2FuDeTsUzN05WJnRj9ow4Q9iYngeCw3vXqkmXxZS8X7sM35z2BzOGF1tiRoCX1TtJLVxw8yaMb06PHB1qd5ai1gaCDhxTliSFCXqjR7HnjrDchUCSkEEMr5Z0xZevgzI7x1kV%2F1afaWeoomiFWEA0N5GZnNuDx%2B8ZkLXMMnM1M0GOqUBXTP3MV6atF4aQueuYZwjYSgLHN08YTUKtp0V3aedvNkVuYF923tfUIGyjmU%2FwXLLSvSxLKyxkRJoRdrGytBceCBjoTMEYr9ZaaMgxmuGQqHlxDSm4jAHhTVOLXnQvWaLbT9d899D6bE1iFilehN7I2Xvv1dl8tHnE%2BJzQXHuyTRciVPcSVBjQkxwlbTXCMLiZWU5FTPKFVKOMWsGoNjlDuwF4TCp&X-Amz-Signature=f00c52886581b953595d0dd966d947363e9239e020e23283520f4595b3d280a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MSPLVUO%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCg5lBvNrfgVGwHuQRVs5K7fzTpqydOsPQEcmbIb9AVCgIgExnJMlzv21hnID2VXjIGoYXHF6ZcUqZQg5rJy5Dsg2IqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM4087%2FirRbX4vHveircAzSTpD4SDTuJ39q0lO%2FYWVbRwszZJuYwXKaxtMWWLmIz2aRPETXWq3ci6XSkZBsalnO9WYyFPeeUAIzGURaqgqcEkgBEXN%2B4UddQoGbetUWc6%2B1QiYrQN2c0AX1Q4594yRoLheo%2BUqxwLAUfmx0NR07luXptt77UhPjDibGCowEpXz46QjlWttVR9kcH%2FojeVu5NSp%2BquQ2sqszh0HK75bMjp67UqON7LxPNffHvrWznsddLxlr61LBCh6noggDxqCaEvRdlKd6lCFyrOpF1C6xeqI623cY6d5IfnGUgRrFkDsboWqiNxm3gMVxX0%2B8kz8QCaA3g%2F5ZH%2BnV%2BcZUp1PMPTuJobrbwS96khbwBgKXFVDiGgSRJnMJqySMp0sWy8nMM7jO2P99RJRgRnasyW5PcM8tHWBsqnmyK%2BFdKqN0%2FWuOf6tAPYyJOB%2BHu9AZlI0dYq0baJXChQLSdJo%2BbJ%2FazA%2FuDeTsUzN05WJnRj9ow4Q9iYngeCw3vXqkmXxZS8X7sM35z2BzOGF1tiRoCX1TtJLVxw8yaMb06PHB1qd5ai1gaCDhxTliSFCXqjR7HnjrDchUCSkEEMr5Z0xZevgzI7x1kV%2F1afaWeoomiFWEA0N5GZnNuDx%2B8ZkLXMMnM1M0GOqUBXTP3MV6atF4aQueuYZwjYSgLHN08YTUKtp0V3aedvNkVuYF923tfUIGyjmU%2FwXLLSvSxLKyxkRJoRdrGytBceCBjoTMEYr9ZaaMgxmuGQqHlxDSm4jAHhTVOLXnQvWaLbT9d899D6bE1iFilehN7I2Xvv1dl8tHnE%2BJzQXHuyTRciVPcSVBjQkxwlbTXCMLiZWU5FTPKFVKOMWsGoNjlDuwF4TCp&X-Amz-Signature=285ccf58cc6b17e3ade3ef06410cc7eb87492e7a5991a352cc693fac3f7c2661&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIW56ACX%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAqiebmGdh7LY%2BYkIbbbAJEFO7Ze%2FqfgZnhV4wwoVdjbAiAnUeakD0JY%2F7UiNH0ZafoTcKtGlDmseK%2F0ie5JBPzj4SqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6oqJHY88fW43R9lWKtwDWjiAVbivrpdIzf%2B6GiB%2FGHclZigme62aiuderXt1Nm31DAmtryrgqJENsZRvCH%2B46BD2Ds2iksvMO81Lo1HOlqB8eZcOks7I7KSyhH3GmVPJfHvrujaI%2BKHHi%2F4XSi%2BSjgVDgijuFCFVObgMCgyEzm%2B4aLtBIev2rtTH0pGUdv0hPmdy5tm6YiG2wokJEUFib6t0Icdbv8dCAoGm6s7erCUE%2BtkCNFyu004fEEUGymCz%2BkVfcUiBRzOSHKsw9WQQFCqJaXgX4yBpEa%2BWXHifDOihqnOnipMvkk1pVqwLplMLexLak2znP%2FhAOOBXM%2Boyl9Jvfmjrx54T1BMhpCEIzlUi8XNJHqzGZVwahJ8Xqnklfd3keIuO%2FfQp69%2B49WZK1GTBFt56jxgDcMh6meDP89B4%2Fd8ttPwLzjPkjSe7QuGJ3tSe%2FlmD7lpWpvsrpGEZvAG2PLxcnYgLDiEquAROjMGy%2FxFwAuoiOoXTMJ2fVfEKLLIu2kCXPU3D8EawTIMMUnOES383bD1%2FY6I%2Bk2ya%2FJLI1nf78rETI8BrHhJ1Ru1FddTHotl1Dy55rdcsRUM3F9IbpfdrIwp2etXpfjHFi93ZoGZE1XNRSMdlYgYYqyrBKH2bksgbNnCmzIswgs3UzQY6pgH%2B29NoQLG4Suo3xXg7XvU25EaMFU61i79Yl79X5zFG9LPp8qk6FTyiBTbXKfvcwWFL0DOh%2FRIXZgWXx2d8wl7MEwaG36S%2FyJt8igg0x0p7p0p8w6Kt1W0ETyDhw3dvxZHV%2BLFpcnBJxVCdluufELfoVIZ5Dr2ZPdLQ3StYXegR%2FDgYK9f1%2Fso1gpgRxVXuODEcaffPp%2BF453a9O86zp2eD1mfzzr8n&X-Amz-Signature=6cee9efe5b7a9f70a491f5ea301a2834b3af1d3a6aec6dd11c2f577cfa9bb0b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HUKAVV6%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCcuuop%2BC1DVFLHXvUSPpUgD8bls1xGKaa3nO%2BeESEfiQIhAOXqDe7l9Lu6H6%2BJmjyOnAuL2nBWMpmmjdgoUCLC%2BaK0KogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzSt%2BlHsvRyuh0EapAq3AMrTzfgR4NpPAguzduvtSy2vq2pu5imEWI3GlAn2X2Dl40oLh8n5FazJh3X0QnvuSvhV7%2Fpn8HYNvnxCi%2FjKErUoUNSxMgYcKABndCsmhll4BKajDSCWA5eAwOj5xIs%2FDxY9q4FFw96g3M1T2ANzatznEiECHK1NxG16acuHOU18FaFtpOenZuUFyU3SbkfYTlEK9aT83PbJIzyYLTkG%2FStSRz0jo183xpqTC8gfaZRVLPvb1M3G26ygGkjsI05KTkkBib%2Fr41yflwoK2cKQMxCDwQ2tErDMT0J6In0ah%2BZFGQ%2FeVYT1st9tZ4Tj6NZzSXFYAJhiFJfKIThjUpsxQ3tfYhFjlwe0SgU8maG18ckPGHbA%2BRpVjx58jpjI70DOpiGFSX7jcna5Ow9PfVuBBzOBF1owG4%2BO%2FpabHKTj3Ji9beerWPyt53WHmsL1SxN3FtF00b63vMC2jWSG5i%2BGUWtA9PvAue66PIZB6atg01SIVZZerivTQIoNKWFzHSV0mTxfLLiZyme32yKdAnS6hSPSWuaeCiLLYCwFta8EIQ7Ln9pW5gGbo8ck%2Fj%2BxpZhFEOwYN2YCC5rQcAw48cCTUWfZKsTM9UmQ%2F0BWpiDCF97WswkJ2MZzXF9vgDTLTCRzdTNBjqkAUPWwwJ%2BXXpiHUeQuCx15ojni6kn9dYlG3lt40G2jzioqSFseigztUVq1HNCfsneXyFtlMp%2Bk5fGcejRdu5CdNKQgBkSKrGBOMKaxg5xjw0PaNc9NiNYt6VElPS8GWQkQG0%2Fiw0UjuI2DZSuDxctrSuwCia32aEzPlS%2B5%2FhgPARbNkhhtOj3lbCjTibyZng7xgLddcr1bRrIywlJBIsBV5LHyfZ6&X-Amz-Signature=9aa2b5a64f9ada28c82f7abda4637aad5fc5df5d16e6bb328d047d78e4eb9966&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ISDYWUD%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDmwZBvaZu%2BePfm0EcPblIhJEIaAkpGM%2FcP1%2FZrL%2BjChAiAr2XSPxg0Ag28r6%2Bj5x0YMCAzfJ1a2V8QbRfFbeBu1cSqIBAii%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM2WKwdiApBi4HIRUuKtwDzIcSHuHe66Y83rkVyGwPim%2FgS6aUoWi17SCh6pwhenHVSxGbx1reID8dadA%2FMFyxQapTbT6ipnvh2Eb0feDPTSMaTr3ZGbBclkTaNYwGflbD1HOzutmh11gNolQlj6BitCWu4SBuTSZLQRdRdTTdTOxBAKxdMzBVWuU89hMZ10GAcau3Ahh0g8f5yxxrl0oOSKdIq25cq7dnib%2FtozZbzc6ziAOjU3X5FENKwIU%2BLfX2T1pwhO0ns7xgvdjJFgfYm5kc51CAq17ZpO1qyVwvFtMVlgBEQ92WlCGNjItTliuCEhI7HJ7omBndTWHVHEVuSI5%2Fv43nHazVqgFmn121ywIDPKNFpjQmQR89%2Bxxk6uLCYaNB1DlnYoXmP49kZsIcJHJM69J2Cg2AxvkNuCznxcpa0I727djyc4iT11RL2cjlH7IANHtwhwL2oZ%2FpRjjtRHCgoa7JVbOu6crDyld%2B%2BSapPFkq%2BHPqMvRsGlxQKQwAypBASw4A4i2yIq1nj4ge30YK03uTggzzoeoHkoaJVh3qVr9PLfvil8X02ov40QhuNP9PF59eka6TrYpCv5IQTG%2BDAQN5D7vO8FlncU8idXQrZ6QPV6C4C%2FitUZjBFWlPSK2yWaSJtrzS8iYws8zUzQY6pgGBf9Pe4lInTUZRkBO7CEb8TEBheOvPWuEBExdyYJ11%2Bx6q%2Frg9ne%2BFsls1Gqt%2BWCEbN4EDfuU34v6HiWuOvrOf3BHbt%2Bt%2FJyWgRuFDE1X7J%2FSTbV0zAwiuAD9Ixyj%2FnckqwZBsGR1IAnfv8ypltc%2Be7pkDY4mGDASZHsYr74qxCC0oEWWtJjA7NoBQdMKl%2BE2pEp%2B2dOnPXruvJzx%2B8zv9I9DRcX53&X-Amz-Signature=c1af5d840726ffafa3481f2aa23029ce47574709d95351ea1a3cdc276a477fe3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDPCULC5%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC9aR1VGwUX6y1aWMEwROW%2Bf9hk9m04q2GlrQCNHMf4wAiEA6dvuNmXzhtaf5T9AtffFu2K2rnqL8RVoRosEe0xkCxQqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHwOZayBryb56t0erircA7M2ZOq%2BAd60Rp%2FTUsnJ0vl7FBx3MObuRqdRV8gQJ3nLhjXKKSTHRfQPfPOJdafEX7zf3ZJwTj2%2B0PJFFO3vAXrlGUAL9EKSjJC8Zo0aOtLzSWQqhYZYqXmmh14hFCnQf0zqWGWIbQ5WmVemA9yA7WoE0wo0%2FByYo9eywh3hZCHAY5hFXrjyeyg%2B3mNLpgvsS%2FUbRD%2Bz95AxpZbQMYfdooyrEA67vtB6YU00LfGQzS9w9xyGoJewZyMezvwQ2%2BnOlG1FlbekPEojjlX50CRo14aAFXDNx1gvyuisS1tAP3FN0LZlztpzNVOHPJnU3AnEJaDLkaGXONoYdvyvZmmccqA3C%2BEtQDPQQh8E0SUK%2BR0w6ldUkq2oJKTawS%2F8i21otKG%2FN7%2FbKPJhYCDd1TOYCpgyTR3tdEL2qFdj3SKkGspIeSqQuMXhsdMPQ355NqIiyE8WKrY8OfYYsNHU4NGWvxPKLcyfks5gu2g5Nz2hjlHMAkmqnI%2Buh6n7T3kEVXFEieZ%2F7VBvM511Rk4YWtI9pkeaJV19tx1WZTCh0pfrIkzUDHDPLmdmLsh5%2FJwsTw3KdU4VLLkaT3vqByPz6R4SHhdChfnHIF%2BwlbwJGhabHsruv9gio371UpNEL9%2FOMPTM1M0GOqUBZ5lQfORmwNHP1ovbl7qZragBPlHH%2Bz8aJc%2BGkRuhIdmutD942q80aJAwWHXGTZqiEQmu9Hk8pYchqENTt7vEEEPdjicImYtUP5jJ6OPwxb0KilXOFfF4BuiJZPl4F1jXoTkauPFg5jOvN0Ooiq%2Bq4HZ2jmB1TuUbHFmHGLaAD0yOZCfqdZM%2BGWzDd9OC2nt%2FfVTIEMK7WL%2FcuqFdf9UNeLSZdcbN&X-Amz-Signature=4a65db8df372a09b19254f089f862dcbbc72e4ef536346e27c98ee8b6c81d229&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDPCULC5%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC9aR1VGwUX6y1aWMEwROW%2Bf9hk9m04q2GlrQCNHMf4wAiEA6dvuNmXzhtaf5T9AtffFu2K2rnqL8RVoRosEe0xkCxQqiAQIov%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHwOZayBryb56t0erircA7M2ZOq%2BAd60Rp%2FTUsnJ0vl7FBx3MObuRqdRV8gQJ3nLhjXKKSTHRfQPfPOJdafEX7zf3ZJwTj2%2B0PJFFO3vAXrlGUAL9EKSjJC8Zo0aOtLzSWQqhYZYqXmmh14hFCnQf0zqWGWIbQ5WmVemA9yA7WoE0wo0%2FByYo9eywh3hZCHAY5hFXrjyeyg%2B3mNLpgvsS%2FUbRD%2Bz95AxpZbQMYfdooyrEA67vtB6YU00LfGQzS9w9xyGoJewZyMezvwQ2%2BnOlG1FlbekPEojjlX50CRo14aAFXDNx1gvyuisS1tAP3FN0LZlztpzNVOHPJnU3AnEJaDLkaGXONoYdvyvZmmccqA3C%2BEtQDPQQh8E0SUK%2BR0w6ldUkq2oJKTawS%2F8i21otKG%2FN7%2FbKPJhYCDd1TOYCpgyTR3tdEL2qFdj3SKkGspIeSqQuMXhsdMPQ355NqIiyE8WKrY8OfYYsNHU4NGWvxPKLcyfks5gu2g5Nz2hjlHMAkmqnI%2Buh6n7T3kEVXFEieZ%2F7VBvM511Rk4YWtI9pkeaJV19tx1WZTCh0pfrIkzUDHDPLmdmLsh5%2FJwsTw3KdU4VLLkaT3vqByPz6R4SHhdChfnHIF%2BwlbwJGhabHsruv9gio371UpNEL9%2FOMPTM1M0GOqUBZ5lQfORmwNHP1ovbl7qZragBPlHH%2Bz8aJc%2BGkRuhIdmutD942q80aJAwWHXGTZqiEQmu9Hk8pYchqENTt7vEEEPdjicImYtUP5jJ6OPwxb0KilXOFfF4BuiJZPl4F1jXoTkauPFg5jOvN0Ooiq%2Bq4HZ2jmB1TuUbHFmHGLaAD0yOZCfqdZM%2BGWzDd9OC2nt%2FfVTIEMK7WL%2FcuqFdf9UNeLSZdcbN&X-Amz-Signature=447ce29acc2fa514ab9dd66839d6e27acf911b8b68acf80f42b201ca29348571&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WG6BRMK4%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCxjDqIU85PVYP6EpYw8ZhKhqGz%2FcnXUQ%2FWW2J2%2F%2F6IkAIhAI2tDdzn9LUOKJ%2BwlbtEMLcmB0zYoX8vUnopmXochPQFKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwZjDOoQr2h7DYHzLEq3APz9A2%2FdyP%2FRg%2B%2FSkaWA5vOH%2FnHcTtqwe8tjDYsOQ13%2B%2F9Qo%2B3f%2FmTostW5Sfbb7yXslflbHOwyF9xZ8Sdo9l5pNlKq3zagJ0%2FdpItPuFxwZ3YvPCJpIALfTz%2BlQeTYwAXZX3p8ZRSaPxC%2BaFf0wbHqpJpkaOI8gDcYZhIjh5mQZFtqxBShk9U0Gj0D6r6XZY4Lh7jemdNUPPp5JxMBrdaPqyXV2AWBZ%2B04mzdXMTiJd5vVHSOwpwY5C32A%2FKQzzRO2mwGsbcdLabABVfaVCGLvctYWcJ%2FtaR8yb7thrNM%2FiniwZ0Ri%2Fj7yQjrLtIkXKNu%2FzFN0eRYslwxaSEzoltV4HSQUfjzgnsRgsMIDAYcfIeXyyZDWFkz2YrA84EkJnmlUuDyZTXb83TufCGHERqpJq5Ka5bcab0Tz7aOE7GPf%2F%2B6D3vR0GyzOZRizA9L0eLJGqEH%2FP9LicqREZ8Cm7XLIv3M1zuyTKL5JxLcrxFseKylXc8hRK3IaSyoDce%2B6zCQzq%2Fx6YT6YJccNjM7KCbw853R59LmnSiz2ciNytR2861aF2wAi%2F1R%2BJVzjJB5nUfklnCyG9PgNr2gZGnSveDz1cRRunlwTArlj7L2DqxJBfScRPm%2Ff%2BzF9f1mJVjC2zdTNBjqkAYfTQSGK2El0nhjYJA%2B0fifhEdFVH4XzJl86SCAVzduLSZIb8yRORID60vwSgs2%2Biq8wF7IFb7MkhqRZ4AS1bywvkI0yy6ypmPIigRMc61PFClwEFyDM4yZsibvKgL0nifdMnHOnOUqvO4UXna%2Fc8FDPPEGDKnY8byv87s5CE3q%2B57r5AT0LilJxmfg%2FSwEkDj6EM1SYuZhMcHQthiMWxvQJepDk&X-Amz-Signature=5d6bbb99bf493f85563a3d147e0fb35e3dce8378c4784636791a4bdf8558eb65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466333FNQUZ%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC4I4oDR2AS8tDxJv5ev1LsRYaxNW3gBVwl9mD95YGF5gIhALh7%2FJ%2F6KsdttXkFasBtnMBDNeG8ljYPlhJ7WBVsI6JnKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwOypGNlqR%2F0V722Okq3AM7mV1Y9ToLXum%2Bq6FBrYygNFOHKqXOmAog9uJapQFWWJLun9EjcuUahvHPKopzysJKdmPq8OgXcV7zPcjixJOqQJFaGPcXtGJG6P5bCOkzqk%2FR0XdyLCjwR%2BTtHk3kYKRHgx8dO1RMaBY35SG7Z5o0x8a9bzJ7pIW1%2BKP9tiuGVj5AEjIF8qH4vLo27bGhZS9Ktw85U3%2BdKhrp2ug0yJFrxcQsO8UR5sZ8mBgTlDu1%2B5Hoz5jcUcaU05AVH0JkVUEhdPfHWJfvtFYZLgov50iQpXfUmeDyYOTLKKK1537zfjd90%2B4LzyKHwOQWOH%2FKyjR7Kp0IcZEdnC9sn%2BpewMwImF8sYhObJ6O50tpVsxHekjwDjBqFbeQW8uxhyYDosWS7cEHdvNiVAqUi92m8HrEv3KdjdvssCAhVoWgAUxekpbuY6C7BL9X66GglXOJK2ZJcPF1PtYfN84ZPHOkTkce4LB2xZg1B4OL2KwqH5t3HBjeuaobeDt%2FgyQZyNITTBAu6P6MQc1DaFQxnRV3WiL1bnfsGwQlkdZu6CsnagE4sQxvi3XMYkbrRgaLKCYKJIEyo0%2BWfcDHwh0v8D5%2BSXWnrQOTXzjTG3u8W6SL10vZToVAWP4rOZT%2FoRDPRaTCQzdTNBjqkARV6myFj0L8dEVp%2BmeKzJTnsGy269LOUxN%2FtYVWvbWDnXituDWDUJHDxvUxWdW7soFh0ZUMCoYBh1mno7JKYpNFGtEVlsLMde5zh7c8XF6TJ8XJPoegqynbQVdIKdB0jcpdK1MXrXvjugx2ObU%2BKdKfPi1JU8N4uhDP5XuygEjdWxHJuZ78MqwYhMxUs80OFwOmtDxBV4HhbBeWpPu%2BxDuUf%2BXG%2B&X-Amz-Signature=9c5b55acc5f4477c44bd55dd55bf6729bb7e5f62aa857885bb3dd5a03c4c2a98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466333FNQUZ%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC4I4oDR2AS8tDxJv5ev1LsRYaxNW3gBVwl9mD95YGF5gIhALh7%2FJ%2F6KsdttXkFasBtnMBDNeG8ljYPlhJ7WBVsI6JnKogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwOypGNlqR%2F0V722Okq3AM7mV1Y9ToLXum%2Bq6FBrYygNFOHKqXOmAog9uJapQFWWJLun9EjcuUahvHPKopzysJKdmPq8OgXcV7zPcjixJOqQJFaGPcXtGJG6P5bCOkzqk%2FR0XdyLCjwR%2BTtHk3kYKRHgx8dO1RMaBY35SG7Z5o0x8a9bzJ7pIW1%2BKP9tiuGVj5AEjIF8qH4vLo27bGhZS9Ktw85U3%2BdKhrp2ug0yJFrxcQsO8UR5sZ8mBgTlDu1%2B5Hoz5jcUcaU05AVH0JkVUEhdPfHWJfvtFYZLgov50iQpXfUmeDyYOTLKKK1537zfjd90%2B4LzyKHwOQWOH%2FKyjR7Kp0IcZEdnC9sn%2BpewMwImF8sYhObJ6O50tpVsxHekjwDjBqFbeQW8uxhyYDosWS7cEHdvNiVAqUi92m8HrEv3KdjdvssCAhVoWgAUxekpbuY6C7BL9X66GglXOJK2ZJcPF1PtYfN84ZPHOkTkce4LB2xZg1B4OL2KwqH5t3HBjeuaobeDt%2FgyQZyNITTBAu6P6MQc1DaFQxnRV3WiL1bnfsGwQlkdZu6CsnagE4sQxvi3XMYkbrRgaLKCYKJIEyo0%2BWfcDHwh0v8D5%2BSXWnrQOTXzjTG3u8W6SL10vZToVAWP4rOZT%2FoRDPRaTCQzdTNBjqkARV6myFj0L8dEVp%2BmeKzJTnsGy269LOUxN%2FtYVWvbWDnXituDWDUJHDxvUxWdW7soFh0ZUMCoYBh1mno7JKYpNFGtEVlsLMde5zh7c8XF6TJ8XJPoegqynbQVdIKdB0jcpdK1MXrXvjugx2ObU%2BKdKfPi1JU8N4uhDP5XuygEjdWxHJuZ78MqwYhMxUs80OFwOmtDxBV4HhbBeWpPu%2BxDuUf%2BXG%2B&X-Amz-Signature=9c5b55acc5f4477c44bd55dd55bf6729bb7e5f62aa857885bb3dd5a03c4c2a98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOTB2OKG%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T111326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCRu%2BscOe%2ByRIxFlW61x2rIARjvD5czXvvwXnQekPU3iQIhAKeGXDj2%2Bbf7ZD6uQ8rK9iesT0HK6F28c5fuLkumCp%2F8KogECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxP8b9vZguYujViXzwq3AMZnhmgQsxqxT%2FsEg4NDpDwODT4yt1U%2FcdN5oJ5Fwph%2Bjq5y6CMGp3uxkwyKAiLJoDXSMgHEmHuwHoZK%2F9jFpUGTGZDhQjWMTBk%2Fyj61xlSpkYfwu9eeO6OYL9gQxjHfFvDK5XpzFwDjjq1I1x7Eh54HQetWSUox857LuXQH0XUptG%2F1VZBGdzb2ZMs0BRGsq2rStrXA5nUGpGd7TZwrfN%2F57k9NJzFXp1GRRVxzhsRn5gsekSllqwxITmtuXY4buCVrn%2FCDyPvGpm1FlS0ydvhmGnkO8h1GAf%2Fooced6rIOIZyMsPXr0AUf3SlyuHraHjTqCsggZ8nlAj6%2BUiBINT4k2843piPDpkZCtgtuxerwjcc7BwL9JXG8JG0j4Ketb27TTE7Qjl2cZjjFatdGqKJoHFy75%2FAiZNfOD4Gu7iykAXk75yr55%2BQJJQPEme89xZyoQFaJLIIppxzqr3J7KWgMYtNb%2B20ib9HO9dAoXhqZ9t48yGCDM%2B6%2B3Ge%2FnU1Dk0MckMG5%2FkpBij639JNceJozZjcWGK1FTA0vrMtGG0Y3RUczTk94cuzgiH5wfM5H1gAf3894ACV2Yk9O6GuWeLnz5iVHiSqTxTprsc5XkAXUif8U3DFi8n8Y%2FLMbDDszNTNBjqkAW7wNGMUxzeRhm1OvWC6qn9XdBGq%2BfZd4Ht%2FtDw5HtRw5C99b5y71GF7TSMBsYepX2HBbaqoET9BJelzDEOdVYgO5wte7LUgh3TZCZRV5KeTs1lvrnkJjcjOFzVzVzmnyyNhmXdaogjO%2FtpFLIhJgjR1n2dJ9m4U%2BmMI1PiVcssduxJf%2B9046y9D%2FcTzxEyBoIoq6iqY74aDPOB%2FENtx27XHEeNp&X-Amz-Signature=b25fd31d6825babc199f075fdba62a648c3bf5e4b067edbb5e1a8135e13b40c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

