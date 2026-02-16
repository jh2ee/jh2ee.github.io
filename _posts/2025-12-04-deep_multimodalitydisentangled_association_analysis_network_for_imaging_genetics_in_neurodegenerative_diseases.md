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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCCQNNQK%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJIMEYCIQDGVk1I9FqCo0kYbJguRIG%2F6gmLuvnA9%2Bd4SuuYOHo0wgIhAI60s5Bi%2BjZ5OnmaEmZYc4c%2FmwOeLUf55Sf7dWgdm3HdKv8DCD4QABoMNjM3NDIzMTgzODA1IgzcFKBDVrTHnYBClawq3AMF0lhUpkbul3jawVPgQi%2FHBxiz5Z9DZam0EKlhs0%2FN0jlKXqLBSral%2FGpZ3X79qhpQ%2BAeRYa%2Fn0epH6t7E1qsQ4AGP0639mYFj%2BMJcVosRZiMiNXUFnRUsxxdLqSUxJZVsGLIn%2FN98zvVXibK6J244p4tyJZZRoD21gJhcKY0Xe1UsnGjkaFO%2FcFHzVt7nTUe2DOB3HXG1kyQCCtZ0%2BcstKhWdn9MntR4RRP%2FZHIKYDWJ4YT82S7X9iZgz8YnlNEQFdwr7GmVeis1wrmkNhOQ2fUrEn5wf86pwDf1wLg7G7W4Txu5dzjFpIIPtaGDo5sVcKqKPnSabY2IH5MNWa0mWL5bebJlnlFzpmX2dBU8advtFRKq22cSbW5w%2B1YVG52NFRevltUAwyJMwYGklUOjXJu5KuUkYBcfxzsC91%2FkfxrdT7ofUxi%2Buq%2BebyHR9o6Es8SSWCU%2Ftw9VLUr6%2F0%2FZUZdAOnvSUYcGIW%2FmL8BEfPv5j3KXPgaP3yrHPmr2VNf8aNIEogyY8uQPigEu5pDGaLsRyZasqxe9%2FLzvJYz%2BUbl901OaGfzk77V6dumz94n5e0eHJGbLAJ7fm1cnYeYDZ5zkgaJo72zyBZq9sYxZQxoMgXVHMkoRYrpHnAjC8js7MBjqkAWcTPa2E4KLLxjN3CKcOvJET5YGSNrXYrB3eeD%2FsgdLsUi4TdJSQUD3drxVl0lXAhH61M6%2BhRjIxPc%2FIF8dDiCcP9vcZ3OoyDc7ukUUU3vMIwhvUagUmpfm6BSuPeYPm4tRilmKiHDkZhJgA%2Bm1K76Xzlp9WDdGv0HRMHAmlmow7t2eK1WSyzfSzLrAYoNEMd6L6NIt7Mc5xlXXLuLRUyJWSIuIY&X-Amz-Signature=c41ad3b8e7c4d180752434f33d151af91643ded6fbdd418aaefd3a488dbb67c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCCQNNQK%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJIMEYCIQDGVk1I9FqCo0kYbJguRIG%2F6gmLuvnA9%2Bd4SuuYOHo0wgIhAI60s5Bi%2BjZ5OnmaEmZYc4c%2FmwOeLUf55Sf7dWgdm3HdKv8DCD4QABoMNjM3NDIzMTgzODA1IgzcFKBDVrTHnYBClawq3AMF0lhUpkbul3jawVPgQi%2FHBxiz5Z9DZam0EKlhs0%2FN0jlKXqLBSral%2FGpZ3X79qhpQ%2BAeRYa%2Fn0epH6t7E1qsQ4AGP0639mYFj%2BMJcVosRZiMiNXUFnRUsxxdLqSUxJZVsGLIn%2FN98zvVXibK6J244p4tyJZZRoD21gJhcKY0Xe1UsnGjkaFO%2FcFHzVt7nTUe2DOB3HXG1kyQCCtZ0%2BcstKhWdn9MntR4RRP%2FZHIKYDWJ4YT82S7X9iZgz8YnlNEQFdwr7GmVeis1wrmkNhOQ2fUrEn5wf86pwDf1wLg7G7W4Txu5dzjFpIIPtaGDo5sVcKqKPnSabY2IH5MNWa0mWL5bebJlnlFzpmX2dBU8advtFRKq22cSbW5w%2B1YVG52NFRevltUAwyJMwYGklUOjXJu5KuUkYBcfxzsC91%2FkfxrdT7ofUxi%2Buq%2BebyHR9o6Es8SSWCU%2Ftw9VLUr6%2F0%2FZUZdAOnvSUYcGIW%2FmL8BEfPv5j3KXPgaP3yrHPmr2VNf8aNIEogyY8uQPigEu5pDGaLsRyZasqxe9%2FLzvJYz%2BUbl901OaGfzk77V6dumz94n5e0eHJGbLAJ7fm1cnYeYDZ5zkgaJo72zyBZq9sYxZQxoMgXVHMkoRYrpHnAjC8js7MBjqkAWcTPa2E4KLLxjN3CKcOvJET5YGSNrXYrB3eeD%2FsgdLsUi4TdJSQUD3drxVl0lXAhH61M6%2BhRjIxPc%2FIF8dDiCcP9vcZ3OoyDc7ukUUU3vMIwhvUagUmpfm6BSuPeYPm4tRilmKiHDkZhJgA%2Bm1K76Xzlp9WDdGv0HRMHAmlmow7t2eK1WSyzfSzLrAYoNEMd6L6NIt7Mc5xlXXLuLRUyJWSIuIY&X-Amz-Signature=c41ad3b8e7c4d180752434f33d151af91643ded6fbdd418aaefd3a488dbb67c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666233FIEH%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIBgSrvDGuSDQ%2FbuXXAUY0cNIjtRuKOzVdj7%2FLWQt%2FYlNAiEA8a5MHvgXxaeoeoExKtqdMpoL2aPJol7%2BCHLxhEfyMSMq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDFbes6Uidb5WW47MnSrcA2ahYJmNl03%2FzDoq1UlzVkNDOtKiM89ttU2KFFwtcbwnWylqTJG7x%2By5YieDUqTY4Hq6yac5z2afheUPabjkafBSXhWBBa1ZRlWbe%2Fg9tu0Vg9eFEhI7mgPvSwlx3LUpFjwN2CxC0omCHIKJWllzgS9%2BVKI6Cq0AyTeGr%2FHLSwzTlZ6HcilDunYMjmxPsx15cNUfCZoqyZjXTjSjyhnE5Ffqu2IMLR%2FLu02SUkRedxugo8rT%2B3zFOEzWubri52HY3kuhffig7Hnjh1tc65RD5qFbQJajyfGbPEzc%2F5IraxUKE7UsAVsfw4ePdPigWPdfYTw2rAJHO9sYPvdJAqsCL%2FMg2JL51MHhWtK4JvJ90Qt7ob8KUzTCFAjpKXcK9GV%2FZspNA6AGvC%2BdurY3Rjb5AQBzL3tlB2kUAZJKT3OL%2Bn15SHAjdMUtHPMoD7asDIuB6KNoiSCy6X%2Feg5KNs4fgg0OdzuiUv%2BOa%2BK5IrhF3PmXvy2cbJ0rmU7Wiw%2F25zoBrC8n0zMvWqCcC83GusF9Evjb%2Bxbi4pPsTeexv3KBIfk8gn39cauEAJcB8ZnAZi2VWwJqYuZhjaNoXpHCjJ7csPPmyShxOSdu3KkJm3dGIeo%2B4HVBQXpT1qS61QOCSMJipzswGOqUBPB%2Bu67cDw%2BgZezqnc7IcL1%2BUHdNDx4m%2FmE3DMGSw8AhiHEkoyYkBcz8KaUjIMaeIeCA8ZAHaXs0Sebo82e6yefN6sSsaabBYK2UmZUlmtsXYnyBE6UgSoONQTRJ36CV5RFEniqUe%2Fu3A5Pqp1yS9LT5Q9SMIoGmGdTwmZU925M%2F%2BuO9bQYJCpBfh%2BG1FUHf3cj66OI3pLM9Kea%2BLoAtWJOs%2BnPFN&X-Amz-Signature=d65de214a7cfc85e2eb8959b53e0f2ca7a0bca30b44c4e1c0885b5ff325ee12c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YW7WO2C4%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIQDdpNnyT%2BnQU%2BgTP%2Fdx6AHm6%2BcoQU5P6LjHnjIkH%2BXEyQIgPeWt373kGRoa6Jyj4Zs7UMxY%2BpdgCf02g5er9fct9tUq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDHRjMbZJcHK3%2BYcJTCrcAyyHAEh5EBBFWTJjI3QXB2SZdouU9GzzPyj%2BPal8s1ZerkEjTIzf%2BQ4Y%2F%2FlX0887dl9V2Sa8dFFA6uD3iK6NRUlnMxsQUVQnSw%2FKnt7Jkc9XPFPwmQlF0LJQNrBRxoO%2B5ejKH3tjLTSosO%2B8k5UWnNCSKqtmgw1Vin8jAnR0CUhVfvCFhkQ6WnOABmV1t0sAAtLQm2%2BLLLCe%2FWEoItl7phPkYn6VnhAC%2BdDe3dF1%2FaZZ5BxhOXumpMK83WGkK8sqyFIXrtynxBydC%2Bebae5YoHMlHfKRzwfwOW6YaasTy9qbpIuOXqcW3mqcyECt2NWFGmabXNpPj6DshRyGdkw6X7J7WdLezmZ02tjycMELQvZASOXMyuNKNKU5D7XaYQh7%2Bqz2qtW3qYO4kKaj20tT5nxaB0W82nQWXMz%2BpNEi0f8U8vLgFhHSsVx4jMvVzxxW91ykLgtGhUraFkDsBc8A%2BcQrLKUGZfbyD48eaA9s9rdfwB%2FNQB6CWeBZXGCSJ0pdm7CnJSx798W3ZCNo1IXHfcJj23rJT8BKz%2BDuog%2BnHTmh89I7VUovuWfizaImMoaXMrfXJuvkNDLIsp7OKSCdaGO%2B2Jb1jxh6A%2F%2FAAhJPMJse7%2BKw4MibhwOG%2B6irMNOOzswGOqUBlGMHdBjo9RAKlwOmX8rDg4Xn5qgZQLYYQKOTw4afdMKj%2F1WM0htt%2B7Xus4oDSVPHB%2BfL9NUQGsDbxtZSjtrGGzie%2FJ6yaPxOAhV%2B1mRPr4KmBfoPHWuh%2BWAhH4CO9iuLj6M1vbIv9wWkRavJs1c7XPoPNKSb6SKFbCdcL4eQZ0HK%2BTGnfGFwfzyjEyKRsv7yr0t7f0uiX6lcbQe922D%2FUwWOJh3A&X-Amz-Signature=71ec98a29699ddcbd670ebae221af3aa617c956f2ee56157c4438cee7bb282d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YW7WO2C4%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIQDdpNnyT%2BnQU%2BgTP%2Fdx6AHm6%2BcoQU5P6LjHnjIkH%2BXEyQIgPeWt373kGRoa6Jyj4Zs7UMxY%2BpdgCf02g5er9fct9tUq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDHRjMbZJcHK3%2BYcJTCrcAyyHAEh5EBBFWTJjI3QXB2SZdouU9GzzPyj%2BPal8s1ZerkEjTIzf%2BQ4Y%2F%2FlX0887dl9V2Sa8dFFA6uD3iK6NRUlnMxsQUVQnSw%2FKnt7Jkc9XPFPwmQlF0LJQNrBRxoO%2B5ejKH3tjLTSosO%2B8k5UWnNCSKqtmgw1Vin8jAnR0CUhVfvCFhkQ6WnOABmV1t0sAAtLQm2%2BLLLCe%2FWEoItl7phPkYn6VnhAC%2BdDe3dF1%2FaZZ5BxhOXumpMK83WGkK8sqyFIXrtynxBydC%2Bebae5YoHMlHfKRzwfwOW6YaasTy9qbpIuOXqcW3mqcyECt2NWFGmabXNpPj6DshRyGdkw6X7J7WdLezmZ02tjycMELQvZASOXMyuNKNKU5D7XaYQh7%2Bqz2qtW3qYO4kKaj20tT5nxaB0W82nQWXMz%2BpNEi0f8U8vLgFhHSsVx4jMvVzxxW91ykLgtGhUraFkDsBc8A%2BcQrLKUGZfbyD48eaA9s9rdfwB%2FNQB6CWeBZXGCSJ0pdm7CnJSx798W3ZCNo1IXHfcJj23rJT8BKz%2BDuog%2BnHTmh89I7VUovuWfizaImMoaXMrfXJuvkNDLIsp7OKSCdaGO%2B2Jb1jxh6A%2F%2FAAhJPMJse7%2BKw4MibhwOG%2B6irMNOOzswGOqUBlGMHdBjo9RAKlwOmX8rDg4Xn5qgZQLYYQKOTw4afdMKj%2F1WM0htt%2B7Xus4oDSVPHB%2BfL9NUQGsDbxtZSjtrGGzie%2FJ6yaPxOAhV%2B1mRPr4KmBfoPHWuh%2BWAhH4CO9iuLj6M1vbIv9wWkRavJs1c7XPoPNKSb6SKFbCdcL4eQZ0HK%2BTGnfGFwfzyjEyKRsv7yr0t7f0uiX6lcbQe922D%2FUwWOJh3A&X-Amz-Signature=2f447fe216fab8821e8fa1098175d50ddb9103679a66d2587ff54eaee3c423c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WF7NKRFK%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJGMEQCIC7SLBHb%2Bh5cScu0x37mAoO%2FvrQPp3Evvrm%2FicHYdoumAiAMffVxpYse7PZlxTe84G0zMRzuUPdv%2Fr8I7ufr65VETyr%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMnMJABKhJnu1qc%2BcXKtwDgKIEES9VoEFaBq8LR%2FSa9vFflgZR7yJ96QwBuDO3%2B8BkIaW4Xxs%2F39wOzcxiZA05KiPZvLLv0WMNAOwftDs6r2%2F9n47x8x9eX2Vrp9bSlTwff15It58BNVsGaUd6yhmSdRBxDxsixVpz90ZZ59EZnmfZB0GaSu58evse9%2F%2Fw%2FKlWKAJi3kxacol5%2Bj7idcYuBmIDGN3j%2Bdiijw21qh%2FPFStc1pROU8R4t%2FXPZb6H2iF2FWWmcoLDkzEFdoGIFdv6vmbygNSCCPP%2F4QyzKdY3DMzo0KpWFlr0RIBhx1mChKKWdVkyA5CLZBzXTdJQK0R720u41mC1h7E9YQOb0LQLBAGn1nPG2p%2Fhtrmk0ffOAcXLao87m3D3%2BvqHXUa7rzm6o9WasCCVog8U3GSuSu61p5mYWDPSjUqfdsg5zrt4d354oEYRZOnFtoLi%2BDrPoBc1qkMXHH1ie%2FUmZoayYPYL9OcObuNXGgd89gN3%2FkUBffKlCfz1jvvi3KtV02qq9t81iONPLabgD8VTxEbnAH1SCJ4k3%2BtJJFDElE0LS%2BE4oPtd8u2T4CS%2FvG8IawdCe2RB5%2BT2gNnPg231soAgP163UqijgpZdnYdw79bjOSg%2FkoZmpeE%2Bp0Bjl0HcXfIw347OzAY6pgFmpx1%2FpSdz66GVeOwHBztYkmPRe2tsjqYMOepzWtufFp93dRKmwrpnPKuSaDj9xRDWe2gUUgWp%2BpvyXl5vRY3T%2BRbfQrubFnjnk8jrAiO25HNlyMhgbQM5aa3nHR%2FHwZ9r2sH66g3RoHmmiqUOGRu8si%2BL%2BjmtBV7d75xt1ufiHZ9r6sXFf%2F%2FYpHupoYO0wOFsDEj3ROIJlmF8uPeZhCHSrrOczcwV&X-Amz-Signature=400be5449e052b0d753ff8d2fd386fcdd133b81d96aa97ba649203f98b801060&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4X5AYMX%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIA02UovR1P79AI642Smoijq0b510CMlk0KDb1tsCGNX2AiEAsbXGCG8hljCHksECTZ870EQuBZ%2BXiRUV1r%2BjOBYPXn0q%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDNsnBju35WJtUWZfiCrcA4i07ywPMmn4C8ZvPBl7hY5xMBOibTOdRrcSr0WnpbrFZgmvvJxTxzIm3vPkKKemaCpzDiuzaDf6g2yQEzu6UBoP5aH%2FYr9%2BQwj9RzDpJF6qky7zqapCG9mO2Dx9zBzXAKMaqm5YGFe%2BduXDaZd3gevgU31b6UgGf5PQEd9QIlzdXpFHu%2FD%2FYO6wOUR0YfcVzXqM6lbmWOCDpHD6LsRB8IZ%2FncAK0x%2BQU%2F9dljMG%2B4FPzsJqjcPU11%2FtDWkc63qUFpAyhUQXntWJeC2EDsuPBFRaecaYSsfg4tIcdrwI73mDotppMcCC4KnAr%2FuVs4Q%2BlOUUGWMy2RBELsrFcadiSyxZui2OJgyYarzsfG%2F4sjyhUzofVjeSQzsj2JRxxgESnzU1E6k16CSWH9g0cIUizqBWpIRkS3mPE0lo10H37uKy44PnkOamL0qsGm4LbIP9xR4MsNuUO%2FRwYpIhPN87Sib2%2FPSXCxjgyUX3wmtUj47LD4YPykZPYE0wrV4YJwlayLjIshBLJ36QMjuQNpURMFQdOHbfVCVrzQpnsBcqyFuVX7kphuTiFMUnuUzGnc3lVGWxCH2PDlfM0T%2BgcmawII%2FiVrXFzI65o%2FGvOxV89GjMDZNjeX4IaMMcsOe9MMmOzswGOqUB%2Bzd84nMgp7AU75DYzCyuT2ZycIjWqOz%2F9dyrTbCkAq%2BWYuWPx4ChnpCt%2Bwcwv0cnZZ%2FY4FBEIzbKuTk2J%2FnhUpqAN8JF1i751WtDvaLSRFGTBEPL8DmiQISSl85Zg7TPXQAhN3cgEcR82CHnxPLLfMA%2BuBSa5rklpX4nm4rLw5F7opZ1Lq9v%2FYOBoCx2ulBdQkgpgUHmVFYVhLyCW%2Fj8T7VrDQOR&X-Amz-Signature=cc55e1f84d482b7f3dc466517fd3bd96ecfb111e5aa23c54962a965e72db0066&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7VFR343%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCICm%2BwHwh%2F63JiYVHWO2haoVVrRweXuwPnt0msfaLRsWwAiEA%2Fh1D6t7BvVWzi78iUObvu5PQVmdDUYeoFeeVDcrGnd0q%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDP%2BNGQ41MEBttb%2FS1SrcAx6nXPc7zPvy0SzRH2WPqSJWIaUUhpXhU6DSgIK%2BQ814U6e3vf8B8JIxV9fpQ3v72enh3Hoy90XN6lSr44369akZZwu6AiRw3ASkYG63NJQT6SqDSiW8IB7f4gTC7oUXGNHvNXZL%2BqyKTW9ytF0zdA%2FLXYVTi93S7vqemQC6KeEIUF41kndQ8rP8ud5RymlPdQASXG%2BNEjL%2ByyKuuAFInmoWzJs1snpuX6QT5FnsV8kKNnGXPB5wQOj0ZCEj6%2FmO%2Ft1Bw65IN04c6LKqKjIPcRNwo%2B7Z7rXFRPcgACZBbTz%2FVPbZsjXBvpuvbDO%2B1YbtuDuwWpHEA3NDiNBNY0EWSz7scTTLwKgCJ7HJdgimybsKpGlEGNHOPZIKbZXruZevKyqyE6GxY%2FzPsKyVtn6E%2BOHNTPhwnWyk0TaFw3yDJAJP7C9U2HiP6wRsR40IiBSL3F%2FYQg3Y4uVUWss6EAmj44RGojsuC26D3FLnFlUEx%2FvXEFUprnXvxfoUnCshyDJJf%2FsvP%2FQJb81lqJE3ivjrfw6T3KPJvoKDAriS5%2BvpP6dOEkdvfAnehxKGmOxQhuPZn2CJ%2Bh1ASBc6wMrsas7ezkR0UbXol%2BpaCkh%2BAoZzC2w%2FambVCWRS1RwUztq%2FMNePzswGOqUBYk42JMD%2FdBOaKXLlKMuTysjyRZ%2F8evlWHNz9EmlE9mMkXraWZW0%2FHO0a27o5rAlthbH5yTAgZ6BAKEanVDsYjq5pZT%2FuRBMEver6QMAjU%2BJ3jDWI4T8xz6ZP5%2BrvRsnjqDTIW3JtmzCXsNOd4fAAo%2FU91B%2Fx0mv0OtGBK31WDqzbkg9c5tuAhtNbJUUdP%2BKajtVKVJKMI%2BJrhRlnepeoWqERwqWi&X-Amz-Signature=b2dfaf3d47ba66bde62e00e0cbd898ba690da9b4ef13cc1f0905227c91ea199c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUB3HPKR%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJGMEQCIHc7ZId0j%2Bj3chj1dRcR0XHX6S%2BdFFU4%2BjOsvi7VsGztAiB6qoTgWC7nJcTBc1D3Hdg0loBWd29xEWqb47K1JZo7JCr%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMx%2Fsmo%2FYedEIIVBfYKtwDwmRzjzTVxgubeJ%2BydNAiG%2BvcjuWrZh%2FpxvS6zLVLMgnLs8tCgHSbmaeSMUIiIz%2F%2FKCJSJ2x1VDRUo2IrxF4iazN3dOymOkWiGYSsGSXGYSv9ruLips6PU4SGux8oEUxJs17cAc79nqU%2FSq5AdO4rwh%2BY3ulX%2BST5jis5HQqz3X%2BqmYXd%2F66DFJZxALROTYar7b9PHycAyyoVSM5L%2F3AO9%2F%2Fwc4Ghu1Nkht2hOKcLUFlNNfwEbYnjaKep2T6Va4HRqLfrLLo6%2BOYcn6YQUczJQzPPBnZ3W9xq%2BIviu8x98zDNTblaKhOSsHUeKcn4WsV6b7XGeQScqpQOCuWScQ4bYoAzM8Kxw9ZAu%2BkEQQJM5oS1seUsIqXFgS6WnJOFdjDR%2B6W4dUDLMVCZpLVPFn6A9tOzQ6lfkNH1snA9RH8ysGJIgNQld8qES6om0%2FmUF2Ev5vWx3tMvo1YYH4tlMyu95skCMnmeyQk6PQkz7tY%2FHHAXAe2oEfBw5CDHUI3YGzOdLIsELcE%2FMTE2qidS7u2u92NTyDp7LoVhvndnVHoASdzk2p7rIUK0JJYAJkIm2CtaK8heqRO3zw96i94zZW%2BbCxnOazX2FcVUbM2UCQf1q6QFdJMM2Pm4mzHtgjow347OzAY6pgFc%2Bwn%2Bo2GFUmJ5By5Ha1bDv%2BO3HKkqvfy8Ft59SUFcbMU%2BCaJR7HszAcou%2BX7H%2FK1QSxQkL%2BP7g9cAfjDZDke5Pd7qsYH7FhZFHGdcxlzBC4puzsUcQGsArGfNxZLQ%2BNMZG4KvpP5JwH4N3CBCEYoqeNAcGcLxegoMaa%2FBtjgqJE7mJHvLWM2sZThPu8K4f1UKGUv3eDjS7Jaboiaz1AcQGibJrJNP&X-Amz-Signature=86cd56e88d2e4083b8de09767b38798b369cb6945dc32525ebc2d7ef6f23eecc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUB3HPKR%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJGMEQCIHc7ZId0j%2Bj3chj1dRcR0XHX6S%2BdFFU4%2BjOsvi7VsGztAiB6qoTgWC7nJcTBc1D3Hdg0loBWd29xEWqb47K1JZo7JCr%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMx%2Fsmo%2FYedEIIVBfYKtwDwmRzjzTVxgubeJ%2BydNAiG%2BvcjuWrZh%2FpxvS6zLVLMgnLs8tCgHSbmaeSMUIiIz%2F%2FKCJSJ2x1VDRUo2IrxF4iazN3dOymOkWiGYSsGSXGYSv9ruLips6PU4SGux8oEUxJs17cAc79nqU%2FSq5AdO4rwh%2BY3ulX%2BST5jis5HQqz3X%2BqmYXd%2F66DFJZxALROTYar7b9PHycAyyoVSM5L%2F3AO9%2F%2Fwc4Ghu1Nkht2hOKcLUFlNNfwEbYnjaKep2T6Va4HRqLfrLLo6%2BOYcn6YQUczJQzPPBnZ3W9xq%2BIviu8x98zDNTblaKhOSsHUeKcn4WsV6b7XGeQScqpQOCuWScQ4bYoAzM8Kxw9ZAu%2BkEQQJM5oS1seUsIqXFgS6WnJOFdjDR%2B6W4dUDLMVCZpLVPFn6A9tOzQ6lfkNH1snA9RH8ysGJIgNQld8qES6om0%2FmUF2Ev5vWx3tMvo1YYH4tlMyu95skCMnmeyQk6PQkz7tY%2FHHAXAe2oEfBw5CDHUI3YGzOdLIsELcE%2FMTE2qidS7u2u92NTyDp7LoVhvndnVHoASdzk2p7rIUK0JJYAJkIm2CtaK8heqRO3zw96i94zZW%2BbCxnOazX2FcVUbM2UCQf1q6QFdJMM2Pm4mzHtgjow347OzAY6pgFc%2Bwn%2Bo2GFUmJ5By5Ha1bDv%2BO3HKkqvfy8Ft59SUFcbMU%2BCaJR7HszAcou%2BX7H%2FK1QSxQkL%2BP7g9cAfjDZDke5Pd7qsYH7FhZFHGdcxlzBC4puzsUcQGsArGfNxZLQ%2BNMZG4KvpP5JwH4N3CBCEYoqeNAcGcLxegoMaa%2FBtjgqJE7mJHvLWM2sZThPu8K4f1UKGUv3eDjS7Jaboiaz1AcQGibJrJNP&X-Amz-Signature=98565caa20f66520402ee2bf2cd1edb800df0f614b42aee2b710ed3382968a01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TP7EPLZ4%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIQDKNfiV7ipjmEYg6PR783FFkqGGBfYXxjberyDRqtCn8gIgeAHt4Dwkq9aORrLuoo7%2BB5beE5qncIZ%2BHj6m69lmyeAq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDKiQQZCmwZicZlFrAircA8LOO6Hx23v39nhoFvtrCEvqNVxghZz1qAQMGzU7v%2FcrIDVf78TPoN4lUkRKBtwqmnXxWqdeDTTcAMJyutY%2FJ7LacIUUfeK83LZwoc3U6LZK4pcYsbv7LiuUJXHCNWMrk%2FHScW14deDV%2BSWpp0cxT28WCS0DRpqFqttr%2Fwiu8s6FxI2j9E6GVa3kd7VFWQzh7%2FKWxAZ%2F7G1dG2WtoUaZvYeA8I2vJxba2P8AVysL0%2Fi7b1B7WEXwyNFds0umThj%2BePVGWMJ5ziQ7NywIRKnR%2FjQdkaxmokVISmUesYvDFZ5YDmLdOVNwnCALBHz7QE961Dn86BVtOray2e3Fw7hzyqow%2FUly3ucINmzWGREvvh9Yt4L0xZAxC7bJXwaUpfHs1cdDt3HWdYGYno1nCPWJT8uZSpCMEydne6iE51HhbidhWYzZmzyP9ZdGSeGrKhExhG2SvmQNh6I5z%2BGEbUxhRmBsFfSjKu97LlU%2FXa9j5Bb8n9N%2FkMdCqRuabVS3jttQoUiHH%2FKINa0JDqIUb0%2FxXKhcYC7zzf%2BGcVbHjYvG0R%2FJ96OZ%2FJPpIN6yIsZvtwWa5zSwJFw1FELlBzp6Tm1o7qTu4U6rCp%2FtkdMk8jOIibTeaXXVxKEzWUFFfzMzMMyOzswGOqUBh4HkT9qayVnaBREVqEWU%2Bnm5sp2Uab2llwG5MWIEIDb4T30Id7GTByz8rKj3VhV1KGmhDHxhCXMjOmILYW49t5amkJlPOx0qg17msBA7c7DQFhuBq0ZetuU08nXfyB7%2B6fgt7WfAN%2BE6RqdYCKHNN9ehQZvWfyVLwuwOwIpeCT6AGqsNl9sOKwAhNx5w490HaoVk%2FfdSra8%2FwrPo65LgsptT%2BrSk&X-Amz-Signature=8918ffb2d1eb0faf93a16505cacd00991e7bffa630f3407087989826fc7c4b6f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AJIKIX3%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIC9lbBxmsWNGP%2F0agFIlKVsy7VGpB49Tjc5kROV7Je2VAiEA3sIuc%2BtuOgbAGGZxNVr%2B9aaLfFYPUseXyMbrwmuwmrsq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDJlpSih7MpJEn5ZIzSrcA5d9DDYvZ0K0d%2BG1DEHBLaUNMlt0Myv%2BQV%2F6GJ%2BVP9l1ewJ8%2FwOPJhCXZZ7NBqyGuChY7jjklGG917fmAyzLgelc%2FWw90uXqiKGP%2FkbKGzAp5Dniz%2BKj6KRS%2FO2yBQEPfjiWNFmswhn4A7N7za%2FScDjLYqGJJ9umivWaASnThBO6hS2pSmyJZQHod9CaIof10rLmoF42jqJpZpWrUKsuRE08LB2w%2BEzQCHI2qhs3zttJ310AmwI%2FjhT7UVl79oinHQsVBBrhmJude5EgrdAQzmcsLmZywPIs5oKHQuS68yYhIC2Y6czyKm4CgLCzz7VUD6%2Bo5IywDdcS1tVljNJWfRHhDrhG2pYx9a7Furk3IzZ8HHD8klXhKxcYKcXh2IJ06J5gI24a8s4FsZCJwXkWCco1qR4lGeivoURvRhAbujQMyauTGgkPUjJ1dsPX08gFOs64rwVc51O8AMp8eOCmQ9w3CMM8ivb4Xt4tNjKC5dwcs6uVSe8BmFq2ew0isHmfy%2BPK%2F3DsfhU5yT8gYOfRIj0nrlN0GhFJW7gU6B3EkClRxTuaYWTUfdz7TqGAQvJMIXQKE8MCVuE%2FZxGDbX1T5QExTIU638iYJyc5Jdz7tExQV0qWLi7Zhru7UcFWMJiOzswGOqUBn%2BVJHsQdzv9Wx6jzZvUcSy%2FX1fYYsiKrtB1cY8eECDPpKX5R7%2FZJrVLN7MVbqZ737Aui0%2Bg9YggsBVxmBnozC1oxoC5zAMYSej8trWrH%2ByTXcv2Jz0uy3yicZAilTrvMMeF4e%2Fwk6v%2F%2BJzBmGgFCAaDZsmIa51TvJiSHuqYOr9hnOTUSXasBY3hxtTbA5xoeeA%2Fp7P0XPVWTGpzLtYa422wTancp&X-Amz-Signature=1df1cfc546740647a1a7b33a0a1545354332f19f75010a39d86b18ab83fa84e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663AJIKIX3%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIC9lbBxmsWNGP%2F0agFIlKVsy7VGpB49Tjc5kROV7Je2VAiEA3sIuc%2BtuOgbAGGZxNVr%2B9aaLfFYPUseXyMbrwmuwmrsq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDJlpSih7MpJEn5ZIzSrcA5d9DDYvZ0K0d%2BG1DEHBLaUNMlt0Myv%2BQV%2F6GJ%2BVP9l1ewJ8%2FwOPJhCXZZ7NBqyGuChY7jjklGG917fmAyzLgelc%2FWw90uXqiKGP%2FkbKGzAp5Dniz%2BKj6KRS%2FO2yBQEPfjiWNFmswhn4A7N7za%2FScDjLYqGJJ9umivWaASnThBO6hS2pSmyJZQHod9CaIof10rLmoF42jqJpZpWrUKsuRE08LB2w%2BEzQCHI2qhs3zttJ310AmwI%2FjhT7UVl79oinHQsVBBrhmJude5EgrdAQzmcsLmZywPIs5oKHQuS68yYhIC2Y6czyKm4CgLCzz7VUD6%2Bo5IywDdcS1tVljNJWfRHhDrhG2pYx9a7Furk3IzZ8HHD8klXhKxcYKcXh2IJ06J5gI24a8s4FsZCJwXkWCco1qR4lGeivoURvRhAbujQMyauTGgkPUjJ1dsPX08gFOs64rwVc51O8AMp8eOCmQ9w3CMM8ivb4Xt4tNjKC5dwcs6uVSe8BmFq2ew0isHmfy%2BPK%2F3DsfhU5yT8gYOfRIj0nrlN0GhFJW7gU6B3EkClRxTuaYWTUfdz7TqGAQvJMIXQKE8MCVuE%2FZxGDbX1T5QExTIU638iYJyc5Jdz7tExQV0qWLi7Zhru7UcFWMJiOzswGOqUBn%2BVJHsQdzv9Wx6jzZvUcSy%2FX1fYYsiKrtB1cY8eECDPpKX5R7%2FZJrVLN7MVbqZ737Aui0%2Bg9YggsBVxmBnozC1oxoC5zAMYSej8trWrH%2ByTXcv2Jz0uy3yicZAilTrvMMeF4e%2Fwk6v%2F%2BJzBmGgFCAaDZsmIa51TvJiSHuqYOr9hnOTUSXasBY3hxtTbA5xoeeA%2Fp7P0XPVWTGpzLtYa422wTancp&X-Amz-Signature=1df1cfc546740647a1a7b33a0a1545354332f19f75010a39d86b18ab83fa84e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WNOSFBR%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T221447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJGMEQCIFoY7dMyJu9gsbgvIirSkNsi1C5lcdch8avuFxs9njatAiAqN7QbSgx0s8Ixm%2FhOoOfmxU7y6gztpa1JzSO9gPDQtCr%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMlCSh0X%2F%2BQunScxb8KtwDPLzEtmk7Cw378%2F9gCXIkD2xuPg9sVYlAPfKpILnGQbNEAW8IKpdf3lDoY7zQDE0ttzh%2B0gwm8LetnBzTFXQM4%2B4qP0pRv%2BHxqqawGQ2PvhnwgvxItC%2FdOnp4Ubcr6hgd7yghGqlGlAB4tgAKcFeKK4GTo0F6NX9vefZfDSv8tvOpXxv%2F4AzJLYoV4Pt5aexLoh0JYJ09QeMAl7UeTOyYimVIL40eZCkGjrrtAtIHjkHSBXSTIiMQAfJFIOAjg2HZe0cx5GDhXFjPGpiQJIZhWZD9IzjFXdvxdXMYG8jloEfofOo45OFRLwtyKOcsc%2FKnbCrDE2FWvlK0l81cJ5UCt5xEuHDb8cdMr%2FFfoZ%2BY52ycK258cEgQhnBUaOiPmMXNj%2B7uWpJpIoqNORL10CugI8KLce2f1oNXOonmRP%2Fgwx7HhsypowEg6ZjcRyzqPkS90Sfvgb8AHx%2Br0dbB6hiW8Syyk%2BATP0%2FCTXzg2RqXzrvnlrRiaZNdieD6scUPQaxHhgBgr5AO35xSOtpz40IXI%2Bt3nTvHxYMd6E0NPSn9bqcsDawerzAYyPPNCly690qpAXyO9dGhcysz6c69qt7WeX2ucBVYxBb%2FD5JeA8ursaAR%2BTBRtMOtvLa0nvMwp47OzAY6pgHhP7mv6YlkeBKyPjZvDsVIn%2Fi%2BE%2BU0qd%2FCSHGDlSZNcR2XxAFlG2kMF88gTQToJWDQFhNOVZrb7lbP1uqHJIuswNWNj7xO%2FrbCtD3GhiBzNLqfuRczvMLog21WKEDaKEECASMreDF7zfT3DLjqzZS%2BDXlm53nGpiUs3SNNDaq2Jleyz26Pu3oXxtQsRVckTZNHF8XRle%2BiCOpcTZ35yKogkjO%2FyjRo&X-Amz-Signature=e7392cf8ff82e9b712d3a4fa9add75d50a6558a4b02b59ced835225dc19e01bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

