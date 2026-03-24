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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGYMHPKE%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHjoJwGkrrxkrx1rAx%2BrmK%2Bx0%2FDmjBryzedwAtZ8whWFAiBkSpFVHOIn1J8LE%2FuA6kL7okZ8lQ5OPKRd7hjBuMA6TyqIBAiR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMy1takMdE4f9KK0OcKtwDSjvPSnWrzcY56RB1bq%2FCOCiLyuZE8hO4wx1%2FsZtOclpdbjJVcgTdcQ8Meeg5J%2Fs4UY0QZeTQWUTxEQ2K9ARZEYs95oUSZTU%2B%2BFrqb4OmwjTbLtJWPikPpuAif3apfYvAuJerwDIyN8ON%2B9SQg7iNGrI9YhDuaMtuDzlrgM%2FErG62PPxe32dd8FAzws8FXyHkVMHJNKzgPvOn%2Fv%2FqZmf5pTZKwPzDgfafx7S%2Bqk%2Fdy2uTbKI90D0XjnstjB98s8Ci0PGJBTnNRSlhKXtIDQLeXCNB2ysgzyScdqL0HdVYaxhKqJ%2F%2FAp08%2Fr1fDORaWpCXioQWTUJB6VuEgaSVTzxGOYM6sXU7AA5bNTeFPCxspbs98dwreFoBelFZnNxTWjTUWJVXVMZdAE3KFIT63t3itfq%2F2hUbUaGT5Xekvi0uOddJ4cULgFzBI5lsVOcu8h8kO%2F2nOUsQwin2n8MqeoIp1RBTdgmlLPSXejkMA4MclixTzKNePy9UVU56oA2QoXNmyy7ELa4ljUZqi%2F5mxIv1Pnm9ZnS5OUM0mVDsIQ7EYKNDT3qr19lFFskKxK76Zv1d8XJ8ehVrXRb9yX%2BBJa8A5PL%2FdVOXMRyuqLtJ7kjz10Wk6rj67bFUG3SRAEMwov2IzgY6pgF9ucjd2aCIYYEsM99Zwey5VDGKmuIcKuaA8t7Jdr%2BOdylcjnpGbEizPOLl39emQn2EIIGbd6cdPe163dFrpDIhHfLWFQ9zcNGD4soVJBciKikFuWKR1N1oXWEafGiiD%2F7Gq3AEcigInleBod4WzWGc4PMsk5iNMC9PTMAd%2FqSgXgCuFUl4pWZYUKxmpAicH7seLbAEo95Ovk6aZ%2BtafKXbcpNVrnwt&X-Amz-Signature=6aa07f71a57b57ad620dbf794930a25980169bd7a94612bd8fbef96b7354d749&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGYMHPKE%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHjoJwGkrrxkrx1rAx%2BrmK%2Bx0%2FDmjBryzedwAtZ8whWFAiBkSpFVHOIn1J8LE%2FuA6kL7okZ8lQ5OPKRd7hjBuMA6TyqIBAiR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMy1takMdE4f9KK0OcKtwDSjvPSnWrzcY56RB1bq%2FCOCiLyuZE8hO4wx1%2FsZtOclpdbjJVcgTdcQ8Meeg5J%2Fs4UY0QZeTQWUTxEQ2K9ARZEYs95oUSZTU%2B%2BFrqb4OmwjTbLtJWPikPpuAif3apfYvAuJerwDIyN8ON%2B9SQg7iNGrI9YhDuaMtuDzlrgM%2FErG62PPxe32dd8FAzws8FXyHkVMHJNKzgPvOn%2Fv%2FqZmf5pTZKwPzDgfafx7S%2Bqk%2Fdy2uTbKI90D0XjnstjB98s8Ci0PGJBTnNRSlhKXtIDQLeXCNB2ysgzyScdqL0HdVYaxhKqJ%2F%2FAp08%2Fr1fDORaWpCXioQWTUJB6VuEgaSVTzxGOYM6sXU7AA5bNTeFPCxspbs98dwreFoBelFZnNxTWjTUWJVXVMZdAE3KFIT63t3itfq%2F2hUbUaGT5Xekvi0uOddJ4cULgFzBI5lsVOcu8h8kO%2F2nOUsQwin2n8MqeoIp1RBTdgmlLPSXejkMA4MclixTzKNePy9UVU56oA2QoXNmyy7ELa4ljUZqi%2F5mxIv1Pnm9ZnS5OUM0mVDsIQ7EYKNDT3qr19lFFskKxK76Zv1d8XJ8ehVrXRb9yX%2BBJa8A5PL%2FdVOXMRyuqLtJ7kjz10Wk6rj67bFUG3SRAEMwov2IzgY6pgF9ucjd2aCIYYEsM99Zwey5VDGKmuIcKuaA8t7Jdr%2BOdylcjnpGbEizPOLl39emQn2EIIGbd6cdPe163dFrpDIhHfLWFQ9zcNGD4soVJBciKikFuWKR1N1oXWEafGiiD%2F7Gq3AEcigInleBod4WzWGc4PMsk5iNMC9PTMAd%2FqSgXgCuFUl4pWZYUKxmpAicH7seLbAEo95Ovk6aZ%2BtafKXbcpNVrnwt&X-Amz-Signature=6aa07f71a57b57ad620dbf794930a25980169bd7a94612bd8fbef96b7354d749&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637QUZTWN%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCEqGt2A08MzlsJraKKhSmCxk4x2uI4qCVlOo0KCHuTcwIgHzDNFaWAGVH8gLHnQak4CTubSv0zDbXdFPc%2BHZxyHT0qiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC1xjlJKDpdBagYb2yrcA%2FuzXY4CZ3QYVS76KqkMdevfyG3EulOq31%2FlC1tCg0amiaMVE%2BotkUz7R8XXaYlXynnjKwprjP%2FkLsgB0U7Uh3OR9rPRy2LOAyiPGFB4o%2FylAEFJQqWj01zU52sYnuE5HFcIBb0EBssRD7UrVG7jOdvaab8YU7k6cuH8lqGll1m3IpF%2BiFyLa30qfjs%2FHtUG4o1OgmZL%2Fv3BQDqY0WPD1eOiaelPQwWRtuR14kof0lQi301IpLkR5qa%2Bagl%2BterGLb0xrR6PH0xnNWAkzm90ncaCD1WAJZc%2F0LikGjdB2G8KTMgTJQO3PqgQtf6w4g5N%2BjJMbO8QotFL07qe2SHZ4fBcI2bS8f9oEvbjnwX85MIiQXZdK2BnrktFPac%2B4uHZQJAM%2B6a6anr9l7j%2BmeoimJK%2F9sf3tWO3OG287ThEBkLPVR7KZF%2BUPNJ%2BRV2pgU0lgCGbNKPu0vo%2BbuRXSCm2QyeKCkgKwnu4nvwDnHOoOPMX7bXAvR9T7jcEeMiRr7os7puSzTGfmtkFNJK7jOIVeY%2BHxbLjjydwLRvIZYHQiCc0fswC8E2xwsrrAU9jRd0xF%2BwYUpTKMr9yNCzOIjYVXmifb4wSCNDELdJqK1dFddW3a1HVXPTm5XeN3x8JMJf9iM4GOqUBVWPHDKuO0OMFn5k5wW1BvnQzJZipwmZ6bP7Ku%2FBWW%2F2kZslR8qemGZ91hGA907p9CG7ok%2BH0mXNDtDbbRACuRzRA8lsEA4vAJ2TIdUAElBnZcRus6encniqTNB0r1sH7VczKK4h4GZEdFwuOsMWwZuraZTrEKuf5FlK2WVIgcGMUr9p%2FOBCB4WTdIkLH9JPUY3L9Qtsw2cQ%2Fv3HpkBs9KcnJg10t&X-Amz-Signature=3a9ec2d27a6f94890f6aea43e13b2ac1470e5c996c88849143667c2f1ef56eff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664D6ZGQXP%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDdPNkMW%2BfB%2FjgT7P7u444V2UB%2B3LB76gw%2Bzh722QoUpwIgPop5cQXRMBz4rWxpPlAtlo402Rbu8HU%2FJ%2F7rN3TpF0wqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGeZ95C5bWlMvrRv0ircA4%2FOlCA%2F6rr9r3%2BDIQMMySwhsJc2qN16VK7vve2L9xU2aRMGd91KX2UAbsvwIDF%2B2lGOaz%2B8WxIbqmv7LbYwa3M5UhI9YZaFQPKMSFo79FwgQnX2pfuJDfrOyqHe6%2BrXXxZAcgUWWBVq9%2BH0PMmaMnEcH6sp8KW9YiFiq2JQK%2FnltZLd65tLmGCDrdMVQM6W66EJuakpgjigEB%2BIi9LD8kr4U%2BHYcqJH%2BrLr4Utqb16fY7FiRhue0yjDCooPsDXEsnk%2FvhwdtUQowZDTeuVIaP%2Fgg4NkpcNVUXHhdbv9gC44gbXy6nnM7WWQqt%2Bfasvzk5iUsR7Xo3ozeyKtLVYbKYFgcWeJ7aUeOhKXRclez3JXXeUkJqAMkZu8%2BvUE8vaITlFpWujW9DGspF1izy5TlL8tjzoUmvcSEF%2Bq4XUL%2FD14Jy62Ubp4ptS%2F4CQA5Bn%2FZR60hP%2BOu%2BYTOuFyQHw%2FuxEo56YZiK6gOUJub3Q6cyvpgc7OKxlTKbclFNEBq2p5Hdo1vh99XVl0tJzfSL1OLh%2Bhr%2F1ZNZdy8jds0hMO2s176Ztc9g61B9jzbN5VZZCYZlDJK2%2BMQ9PiLaGJYI7s9Jy4dwqmn6ZyRE7VcrxHvC%2FdtB%2BGw%2FP5fH1u3TvcMJn9iM4GOqUBZRftsL78ikwl4ml3xaHgIrhALrPBFEjGfpfoAiQn6mr75Mrhso%2BVljTvdzlD%2FvZ9J1chdaQzV7Leol82cAlQDdUKafIU3bHdhaHDMDjamn3%2BhWzinj2UR4Ggyhe7dDpCGBewh1wUUQBv%2BQf7%2F2%2Bm7AifBdaDeBpwmeoeHG%2FAsPEFu8MpfsRJrRuye%2BhQYaRVTRgar2uMZijVJo83IfUzni3DBHO%2F&X-Amz-Signature=8f2c2b480d3582caafdfb92def29d61fac72fea7be8c651d6865f116775ded5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664D6ZGQXP%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDdPNkMW%2BfB%2FjgT7P7u444V2UB%2B3LB76gw%2Bzh722QoUpwIgPop5cQXRMBz4rWxpPlAtlo402Rbu8HU%2FJ%2F7rN3TpF0wqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGeZ95C5bWlMvrRv0ircA4%2FOlCA%2F6rr9r3%2BDIQMMySwhsJc2qN16VK7vve2L9xU2aRMGd91KX2UAbsvwIDF%2B2lGOaz%2B8WxIbqmv7LbYwa3M5UhI9YZaFQPKMSFo79FwgQnX2pfuJDfrOyqHe6%2BrXXxZAcgUWWBVq9%2BH0PMmaMnEcH6sp8KW9YiFiq2JQK%2FnltZLd65tLmGCDrdMVQM6W66EJuakpgjigEB%2BIi9LD8kr4U%2BHYcqJH%2BrLr4Utqb16fY7FiRhue0yjDCooPsDXEsnk%2FvhwdtUQowZDTeuVIaP%2Fgg4NkpcNVUXHhdbv9gC44gbXy6nnM7WWQqt%2Bfasvzk5iUsR7Xo3ozeyKtLVYbKYFgcWeJ7aUeOhKXRclez3JXXeUkJqAMkZu8%2BvUE8vaITlFpWujW9DGspF1izy5TlL8tjzoUmvcSEF%2Bq4XUL%2FD14Jy62Ubp4ptS%2F4CQA5Bn%2FZR60hP%2BOu%2BYTOuFyQHw%2FuxEo56YZiK6gOUJub3Q6cyvpgc7OKxlTKbclFNEBq2p5Hdo1vh99XVl0tJzfSL1OLh%2Bhr%2F1ZNZdy8jds0hMO2s176Ztc9g61B9jzbN5VZZCYZlDJK2%2BMQ9PiLaGJYI7s9Jy4dwqmn6ZyRE7VcrxHvC%2FdtB%2BGw%2FP5fH1u3TvcMJn9iM4GOqUBZRftsL78ikwl4ml3xaHgIrhALrPBFEjGfpfoAiQn6mr75Mrhso%2BVljTvdzlD%2FvZ9J1chdaQzV7Leol82cAlQDdUKafIU3bHdhaHDMDjamn3%2BhWzinj2UR4Ggyhe7dDpCGBewh1wUUQBv%2BQf7%2F2%2Bm7AifBdaDeBpwmeoeHG%2FAsPEFu8MpfsRJrRuye%2BhQYaRVTRgar2uMZijVJo83IfUzni3DBHO%2F&X-Amz-Signature=a0d3d67418550e16c0e50f80d633236de52cdafd7a89f612dae4fa8a97baddae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVDFYYGH%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074415Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBqn8iNxKkwCIvg%2FNbMmKEE6WOb98xoZ%2Fip7b2at7w2xAiAS99jWYGLxNQ6qXC4TvI4jU70bvEnoKpjWylYRV53X7SqIBAiR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMptsY7TvMZxxokzBAKtwDv49V8h45eW4ihc%2Bc0f3a5bPegcsqyFRBjcQG4euLVDMFHqWFQD8oCH0jAOQwYYZL9JkBi%2Fmb4xJ48Q%2FeycAWe44eqx0Xg6jjcB0rtbDgaE6HpSX7HSttaSprwphtxSnRpF5qB9I3N3cJjt%2BLwXtBeoOWB1jZyVPfXwyTyDOhlsNE5EX8vKPp3%2Bhz3Qfy%2FKXYjCzGPY%2F5hjEIb0t%2B3Qp3cc0oo2RhIIewxei8bCwqUx8JCDk1sXnG5yHdyAlCCHi7PJX1UGwxlXH6XrZyAY%2FcJ47S3OwQaRGwHdzuCtEO3xXVGulVWV6lBqVFgKLwt2apITQpvTrN5QmihTTef%2B2DxmkGxolO97mdX08LkGs83ZMC3Lwfxjowe1cnMc42vE9EuztPq0W6Fj1aOgKBGgz3bhIC4sk5%2B37wW%2BO%2BWuYmcKBUfC5mpMko%2FrtHTVpfQrbDurhKpBMc%2BycWy8QOkNt8J7%2Fv4eT4rM5Zf7%2FSETZy9Mn%2FphfAofcFhzO2XVFmkBSzc5uoH%2FhmiZcXG5o9cRQ0gAe0Fz9UQH1adAGzNIkdeGk7J3IkunGvfJ1DSw9ljXEa67IIG26eW3rJXNSHve4wbU4r4xe%2Bs9waj7J%2FMJ3QEusTofsQ1gB1AJK2Z6Qwif2IzgY6pgFt7A%2FoHjDpE97%2F7Xe%2FJQnGafY%2FIZxcSRMRVICu34ITlMVtbL6N%2BwPHTa2e3J0G1Jra2DIIJWYmdH1yFdOgrxFRwCPmo4BpraqxUE09caF9ocPVqCgQRHC%2BpQl3GsgRt2h346s4Kn0SvC67OfuOB8pxIVirH8Sm2Q4q7wQwJQDk98iLgEepHCgHOJ46g6q1%2FOYS8IaOdQ756ef%2Fni9QaAqGFADWDRhL&X-Amz-Signature=c66d89ed8b2d36d3e6aedddd2ca32ebff2600b496c9f63bce5f76977b37a31fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623IVXVAB%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074415Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnZ00yELiGRiUZlmR1M%2Fo8%2F1wMx952YapWTX%2BoVnuj%2BQIgOGVr0cJOfiZyk9hGZQNCFEaQK0C1fOwlPSN3r6Z%2BjiYqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGAHh4dRjFnTpQzUxircA9Wf5fXbDer3D89ib09yDsGz1zFS2zzsSdvkEacSngyUTYgI4dctkvX1x0is8Ud1SqKFTv%2BkxXSH7R6hFO1eD6zyu798gL0u9K1%2BQ1Jc2rQOE4uA3imNg%2FIM6pw0BiGs0frWc0%2BpP1uUFQm5mAEsGuQY2ufUse3TJpFeNHRi4EWjm5l9gXwN0AI2tnoK19WCYsS%2BTfkiYSB7xT2G2ubcMtrUR%2BuJLcuVvj63ZW0yNK9yjkJ7XKDvCN%2BVPxqFuIinfNPgj7m%2F1JMkCArrT%2BleR9Ves7Q6Fyqb9NTr9slLMZPEIoRAszeyXAmf%2Bd7xSyklf847C9hBFOJRk%2FXXW09hobL6CP4z1qIwYnNs%2Bv6KqrH2plc19FrHW8byoGwOssbZ9u9wwyMHaBZjm2DYfgqceDntn8Uy0jPqbf%2FjldAPYhDZfO9qYx9XaM8%2Bn1cqrNAOpMO%2F625N8lycDU4UEByxvAWeOHeiKjpgT%2Fpdfcr6cSSJugqXGg3csW%2FQjSxFP2FOgogmELjiFHSCBO9yYNkVHXtBXBsZlwElNPElZgOjIU5pp2hSU28qCALThBPb8U0bYQlLjVeWnuaSWPZ5ZutrNfPeMiozgBwxTfC8EHiWp1q76oFft9lC9928HhavMJn%2FiM4GOqUBf70Nw2ttHegrM9%2FnQCbnqi9zLC2jrofgfa9vybhXlZLR%2FWKMJjATMatMbwm9ZOE%2FoAvhXA9Oi6qdx7r5lLGUSo%2Fe08geN3phepK28Fq9yKnWv0hf2Nn%2FMi9E7x7uh3b%2F6AjjEkvpipR32VDZVDsuCKARHYO8noM2GVbwjq21OB%2BooNrVKPWtOJgH00NruyMGrAKVyY99%2FFm2mTSNpRbLJeWsfO23&X-Amz-Signature=23f880201d87a26da4e0447e2b6a727b074e1ab2e4cfe5980580e4af40e4f721&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQFKCDMF%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074416Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC2Q7kv6GmqubUrAhxl3SZqByWVvQm8wPFMfs9LcLeltQIgNQ8ZAL6nHQPbiPomNCIzgwQRz1ZK6cwhYySAEJnoaLcqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGy0MozYRvSDCSIi7CrcAxIR5bS%2Fb7G70Zq0iEDHiHsERYQawdj3l3lJ%2BkEyu0bCw2rXan1Amb8%2BMldbZpOm2Iu9j%2BdmcqAGfA98TxQdNYLXh2YxNDkIZ3GNPs1qiwGZveRBRT4Lo3IB42kBUjqo5Q%2B8afU2WSnAaqU8xeEGYF4pkhWj%2FMnKD4rLlnijcQuO0%2FmF9y3%2FD1Nic7JtUUbeFgrdmR7ASDp2ZVpyq7i%2BP9NAfp%2FxEMX9Gtj8fDMsMOT3ZaMNirVUHGVQE2jjEDpsywJH6GwUOjhwRMPV21Dc7jytmHxOQZI60b0PcTPKTXjfSZT8I%2BDO005gnkN8zEWOC6zVaF1Omv%2FhXwMZPkKEgsg41Q8WyfvLAw0JW23jSyfdEiXyPTz1BN4XirZoAHbV0g7ri1Aa2wfYJ0PW4rZogfgN9AGpy36wPYD%2Fz37yBN9haLsxfFqC8kol0wiCzwcp%2FHDqBSvQX%2ByVBMAqtELI2Q5Jp44V9h7DFR0cZfSLGYY%2FJKoL39NQ6v22FhlN6CXyG6ufb6WCn3kEYw8FF0ou31tzxFlfSXfmrgMHkTOQKDqEKoPZ6%2F02W5qPbVCTcmoEpngEHlHR5ZRgCUzRsSPKTul49CBtEmd9fSsz6GtqTICKuDc4RKZBXM053yFsMIb%2FiM4GOqUBClbEER4Y7TBM2gsWcJbvFIJN5JRq9hu7XjR8x4K%2B3BOBdQXw%2FLvfc0HqC2obhEL%2Bqk4cAl59bpneeYfRN5rYsQhJS5hN4YihQWEAPr3X8gQe%2FZ9MESqkSACNkWScDKR2%2FX%2F%2F9pJz27lAfSU7kr%2BD97aimJDZHaIhfOSTQRdi6qFVlUtUlKSP6y1h4llETylHpJgdO37j0S%2BSKRghTm%2BTFgulgJ24&X-Amz-Signature=7f24c8f84d1e545dee092e74d2ee7ca2325262f189781970334aa0ebaaa170e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635DNYQOA%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIQDBv2QzmuEo33cjZ4kRLJGurNB7QLaCE2I2u1HEUhgWlwIfRyYkcFTcYK0X%2BKXkZCW%2FF%2BjLvjYFPm1GSfjaT1SzjCqIBAiR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM7R8Ura2QHJviIhdJKtwDNddM0CX9CLSw4MVUkV3Qo096Vtb4xxyNB%2FiKpA86V3y9f1GHpjXPXxXx33c3ffrEEyG8Y0GEclAlq%2BkYYdoPnufg27HX468MgqB4zHpf6nIv9cM3fZqBQc%2BmH6M3NCQm0DhBlR4cdRCur0e1q15b6ASB71e2a8e5ebEWqE%2BmbKhUL4z51XTrZsy0zyl%2Brt4gGVaxF70vRV3lZ0nXt%2B%2BJv44X%2B8ReHGhN6LvuaS%2BdR70Ba9FHbYMzJqNxfEFc99KrYkBaOSTsdezRZThfR%2BY%2F9XOEnpvqQZlax6xODS75jjPaMa8Ko5P0mGdY%2BtjbyP%2BB1IjqcDFubfL%2BNuhrYzmw9lmOrirRVdHTmm5Smbfsz80VJPNaaK1HR%2BmkhRNsgqR4J0TtBjLgE8V6OPuLNPJ0nnNa8nJuWDoJghKLr2EqD3znyEjMWOfr0%2F25%2BU6kPOvB%2FCN6B09soKcmYuSdm%2BaZM%2BORVj10DVnpU%2FZqN0wuDQUZdQeYozuY2lMyUSO1sVFb1q2FiaG2TVr%2BUMU6qsEIIA1HxfDvsDZvftgGA2%2FhamOlKubIywmfVuiitou654pGwPCA0%2FXDF%2B9L90UbAbd4KhfGFg0xHW6wiNyUBu7oSTCI74q%2BUQ3THRmUZ9EwoP2IzgY6pgEMHvK%2BaDNTUMZk44SzK0kx7%2BDfvyPsGz%2BKpclsVvqDRUvXaVJtoYfHlEDquQpYN6BxcskAkqO9mHckqTWudeqCm2q5zoTS%2Bq6LXVPB2LerTw1E5QfVg2NGOcYnzKj05U1spzEjlNnlT39pvkQ6pP2PuOEsQ1oO%2BLhflfEqSsvqhv1lpueyqWgxR3FZ1WUSCOx7b58iFvD0%2B%2B2FC16SVa3XHVH33lr3&X-Amz-Signature=d1aa79c1568d8e6884753d7c9de8d16f29f63d4e6c23503fc5fd6764c199cceb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635DNYQOA%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIQDBv2QzmuEo33cjZ4kRLJGurNB7QLaCE2I2u1HEUhgWlwIfRyYkcFTcYK0X%2BKXkZCW%2FF%2BjLvjYFPm1GSfjaT1SzjCqIBAiR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM7R8Ura2QHJviIhdJKtwDNddM0CX9CLSw4MVUkV3Qo096Vtb4xxyNB%2FiKpA86V3y9f1GHpjXPXxXx33c3ffrEEyG8Y0GEclAlq%2BkYYdoPnufg27HX468MgqB4zHpf6nIv9cM3fZqBQc%2BmH6M3NCQm0DhBlR4cdRCur0e1q15b6ASB71e2a8e5ebEWqE%2BmbKhUL4z51XTrZsy0zyl%2Brt4gGVaxF70vRV3lZ0nXt%2B%2BJv44X%2B8ReHGhN6LvuaS%2BdR70Ba9FHbYMzJqNxfEFc99KrYkBaOSTsdezRZThfR%2BY%2F9XOEnpvqQZlax6xODS75jjPaMa8Ko5P0mGdY%2BtjbyP%2BB1IjqcDFubfL%2BNuhrYzmw9lmOrirRVdHTmm5Smbfsz80VJPNaaK1HR%2BmkhRNsgqR4J0TtBjLgE8V6OPuLNPJ0nnNa8nJuWDoJghKLr2EqD3znyEjMWOfr0%2F25%2BU6kPOvB%2FCN6B09soKcmYuSdm%2BaZM%2BORVj10DVnpU%2FZqN0wuDQUZdQeYozuY2lMyUSO1sVFb1q2FiaG2TVr%2BUMU6qsEIIA1HxfDvsDZvftgGA2%2FhamOlKubIywmfVuiitou654pGwPCA0%2FXDF%2B9L90UbAbd4KhfGFg0xHW6wiNyUBu7oSTCI74q%2BUQ3THRmUZ9EwoP2IzgY6pgEMHvK%2BaDNTUMZk44SzK0kx7%2BDfvyPsGz%2BKpclsVvqDRUvXaVJtoYfHlEDquQpYN6BxcskAkqO9mHckqTWudeqCm2q5zoTS%2Bq6LXVPB2LerTw1E5QfVg2NGOcYnzKj05U1spzEjlNnlT39pvkQ6pP2PuOEsQ1oO%2BLhflfEqSsvqhv1lpueyqWgxR3FZ1WUSCOx7b58iFvD0%2B%2B2FC16SVa3XHVH33lr3&X-Amz-Signature=9ea143bf837db89c7aaa6b504f696e5ee98d742d9cd31c240023a9f6e7d6feff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTX623MN%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2FUMVnv%2FXAm5RuNwrao4DSufZrmKed3UeCA%2BBX7Ld%2FLQIhAJW%2F8qYBMslgedJ160TtotikgPTUW9Vg%2FW1rk6DLvsk5KogECJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwZam9mghY0TkEha20q3APWYhKREyuivaOmk8Q07QNo%2FTQYu8HwuuDCYuvjNm2fgKCpcf%2BgQR%2BeXOU9wZIDP02epyobSxcK9VurB0suk6atZxKjoJnxdUSvzG5E6C4uz3Ur3gHVDLV6Crxdr8uuX8%2BK05dLMdJuoyAgHEbB9Oi%2F%2Bb2OSsqrD5Lm8M1pilj2ha5H71Ues%2BvxGyUH0Qc4EUj0zsNQSbr8Z75K%2B0DwtW1fyjNUyllckjMycIcO1U5N1lNmhmYT2YTsUE4Q3C%2BV4dfiGQ%2F%2FhMm6wPt9mw8LvODFaR%2Byw2%2FupSe5NJtbm95pM4tEVMcgtH0qVX8SklaGqZpZcEbBHACzZEiIvOtD4FujXeFtLai8acDGt2Ps%2BYbn%2FyroKnojm%2Fiw5HHfLjfWXYGDrUySouCkY%2FrZI3u%2BeBq4uhHz7yNM0%2BsV67Bi3y2wZVmnIah3suVbGA9lGz7RIFTyPJo11AkeU4RFXa667%2FHzTR6PFVaYpLUm8huEv105nO%2BLUIGEPUUg2hzzbwBQZl12crpm6r38pjdHkizLfUBHkwPS4lS08pfTUhyqeekeHnFmrVnV53HeUz%2FRKuOMhL79nqHdyEiX8RuUaflm6djTzwAsWYpLHS5i%2FFf9JNPL0ySsaAIrAVgiU%2Ftb0zCa%2F4jOBjqkAcfU3jYnelUtTDxEH8oqmFHiFcF4c0Fl1mc4UjrJ3OjB6mPLDMFtN7STS0P7buscKj%2FWEOrLL%2BQFFnpjBYglk3MunGN23g9ygEMxe%2FSAk9wBWNv5PsUi5SCbr50XHChYpKVbHVXyywzED%2F2xeVF680z4ajEYDk74gJH5AEXqWRykhN3IW7zSUIpFwM3%2F7lzQ3gtyagJIVDc%2FuMz6JcMx7I4LX%2FoX&X-Amz-Signature=2fd16a0ab8d2d384aeb1b45b4760efd04ed00e3b0cd36f4289196c86db1be159&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663INI5UDN%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB8taRJBkKB4IQybrl7UHOArN41q%2FeRtH1XZqn99u5jiAiA%2B6tVj5B1pYmg%2FAKwGIIx7rm4yUhpZkOfJ1KgEcm%2FvlSqIBAiR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMB4MGjV0ck%2F%2FjBpGcKtwDO62DwRGxl5tR5%2Bqegqa5hMrsCVn%2FR6%2FYyigL9JnBdDF7Wv53SBplPi%2BpT%2F0JMa07T9oD8byj5ponGssCfpSBjFf41Ht5%2BiH4ZZkaNOZlLywkeCzXISrghqILD6PYhFCyfY%2BFnsyjDZp7cevtAPZULpIcKe5xhfYHtkNXCfjfRLEHY67eYa5pTUwUP3QlZiWgmqUDIiJHWR%2BHNjilpBndG80J89QjRnIFwdLBDRm0HQGoyUD3b3Tlt%2Fve47oEN98ku6CLaXyCYertoi54790g7x5%2FsjR%2BB0T0sNAYVaJlypJepMkJd5nrV06QjMujTeTuYp6cILa0AJVHfV940BvPAOKnw8byqjLyjLNI2PhaHsTPrms52VVx3zRYX5eY%2BRTfWJt2%2FXEzbBX%2B%2Bt%2FpbiRZUVqRDsB8r%2FDMvTRbwTovAz5wGdoD6sUiHeaDoAxc3C8uijUp7CPsboeiu0HE0Nm0nAD2tdNWIzURjRR5XDJa5mmdpqm%2FQKoF7qKVt4IHxN%2Fmhwlj7Kk1W7kZbWQUKp5iEsQky%2Bc7Czi8z6d1NOKyOJ%2F3AfGzPGEcIHAowP3M7Q2UKZKQaibcoZYtmPIP6toW2Fe5mYJiyaoHCT7WVJypIcvRJSDTgDX3BLLT65ow%2F%2F2IzgY6pgHdfOYZWQPkfy06n6Rx5yTQ%2BRtsn11Z7Gs7uCvLpVT2SgGJwl6UWY3k%2FEXZfO5eI90eeyaig8M8GDBkwPMT1CiVS4tjaJ3INSgZ5U4AAi0wDHoG89aw3NbwJL00RkwPvcIDBGkZajHh9E9MHtYF%2FAkaOzisE6AbGmoN9L38kfjEcD%2BYhNzvY5ZahNwrB5Y5%2BfV1LJjcADe%2FEksbcDbeMGh8sMuz20Vw&X-Amz-Signature=a3d724f1d40d06d6ba2834bfc4b3945de05fb0fec49f0b1812754a7441d42ecd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663INI5UDN%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB8taRJBkKB4IQybrl7UHOArN41q%2FeRtH1XZqn99u5jiAiA%2B6tVj5B1pYmg%2FAKwGIIx7rm4yUhpZkOfJ1KgEcm%2FvlSqIBAiR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMB4MGjV0ck%2F%2FjBpGcKtwDO62DwRGxl5tR5%2Bqegqa5hMrsCVn%2FR6%2FYyigL9JnBdDF7Wv53SBplPi%2BpT%2F0JMa07T9oD8byj5ponGssCfpSBjFf41Ht5%2BiH4ZZkaNOZlLywkeCzXISrghqILD6PYhFCyfY%2BFnsyjDZp7cevtAPZULpIcKe5xhfYHtkNXCfjfRLEHY67eYa5pTUwUP3QlZiWgmqUDIiJHWR%2BHNjilpBndG80J89QjRnIFwdLBDRm0HQGoyUD3b3Tlt%2Fve47oEN98ku6CLaXyCYertoi54790g7x5%2FsjR%2BB0T0sNAYVaJlypJepMkJd5nrV06QjMujTeTuYp6cILa0AJVHfV940BvPAOKnw8byqjLyjLNI2PhaHsTPrms52VVx3zRYX5eY%2BRTfWJt2%2FXEzbBX%2B%2Bt%2FpbiRZUVqRDsB8r%2FDMvTRbwTovAz5wGdoD6sUiHeaDoAxc3C8uijUp7CPsboeiu0HE0Nm0nAD2tdNWIzURjRR5XDJa5mmdpqm%2FQKoF7qKVt4IHxN%2Fmhwlj7Kk1W7kZbWQUKp5iEsQky%2Bc7Czi8z6d1NOKyOJ%2F3AfGzPGEcIHAowP3M7Q2UKZKQaibcoZYtmPIP6toW2Fe5mYJiyaoHCT7WVJypIcvRJSDTgDX3BLLT65ow%2F%2F2IzgY6pgHdfOYZWQPkfy06n6Rx5yTQ%2BRtsn11Z7Gs7uCvLpVT2SgGJwl6UWY3k%2FEXZfO5eI90eeyaig8M8GDBkwPMT1CiVS4tjaJ3INSgZ5U4AAi0wDHoG89aw3NbwJL00RkwPvcIDBGkZajHh9E9MHtYF%2FAkaOzisE6AbGmoN9L38kfjEcD%2BYhNzvY5ZahNwrB5Y5%2BfV1LJjcADe%2FEksbcDbeMGh8sMuz20Vw&X-Amz-Signature=a3d724f1d40d06d6ba2834bfc4b3945de05fb0fec49f0b1812754a7441d42ecd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6TLWREO%2F20260324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260324T074421Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDU9vRBKB4qsxmKrcIktVjWJZS0vJ3L1ag%2ByUy3LwwktQIhAOif0UlvxalfNpuyi2uCfOTfX%2BJwPqr8TLwn5x8tQuz7KogECJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz2KsbcZ6f0KPbbdDIq3ANu1O%2FZPHz0q5alzkVHjm2V9g74%2BBI0UCAlxMqFQh%2BKJBQMXFYvXfIVEW%2Bgm8Re5WwTFTElk%2F2mKMAdj6OhJAyuOt03v81WI4%2B%2FGOfTcJ%2FpFr%2FAB5x427xiHlZnOWFNlaWHZBZUhIVHUvts8AyzRPoOVO45XDMnioqUvWZcbC2fjMqFtmPDz58xhQcNtoYe76VfbgLw%2FzVIXPVOaTW0KbLM2I9gQkJqHm2q%2F0UwZpvoAkstQae%2FnMh2NjwdNwGIGnYcTPpjpUND%2By3Ye1EAiLAEHP2eqq1pqOf%2F%2FYEViNXiZoJHCFsaYL9HHP5zNgdDRVz3LJ0COWZ4MTCkbhe37RQWp%2FdbFhxaUsuJjgMNB%2Fh3SLNZa0Sm%2F%2Fq41uOUjnIMLMJEcbuXMGRNSQL%2FQsRGv1RB6F9Vfgs1DHKBTZIC1Pg7CjJYNv19XZuHQlRscEEIRp2pov9UjQKJKQoG0LoH9ciWq8ImOLiBUlXmMxIysha4HCAJTUoKPT%2By0bPDLbgqrZ3yKOT0Herj49GyHti%2FhmEXmtH%2Fer7luKW%2BeCjp2MnHnVaOnP2I%2BSXJMzx8ijQMvvQgogY1sqPh2fdiL%2F1vt4LLYAlIC%2B3obfdUy%2FQLUAfa%2F0%2FdRgl6Jv2fKr0l9zCF%2F4jOBjqkASFxr%2Bh80vZBIOohUvqXGHE8vJSma9EsZTgQQg%2FKsQp2WDDh%2FV4mYmLT1lbW%2Fp%2BxgtjcOUR%2FPCG5QDANmPQ4kfp%2Fy6KgBm366EHxDPrPbrmLbz1ZDp63r06hX2gd50qZtadma5erYeN3KHqpqiFbPpR9mhmqphiH7d6dPVxqQvvWpxk4jusPl644D3jTTfcC1fpG6YHSWdOeDnY5Dr%2B3iDM93Bdd&X-Amz-Signature=bdb1b2e6645bbb0bb4eab9904974ebd577ec43f4e03b0048aa3bffb1e953cbe2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

