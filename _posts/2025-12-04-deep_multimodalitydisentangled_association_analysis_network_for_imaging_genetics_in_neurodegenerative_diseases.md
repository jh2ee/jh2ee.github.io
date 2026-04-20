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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5SE7NGY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCuG6OI9B0E%2F6KVLUgfOiGTRnrrC%2BNS4GM1xn8SZVk0JAIgTqpTdIKyK8X7E%2Fje8G0O56C%2BmsbcC2FrHaVxX2wYdzUq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDEkoryBknNtLmgFSnSrcA5%2B92tVLj%2BViVZEvf6FyJQ6yJRdT0iAJuahAR66pQJAFfL1PpxGJXK5wcUYx347hefjDiAHIRuO8G3ncBUIDf4aaiPMdYRvFeWvvO6Oc83qUHeCnhl4byu46oRJ7N0tHz1SBw75aVLLaGEDhPzHif5Dr5E0xqersHpxNFCmfOz%2FmlgFaRl35ObbyALCjpCTVw5vHcYN%2BdCbbhxsRAAuTx4YMkIz20zwpmPnOVS8YnBNSvJqEvvgW1zObCXBj9ZvhQ0H7E46CzdCW63Gt2cTbJ2gyQIV%2FW2crqFicAl%2FONWc3uFXkRJCyjT9cEZ9eHprZfFP0ukOmrS%2FkbMxnuM%2F8ek%2B%2BJsn4hb0JYdo2e0QuNQ6amaijSa1uQjvVYCjK1C9eB%2Ba5LkocLyE5TWNRnF3BUrNzq0u9bs8FIEvx6Q7jqbLh%2FwZrS3xvZsw8PsCR120kV5F36oDO4vqW2fYKozlZor%2BNT1uEyrJHa%2BI9RiFWqjwjxX66u%2Bzpnjwc7bw%2FcMFs8wy1S%2Ffyy62eiXYVHxiLd8Hr%2Fdj%2FQc3dCBtRmolTexzzfo38FB%2Bj6ip4jff%2B6WWcUPNmzNtxa2qDbPu7FZhkL5WKctbsqzXeots1UIkGW2snRkp46dAxg%2FWNTsUOMM20ms8GOqUBmqDDapozCoS3ntGu2EVGVBMapzA4xwXQy7Aix4O8uPewT%2FQDX6%2FFgOv%2BRj8lIDPECRUGcaPsfuYyiWOrqnLt5Ia2zlZ8%2Fysd9lPI7u%2FvIEjRODpjhhr2fhYzoSS4dJjKeDz99uA96vxUQ9Nc1iochQJWVonZTJyn18MKNqZR9hNa46vDNS1Xj1mqawp%2BOl3ADHtYdkt%2BWwCET7XZp65V4g3v08bV&X-Amz-Signature=b0f7450c97c8243cc845abcfb51df5a0c634f2bee34a73417ac88736b445b79a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5SE7NGY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCuG6OI9B0E%2F6KVLUgfOiGTRnrrC%2BNS4GM1xn8SZVk0JAIgTqpTdIKyK8X7E%2Fje8G0O56C%2BmsbcC2FrHaVxX2wYdzUq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDEkoryBknNtLmgFSnSrcA5%2B92tVLj%2BViVZEvf6FyJQ6yJRdT0iAJuahAR66pQJAFfL1PpxGJXK5wcUYx347hefjDiAHIRuO8G3ncBUIDf4aaiPMdYRvFeWvvO6Oc83qUHeCnhl4byu46oRJ7N0tHz1SBw75aVLLaGEDhPzHif5Dr5E0xqersHpxNFCmfOz%2FmlgFaRl35ObbyALCjpCTVw5vHcYN%2BdCbbhxsRAAuTx4YMkIz20zwpmPnOVS8YnBNSvJqEvvgW1zObCXBj9ZvhQ0H7E46CzdCW63Gt2cTbJ2gyQIV%2FW2crqFicAl%2FONWc3uFXkRJCyjT9cEZ9eHprZfFP0ukOmrS%2FkbMxnuM%2F8ek%2B%2BJsn4hb0JYdo2e0QuNQ6amaijSa1uQjvVYCjK1C9eB%2Ba5LkocLyE5TWNRnF3BUrNzq0u9bs8FIEvx6Q7jqbLh%2FwZrS3xvZsw8PsCR120kV5F36oDO4vqW2fYKozlZor%2BNT1uEyrJHa%2BI9RiFWqjwjxX66u%2Bzpnjwc7bw%2FcMFs8wy1S%2Ffyy62eiXYVHxiLd8Hr%2Fdj%2FQc3dCBtRmolTexzzfo38FB%2Bj6ip4jff%2B6WWcUPNmzNtxa2qDbPu7FZhkL5WKctbsqzXeots1UIkGW2snRkp46dAxg%2FWNTsUOMM20ms8GOqUBmqDDapozCoS3ntGu2EVGVBMapzA4xwXQy7Aix4O8uPewT%2FQDX6%2FFgOv%2BRj8lIDPECRUGcaPsfuYyiWOrqnLt5Ia2zlZ8%2Fysd9lPI7u%2FvIEjRODpjhhr2fhYzoSS4dJjKeDz99uA96vxUQ9Nc1iochQJWVonZTJyn18MKNqZR9hNa46vDNS1Xj1mqawp%2BOl3ADHtYdkt%2BWwCET7XZp65V4g3v08bV&X-Amz-Signature=b0f7450c97c8243cc845abcfb51df5a0c634f2bee34a73417ac88736b445b79a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UOB2BPV%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIGIb4W4MkCAXF4QOUkyLXWZny6LnGV91ZzwFa970oG7TAiEA0as7ACoep8n0w3uprF2K1%2Fw6%2FsmjF1PQoB%2BO5rsynIIq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDFOmuyhdqSZneRH9XSrcA28O9tZu3acTuTNZmH67N3GWE1TiTsqdHkG83CZ0s6c0w85GkK63K%2Fy0dTR1QBU1PMsGhC0tSWx0EGmEwj25%2FoR%2Blk6al5A8xVjcsWVUveZmJh9SAeJ%2FpyrytSTZAm7IL8a9Xb%2FKd8XXTh1Phgb9zfbyvpbiawEHsyw1YlxHzkwGal%2FAPGJGXuC43r4uWCCykR%2BOqC6Mr182I53uT80AjHuPePjEhEYEQO8mxS%2B8zNkDenrrcwKlJpEDHhue%2FGdbnSG5hGbSn7HI0vysGjgFkJ%2BoZlNGuK9Mj5kxHqAz0RM3MUkt5Sqbd0zk22u%2Bw6qxmqfM8B0wLGTVWl9XgtEikT5sdlWVtuVX%2BiSi%2ByOAEX0tQeokxQFu02MNKu5i%2B8UMSolF9O3xQgI1Hg631CwRhZ1vUF4o%2BCLxMk7uAt6sLZP8vf5yXZ7zohwViiq4Hg9nS%2Fc75PxImPvtwZGX%2FwWvXDU5M%2BbLmTPNPRHJWHwGdhPNU5bGAyYD7TXSyv5PYjhDCARYnLDojw8VOVilGYf6P4y95OHCNueamYt6AWWfkbNNZadMeSHsLVsQ8yWvgsyukmHtdoT1lPW8Acbr0wSENS9k7bhn9JtfKEZXwSePjWMN6dbS16yBgCAWt9n6MMWyms8GOqUBVcAis9b%2B%2Bn4KX2GWjcW%2FWR%2FQxFuMMaDnSCbEvKXeUrhbuH%2B4K2hGq6aiC0D89MO%2BIy2zySzUk42V7UudA4vwWjfIM9aJ5jS99yJNspDHCgcMMNn0mdsui9zDCKVo5OyKNASbuuYbLcGAp%2BnSjmM53DQdLO0WZHPv61usWEer5%2FU05rdDAiG%2Frk5w5ZuFEAjeBUoYvy6Bzo46c7T4e7Z8sia48tlM&X-Amz-Signature=b4316f81baff1eed556d27216254017c2644feef4803032a772551c12e0eaee9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZABVHS4G%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCZSmxHralPnuObTjXo%2F%2BTsBgNlzI1JggLoECiFmJnGdgIhAJNDDOPWZJ0zjLCvIl0U1yVLFCcZ1EHCkPAM%2BXyoRPPcKv8DCCcQABoMNjM3NDIzMTgzODA1IgxxN1OUZ0gGMK3dcx0q3ANMKjR1WXSxGjofC0nQnvp4zmhKmz51yuqJ3sY7Cw6p4Iy7AR%2B4Y4nx3uQLQGEAi5ek7oGK2vGY5Ltr1GjBikTsTR72zed4vgDIFfnAurYx%2FMJUP9xl7Ft3oXQO5cOfWPL9bTfBt6cfBDAOxWEkcBNbdYwmgLcbtBbjS%2B9HMSQwA8jJebgpUMulnLD%2Ft52IaXiDRcV6JyK5lQBRVdHov2Q%2BmDuZdBZe%2BBKmew9%2Fstusg4C9h%2BhFuEvOjbd%2Bit5m5YYWaQjdoDq9%2B7a%2B94b3LLrwpXXQ44KjYUeZeaoV1OZ1CNw0k6XKCVgiStUZGcx8pOq9YuV53fJdNvHWAkal5yhgvgyisSgjaywNYlu4aUZk%2FYijUGPN4AmWYLVr18%2B%2BcvBw7j7QAt1lnQJOrTQopIqF0FTCI7Kk8ijPlwHrQtXFt%2FPMWv79AqulaFrInHJQ3g3u9zFqGe%2FLL1fDTwZKo5USKK7wTQOloz8fJMZ2wRvvKO4h%2BA1iDjFz4ieLStgvOifrGRhEInbcT6fWuzdnabXvqWSxoBrARxUzrf33bKBZ4S8T2M%2B0LIm%2BTgLk0ElfH35O1RjJU6NXfkD%2FuIXrdwFhnffKqP693rO6eEMLbY%2B4HxuSZJQKwEQIr1n2UTC9s5rPBjqkAUbuT3Mh%2B0gqHs6%2BgUnHMkFIentz74BbOFuf1h3vTqoaVJfWZh%2Bq5tDoEdKyS5xFf9zZomhEZofTPaqyFnhH8D7JOIaAoG%2FmJSEZATkQXmjMJQa6MPKjFouXQPyxElz4dee2a4kOfrZanQXYiighZX7HGKB6nOzJAVyK7BiSpLVYq1h%2BAPzefO5%2F2aFrK9zYdcMRVoKjbD%2BTVX0dLD%2Bvu6%2FuVSXI&X-Amz-Signature=f630025afb3f0f3077bedee81594665d017adccc138059928b17237824f8bb0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZABVHS4G%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCZSmxHralPnuObTjXo%2F%2BTsBgNlzI1JggLoECiFmJnGdgIhAJNDDOPWZJ0zjLCvIl0U1yVLFCcZ1EHCkPAM%2BXyoRPPcKv8DCCcQABoMNjM3NDIzMTgzODA1IgxxN1OUZ0gGMK3dcx0q3ANMKjR1WXSxGjofC0nQnvp4zmhKmz51yuqJ3sY7Cw6p4Iy7AR%2B4Y4nx3uQLQGEAi5ek7oGK2vGY5Ltr1GjBikTsTR72zed4vgDIFfnAurYx%2FMJUP9xl7Ft3oXQO5cOfWPL9bTfBt6cfBDAOxWEkcBNbdYwmgLcbtBbjS%2B9HMSQwA8jJebgpUMulnLD%2Ft52IaXiDRcV6JyK5lQBRVdHov2Q%2BmDuZdBZe%2BBKmew9%2Fstusg4C9h%2BhFuEvOjbd%2Bit5m5YYWaQjdoDq9%2B7a%2B94b3LLrwpXXQ44KjYUeZeaoV1OZ1CNw0k6XKCVgiStUZGcx8pOq9YuV53fJdNvHWAkal5yhgvgyisSgjaywNYlu4aUZk%2FYijUGPN4AmWYLVr18%2B%2BcvBw7j7QAt1lnQJOrTQopIqF0FTCI7Kk8ijPlwHrQtXFt%2FPMWv79AqulaFrInHJQ3g3u9zFqGe%2FLL1fDTwZKo5USKK7wTQOloz8fJMZ2wRvvKO4h%2BA1iDjFz4ieLStgvOifrGRhEInbcT6fWuzdnabXvqWSxoBrARxUzrf33bKBZ4S8T2M%2B0LIm%2BTgLk0ElfH35O1RjJU6NXfkD%2FuIXrdwFhnffKqP693rO6eEMLbY%2B4HxuSZJQKwEQIr1n2UTC9s5rPBjqkAUbuT3Mh%2B0gqHs6%2BgUnHMkFIentz74BbOFuf1h3vTqoaVJfWZh%2Bq5tDoEdKyS5xFf9zZomhEZofTPaqyFnhH8D7JOIaAoG%2FmJSEZATkQXmjMJQa6MPKjFouXQPyxElz4dee2a4kOfrZanQXYiighZX7HGKB6nOzJAVyK7BiSpLVYq1h%2BAPzefO5%2F2aFrK9zYdcMRVoKjbD%2BTVX0dLD%2Bvu6%2FuVSXI&X-Amz-Signature=90789e5f0e80fdfdf96a2b23fae4e748f80fcb7ff4c651f4b286a517ce7e2652&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665XSZ2A4Q%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCcl7MqF3cMmQNTmJF0ZK441QxAeBWo0vS5HYfSOLciQQIhAMqL%2FHENEc9UbF79thLHpsYAlZsXsvWdSGWbfUxXobuQKv8DCCcQABoMNjM3NDIzMTgzODA1Igyyqnf6%2FTmtUf1zLdcq3APXExh0QrNyaF7iWWYf7hrqa1mYs9NaAqIctXF3h5MyUNfVo%2Bhx66teCD0qoX6Y15ppj6kXs1qHidgamiQwYndDMSfm9%2BWD48%2FUJxOaSznNS7Jc5SmtpcvXsoK0Pp1L1F692Ryvb0PDj54K11kUhrFZZf2QUlAtVj4lozVkT4XV6Nle2%2FYMWJ5%2BQPhjfif9No99ROpUR%2F6AmenaO2ciWWY1rHrrqdOlWqyMz2YwFYWQV3EdKR15dneN1VKw%2FZN%2BxOBXsHf9SONnKnLFUavQX8NpfjP9s28iCXowAYf41MuSPZQAQIUxzrV%2FaoD0mNUhPCKR6HlkI%2FDRitKsSqC2vaJ%2Bk95%2BS9L7x3WQqkFXKOy9fDBODnc6pp0AEAv7rdXK6WWLGKezY7Vm4VHAicCW%2FZTKJgR4PhacY8JTrly3u00HygGlfCZnaX8eMRIJ3Q4W9jjXaw2GlHrB5Y5ifJCHJsZ8gatJmDns8%2F%2Baj9iQgxQFhtx%2BJS6UTnT%2FTJHmHa%2Fdviy5AIsmKbRphlnJHxQq8kszmwhvhuSedcUhJLz7%2F3jarZ88Bd%2F3Wr0289Jx2HgdAgqRUmBtx6Y6l%2FfmL5r0Zv2%2FS0UlvPSNx%2BDQOeMKX60Mn2YeA%2Fz7bRpbaPgx2jCitJrPBjqkAQqUyF6wi%2BUWvSitmOuGePWp4aw0ZN5kf0uKDgea46r0O5%2BFdNP376DWWs7nf6%2FLKMUKPZBLeIl7goz1%2F4mMhwG13knXbNmu5UWm9pWHunbkIDQY782wAYU4Vo60dec28H%2FBy4SRQ%2BQ7OR4xNZF%2Fy5KDZdmUjZdlWKnLE1fsGDZ7920gQhZB%2BezjEjLjWPQ8Bv98Zbh1%2Bu2qHdm%2Bb%2Bj3hjw8cVEP&X-Amz-Signature=b4f55be0318a27f0b7f67a61395cd27d2ffd32aa2768d2531b00eed082231e6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMQ6GO6Z%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213431Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIBJ%2FNgjiJq3iv2%2BkVFhpb6C9jWhHSxLmBhf%2BBTq%2FYhj9AiEA4J5u%2FnMdROda4h3mA7E7ikmDZ4%2FE9KAiuzmpn4A52MUq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDG9PxboKt%2BDVUYA%2B1yrcA2%2FYaJMwAgn4MJoX4%2BHH5pMuCkFyLrpVIotWI4Gx4u0A0W0WvtoS94%2FaK41U4D8q9E%2FepCTFfNtNmcIjN9YYBBr5Zxm9lR3HeRpyb9IuTq1Wjx9z4b9fGao7GDsWFMPZr5UDv8pPesUsoDMYYe3u50ucWdkkcncj68%2B0rhsjOmAeaUKNiEX9XQQsTDlw15yRV%2BWf5HYgkiOi9r47lk0PXu1zNhlRtXqPRstzBN7iNq0QRFBvSje%2B4de5EYHDs6WPT%2BMjXLA9zgMA54j43mJF0okA7J9sUWXjnKUdufxC4oaSTiUp7J9nopmx1cWANhkD4iADrx%2B9zBECKn5kXyBOueW9H1uhWTUvLt5RsVQBAsS1BtmYk991adfL5bBFzxXQDFlNKdwpX0q%2F%2BEear2Gdplii38sAZYRpopJOmZ5t7WifC2bVkpIQ9ls6UH5JHjR16qrnbbbaWbf4LMd7rdxz0Q8Hagzo1N1SFQiS%2FL0WbFUmiE4ihw3eUJu7%2BkZu7etPtWuoGklbFyxFEDre5ad%2BlyVCEfO2FD0roJiwvRDK%2BxMupoxrwOIoRN%2FuYATVxQwh%2FLJbEtU%2BzhFnI4V4%2B3K3kZ%2BAqQG7f9i78tHtOVUbXOCapSvJfn3uNliVF5OIMLS0ms8GOqUB3OASRlCzSZQil9G69NH9PjlwtoUjzm%2FV4mOzoHxSnjzIerjzytLM8XcYjAA07kQ1YYzqgO%2ByjWAouNFIemHDARQSFpqGF3AsAsJPEFi%2FPnCZbEXaUKlubq9nTnw7wmphP2XED8E5kXw%2FLuPMkZ8x%2BZN9Ku8N5uHIwTbhjFlNMPXw%2Br2Bc1T87fLYZ673ZqEpJeriW%2Fln%2F6K2FAAKf5%2FIMTx5um%2FF&X-Amz-Signature=68a1024e139dd650fbfb6939285df3fcc1e08ac6afffba8b5a345b0390f68bad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MPZPKNP%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCfwNlrgeEERq177NCNvfnLfpWWF0VflvulEcWuGltIsgIhAJGbE%2FD7eEXRgv8nYzxfEmk0rQuX31F9zzx3u0UmcYEMKv8DCCYQABoMNjM3NDIzMTgzODA1IgynefxskvWovDsZ1Osq3ANsSYygRCrIyuQGeVDoOOzEUwUM3sXpbCeNXvQ9SRU4XbpiGBPhD9qg%2FUVqcWJX9tMsofabjVn28mpVP27DZdYn3YlkxodH4vGx%2BDXrhGPyZDJCEJbxBiPv0Okj3o80Nd%2FlrBgUZo%2F5B0cYWLry39%2B5HA%2Fo1t2nZoUkk8fw3xkDOrGlYoGiWjLaUUqYFnQxv8i2Y7MltD%2FP4OLcgdLKxiIj3GS1WZ5D%2F4BHq%2FLlDff26CyNC%2BatapU5MtfiUrNyqnVTB%2BCvvRNdCQyCgunMBz%2BW7E%2FF3qXUToaWje51PxKK1dGiK1Xb%2Fyek%2BiPhgKPxOpSAYh5%2BdpIcYjXSJEdQ6sS40aOgL07EIsYwHfHZGdX8la1VG47cFh6CQz8nJxpGxZMh28CkKNwpczCaTBqz2YYsKV%2Ft1nn69yK8nn4lI%2FrFpn6gYDyyZibp9kZmLTf3OEI9hb2zUAnrmp3doSMam2lnI27OruVIZNyf9zunpcpn6I2ky12PmXyxWIljPCCd2wm96sumqzGEY9QZNtoXE06HRurenMY9Oo5fUWltt031A4ra9A1obvWiO%2BAAD9TPbwSCjRKphL7elPbUMwBIZCRuI7rWx9CsEYJ0Y9FWi%2Bu7P89I%2BXmhYrjuQqwqVzDysZrPBjqkAVwEAyvEmvogzylpeK2RvcFethVzr8FpJqgDt4iehzzKcKrUZv6dulCclH6cw1l0becECb%2F1zJSdZySFEv%2FBigKHzvyODfMKcng4EfylH0VKepfnkKtPpiVxAyG51U8w%2FkajcjT1jYZtzk1RmAbot23wPoL0pnN%2BWreLsbQe7%2BlpTsHUDXETBOrtGqVCb624GYZmUyldbGA2Jah0aK%2B%2B90XEiGFK&X-Amz-Signature=e0055c096a4f45eba0eab9d75a3c7b00f21b7ae3ac200a725e6bdc4bc93eaefe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7EB6OFH%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCICpsKO%2FIo504OShugRQGAWez4Yqn%2F4wQ7qdlDJ89YpXXAiEAkZ%2FGcDPP3dKRfniQUa6emGmQnQx5VJOskMf24GcDtoYq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDAY%2FYCBSJaR8ZaWVcCrcA8k6djfHsHwWC9JWS5B4Df%2FtO2tgOQPIOInjcWpCq3cJCy1NWWUNhQgD17lPP0fl3x0rs4wDxVn9X5cjibAkH%2FNngWL5620UBof7LRJFh2G%2BnatsgOa1ntrsSLc%2Bhg8n4VlAMa0KxemE7YBJr%2BSW9PWJCm7uCIWR20oVDi0UIoY4tox1jTqwz4vVb%2BSI1VhK0bKHLqh2YWH5G1QTpwZZbPQ1L3JrgzvCNkZ4FtZRq8JRW1PH1FLGeS5RkWVByf3WAXc0WLd%2FFMTqZEmR38k2YTjxY7zDk8UNvlj%2FnS3G7kWfhGTdwD7RO78J8DC%2B%2FmGSUU5bhACen%2BMGV6k83tZT8XB7RhyY%2BKbQ0Xajf3m0nS3PkrwQg0uN%2Bi6KfBlkKcNA1l1bSPeEH2V9d24yeRXe36UCVoky2QVb0sPry0lgXtukogxHgS%2B%2B82qb16%2FDBW3n8TkIHT%2FLV7aPh2IYswy3%2FKGMa%2BqKsB%2FZKuSXikOqaDaDIdw%2Bim5YRuEy0c0k1TLWzo%2Fja4orlByB41AOe2BKqJ9FBlQb41FWIg%2BFSRTLwga39BibuGqP5k5ZJjVkl1ROH96rNIvxRBFk7PythtFvcPUSGgna6uF8YBc7vdHB6v8G6cg3L%2FVjySOUlSQEMKizms8GOqUBU3zD9DwS%2FT6acFkhNU%2B72M%2B98RWODYlYXaF5Grqoqymdqk0he90eaplAY5NCq%2FisMXkWNpEVlQgShLvt3SFZa4qur%2B7DPSuZ7s%2FnBpm7jSIrc7ex4CN3CeWdpSQDplxdX6CMv4C2k8ppuaVNZnk8ZLxxN6nAPi0oVvWPjzNI8mkdpNUJD5MJ8fUJEnfGdc4ZSuxm4ZNFYZfDkiaz%2FbX7qA2o%2B8JC&X-Amz-Signature=05d0b9d554a9dad67d13f07511fe8cd080829232ce862f24f54b623c49cae16f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7EB6OFH%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCICpsKO%2FIo504OShugRQGAWez4Yqn%2F4wQ7qdlDJ89YpXXAiEAkZ%2FGcDPP3dKRfniQUa6emGmQnQx5VJOskMf24GcDtoYq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDAY%2FYCBSJaR8ZaWVcCrcA8k6djfHsHwWC9JWS5B4Df%2FtO2tgOQPIOInjcWpCq3cJCy1NWWUNhQgD17lPP0fl3x0rs4wDxVn9X5cjibAkH%2FNngWL5620UBof7LRJFh2G%2BnatsgOa1ntrsSLc%2Bhg8n4VlAMa0KxemE7YBJr%2BSW9PWJCm7uCIWR20oVDi0UIoY4tox1jTqwz4vVb%2BSI1VhK0bKHLqh2YWH5G1QTpwZZbPQ1L3JrgzvCNkZ4FtZRq8JRW1PH1FLGeS5RkWVByf3WAXc0WLd%2FFMTqZEmR38k2YTjxY7zDk8UNvlj%2FnS3G7kWfhGTdwD7RO78J8DC%2B%2FmGSUU5bhACen%2BMGV6k83tZT8XB7RhyY%2BKbQ0Xajf3m0nS3PkrwQg0uN%2Bi6KfBlkKcNA1l1bSPeEH2V9d24yeRXe36UCVoky2QVb0sPry0lgXtukogxHgS%2B%2B82qb16%2FDBW3n8TkIHT%2FLV7aPh2IYswy3%2FKGMa%2BqKsB%2FZKuSXikOqaDaDIdw%2Bim5YRuEy0c0k1TLWzo%2Fja4orlByB41AOe2BKqJ9FBlQb41FWIg%2BFSRTLwga39BibuGqP5k5ZJjVkl1ROH96rNIvxRBFk7PythtFvcPUSGgna6uF8YBc7vdHB6v8G6cg3L%2FVjySOUlSQEMKizms8GOqUBU3zD9DwS%2FT6acFkhNU%2B72M%2B98RWODYlYXaF5Grqoqymdqk0he90eaplAY5NCq%2FisMXkWNpEVlQgShLvt3SFZa4qur%2B7DPSuZ7s%2FnBpm7jSIrc7ex4CN3CeWdpSQDplxdX6CMv4C2k8ppuaVNZnk8ZLxxN6nAPi0oVvWPjzNI8mkdpNUJD5MJ8fUJEnfGdc4ZSuxm4ZNFYZfDkiaz%2FbX7qA2o%2B8JC&X-Amz-Signature=7b264d6ae85d84a93490c9dd7c7a4b6122edcd7f2698fdfc5e2d2bae85c6f6d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAYUOQ7Y%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCKks%2BYx1WnqQPRONNXca1%2FQIT0HZittRciHWO6m2zAbAIgGQe8%2F25HZ97mb0Uq3mB0wQ0UW0eZRnI9JF5cYWdwgfwq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDHlytPIWGnKbLj3nIyrcA7S0jTeZOwsBHIomEGsUynclCttKsIpmpzQd%2BGg3wa5wEIIxCieCVvdcXKBTSfYcQlNTDNmiqhzWiH9Q9DuQrxsdIRssfQ3si5PkXyH%2BZZuUV%2F6mDvsRCkv70aVCNkYuUsOJxoIAm3xfOesJFBDCknyk1hp4SnTr4Ta7uf8Ilotw%2BxmUONdBgDkHAXvRgtrGBiT0xu7Aa1XVLbtaWgn3dfNMdthmnTJ%2Bde1ZE6tCrPLazZSNaabQ4ujphnuMH5A%2B90GnvhZtyo8znCbA7rBs0d%2BKe%2FwVVIAa%2FGIOxUgMSIyjRIGX%2BR0ttPW6s9ZnN4NO0XTvlGCHy5sUO03eeGCC9yEcQyqBYtNDEtxILJRerj51g3DYqQY%2F3NYe3P6wNl7rRloVNTdEqGrsubqvMtW7A0KkzLAina6I53yacB3UI69rqFdsvmuUrIOy1B1h3xisZYxW0YfUMOVeUeN1L%2FQ%2F8dQW5KxKx7Wzq3lWM7uir00IV44Fer5%2F4OC2UXsJ%2BsMnmt2SIChpwbOXLiXrNdQe3%2BGzF2Od9RN4prY2Sf2crplPRtBlET7tdGEFRQ03VNYBlnDa4ILAsUKVFBBxUAmgc3DzrVbzmRavmzdC6OMtTO6Lwf9hvgNXGHtFLQbxMNixms8GOqUBH0LUcTd%2BBlPP7kvsN0F0%2BTKCixdZTJ0pqR5J0SMzmwM508y33KI22PQ25mWzvxRzpfCEUNGtQxaNDJpHFrwZaAJn46Rnxlwht2C4DmMoej6BXHokD2fJrlelzWAbSuzTphpoxl4CuXjxU9bbcF3Y%2BkVa978vX8qgDa2yfkA4eD7GQZpqDKlSpirIpeu6gwGkJ9xH9%2BAZYgli78OnBe7lWko3XlYV&X-Amz-Signature=2a86370448af0c427d9c132372bafa06ee7c53718f460b13b2dabce3b6a81223&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4KMD5W4%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCoMYHXcxrAq88dhwPgdLACJyy8Cd%2BSF0zyQebmSroAtQIhAJuQX%2Bb57cjt3rsbPw4B5B4waTbQn%2FGFO1P47OHZ7ycjKv8DCCcQABoMNjM3NDIzMTgzODA1Igx8nZUdeXEwCy9SScYq3ANnyl%2FAVNViqSQVIks0WJUl%2BVKez4I%2BsuH23VhXk3IsOvLqu1ctDgaIUiwJbm1LOc%2F%2BDJ%2F1PwI44QE9TeBTqjbwaTO3j2S40zvPLSxQUNLV1%2FYDBEcnbd5%2FzyqTCktgaKPtoJmq3mOIwEKOOL5KRvy9GqAC4FezviQ1Lb6C9pKAgR6U22kIo7%2BpXeYgL2tc2koje2G8TD%2Fd%2FVbNVj0%2Bw4dhmqECOErysKpiL6EB9HUUZ0FGlAWOzDMZsvYyDlPVcWI4cc9IhG2etrzMO%2F1G8xDfHacyVdbBN6PAsGXbAuBt34yycAH2stbrOSPkiELUTg%2FSq%2FIjjJlRWMB4Su2FO9uY7%2FkqZ6xZy7b9lt8%2B1jY%2Bafn%2BgulbkA2ZsaSKKhqAi94Xyvaczkmoc43IXS1XjfizDgTUE7xyLz8tK7famzUfQ5ByopJo%2BB3dIeX0o6HqsiGFYCfnD9%2B2JlW6E3xrc%2B6bgsOzY9umyjJrVsO8qj6m34%2B4ZdByIXtTGrzwPeJlHgVSPAI8zYDBKAdfeWvGqn9G4Ga5uZHwZPt4CozngoDsaN2lXIvPOVgWNu0xu71lqSCxLYe%2Frffh1tdUQCaPOp8XNpeMo%2Fki1p%2BGxfthZJ3JLxnInEpWmgTs3UTlzzDmsprPBjqkAbTiMqaXHtNIiAg0fkoST1wFmoEAYJEthvypJ9FnX2YSdZ6K35N%2BxX6pPhQwwX02wY2trMBhQIs5Cju4bG5QsTsDv30GcdOZ6gnWmJJqPTVb7oG9F2q58FfmVWWItMOqW%2Bfgh%2FqVRZkb%2FwwcptSaGEUC7fq%2Bdrvp4QCFBR9Q3Ya34HmHsvfoJL5QWM6apD3cxklra3dUzcRuKi1UO0AVRlGI7yCL&X-Amz-Signature=b52ad202a86734204dcabf2821746c9e61c77a624497a70971a960072bd82203&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4KMD5W4%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCoMYHXcxrAq88dhwPgdLACJyy8Cd%2BSF0zyQebmSroAtQIhAJuQX%2Bb57cjt3rsbPw4B5B4waTbQn%2FGFO1P47OHZ7ycjKv8DCCcQABoMNjM3NDIzMTgzODA1Igx8nZUdeXEwCy9SScYq3ANnyl%2FAVNViqSQVIks0WJUl%2BVKez4I%2BsuH23VhXk3IsOvLqu1ctDgaIUiwJbm1LOc%2F%2BDJ%2F1PwI44QE9TeBTqjbwaTO3j2S40zvPLSxQUNLV1%2FYDBEcnbd5%2FzyqTCktgaKPtoJmq3mOIwEKOOL5KRvy9GqAC4FezviQ1Lb6C9pKAgR6U22kIo7%2BpXeYgL2tc2koje2G8TD%2Fd%2FVbNVj0%2Bw4dhmqECOErysKpiL6EB9HUUZ0FGlAWOzDMZsvYyDlPVcWI4cc9IhG2etrzMO%2F1G8xDfHacyVdbBN6PAsGXbAuBt34yycAH2stbrOSPkiELUTg%2FSq%2FIjjJlRWMB4Su2FO9uY7%2FkqZ6xZy7b9lt8%2B1jY%2Bafn%2BgulbkA2ZsaSKKhqAi94Xyvaczkmoc43IXS1XjfizDgTUE7xyLz8tK7famzUfQ5ByopJo%2BB3dIeX0o6HqsiGFYCfnD9%2B2JlW6E3xrc%2B6bgsOzY9umyjJrVsO8qj6m34%2B4ZdByIXtTGrzwPeJlHgVSPAI8zYDBKAdfeWvGqn9G4Ga5uZHwZPt4CozngoDsaN2lXIvPOVgWNu0xu71lqSCxLYe%2Frffh1tdUQCaPOp8XNpeMo%2Fki1p%2BGxfthZJ3JLxnInEpWmgTs3UTlzzDmsprPBjqkAbTiMqaXHtNIiAg0fkoST1wFmoEAYJEthvypJ9FnX2YSdZ6K35N%2BxX6pPhQwwX02wY2trMBhQIs5Cju4bG5QsTsDv30GcdOZ6gnWmJJqPTVb7oG9F2q58FfmVWWItMOqW%2Bfgh%2FqVRZkb%2FwwcptSaGEUC7fq%2Bdrvp4QCFBR9Q3Ya34HmHsvfoJL5QWM6apD3cxklra3dUzcRuKi1UO0AVRlGI7yCL&X-Amz-Signature=b52ad202a86734204dcabf2821746c9e61c77a624497a70971a960072bd82203&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOOKQYZQ%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T213434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDWzOmdg8gXccegoqAI6FcunXI5cpfO6Fxfym7s7P8ZlAIhAPoNFNYATxrmgR1wFvO%2F3jNHl97nVGz7IRNsn5XHUb%2FFKv8DCCcQABoMNjM3NDIzMTgzODA1IgyrKAbtsob5h2RCkAcq3ANDnQfA%2BQ3f1aFd%2FHxSyiROAbLFwFS8egeBHiZbP0XpgbPDpLEKxjP0YzLrFJIX6PvHDV73XwwhPiRIdTOJjXwbEl0YN9e2cK71p%2B6PTMqmzn4wP%2FyD5aU65xQu8CFU09RzAb55NSisTchK18kU5oRH9KYPqceE4GnZzvOS5a%2BmqcUmjYj%2FvyiayZ4laXYBQqMNfUu5L4SuED%2FhrZicqBQSA3n7TqEPOc79ZeTPV8JwmCF1l1oXe%2FEVa6wnPPdVXRpQdhDzatkYIrAkYISKYluKvBNYFWkIVKD%2F6tNXTPLTrONzMGzzycGp2WekzlTAb3vNrhp03vQSWUk5FNJP%2FWtbG67YS9kKtvbCmYwzL0guGVbiqqE0dH4V8QA0ey8TH1K2hlJNIXXtUIJCqjqIhLf47QEHDgVLvQG7LE1OC2TSZnB%2FtdoP3dN3WA4K6q2ab1Gpx3e1o5UDavdbgL0PAU2ZNzk3HZW0%2FGWCQjs4F%2BXygmXMx52iZGHc%2B%2BxGFY89O150qx27JESa8kTVx2Cj0Qk3%2FPpe5eHhLZGpLSw8tAvQcVuK%2BJjhXiiU91W%2BxxCVn%2BE%2Bfga5kCHSxxj4OvHjPBKMG51YG8aIjd13k3fkey3H3RwMz8XruHGSo4pwtTDitJrPBjqkAcXldmPsZZQ%2B1eIpNukz2pW%2FWLP3hj4fgQL338QnuKVwuv2GpespyLgdv%2F%2Bi97%2BnzfLSfSsQ4VF9Ipt%2FmCXMxXOnjPCS%2FGPRghde2b%2FZaX81%2Fv8V8L2l4qAEk8JHIJcj6D3QztZP1nbPLh4LIoiH05QBnrQj9GliYZVAWw7jri00PiSpoL%2Bs0dAHdyCAxapKGJg7PttBIAM2Og9HSn8NCziyjb%2BC&X-Amz-Signature=f8bd2490992f2381909d1531c96b79086336da507d7f9f0a8b5bf13947697020&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

