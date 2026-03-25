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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663A4SCUHE%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCxFAlCr95mk%2BZyOnKy%2FUKEKsukmPF9pFdfuqP8utZOKgIgEET1nN6KW9Oh1LiP7q%2FktCNBjlzk89MJjapwCH8ihkUqiAQIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGNgkmDeUtFH4425WyrcA3hG88C%2B%2FWsUSML9qlsQIoCzScIWWQWYkrMdOnh8kYG%2BVSyd75X5b43GEh64FOkqsIT3WlwR8zDFuvxr7q%2FaoIxeyZ%2B3xiTHgA%2Fz8nMY%2Fp8ktZpm%2BJUebE0lv2f7rv15VY8uQzQDJBklwedTJc1mszg%2FaiWv28E2SjAx1Ox%2Bt%2FgSnqshbvQJDnJx164XmgsM4nYH0CM1tHpOnCA557WO7rKDEMC8eTIHVn9EQmrdXcvU32OJ69cCCVL8IRhTu42CAxOqlYcLA26rIuPvDws%2FC50K5wsC3L1wus%2BkCXaXlY42xixIcWP0waHwiVz0v2P1Tx0vh8efObP9Luh3bJXZimKtHRpHpf4p3TW1abtKMBGS4PDYC5Mksy2zgxv4Yr%2FZdB6i8rJb2rESoyPZT%2BCtZoWeTB%2BvmNNnjVv2c6u6eIiIe8nCwvbV%2F71y6Y0eHMSBg3f4I2uh22685o5Il2TEhZtVWIWz1RYfoJK5c0maA8Vzsm3VBiDwSUMfzVA0Z7%2BFRD8m5rzR2Kf98u9plgUA7w5qXs2rIRo0X3bFncKEoBXuwB3LY9FxfjKdvO04sE9%2FCpeUmTDHI5Rt2H5DESOvREOik4yif01On2bU3mtY5yrOGw29eGsDQ1ae%2BQSZMJ23j84GOqUBqofvL4Vc9X1eLgqw5oB2xuusULEtf%2BvSEHxIBFvn8Rp9UM4Bf4XtzjyWCS7e8bjM5zG9wv7MDVLZcF9ZP8G%2BMKxmWLloSqSho4j8%2FBNaJ3VUUNq8FLRuKT0t8i1HWszBmmuQjyfLU8X8NioLNVWg7VJZbEmw5y9voERtrjpN5mqt7VeAwZcRUOpvVxpaqqlxMCfdYFaU2TEJ%2B3iiOnlFQAeTV75V&X-Amz-Signature=9ac94124e30b393510f8dd1e257277675a7b0ba6903b5b303ebde43c9c19409d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663A4SCUHE%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCxFAlCr95mk%2BZyOnKy%2FUKEKsukmPF9pFdfuqP8utZOKgIgEET1nN6KW9Oh1LiP7q%2FktCNBjlzk89MJjapwCH8ihkUqiAQIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGNgkmDeUtFH4425WyrcA3hG88C%2B%2FWsUSML9qlsQIoCzScIWWQWYkrMdOnh8kYG%2BVSyd75X5b43GEh64FOkqsIT3WlwR8zDFuvxr7q%2FaoIxeyZ%2B3xiTHgA%2Fz8nMY%2Fp8ktZpm%2BJUebE0lv2f7rv15VY8uQzQDJBklwedTJc1mszg%2FaiWv28E2SjAx1Ox%2Bt%2FgSnqshbvQJDnJx164XmgsM4nYH0CM1tHpOnCA557WO7rKDEMC8eTIHVn9EQmrdXcvU32OJ69cCCVL8IRhTu42CAxOqlYcLA26rIuPvDws%2FC50K5wsC3L1wus%2BkCXaXlY42xixIcWP0waHwiVz0v2P1Tx0vh8efObP9Luh3bJXZimKtHRpHpf4p3TW1abtKMBGS4PDYC5Mksy2zgxv4Yr%2FZdB6i8rJb2rESoyPZT%2BCtZoWeTB%2BvmNNnjVv2c6u6eIiIe8nCwvbV%2F71y6Y0eHMSBg3f4I2uh22685o5Il2TEhZtVWIWz1RYfoJK5c0maA8Vzsm3VBiDwSUMfzVA0Z7%2BFRD8m5rzR2Kf98u9plgUA7w5qXs2rIRo0X3bFncKEoBXuwB3LY9FxfjKdvO04sE9%2FCpeUmTDHI5Rt2H5DESOvREOik4yif01On2bU3mtY5yrOGw29eGsDQ1ae%2BQSZMJ23j84GOqUBqofvL4Vc9X1eLgqw5oB2xuusULEtf%2BvSEHxIBFvn8Rp9UM4Bf4XtzjyWCS7e8bjM5zG9wv7MDVLZcF9ZP8G%2BMKxmWLloSqSho4j8%2FBNaJ3VUUNq8FLRuKT0t8i1HWszBmmuQjyfLU8X8NioLNVWg7VJZbEmw5y9voERtrjpN5mqt7VeAwZcRUOpvVxpaqqlxMCfdYFaU2TEJ%2B3iiOnlFQAeTV75V&X-Amz-Signature=9ac94124e30b393510f8dd1e257277675a7b0ba6903b5b303ebde43c9c19409d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5TNKIAB%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCmoE4vOYDqmNS2YwJ2GFj%2BpfvTbVZPaWfmHcgomUYZzQIhAPCL1PSrPYCdOTDwLkRCQvYAwWQzvjCsKJCVFwCLQpWTKogECK7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzd930JaKpUZekggrQq3AM86KHxD%2F%2BLUF5xkvoxJDakKQIMBlNqUMh3xfx5sg%2FTJ0EybewpQu31uIZuFF44vUGpWKAHVfGOTpsteNyriIyh3eVZGqxMSYV1jfESnpAzfdMiWEANPFXQsuXyac8KzHUCJD3eErDmBZ99YR1L%2BQ8BnbTTv1Qg%2B8jlqoSLZAulTWfKcRk9f%2B34ND7xj52yYmnBvq7kNA7LKkTrn2JRIuPsuzPZM%2BKeAeg1pD0OwTmUv7Q7vX8MWdzdZ0IwScmBpZJi7dHaURf5zmRvH986rKrM9e%2FC1GWjfS2MPasmZCRXjlRGLwyVwETATV9S5id%2Byn%2FkASIwv2%2B2jg0O1aHwVcF1Zo4OlJ25hTX3VcVpQdnjLrJRmQyN2D9ZazAERwRNBmUHbCisM5ZRKsnNG%2B1OUKGlPwWgViTIA8mDpRPvOm%2F9YfChK%2BYWjssXlAki7u2Fdf8k3KEaa2NrQgGa93j2hMlooIuvA26gMQmoeZajr7U14gpDx%2FXHdtkKkCihWFfXko9BZ%2Bd2y4TyukufZSzGOFtJKRTQwjnZk32n5dPrLSykLT5uQKHhgQTkyhiodcf%2FplXBwcIkwH39XZdXxBnE3XFLf1y0K3PJIxu7OXMIUB6n6HRsZx7pzFIU%2BEjzMTCsto%2FOBjqkAQkGUo%2BwaLuodTrC4Ld92Jbf8dqR4KGboYjNQDtQNj3lXf4YP4WrkT2ITqhYbHIPLjavVapso4QHjQAyHQeeqww9CXrzGWbZpLfzsT%2BpQM%2Bbealk1t6%2Br4DhwnTs6h4XyHzTcML1zSj3IzVW0YQtpJnhgNSC%2FiePGLOsrfUwJCGPp9iZiimA3QrvSpX1OqEquERxfYVY7RDwQCvzd%2BruxqBSZNGo&X-Amz-Signature=d65ba90291d23b680eb93ef047800dcbe2f097047a548745d31b6764f783ab34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VANJPP2T%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDasT3GjFi2wfmQGPJmqm4hl1jZoVwi6DCc1aafNGpDeQIge4mqUwOcwl%2BIzKPunVy8HvRfD82rOI8xE5YAvlTBDlcqiAQIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMOlUkaPAvwtkp1wSyrcAzvM3QrM0reEBjvTJT4DR9QrKiZXc3KSlh74R4RgHrlz%2FsDM%2B4CntImiu9YgKpvL%2BZ3OqQIPcKY%2F8Pubu7WCbkaiDXZXbWPfA4cuxo1AIA6a836QOtycaY8J1GnMGNT7kUcP8EJig6o7SbirGfLtnPBjOwQ7wRPutz9ptGkdrZMNen3rDhUbtgi6zUvB7%2BGaXh6y9cPoSD1kuvfKkMhjLp5xuugqlaXNLuN3j0jSSB2kUlKXtA1F8WzhuEqw6YWnFJw4YTGCMhrBKwoZijr7N8l7%2FWlK8%2BeeajZg6YUP8lXQ13g15dcZJKXx%2BN0xOwr1r5MEfV7D5rzB1ECuBEsEnhWlN1cBuG8tE9r8ouKXlLE45Y5c01r6eO43SfsN3GMZw2ErSbI4tzLN3Ohi%2FeCQk7H6Mj%2F0OXlRgK4eLfta5XvDwvbZMHsuN6WjiBeRrEeBosqYxlBxdgxM%2FDC%2F8ANeuvcBRJ%2FyahqTq2XumH4D%2FzUK2RMzFWB3GdXu%2BPybTjc718W05oz2T9DDDnLtoe1hjgDwPs%2F33JBsSlsNZ09RjKie3WMWqOG8ZFgfmsqK%2BXl3ZlOeqJdW685Ef37d1NQPgqSuXH7dnE%2Bay1sHCXVyTNecXsLrtFlrepBUgG84MMG3j84GOqUBt4Ry7okCOTcTxRx48sPR5KOe0TAXwCB1z8Hu%2FqRtXyaZEBbd9QHWSdKWekrqNRzZMGTcF4Yi3aCOcZxtgDK7siWpp9hHBv1uroMmP6BIjCWsvefYLJnX5bJ92nHPc9P1dEmW8jZDAdvSAVqg%2FAhfzFh8o0M1OXlAF2ibKxEuEpBQAJpbkt96rzwUN0U%2BzOJxCaPDyFbrtz%2BwJz2n2W9YSi5n7YXU&X-Amz-Signature=d3a7e13427bdac772f71b8b5169e04378ec51dfdee524047f59eadc13da35550&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VANJPP2T%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDasT3GjFi2wfmQGPJmqm4hl1jZoVwi6DCc1aafNGpDeQIge4mqUwOcwl%2BIzKPunVy8HvRfD82rOI8xE5YAvlTBDlcqiAQIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMOlUkaPAvwtkp1wSyrcAzvM3QrM0reEBjvTJT4DR9QrKiZXc3KSlh74R4RgHrlz%2FsDM%2B4CntImiu9YgKpvL%2BZ3OqQIPcKY%2F8Pubu7WCbkaiDXZXbWPfA4cuxo1AIA6a836QOtycaY8J1GnMGNT7kUcP8EJig6o7SbirGfLtnPBjOwQ7wRPutz9ptGkdrZMNen3rDhUbtgi6zUvB7%2BGaXh6y9cPoSD1kuvfKkMhjLp5xuugqlaXNLuN3j0jSSB2kUlKXtA1F8WzhuEqw6YWnFJw4YTGCMhrBKwoZijr7N8l7%2FWlK8%2BeeajZg6YUP8lXQ13g15dcZJKXx%2BN0xOwr1r5MEfV7D5rzB1ECuBEsEnhWlN1cBuG8tE9r8ouKXlLE45Y5c01r6eO43SfsN3GMZw2ErSbI4tzLN3Ohi%2FeCQk7H6Mj%2F0OXlRgK4eLfta5XvDwvbZMHsuN6WjiBeRrEeBosqYxlBxdgxM%2FDC%2F8ANeuvcBRJ%2FyahqTq2XumH4D%2FzUK2RMzFWB3GdXu%2BPybTjc718W05oz2T9DDDnLtoe1hjgDwPs%2F33JBsSlsNZ09RjKie3WMWqOG8ZFgfmsqK%2BXl3ZlOeqJdW685Ef37d1NQPgqSuXH7dnE%2Bay1sHCXVyTNecXsLrtFlrepBUgG84MMG3j84GOqUBt4Ry7okCOTcTxRx48sPR5KOe0TAXwCB1z8Hu%2FqRtXyaZEBbd9QHWSdKWekrqNRzZMGTcF4Yi3aCOcZxtgDK7siWpp9hHBv1uroMmP6BIjCWsvefYLJnX5bJ92nHPc9P1dEmW8jZDAdvSAVqg%2FAhfzFh8o0M1OXlAF2ibKxEuEpBQAJpbkt96rzwUN0U%2BzOJxCaPDyFbrtz%2BwJz2n2W9YSi5n7YXU&X-Amz-Signature=d9698aa4a8830168ff0cda4cf775e71bc7e74210dd6c9a49c00d62ab89a317c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YH35S22S%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAPQ31JHI%2FIuuXU%2FHIE%2BlGP2YSRVmFEdS8atd%2BaHgGQVAiBZM%2Fjaa437RkY3mCgeD53WWEmlYzzWKSa6EHhKN7KeliqIBAiu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlb5KUGZY%2FnFb5taxKtwDuF13njfnVadgXBo1QaeGVc%2FCKb4NpA0ShaL4Dfxg2%2B2v38GyOfEkImOppyDV4fkF%2BG%2BWM%2Fowalce5ox4%2FjAJtGKyG3Z5XFMnrcQKStkegEC8XDnDtQocBSlJK%2F%2Fyq%2B%2BnBypf0qVw%2FZ0%2FKa%2BRL78mwg%2B%2FQwrdOZKaUm7enubTVD%2BOWa2y7QZj3xq6VN90%2FWARYxdeLQQr%2F6kJ18O0dmBj9qplzMmivFcTjS40Zr2Wz3rybxYF5caqW472QZnyqWoZm9wySC8LrrZ5f9HF8NteTVNRKevjMD0J5FpYHYmDgTDemoU69C302Gin8JDlIwtICDja4COgnp6rA4z3NZpVxukIjaNTh7gww36wWqmlg3b%2FQzUtHqHgVSpHQOc7IUZL4q4sHwA2rsHbY1ECE5Tn8AZ4zG%2FHigLsvaYKVg6SfCWq1sFbFVajnbL8T4XQ3Js2gfDVXe%2BjAieI8CzSIWpVYZeA6%2FayNWi27BeN%2BDnRd0Mfoxb%2FnFmrbHzDZNKYJP7o%2BcWQKjYiqArA7tQXzD%2F3ctRxtm3EukN5Lfb0aSZgd1qpCvsJmhVU3VwjZcanyyzEOXKIe5CgG1ecIBDXWFm7NuDvkgrOv6C8YLJAkPQvBFDwhSc3Bd8OkldSmw8wiLePzgY6pgEdaX19t%2FWOBpJ62MMEKBYo4NZg4YPHU%2FFtQKlqX9MIiy6Pna4usl8Kq7zakHtneZD1q8UW0J8YlwdWoIm4Igcd%2BVEO7Tqifdok8NCMCcleQcvwbWq24aMm%2B0qTENZ27%2Fa925R33g%2FPArGK2EXoZ8lL8JaNxPMhDGKqKT4lTTGi7Xqd2u6lPNzqNUcbp%2BVXAhAeJTydZV1UuFupCEC7rLbyXZmUH%2FiX&X-Amz-Signature=5d30d1924d9c360a6a165160ec37b97b445962f1c7573ce5abac89519e4850bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TB5FVASM%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG5xjhg3RFzh6QzrIPteyW76zVZNT2jTMOSw%2BXKeH80eAiEAnUrZDPLW%2FLXm6dyjJXmWoLT0uCOf3Dr6rJBrQSfQRFEqiAQIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCqenogjnnzRj%2BBNeSrcA0BmkuvzLYlHP8IwKSXj38vMbBf3nu0eO4VYONOuNOgq6ZOnOJvjmPs6t0MGz6cS1kjk7AGI2YeC6pNYz4U7V2lqnvCzkLua575nb2zOLX5u5K0yMbvAISqDgF3pvlGbg2OUgrMdOeqiQkmiJhhXa3Zh34LSML0dvN1hFZR1d1hLmoLn1MT8IbZsveujtg0V6mNfuO%2FS5OCjcHw5Jzob6m42JnPnisXBozDNIElLSQoV1z%2BRm5IvRhZY%2FRx7lUCd4zmI2jIMa0hSFDRFGUN4n53nfi7%2BIrUaDz2DQLjaLw1%2Bv9T6axMycCqo86Cy4Wqac2k2EO%2Bji7MLIMzQglyQlRWscZ78d%2BDZkAo2yNO14rtLrVWQTTtMxi4WZO49QGMr4jl7WDX6deXB07AE%2FF62xhEw4jGfGStOZTTHKAa%2BCDkTgwgFdfRshEPJhN5w91BofjyC%2B4DPVWLx1Sb9R5N4NJ80QJI8XWC%2F9B8JyUiqh%2B37WLEebQi4siVECoUBuKbaTDZ0PI7h8LH3WFBOBCx7NWLe4UEGZNplKlvEkTg7Vw6bxTuMCO0dd0ayQHVM5snG7wgUGHvcWJjyeB15w4m1OJS%2FZDGz%2F8DQP2CnsPbnqI8zawyLF7gsMUTHxdP4MIq3j84GOqUB0xtqOehVOTpauAqtOFzfwxJMkcwimDHvPnfOBWApeZaDLmbWOJdzVmjJptvKCKR2M%2BatcwwfHR2HktVLOPyaZGdYnRYEHWmZKrrrDJ9gEcXFH09M0zPnRbWWAJgzkBg5VgHIuoKk41cWME2b1j%2FCg0QGRD9qtyhQ3ZmEGsloAvPbzHAk%2BvdfUss84WhVj%2FKH%2FM5OtR0okYW2QWruZikLBDNZ7u1M&X-Amz-Signature=ec1af1cff9debfa1f47b95e5bfa6859ef5cf41e5891a68de75f733fd43c6a2b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSVW6OQS%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB8soTe1s1W7Ab7M2fGUbztLzSCpoR5cesE%2FI0GZh7cPAiA%2F9S4cvOKHzTxfZKF9y4yecQNY%2FA45pP0crq91QJu8xyqIBAiu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMdw04hIb97g2FhouCKtwDhW8%2BLs65eC3UyOEI9MLyM%2FqS9UmJmEZGBgbsrRtHI9X1LSC8xPSNlNNSwkaBBQz5YQAQ1a9nvLVTWSqqOTiSAmAO3Zp%2B8kH0tclKC19srsQJL3DhoT51xSA0UlpRtv1CZ9%2FzeDXy3gC7P1ohUiQUs9AOND8cOuSisHUQd2DKuqVSjuIUEFXYrfVOhkSl8BJgezD4EoGbVxQowGu6p8McEUjR%2BPFy0DJj6oeQOZd074QJHrgF%2BpbwiIcwb%2FTwV6t9fPDLet2t9UmUJPy5k%2Btt%2BHlm2l3BJ3gelpYTMKqCjg9YW9q2rJTnZhUFfclO8mSuEjGM8GlaIkmrmZ6X%2F%2Fb1WvoKeu6oFMoQBvpix7UcdGqIzttecNAQ1PncAyrlatj5GZ2Vp2%2Fz%2BXbBXQGDpl%2F%2BQKey1P4Z0Z%2Fp7SsckvvXtT%2F%2B4lBmzT0dWp1xTpz2VrmdkwTRAaI%2FPd%2BvjqEWo7MAuL%2FiYWjD6arjb3v%2BZYc2pFbfETgZEPtxa8sEM1q9bu8la3zWqQJyAjGkPLA1PuaiIdp3xZs%2F1pC6FELKBOpYA9hgfn5DM1nQK2boB1K263r1rC0MyRnQEEQ1%2Bc%2Fb9DQmI5YihzYiPrBA1ArsM4tS%2B40i3pl79j0A%2FjK4nwMwtbaPzgY6pgFbDVWHqbiLrdVsKV%2BALpt4JTTQv3%2F23rWjrCSHfz9xw48Hvjdxm39bhdELhkXgNEn0s94lyMOTlwPg5jeiBFcjENW3tIz34i3Pg6Q35G1wxOBA%2FPJCSnVnV3kGInPxZi1n08OKdIOs0F1KDIJKZVwPfn03736L%2FoDOxiIz%2BxvhkyLlSPY7GP8NpWR44ULnBSiiCYON2R4RDlOzsSX7uFod0j06YS6a&X-Amz-Signature=2e7092e08f8dcd1a977f4c3beb29ad024f284e298b643787d8b9b86588a6bd4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UM4PQ5XF%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDoOcdOzRBXnC5bjNcdrurMy%2BSEfyavHR72aN%2FunU6rawIgFCR5qjxOWvyoGbYsRfgs5gusJZAf8QJxO46VGxYSu%2FwqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBxtpuWCX5k0g4oESyrcA5cltq8Q8x1pgDnS5G1TDIyuKzJdJvReuElp8%2FSMhMn%2B8kjGhZ1Gc1u4ogMR%2FZFsjSsBFQT%2BnPgQUL3jrlN8%2Fy3Qh9xtkMGM5lusd0jMaxR4FNhnD1QggP6%2FSmssj9Su56ki0N5%2FM0k1r7HtPPwscyymhIotT162BIcVYVN1Aetmfdfr9a0DfdTS3d6J0I%2FQH8%2FQjD9IuaIcmyKblgdWzZAnbwNb0Qx9f4NFQJKmwDhic3uMfOr%2BiQu3AIMNkbox%2Fc9LamByc0CZ6SFqApKK8RiRlxJBEdNTN%2BkPVkNWTWy99Kbq8On7h8E4HPAZanBNA0bZgXLwzoq7%2FVu9Gl7CChjktP7jxV7YRNv%2B0PNCQtMFHESfVwf5OjUdxkz6QoHjxL1iSP%2B0FmhRWHjJN68puImpe%2Fd1JrJToDu6hWi5EI7StjV3jTwAevihTvN9t3RCHKvIaMe9zN2ySzVkkqPo4y3iZthACK4U0cd1Tg%2Fi2z%2BqYMq4xT8NfQ7SpSA82j785tQJV76dbIp8sh5r1XbigDqt%2FWvK9ikpptVlPHASX2sbwwLC8v0hYPZ91CKaJgGAiCoqr3GRDgA%2FxYdhLbBqkJtEfPtzuoyVCE%2ByPjvnAw2XVgmmezN0rdOGteMWMNjXj84GOqUBlzQbUCu5nacArf7j8dqs6qS7ByoxI25ntFefDwRcltf%2F6kRALVbWgc5R%2BWDja45duv5Dtfku4NW8jIu%2BwhsKBPGo2l8QDVnECuxvtpgYwcmAwtKUAgfAN2iowpkB4M5vYXkix%2FuelgrjRqMANHggckZwIEOKYf8rj57ehjx434YWvo2sgzUNc1NgA38rysd62783YdNKch4xYK0VFDatAxfdJUVU&X-Amz-Signature=fb66eccbcf65732e488be06ccd8cc9935b63fbee5b8eb3908de8f9a5dcf6b355&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UM4PQ5XF%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDoOcdOzRBXnC5bjNcdrurMy%2BSEfyavHR72aN%2FunU6rawIgFCR5qjxOWvyoGbYsRfgs5gusJZAf8QJxO46VGxYSu%2FwqiAQIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBxtpuWCX5k0g4oESyrcA5cltq8Q8x1pgDnS5G1TDIyuKzJdJvReuElp8%2FSMhMn%2B8kjGhZ1Gc1u4ogMR%2FZFsjSsBFQT%2BnPgQUL3jrlN8%2Fy3Qh9xtkMGM5lusd0jMaxR4FNhnD1QggP6%2FSmssj9Su56ki0N5%2FM0k1r7HtPPwscyymhIotT162BIcVYVN1Aetmfdfr9a0DfdTS3d6J0I%2FQH8%2FQjD9IuaIcmyKblgdWzZAnbwNb0Qx9f4NFQJKmwDhic3uMfOr%2BiQu3AIMNkbox%2Fc9LamByc0CZ6SFqApKK8RiRlxJBEdNTN%2BkPVkNWTWy99Kbq8On7h8E4HPAZanBNA0bZgXLwzoq7%2FVu9Gl7CChjktP7jxV7YRNv%2B0PNCQtMFHESfVwf5OjUdxkz6QoHjxL1iSP%2B0FmhRWHjJN68puImpe%2Fd1JrJToDu6hWi5EI7StjV3jTwAevihTvN9t3RCHKvIaMe9zN2ySzVkkqPo4y3iZthACK4U0cd1Tg%2Fi2z%2BqYMq4xT8NfQ7SpSA82j785tQJV76dbIp8sh5r1XbigDqt%2FWvK9ikpptVlPHASX2sbwwLC8v0hYPZ91CKaJgGAiCoqr3GRDgA%2FxYdhLbBqkJtEfPtzuoyVCE%2ByPjvnAw2XVgmmezN0rdOGteMWMNjXj84GOqUBlzQbUCu5nacArf7j8dqs6qS7ByoxI25ntFefDwRcltf%2F6kRALVbWgc5R%2BWDja45duv5Dtfku4NW8jIu%2BwhsKBPGo2l8QDVnECuxvtpgYwcmAwtKUAgfAN2iowpkB4M5vYXkix%2FuelgrjRqMANHggckZwIEOKYf8rj57ehjx434YWvo2sgzUNc1NgA38rysd62783YdNKch4xYK0VFDatAxfdJUVU&X-Amz-Signature=d07fdd97519abc5244b2c31648fe74c3ba2bec1aef80b407de14aae966cd465c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGACRBUN%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEAqE1fmE1tFVILrEanbpQ%2BBu6boqhxbdGgkQl%2F4arB6AiEAmDdUj1nQwP8vF5cwlU0goXyJlfJfV%2FO8m7fJcEh%2F%2B8oqiAQIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE71ZKv66vYeCJxQ4yrcAxFjwGr6BuF28KhIdTjJ6HG9vDUYZc%2F0DZF4jCfZtPu%2FEilisopBjqMXK5N5K%2B6%2FZ7ACrgfCED%2FByKi9YvX4E%2BbVymilicA3YykPKM2uNvsNc7GTrg%2BBARUi6cOvfZawVUEKMM9F0A8YErFy62Ae6Qjr03GHbosO1uyt%2F65oZ48g5HTmmDXuOhKKyDIyftYy6AfX4Uk39dA29RYzjjPl6x731waEnN89%2FmKDNz8kEGROE4w%2BMKBx%2FZbWSchi1ayuaTaaCua7BZ546f4%2BivWURtNwjaJopAJHKzYldzI2MvYY91wJtkWyjumUHreqVMwE22ggO8Gv5QgsV%2B7tqGK8lEpFskZ59O14V6GlmuN%2BtQw7O%2B4o3FgMBkQfHqlAgMos%2BpMTuFE408zR2I8wmFNmMcbC6ycKzTIXtrXfuCVtpp15%2FT30PcaeYHKo9uvClbHV3l4L08dMo965x%2BD2Q2xROTiglzP%2B13F3Bqmc6blEonErTSdCAlhEQZUb9yta99YPmODsBxf1ZFAXVII3B564M6QS9mx0uweB3XxgGmiFJ8aZIBRXlM59PRtf68VOQyoKrJLL9LBjo0%2FvAlhMTwhnWyqvfcVdtRoRP%2BOsoIG6FcLlmcn%2Fb9g2oloccNuBMKy2j84GOqUB7SzFULOiTPTLVZc3nCK%2Bvnhbda1Ebk3D02QbI%2BDnkrn4Hr3snkdXRF3eI1qjddiRCnIle1pkMTDVuh0PjEUk85xxhsXZn1Ir3m0cnlwTJqnwDT2hMMx9iZi%2BMngt8dgLSgWnka1h1wehlYQKuA%2FfJYlXmXwTC6BjnwHOHyUom8gVXK5BJyhkQ4GShyBRdPAiXQZp9135Fsvur3aZAkC53cbkl59N&X-Amz-Signature=c622edabac63d4fabf18c53ff1c099abfe5f1ab12e846216ac6221ac2c89b3e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGUP7ZCD%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH500m36QMx6UyAGIzE%2F4dkcvc3iDxzCP9v3CvoIED%2BjAiEAwzW5eZ53x9EQC7aNylQ0scYXjKXnqZS4OKiI2x900KQqiAQIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDfDEphzYnT74T5PGircAxbMTTUilsrf4rWXojjjKqGthpf2kPoJ3hsXLuhqJpX4Omu0iMOqpftG08Jdbpgw1jZVaJbIffhnOz9U%2BJoSj5CAMNd2Zzpk16VezNnvgD28NMV8pqBZ6G7VeiZGnxbdy%2Bdkq7Hy8SCImV1qdMCBdlyZVmejdxsaAbQd8O42hk2UG%2BfCNscV1mG4rHDDrxkj4CLtgHZzYF03ZZMs0X5loH7QG02gUdieYXmAbnXvGbP%2FY9J3%2BoGjvgpyIJHaG6pNq0EFLNigZR2dyhMT5PuG%2F3%2FRNkGwDvQvs89dMd%2BO8mgV5xrrExbdcFN%2FSVaOjaomIJRPQeCmCyJiczGnPnUdmX140AmFIbUsffludpSDQPn164Ui0XRenrTWifZYN1QzKDXabb6Ed2%2B1S7mifI8DDosnIPc0cPVSvm1TdCB4P4luqGu39g4iHHFh4c6aRUboPnJKAlEZ7jPHNnWCcUbogGXzKSmehmlH87QeholUhha9Cspde02KpYj0Loi%2BOXf5UR4zf%2BGCEvi6E7%2B%2FAAwa%2B2%2BqtsddDcqKX8D8HixOuEgeHL7HYyKuWlAdI9lYOF%2Fz8kaut1xc5lIWrIbX8KJUvvRGVnfOELBwcgFgnXJxlmKEKa%2BK8PH%2BBFI%2BcnHRMOq2j84GOqUB%2FlHuYaQIoOtZmvbdJxPrgVCyXmeouf6olXL5FMe3R32zuocRkWRIjfrgrPTlYt08UrZk0BNihLZYD4pyDFjdjqZ%2BLKiCZlCBjIwpkxoxtSS8EktNUxlAExDLEwo4i1xu%2Bz%2F5TTJJzpVc%2F%2FdsFfUKoxhpHp7%2FlncfGFmSY586lxn28hECTo2zS2VsvLosYYNMj5LqegiQSGDpoa9cr0ZSES1CTCDc&X-Amz-Signature=f71fa6ed2548b35e94de99589e891a9a04994f42cee488db2c749a4b5df0ad8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGUP7ZCD%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH500m36QMx6UyAGIzE%2F4dkcvc3iDxzCP9v3CvoIED%2BjAiEAwzW5eZ53x9EQC7aNylQ0scYXjKXnqZS4OKiI2x900KQqiAQIrv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDfDEphzYnT74T5PGircAxbMTTUilsrf4rWXojjjKqGthpf2kPoJ3hsXLuhqJpX4Omu0iMOqpftG08Jdbpgw1jZVaJbIffhnOz9U%2BJoSj5CAMNd2Zzpk16VezNnvgD28NMV8pqBZ6G7VeiZGnxbdy%2Bdkq7Hy8SCImV1qdMCBdlyZVmejdxsaAbQd8O42hk2UG%2BfCNscV1mG4rHDDrxkj4CLtgHZzYF03ZZMs0X5loH7QG02gUdieYXmAbnXvGbP%2FY9J3%2BoGjvgpyIJHaG6pNq0EFLNigZR2dyhMT5PuG%2F3%2FRNkGwDvQvs89dMd%2BO8mgV5xrrExbdcFN%2FSVaOjaomIJRPQeCmCyJiczGnPnUdmX140AmFIbUsffludpSDQPn164Ui0XRenrTWifZYN1QzKDXabb6Ed2%2B1S7mifI8DDosnIPc0cPVSvm1TdCB4P4luqGu39g4iHHFh4c6aRUboPnJKAlEZ7jPHNnWCcUbogGXzKSmehmlH87QeholUhha9Cspde02KpYj0Loi%2BOXf5UR4zf%2BGCEvi6E7%2B%2FAAwa%2B2%2BqtsddDcqKX8D8HixOuEgeHL7HYyKuWlAdI9lYOF%2Fz8kaut1xc5lIWrIbX8KJUvvRGVnfOELBwcgFgnXJxlmKEKa%2BK8PH%2BBFI%2BcnHRMOq2j84GOqUB%2FlHuYaQIoOtZmvbdJxPrgVCyXmeouf6olXL5FMe3R32zuocRkWRIjfrgrPTlYt08UrZk0BNihLZYD4pyDFjdjqZ%2BLKiCZlCBjIwpkxoxtSS8EktNUxlAExDLEwo4i1xu%2Bz%2F5TTJJzpVc%2F%2FdsFfUKoxhpHp7%2FlncfGFmSY586lxn28hECTo2zS2VsvLosYYNMj5LqegiQSGDpoa9cr0ZSES1CTCDc&X-Amz-Signature=f71fa6ed2548b35e94de99589e891a9a04994f42cee488db2c749a4b5df0ad8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2Y6Y7RT%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T140749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBppvwGl5ZDFhPTU8VWUIv2BmknlgLIKZdNgIQYEvRNjAiB0mD2nUXV%2BzsTuVnEPvamZouXxmfA8%2FUWJqysuXiJs4yqIBAiu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMQmv7DO0s962TjPi3KtwD6nZP3fbU95q2MPigamBtHknFwycPzYQfvBkkwh%2BiJ%2FawCbMLs58b2PEDtATPLRSxNH4FJBhFPD%2BGFnCKXqDfmOGGmVg9F7LOo75T6rhSeBnJdKtaC82fEnz069CnyVXGzBZVBE03Sd4TWZyhXpyPeX6%2Ftnu6qmc7FKb46St8uMrd6w8Pp07Qvxvm%2BTsw03ZzOc2%2FEfSNpLsTfaJxIPrMZxvsPwgg1ohyVzBBUAcYOs5XzL9dzRThknA6x0QwfXA2mIYNaXG6CS4E%2FaQeg%2F03OJJdknjDu8ymGIVFrhx%2FSQRxie8IIXOydGKLMOrqXtzkcNSAKfsFU9WfxCswpHclqUcSbMWmpPMvoLu6hifulWfgA9bHxM%2BXKUiSHpeftGm%2BaD3c0zknqeIk2XXoOq7ZyFlFqs7QUvOxwU2mLhgEDHyHAfyECcXkHwh%2B1uBgJNadmr9IB3Y66YA%2FCuI%2Fc55I%2FlCbu4wzB3CUS54IlxPB7ynxqOloN4VlwfbZ3FcBu0n0L%2B22WUJy2n1ScJs2iaWYjAFBP45mp%2F7bNSqyHxAsF4KNp3jLKyzzrdXjQMlv1U7NnHmI5WZHXyB7rRekKp%2BtNGZP4GQv%2FSGIPXF%2B%2F8qSk1Ly5I7N7jEzynEu0eMws7ePzgY6pgHDyUa4RmOhCfO5Nheo6tHKBCBzP4kSbN2gyXDQ%2B5ZJMOQKgoBuQSJ2ocW1uRvWuM307bxEKOmeUfHc69dv65TghvpleMISwwOymPAktzyg56p0GcpMPoiw8V7yMgqwBs2DXj3Di1fhWssXQrjSXaKJxSNHtqC2%2FugSsBBzavlfp0NSxrRtMwuZiYGhhvZDLfKfT0RJe24Pwq8TL5zb2R9feth6jzKA&X-Amz-Signature=b00e75229b2cf8b7609bb45f07b56c71aff304a3a7f616e1421c631fe883280d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

