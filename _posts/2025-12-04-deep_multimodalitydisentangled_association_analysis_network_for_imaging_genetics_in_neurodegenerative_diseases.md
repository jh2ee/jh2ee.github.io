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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYWW4NIJ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIDqp3pv4gCqujuSriRA5sRcmCki5iDleJq3h93POPPSsAiAjpYCNI3ficl8pd2NLgZSXN1P1%2BTcsK9gCPFM%2BLDpHiyr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMYYWrbvDNb0dO1fYTKtwDAdAxCHCfRat461DBGgX4lutGXfxYFUIP6Gg3FTVOZ1Yhu3mnlUocKbPfiGh0iSCte4gz0DaUTbclCJ5ZSOeC%2BR2yrpI%2FCOE0xoHmekT9vUBLf7%2BE957x%2BtbDmxYS24KSGgYA8mRcPZQPcXsc2KDyycOWXqWqJm%2BBVbrNs7lzhhCDL5NkGTdlzIkLxxSGrl5OPm4oHkdCvmk%2Bwt7mR8M%2FWfc8z8Y%2BYUF1xPrFVQl8ILmVXVMlvu50VdRpxQ5uX5ROdOQqF38jWmQg5Bx2yEAt8egCjQ0JRlrS7c3Vu94uuXsrE6mZ7qKo4EON1c5MoJpRIzBkTLKR7jNNAbxGhPd9MKMioRFpvkpIhLsi54Iqe0nn1BTEea2iEPgW3nYaYnbgAQ9BU2v048EIHqWmn8ml69KEbCoBby9j8hux4O3FBy1FatRAblUbmzaO5KyfJdaVStlha%2BdvoeLAlVF1ORft47yYb5TQ7kjMPf%2BBdQEVNNmF2q3Ay%2Bx0H4V6lC3VDNGCUFam%2FXBZzklUf8xxP4bO4jd%2BGrOf8Az2yXPzoE4ibzb47JHeMPYq2eIHyWTZK1qA9XNFiNgwqwPuzD0vGTR9yPr8z8Dmg2gYD7xRk1hAZkLmXIvgnH7HnQiwE0Awv7%2BdzwY6pgEvB8XoRzv%2BosvGoYol5LmKRMMBk2L3CarxSLA9ZsZnpCqmV5agbiYV8WwKPooN1YhjWJzWxYsfkOArPccylGXOurXKupY7DIx%2FveAgeIiZP9oXHfha504qFs7dTV%2F1rql1T9rMZhEdoIC4VVwfemVYW%2FbaJFE%2F1U8rtm0UoU2VewVSweUa8bCGazK9sdUKyFHMn4w7lpDodXZMV3HIPynWuogr6QYv&X-Amz-Signature=036dfa341fca1687dd5efe7a115ecf1e3ae703c4dccc07257c076bb0cef13af2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYWW4NIJ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIDqp3pv4gCqujuSriRA5sRcmCki5iDleJq3h93POPPSsAiAjpYCNI3ficl8pd2NLgZSXN1P1%2BTcsK9gCPFM%2BLDpHiyr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMYYWrbvDNb0dO1fYTKtwDAdAxCHCfRat461DBGgX4lutGXfxYFUIP6Gg3FTVOZ1Yhu3mnlUocKbPfiGh0iSCte4gz0DaUTbclCJ5ZSOeC%2BR2yrpI%2FCOE0xoHmekT9vUBLf7%2BE957x%2BtbDmxYS24KSGgYA8mRcPZQPcXsc2KDyycOWXqWqJm%2BBVbrNs7lzhhCDL5NkGTdlzIkLxxSGrl5OPm4oHkdCvmk%2Bwt7mR8M%2FWfc8z8Y%2BYUF1xPrFVQl8ILmVXVMlvu50VdRpxQ5uX5ROdOQqF38jWmQg5Bx2yEAt8egCjQ0JRlrS7c3Vu94uuXsrE6mZ7qKo4EON1c5MoJpRIzBkTLKR7jNNAbxGhPd9MKMioRFpvkpIhLsi54Iqe0nn1BTEea2iEPgW3nYaYnbgAQ9BU2v048EIHqWmn8ml69KEbCoBby9j8hux4O3FBy1FatRAblUbmzaO5KyfJdaVStlha%2BdvoeLAlVF1ORft47yYb5TQ7kjMPf%2BBdQEVNNmF2q3Ay%2Bx0H4V6lC3VDNGCUFam%2FXBZzklUf8xxP4bO4jd%2BGrOf8Az2yXPzoE4ibzb47JHeMPYq2eIHyWTZK1qA9XNFiNgwqwPuzD0vGTR9yPr8z8Dmg2gYD7xRk1hAZkLmXIvgnH7HnQiwE0Awv7%2BdzwY6pgEvB8XoRzv%2BosvGoYol5LmKRMMBk2L3CarxSLA9ZsZnpCqmV5agbiYV8WwKPooN1YhjWJzWxYsfkOArPccylGXOurXKupY7DIx%2FveAgeIiZP9oXHfha504qFs7dTV%2F1rql1T9rMZhEdoIC4VVwfemVYW%2FbaJFE%2F1U8rtm0UoU2VewVSweUa8bCGazK9sdUKyFHMn4w7lpDodXZMV3HIPynWuogr6QYv&X-Amz-Signature=036dfa341fca1687dd5efe7a115ecf1e3ae703c4dccc07257c076bb0cef13af2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644ZCJ372%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCdbiNLDtb0eIsiTnXqZtQJYQcVDk1fPDLFcm3OQJX3AwIgdM0FbXmW4a7MYDdnx1tm3fh26E8ONhh1jPn9lsk%2BIKgq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDPEyrmvqSmam%2BjoDLircA%2F82EGNxqTG4Z%2B0h7B44aL5q4rrR8YOV%2BqzYRtPAiSg9uIdINsfTYe189SylwBxAzhTpZE29g8dC7qHQDc%2Fvo2MBYKggOioLLQAiVfgWj9lCqP6%2F0WcFy9kiIbLQcpn4VzhYBWfXj9Ufdr6H0ITSO2tdXcTRJiys9xzPHNC5lokb3qM984OFT%2BMATkQ71aGKw1BcYDzUIlVc%2F0IdMUjQtKWsDq93L%2FPkM6ZBUDbqPeys%2FgABdKuUMaVoxQtCtr%2FNZTA1O3o45id70J4DZe6lLApdJjnP8Di35%2FR9uyIIABV1XVPxkhC1pV7Gz6cyqgwxgmSYUiQV7PntW9XjZet7482i%2F7bIz5KW%2BpLqm%2FZKnJLaWQJ1onzeZUt%2FN1S74xJZMu6YQ1HRg08aFzF2PK45u09ZXoz8VUY0PBvMnqluLJU795E9tEmkBw4U3fgUGyr56lkpaLW6eDoHdbgg3pZIm516whPO5SezJcdGMeSjTOqvherN4O7LAt31%2BFGNDympeQpVHFn6ClHT%2BKjS54cgvdofOsGTvdU2weAhlhore7HaJwHOlkFrvzIcZqScNZL%2FUsSfWeHajtIrfrrzJQgimRkaOhHCXcnmEvNcevEtR8RaYS7WXTOyiHHG9L43MLXAnc8GOqUBxFasyD%2FcPdUwPIzl1hnipnrsBDILeczPOh8XOqcIy8yfEOkYDIByVGgoRE94nHrUe5W7R03BQxtvVyLPimNnFPaWcjoHk232PDorFAbPllQmnh3OObpcSno8NxbAgE6uxRxuxEPQdawoQ3pEu%2BWZOynCUb2vZSJRfzISau4yt4iLWS%2BRu6a%2B0oV5aQhmlj6w2hJ8JBBVIWdU74jsCaSG5YpH8MSi&X-Amz-Signature=dc9c9a3230d9ac0cbd63d15d4109505ebe928dc4b0e6730c270aefc196e4e0c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MLH7ETV%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCrEYeiKGYu1LXWEb2jIhpvBc3C%2BGtTbZUoV6gNhj%2Bm5AIhAP6SMzogsgydoNHEyKTc7NlDo8V%2Fnzu7vSspdzJCrw%2FtKv8DCDUQABoMNjM3NDIzMTgzODA1IgwpjLXrFWcO8%2FkMHdgq3AMuXdj3o4xXVpLzmHF0Yw7Wtx1b%2BnWMnl2FxZW%2BKB18%2BnAHnd44kQsYkuOOPEaetHiX16gF2ay0QNT5x6jKdmnox7hAGuktFFb%2FzUkyKD4sJkpOcqn3QIyZH3hV%2FCLMBb0Eep1NnigZl4WTVS%2F6QrRwh20noFJayR1DA5m4hkv4fN2I%2FIuX7VFGhfeuceprz%2Fci8pK2pfEKrqGaAn8zR5wJjZPlkO6kkRBQo1wv%2FTt7ZQcV2ULn2zJDu2JuexTa2AFtysR7VoQhRUHMHEn4qQiDuzYq4QE6zXdmIMbfART%2BGl%2BzpYLVO6FI9YxZEnUYhO1soxtC0bPp5a9I7Ki7eKreL99JXLqElUAGwvNeLecUyPuIGllQDGMsJsFsrsK%2FbebYQgMQ0OZhYAFLOzFMQDtgx8EDXmi7woPrQxhG%2Bd9KCHPIJ9E1K%2BiZdjMW%2FK7M8tdni4XUDxs7zX8S3fjbVpZVfvRS5N54q28tjUwGx32oB4RSTSv36oaFKRuwgBUgwUNCmx4H8D5Xs8bgH7MMB9A5viRMzSeZc3AHZIJorZsnEnCrRQsYhSy74TwFbk0F019qVLJ%2B7xXls86uBxQ1esJmmgWhRns3jiQVFx5W8wZG5S8XsL0AUTTSq3xBJjDZv53PBjqkAZr6a6aoW5ZNIZis%2BFJrey8wKKTdZfqLi0SvioWSIrn1pNBsJPGZRIAesAY60PT3J7OqoaVtn6hX9A07aM9dHr%2FJlBUAQJBG3CmY5lKlnqd7Naso9IsoZ2eNyEd0fN2rKID6PgDXG1BwZyTIs3uz%2FgRt6QC%2BvgRq5Qj2rWtvBirmktkXJAdVfQC%2FMQFuBKxZPp5snv62tSSkX04X1DWAhQgEE8f7&X-Amz-Signature=aa8e8148ccbbafacd59db2e7905cd12294ac669befa83ad65b595ee224d6a38b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MLH7ETV%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQCrEYeiKGYu1LXWEb2jIhpvBc3C%2BGtTbZUoV6gNhj%2Bm5AIhAP6SMzogsgydoNHEyKTc7NlDo8V%2Fnzu7vSspdzJCrw%2FtKv8DCDUQABoMNjM3NDIzMTgzODA1IgwpjLXrFWcO8%2FkMHdgq3AMuXdj3o4xXVpLzmHF0Yw7Wtx1b%2BnWMnl2FxZW%2BKB18%2BnAHnd44kQsYkuOOPEaetHiX16gF2ay0QNT5x6jKdmnox7hAGuktFFb%2FzUkyKD4sJkpOcqn3QIyZH3hV%2FCLMBb0Eep1NnigZl4WTVS%2F6QrRwh20noFJayR1DA5m4hkv4fN2I%2FIuX7VFGhfeuceprz%2Fci8pK2pfEKrqGaAn8zR5wJjZPlkO6kkRBQo1wv%2FTt7ZQcV2ULn2zJDu2JuexTa2AFtysR7VoQhRUHMHEn4qQiDuzYq4QE6zXdmIMbfART%2BGl%2BzpYLVO6FI9YxZEnUYhO1soxtC0bPp5a9I7Ki7eKreL99JXLqElUAGwvNeLecUyPuIGllQDGMsJsFsrsK%2FbebYQgMQ0OZhYAFLOzFMQDtgx8EDXmi7woPrQxhG%2Bd9KCHPIJ9E1K%2BiZdjMW%2FK7M8tdni4XUDxs7zX8S3fjbVpZVfvRS5N54q28tjUwGx32oB4RSTSv36oaFKRuwgBUgwUNCmx4H8D5Xs8bgH7MMB9A5viRMzSeZc3AHZIJorZsnEnCrRQsYhSy74TwFbk0F019qVLJ%2B7xXls86uBxQ1esJmmgWhRns3jiQVFx5W8wZG5S8XsL0AUTTSq3xBJjDZv53PBjqkAZr6a6aoW5ZNIZis%2BFJrey8wKKTdZfqLi0SvioWSIrn1pNBsJPGZRIAesAY60PT3J7OqoaVtn6hX9A07aM9dHr%2FJlBUAQJBG3CmY5lKlnqd7Naso9IsoZ2eNyEd0fN2rKID6PgDXG1BwZyTIs3uz%2FgRt6QC%2BvgRq5Qj2rWtvBirmktkXJAdVfQC%2FMQFuBKxZPp5snv62tSSkX04X1DWAhQgEE8f7&X-Amz-Signature=896f689131bb6b044f7a84f862afbfd047a04dfd858c547238582fcae0dccecd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXQCJPQQ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQCEG28uhrwCZ%2BjSCu1LXt9esoskcFuSE5bYBb0fZ8vXYgIgSYm3xIgO6Fvc9hsXgnP5I7VbYIlcCPVY1FCnAnYLalAq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDJtSF70wU7vV%2BeujFCrcA2NWuK5UGPiTn18Aa4nAu6b6aXCrf6gnioQ3ufmWZI6S8UsWrdgSk7uO6lsIs0SNgjS0hUTiEfVv%2FGg%2B%2F0rNug3IzMenBN2FD0Ia0nbjYtaRdEfqh1lFEwXZ0R64yXKNrfJ5hE%2BU0VzFjdiwUPR%2B4I2TVdOp5msv9TawSOBIMpef%2F9VhtfJ8R%2Bl0hJTNHOES%2FyNUMLYLnaLdvfQtEhVFN%2BnFlbT6TYbQPy4VtbbVQdTiDfhSotrdYlD47lXLWzwMLhE6yTShO6ZjVJkSw6Fc6HObFCKnkpE29Xi6VN5DkOtKV2MfwNFkIX1GR1WQcMJghArS%2F%2FgLkIk1lQ5tXQuU3JoHNV50Qn%2FgZZzDrqt7UXY%2FA%2FuFYQHayPXjaP63JcIHX0zdrcntN3By%2FM%2FPvIHN83OCzzP0SSzuZgkxUie45UYNW1DAbYj9QOAkfQJQpADI3foqk4sWX7aPUMmXUn2%2BwppJgMP%2BbFck8GzLzda4EEUdyGVeph%2Bp9FWvjmjXxTpYqmeY83rV%2FDDYJ5%2BQVEJkcRQWO%2BhdM5dKSTFYC4FX5GZmxt2wDQSRjhHUXBb0pLCqg55Cuspgp%2FQljYhrEtDB0afTNFpc7fN%2Fu8cWxCk2vRaGKAWTeXaHAiNk8q6xMInAnc8GOqUBKLXO2pxdtE6TUd0GP%2Bqt31dtvcX0Sh%2BqTESjC1gUPrvLhxGuo%2BTf9JsZmUsJ7kA%2BhwtL15X1dsLZ5myzQnLWfUqz82xrRigL8Xu4g1yEYNg6mof0dwZnxdj0FZn5B5jdEPct%2F8JMQxrtb36i7vBwTEWTBq38JWqD3cDR%2BtBaC0aR7KL1syFiRMahZ7iQLRTBo%2FBJDCzVaq5fXL6Sl%2BwS0LICwH%2FA&X-Amz-Signature=0e20421b46c8cd6c4902ba7f61c9e34446381587a1a966fdbfe0edf124192761&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466424Z7AEC%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJGMEQCIHrVjEp9fcTCJkYQJpQDyNGlmgW7TZaqTwCh%2FdnonJLfAiAluBhc3glMyzKKSj8xM7o1AjkglxM%2BKRoN0yJmtb1tBCr%2FAwg1EAAaDDYzNzQyMzE4MzgwNSIMkT1y9qn6nnZEHjroKtwDUG%2BrW%2FtsCbQ8OcEIxCXR0lBImwTQgJ8FM9YpYymcoe6qw9f%2BQ%2FrwLaOC9ccvoPkIxS7AAfJeht6f%2FZWDrmpvJP45rmPQ0mYgLZnUELkkEexQMMesnWLZQxmex%2FOgAg2SNQ9CaQZyJyiTOtTNZJQgEBYCSNeWCBx83XY3Zl9Z%2BG1HqQwjYvcx0gw8%2FXDybEOEsYDsGWTejbNz0XP%2BnUfkc%2Bb62xOA1lVn%2BZaFsaUvwsZdfYzuthCrECp%2F6BgpGffD7SyNomsf4G352p6cWhbRUkuECuMzL7oPriYkDfG5X%2FXeO%2BTy7ruWTm0X8XMz0Jbu722P3Anq20%2FSm5xRmw4hPBnUEZJ%2Fgz2d8TEDJvITYkRtMTzqNRSauLh53Bzsd2EjN%2FPv715oe9yI56%2Fj6r0b4i7wHnmtilrIZ2CtZwu0TUS1DhJCb3dAgsOrBNomGGU6s2LHHZJTxtP6fToWR89ooLcgtHIyNVG%2BxmLGQLXuCbxvv5nPlWEstc9yJ1CnBqtRwwHhuML39VQIaOJkN11d%2FDnoJydGTIjIALVpNFep%2F2WmnU9mOGbKxVCyBM%2BJyboOeTJZ3wzEogsC5iv3maaHVWruGlEqxm53cXmFsRDZdxzmIDPadYoBKILQQf0wqsydzwY6pgEEgRosuEkJVOvYV0qmuQtEwypNd%2FjI1e1zF13%2FH1xWmPA5R8A0Gf55fj%2B6GB%2BYx9GLG6kobozo%2F9pld8gXopVANQEqVGux2QZoNQlX2H1aX5hbzS12RTMw8Lg1%2FjqyWhroFVrBAVXNzwxNlO%2BYslLsTU0FtPmHkgYpB8ndFQF%2FY%2FxBy706zcnP88jxWKat%2FCsht6bpQjLaeEkrxpXgViCdukvGkS9d&X-Amz-Signature=54594e5de1a43d5311715a964d0cf8c0cadd58a550201636c50d187690501b10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662D24UB6H%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125201Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDZ3mlCwb2EXShGYp4GUsP8qkK6v6QPktyfXwmq6wLILQIgdNZl8whjM8nD%2FbGVGQSAM%2F3LZTAl0SxOP%2B7NvxSUd8wq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDF%2FWGzxnBhaZt%2B8fJyrcA%2Bd35L%2FCLdrOJkBun90iORr7IDz7Jmwi3PtzB8ZW%2FeJ4JMA6UCL2onxxWbtKs%2FDLskZC92I01pR91sY6qkZrnkPcf%2BxoKTPsEPgiE6WcmlJOhNuIb6nRKKAGskYiDCki97MJ2WE4Ez7S9XQw8CUGYZmLxiAt9nxd5%2Bt8WxQrqAWXN6xdMbbkTO3%2BuLJoamKs3NyzRxtQtmVkaWoCGBQwp7ecN3QSyxrNSG0nJTUN90UqQFjSn1ERa8DBM69D4Yg46LWd7%2FMmAv5XBhyRNjjVbuKgefveHDJ8reiaA3rP9Huke6P%2BqdF%2BUGb88DIx5%2BVFKfgmujqujdnxVglqfJN%2F1imoTldK6S55XkZJ%2BkUHaeUhPX%2BDy5crjaq7ZBHof35trXaHmGOiCYTPNvjjibc40k%2FWZleoRqBQgUk31FWOLTiAhc9WqvRCV0V1NBwGdI3%2Fk0Mb8Nc0KlIai8%2FGH7xzYRSepD%2BGoLaMgHXB2y9McGb3QX%2FClZtwPZsSn0GEZv0uZ6SYgY7ggGGvHgfgS47GVOKh4IsQ1Nu20F6aVbn%2F2mxe0%2BUyfLDBsisch4%2B04k%2BxYDf7pv9Y30GhLycIuuSpwVtx1EzU2gY942vSfmJyfJhO%2B5yz7y7UL1El%2F1L6MMC%2Bnc8GOqUBpImfGTO5edFo4ZREsu9c3gAgHm1QAFAjbYh432KiIjXySh3SqnbsEEYhVGZgnc1zsy8eq%2F%2BLdhA9iQzD6VN7wKB2hVwLbgNtIIHYXEQ5d9gUm1CEuUBL3pt70k9E8%2BSdqASGGLiSbEw3eSk2G%2BRnPpJJ2snXEmyBmsGuMGnz6XWIalJWXMv08JLhwa47fGCuvNXzt8orFlWlKyABC3ce3lLa3pvn&X-Amz-Signature=531f5d3c80536c61c4e132b0777a55bcb83b641824be46af4b1c373daa6d1fb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSKL6IUD%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIB6FpdxG4XhnWBPx3L0IIdNc489xYtTwg0HLnxn%2B8%2Bg1AiEA%2BSHy3G7qDpbsU9i3OAnK1TROEi9FHkdDXbIGCXLtTxAq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDNNIA8JYoiZbNP9dUircA2zB9jYW9u7SZQTs3Yl72RWA7UMmTYSNEHT38GIhdoGgZWPuQha4ghPy9MHr4sz83qMljYBuvJ0cvlbsuGrVZZBpDNyET7tdDqkwc6ea6DZHdT%2FSBCbl50kuEdXXt70aJTVs1VZPuX7tyvBpMU%2BFdX%2Bg59FGhFrNHNFJPKelMsrnVKhB%2BJlfoe6%2F0D2ep8xDa7UP0MdwyoO3ERqsCKp9kXUSnBjiNOFbDxLgK%2FkE0sjOQ4KjItWKltWON4XKIY%2BEJyvVlmnrcuC3PcTVB7XVAhNle8QMYWCiE5lk2ZcW%2BCjWxNnnX1rYfI7U99LZTnMzzoSYhUJ4TtcPAsowE5Lrj%2FFypqV0j2hFOHuBAzqkRgsXB34JohMsU8P7ZIXwVSLSisLLyjjCrD0pmy%2FoA0jawL3MRJQRjnpR76%2BlhEjKmrGr6QEOKzuplXieWETJ4NIbBHKAOpBhuThE7%2FEgC44WrdGmvbF5QpI2X2pzifItM9FqpUX7MDCQa6ZslJ6fGoMnN2ID1k7fAZU0bKb6ZFXOqh2YqgPfc%2F%2BxolBo3pvX0gl7ZZrRJW5LszdBXWRXDClOacZNLvTIX0AHRhP60R9Rz5UnI2bhPkmG8pPJW5caIgt3pEb0AD07MmnH1Ml7MIrBnc8GOqUBtiW5mpoigv8j05MgmCVPn3VwXaX5cwILfm65eMx6ye9HeacYN%2FJ9ptXKamE0zuWeoB5gcI4KsE2mhG8LM%2BsoYrqDwEjXTSuM1E48M9TnQwQZElh1s8KQPMgBJDEgtlnGzwcPvSlCgFMI57x%2BWEIJWy7FXQo6CJcnPqb1068d3ZyqG6mk5ZqP%2FOIMpNC7Kg9T4itTfM0i3bOnAOBSwdrNS6ksEf55&X-Amz-Signature=4850eb4a5ea3a5fb7f0b3dc71d48ea00aa5dad475f666223f644daa32f35ff9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSKL6IUD%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125203Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIB6FpdxG4XhnWBPx3L0IIdNc489xYtTwg0HLnxn%2B8%2Bg1AiEA%2BSHy3G7qDpbsU9i3OAnK1TROEi9FHkdDXbIGCXLtTxAq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDNNIA8JYoiZbNP9dUircA2zB9jYW9u7SZQTs3Yl72RWA7UMmTYSNEHT38GIhdoGgZWPuQha4ghPy9MHr4sz83qMljYBuvJ0cvlbsuGrVZZBpDNyET7tdDqkwc6ea6DZHdT%2FSBCbl50kuEdXXt70aJTVs1VZPuX7tyvBpMU%2BFdX%2Bg59FGhFrNHNFJPKelMsrnVKhB%2BJlfoe6%2F0D2ep8xDa7UP0MdwyoO3ERqsCKp9kXUSnBjiNOFbDxLgK%2FkE0sjOQ4KjItWKltWON4XKIY%2BEJyvVlmnrcuC3PcTVB7XVAhNle8QMYWCiE5lk2ZcW%2BCjWxNnnX1rYfI7U99LZTnMzzoSYhUJ4TtcPAsowE5Lrj%2FFypqV0j2hFOHuBAzqkRgsXB34JohMsU8P7ZIXwVSLSisLLyjjCrD0pmy%2FoA0jawL3MRJQRjnpR76%2BlhEjKmrGr6QEOKzuplXieWETJ4NIbBHKAOpBhuThE7%2FEgC44WrdGmvbF5QpI2X2pzifItM9FqpUX7MDCQa6ZslJ6fGoMnN2ID1k7fAZU0bKb6ZFXOqh2YqgPfc%2F%2BxolBo3pvX0gl7ZZrRJW5LszdBXWRXDClOacZNLvTIX0AHRhP60R9Rz5UnI2bhPkmG8pPJW5caIgt3pEb0AD07MmnH1Ml7MIrBnc8GOqUBtiW5mpoigv8j05MgmCVPn3VwXaX5cwILfm65eMx6ye9HeacYN%2FJ9ptXKamE0zuWeoB5gcI4KsE2mhG8LM%2BsoYrqDwEjXTSuM1E48M9TnQwQZElh1s8KQPMgBJDEgtlnGzwcPvSlCgFMI57x%2BWEIJWy7FXQo6CJcnPqb1068d3ZyqG6mk5ZqP%2FOIMpNC7Kg9T4itTfM0i3bOnAOBSwdrNS6ksEf55&X-Amz-Signature=dcd1556ed754a13ca5e8338dd4eda3a2485d8dadc25efa8324633dd49addfa87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662C5BKSCO%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQD3BjlOKkU6pE6%2F5nuX5%2F4JxBCQwQEawqsb%2FSvP2bZdzAIhAM78yeV%2BCrnvQ2kpmalV%2BJmanny1BNsfYYXWN%2FglYcfCKv8DCDUQABoMNjM3NDIzMTgzODA1IgyH8AFpte5DHgknYUsq3ANoOgH69xBi3bWptR%2FjbkNjNofiGTkptUU8GBMdfR7E9iy7MjJk6FFEj69rVQwfkL%2Ba7aCYQWQCIWnq9jiK5o4Lt4yWmp%2Fxu3b%2BEY8POhkP8pD4H9%2FDP%2BvTO71%2BH8cuBVylCxmwvmG22vftSfVeVHFiJBbzWc%2Fxhz3ZYd7sgJRkjCY7i8ij%2FNZVRQNMqdI%2BHTfUxHoz%2FfFVO0CdlhZpdLAZXItHhuMzn3CUkqljiJldXXzKBaelV95jP1v8V665bzE1ISZrQjShw3bPTkCToRWq6AMwHvlBcDOhWjox7US2QUNhEHugskQCTQGzPgT2FAatjfebijsX2w8UzmZsOdxvDvFTumGj%2FoIeEieq%2BXFfVnypKgpOQGwFaeY5eELbUEhA7PIEc%2BC7ynMo45S9QLHGbiLcHeFwKamftuo2HdZ%2F6A%2Brfktwxz5ITgqgIfKgXiZh9%2Baml8DS2fJ76KJL84qJgtQ4Bx4oXSWnwFDEbXOUzSwHEcg1tUtwsQQUVxIw9%2FSOjuyedzda7RbCLyz2SvKfsKDesVQOd3cfYu52jTtLUpQTUFcyd2M5T%2FACBLGPp3kr2thCYU%2FvU8m%2Bniew%2B4k4vfgubgOXyAo2mxkkxBE%2FwuWnzWlavhPFVe361jDfvp3PBjqkAbCBdykkTioqT77TaFKngOtHoQ7pal7o9lz3wQFzMwhTmnxdwFSSRP5%2BlFT5IXCbtcTXpc2OB9DJoaIjSwHNSHlUMg6XuXA8SM2LlSceSLqDHb4MdKFnfeaR5gBcmY%2BxZqGpfrj5g1Uczyeczwv07O4znGAOCLOIUXunrr3zVI8gVdpgDHuENOmJ1%2BS6Dep8Gl1TYEyTbOLOnStWTpaL%2FD74sM7f&X-Amz-Signature=bf3a0fb2ba91bbac0a5821028325589cc1b9208ce95ed3e43a032547cd943e21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRMTC7YV%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQD5L3kZIv7RQoaUhVeFvX8gdmSsxsbtulsdKsmk%2FcuepAIgBv229qAZxr7HdQmh7pgLq8HSccbPZF9l2%2Ftb%2BMxQyPgq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDAtexAhIlAKdLXgAXircA%2FOlmzAWR3PoutDoUb089gD1Fcd2MQ0%2FbxtsyJTu6bNs3OKOvfHtU%2BLTNQYDi5DcI2kRyZ1%2FOtO3qlXqDVB5ar0IeleUdeHcPUC5MAKcWPntabikEuqwqb7airrVxySNnKAnClcsryUY4ejmTVuCGSkwvc%2FKrIT92Xe%2BWpk20R16h9KCSwZE4Pl37u0SFZirS9pyBZ%2B2TgZm2Nmrj4q9AdtrXuxncHmvfqH%2FjE6YnG%2BI4pOEyWV5C32bRU76SSR3c9T9gDdAgnn7ZiMt62r%2FK13v2yS%2FB8QTIXaMYMvallbn%2BfMJNGO87Lw7uVPq8X2nvLuKtewVzpl0VUd8Tvc3RbO%2BJm%2BpBJbxBssg9jM3%2BlunhW8neg4pFXsI7p%2FPstbE76JYiSSqVj1yS61qlDPmKolgkjwXGK6rEsYTRrUWEZJuiz6VdqRsQBqFcq6oUuzR3Eztgp2LMkjPM2sNMmCWj1N0qg9FM8yATgET9LM%2Fv6CDX%2FXNjq9yHjCzQcg9FxUZf532WLTm%2FxaCRSY7yh6zz9u%2Fyz59QSlOMp50t6p9ILCdlyL4xONaeZj8u%2B8n1gTAxnEHuym1pEqhbLI%2F7wdg%2BDRZyxgfLgbm9bvTzaNbmN3haHWBouMmYE60n83WMJO%2Fnc8GOqUBBazr%2FsjGGzR7ABw%2Fr9DvEuKRbsBD4Qitp9e6r0YceRldWIWmw3%2B4x2fRX57Fw%2BQQ4QzhygaZMTxf5kG4RQgb9XyZ8J57nqH3pYsSPYL3hMTgS9Us%2F8tZNamCK%2BWIDFBaoyYiC3MTFAP6Nq%2FkpS9erHIdU4nxNvyaLDc8810jP2nMRh%2Bq2M5ghvpME10YLgqx%2Bf%2F9WLNm6lhZ7TyCbKG74QKKv%2Bln&X-Amz-Signature=37fb069e8911c2889b639439ee4982e7e0a0b22d272655c81dba09f2e8800ce5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRMTC7YV%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQD5L3kZIv7RQoaUhVeFvX8gdmSsxsbtulsdKsmk%2FcuepAIgBv229qAZxr7HdQmh7pgLq8HSccbPZF9l2%2Ftb%2BMxQyPgq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDAtexAhIlAKdLXgAXircA%2FOlmzAWR3PoutDoUb089gD1Fcd2MQ0%2FbxtsyJTu6bNs3OKOvfHtU%2BLTNQYDi5DcI2kRyZ1%2FOtO3qlXqDVB5ar0IeleUdeHcPUC5MAKcWPntabikEuqwqb7airrVxySNnKAnClcsryUY4ejmTVuCGSkwvc%2FKrIT92Xe%2BWpk20R16h9KCSwZE4Pl37u0SFZirS9pyBZ%2B2TgZm2Nmrj4q9AdtrXuxncHmvfqH%2FjE6YnG%2BI4pOEyWV5C32bRU76SSR3c9T9gDdAgnn7ZiMt62r%2FK13v2yS%2FB8QTIXaMYMvallbn%2BfMJNGO87Lw7uVPq8X2nvLuKtewVzpl0VUd8Tvc3RbO%2BJm%2BpBJbxBssg9jM3%2BlunhW8neg4pFXsI7p%2FPstbE76JYiSSqVj1yS61qlDPmKolgkjwXGK6rEsYTRrUWEZJuiz6VdqRsQBqFcq6oUuzR3Eztgp2LMkjPM2sNMmCWj1N0qg9FM8yATgET9LM%2Fv6CDX%2FXNjq9yHjCzQcg9FxUZf532WLTm%2FxaCRSY7yh6zz9u%2Fyz59QSlOMp50t6p9ILCdlyL4xONaeZj8u%2B8n1gTAxnEHuym1pEqhbLI%2F7wdg%2BDRZyxgfLgbm9bvTzaNbmN3haHWBouMmYE60n83WMJO%2Fnc8GOqUBBazr%2FsjGGzR7ABw%2Fr9DvEuKRbsBD4Qitp9e6r0YceRldWIWmw3%2B4x2fRX57Fw%2BQQ4QzhygaZMTxf5kG4RQgb9XyZ8J57nqH3pYsSPYL3hMTgS9Us%2F8tZNamCK%2BWIDFBaoyYiC3MTFAP6Nq%2FkpS9erHIdU4nxNvyaLDc8810jP2nMRh%2Bq2M5ghvpME10YLgqx%2Bf%2F9WLNm6lhZ7TyCbKG74QKKv%2Bln&X-Amz-Signature=37fb069e8911c2889b639439ee4982e7e0a0b22d272655c81dba09f2e8800ce5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SQE3HDO%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T125204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIFNLCywmF705Wj1sn9xB346YfxgbvZRlVixlT%2FvNvI1IAiEA1%2BgQ6mrvoYHn1w0RQgDUG4pRLPpBcbpNL6%2BQejn4L2kq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDFDNIh%2Bx37T57Nv2hSrcA%2BjQhcek0q%2F%2BbqekPBiyBhj8z%2BF74%2BJR0bU6f9HT%2B5drVxQBP1cB9e1Egehu6k6dJjgQxtJzwlMjFS%2Fove4YOKX1Xo7PQ3j7%2FlTjhIFFube15La9yJxnhFoVxw%2B7Yhxa3d%2FbVaUELAjUoxsAEXqqMnDuBnE02Jg2QtHcgNSK2pnCZGCik7l%2BfoDbxZjgrrB%2FEDpRSGBKG4st5tlNuL4AKAeRRlbUTIkGkp1flXnVzM0j3rYEOl%2FTIIY1anHflFhgm9y6TBeD5FZA4SznGNSgB8EkzAeOv0DoxjBG%2FGs438Ww9mWQJZlc0VXdkMP%2BBgbEnnWuV3%2FhXcaNmdHqD4v9gkl%2Fcb2dr4uBFOfCdQSG51OjBMU4Iu%2B3AtyuwFPJn2zO4a9nJXEo09M6%2Bcf%2BwmGQm3aqH7mVvirlAGRd3nucVhUMaqMUnvPkfk%2BvPu63RsWT%2FSarPXcxSCk1s%2BRSl8KCdcQvcE%2BrAHW4jY3W9KzPNADc6symDCPqqqleApqeXflj7l7Nf0SYmJMjyXopUuN3hgbMBzv6%2BwadKjuXkAy98AS8akmvzadQMerqyIxjy%2F6O3oGmBdZsZ5L%2BHhEcow1LmyYr0RTMx1ji6n3I%2F4UlYkDIEwBK17nki4P8c%2BbHMJ7Bnc8GOqUBhFLFfZE2NWcJZ5OcPXVH%2BLgVjvF1XnFOyrD38GDrMU4e7yUjyKiFCv%2BVOB8M4xKqTG3gomdxzdijj%2B%2FwXUDsfh%2BD5z4ITZm6jU1EOgOUGssJjxfXMaQuChENSNuA74XBoWu28UtBo2XRjpD5EdYO74DoexdyHWcwH0sqGrZGWlNKx52ng18qPxLu3EHMbO3UqbSTe%2BHVHyTsLr3hnVpeW7HTZsSj&X-Amz-Signature=d50f1066f47e803a28fcca73e662c457f6623d067ee8e7a928ba460357dd4f10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

