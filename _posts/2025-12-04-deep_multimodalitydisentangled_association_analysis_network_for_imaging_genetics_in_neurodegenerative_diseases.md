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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSRSSG6T%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIEHPFy5Hcmp7YLH5gxSs%2BpDrg9Rlg3q9j1WAroUhP88iAiBAUFpr%2FLAcUxKWFBfsBmX3fvuC0wWULdyLcgI1nQf%2FZSqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKrT%2BM%2Bt1z%2Fg2RbWkKtwD8nQ2qW4B9QP%2FXeGRmHcht5Ptq%2BF3j6m4%2FPyDLDDwMbDoJOI5Qu3UyLYk%2BBZ37QNjcdWjJlq7qUJhCXS%2Fai3bJtT8vBsJN8Ghp0%2FG2uP2J7LbkkG%2BwCMZS2oYNzEX0c3rnfgu7iwHfqFb%2BNjeEmwdjRX84j90gv93IxrU9nAvzvC15es0VDd512RRAmS04Yh8UDk6Ms1qAaDgc3h8nhEnDVD4v%2FasRhAJCpBOHjZ%2B5PanwWhACnilTiamP3BUF4AK%2FGp8ckzL5%2BbyIyM7604Rwi6v17cFx5Kpm8RICX%2BFZKue5t53HFFI2apH3QD906yWkOBFm1yaHk8VJvOkkzd6t5Y8msHiTkF2un6IGDLZUmqTWLSUVpweC%2BpwikmoO4exqLT1WlF%2F%2FAL%2BpJX4aC7hor3W9fx6kjXJHh59Yf0FCLKxNOyXOWtOQhheZTbr4stvl6XNDkmsftqY6Kcf0zhg4c6BOi0TEbn50dmEVC3uqhUOdGvqtVvp4o%2B1wD5%2Fd0F%2FV5E20iF8f9hYCMz7kV4B18Q6x9STrBiMI180ghmWCfcbSw9ALKhN6eJh98mdHnqysqiqwICmykyfLj8K3vs7IUsXb0%2B8Mcp5qat71FUikjKsVmEXELXzmykwhA8wrY3UzgY6pgFOQwiP4ixmZdw1I4ciYHnQX635xvqw1Nh9nGtB1DAGOiQusb9uejsSoTmx0XEfi%2Ff2BBSCZFUZfe3dY1sJcYi4sGTHEbDhC3OTZFvFti6Z8Yp2OIhAEbs%2BaUkwYNLclwzRd3IRjq52StSAI6ZdQRz4QRLfZfIt1icSXM6qhmxKXiEvpxfBouohYYTAnKvxGK5qBThIUUpR3UzGH%2Bp%2Fd9eJXCy82ppl&X-Amz-Signature=519f2580a46fd90f03b22ed2e0dba89dcde9daa600586923b2bb42d469fe025b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSRSSG6T%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIEHPFy5Hcmp7YLH5gxSs%2BpDrg9Rlg3q9j1WAroUhP88iAiBAUFpr%2FLAcUxKWFBfsBmX3fvuC0wWULdyLcgI1nQf%2FZSqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKrT%2BM%2Bt1z%2Fg2RbWkKtwD8nQ2qW4B9QP%2FXeGRmHcht5Ptq%2BF3j6m4%2FPyDLDDwMbDoJOI5Qu3UyLYk%2BBZ37QNjcdWjJlq7qUJhCXS%2Fai3bJtT8vBsJN8Ghp0%2FG2uP2J7LbkkG%2BwCMZS2oYNzEX0c3rnfgu7iwHfqFb%2BNjeEmwdjRX84j90gv93IxrU9nAvzvC15es0VDd512RRAmS04Yh8UDk6Ms1qAaDgc3h8nhEnDVD4v%2FasRhAJCpBOHjZ%2B5PanwWhACnilTiamP3BUF4AK%2FGp8ckzL5%2BbyIyM7604Rwi6v17cFx5Kpm8RICX%2BFZKue5t53HFFI2apH3QD906yWkOBFm1yaHk8VJvOkkzd6t5Y8msHiTkF2un6IGDLZUmqTWLSUVpweC%2BpwikmoO4exqLT1WlF%2F%2FAL%2BpJX4aC7hor3W9fx6kjXJHh59Yf0FCLKxNOyXOWtOQhheZTbr4stvl6XNDkmsftqY6Kcf0zhg4c6BOi0TEbn50dmEVC3uqhUOdGvqtVvp4o%2B1wD5%2Fd0F%2FV5E20iF8f9hYCMz7kV4B18Q6x9STrBiMI180ghmWCfcbSw9ALKhN6eJh98mdHnqysqiqwICmykyfLj8K3vs7IUsXb0%2B8Mcp5qat71FUikjKsVmEXELXzmykwhA8wrY3UzgY6pgFOQwiP4ixmZdw1I4ciYHnQX635xvqw1Nh9nGtB1DAGOiQusb9uejsSoTmx0XEfi%2Ff2BBSCZFUZfe3dY1sJcYi4sGTHEbDhC3OTZFvFti6Z8Yp2OIhAEbs%2BaUkwYNLclwzRd3IRjq52StSAI6ZdQRz4QRLfZfIt1icSXM6qhmxKXiEvpxfBouohYYTAnKvxGK5qBThIUUpR3UzGH%2Bp%2Fd9eJXCy82ppl&X-Amz-Signature=519f2580a46fd90f03b22ed2e0dba89dcde9daa600586923b2bb42d469fe025b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S76NNBCD%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174450Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJFMEMCIECM%2BZjYEWaXewfirdWC9Z7HeBezrobqvGTgLM9pIT6%2BAh8n1%2FAXcXKbRkQJywUjw%2BwY%2BFq10rWFw70vMmH%2FV3cyKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz1EdmdW5%2FmTRlcLqQq3AMCUO%2BpJs786Iehxxv9txCwKwMbGIkOFdhc2KgEA%2BE9m0g1KYoynMlZHDNdZx8FMVZVDT2NKq4g6lorToUWFx9SqmyrxJweb7FBObhuCKJIwz1LGodFUtRgMVXfh8qihnGmwraJzbciOyvhferd1rpx943WjqyGPrZgrZjYIeyyqSLXL2lacbc1WW4wgUcO354XbrtUm7y%2BavaVSfZNvrhSW8r%2BcNTkL8wAC4vQhNpz49TNtYAqhO%2BlNgYzlGBvlmHThUtr0p5ffYKYrzwPDS72btvTewD2WyXDefsNlKloUl6R9tInL611rAImyaDQGmOWTehw5naIU8EWEa3AjCWfGL2ciBKsvcE2Dbiwu%2BdyMn%2FL0hBh3%2BNp%2BeOb2Lbk5cK%2BflrTuXRHrKlwghpoUxizywGZW%2BZXOkrbhon2UzfQ1WS9OgWCQdsoOihia5GPaWXb8jjHRwz9%2BkmjadAnDPbdYFeZsdrEjX9JS%2BpGhH5L%2B%2Fz%2FMibz68Kd4cLGdOQIbG%2BHFD5RTC5HcTCESGBQVwqFaJoYRSfCTp4xSDyoOhC%2FNrGsLizj60yLyyfOKg0S8MD1k4oeEncyRDXt%2Bk%2BSTJIOlW6RMURS%2Blk34yPrI6Wl0%2BMIOjykaM8tyamQFjCfjNTOBjqnAUj1oOeo%2BNnzfaRH5ftS7Fk9GQgyztYl%2Bq9BM3DlyW5Bw85xdD5GQYCdbz3p8GOODUZnqekBl9LwD2MWy5HRTfUdMbJxYhZ3cqhfktm7seWdYk8CqNc2LY0WfbFgsgKqPSaGujZzSXPfJvy4aMsL2S5d4p4tzeslyuAEcFEt6xj5rgVAowKTfaGb%2F8%2FEXk9eLmPh0wZiYkVD3HtgSgUqtUsyqut0WpDX&X-Amz-Signature=8d9905badc3466d8288dcaba5d3a2e53a0ca9eaccf146835ce81b44d693fcf25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLAT5YOH%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCuFzCAwmy2hRmDGMfIq%2BQcDEOuoThwQluBUNqCfrhxJQIgN6pGOg1IpKw4pESc4INZHhxNVi5SDV163B3Ef0n95i4qiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHSWpk3KrtzfJ8NjoyrcAycJD1esBVFAF9EZtbR3DchGdISkmNmG6ZPbkuwi%2B7KTqy7aCsQeSxSCh2912hrRgGUqr65Q09P%2B4%2FWANsiNt6XBKOrbKK1yVwv1qUl4kRuWkLrToS6MUxy7H3%2FW2HamPGKH5hNNbMAholYF1XDnxjq0tTjHU2QL0uE5Fl67EXtCHji7vnMvgxny6YNEpL%2Ba7S24qo03T3pdY7P0CNiOXaVhk9gKmpXf%2B%2FlsRMirfKXDp2pjfhgDLLlysvFx4Gn7c05kRk2yu4G%2FVoabQklJlc7zujKwI4BJ5GtABYvIDEfPIFU7N43YDXwZlggrBPYL0TApVDK2Z31ldEPOB4YmhVDz7nCC9wX%2Bzg2UW2S%2BMV9O%2FlnerF0RbhUfjORbswb60zRlv9615k%2Fl3cAMmkkbim768ybk%2B1jf3CfexWrYq2L0ZasPJbjwSoU87Gj52tmwua5mfeR%2FsfX0AZ8JaG6ZQXy4Hn3SEJBlg3tgvhOa1OzPGok2H7GJxU6gAaQbxm65mJaaDVjlL5QJpY3zijmue0CXCmcs8kqHHxlyaD0EOCt4Q%2B8HfvHXU4dzFZ1XH1NsW7zrNY2yao6KWlS5wk8QHNd0uPEA39luxj1m9fFl1%2BVhvByVntTDaq9RAEB2MLCM1M4GOqUB6Q1w1MPfddcuOUqn2A8gqOJYMeiEPY6bObHjXWuXz2PtYlxxb51BoIyrHBf54EhATlprakiwpapDpSEvzevgFB%2BlgRAmMQ0uvFhCs5bNje%2FD3uGNNdId0oAN33eb6HumzSZnPn3Con4%2BVlqJK9vBLMFmtWKRv1KIXjmXL6ppR5o%2BzBsT9L5QERaR%2Fq%2Fc1wFag%2BFRDodbXzi2EN3sftS%2F68xFHJlX&X-Amz-Signature=b672baa36142c011f4ae7c056556f9c5ce9f30f7eb59ab56aa3f8438d5a501d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLAT5YOH%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCuFzCAwmy2hRmDGMfIq%2BQcDEOuoThwQluBUNqCfrhxJQIgN6pGOg1IpKw4pESc4INZHhxNVi5SDV163B3Ef0n95i4qiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHSWpk3KrtzfJ8NjoyrcAycJD1esBVFAF9EZtbR3DchGdISkmNmG6ZPbkuwi%2B7KTqy7aCsQeSxSCh2912hrRgGUqr65Q09P%2B4%2FWANsiNt6XBKOrbKK1yVwv1qUl4kRuWkLrToS6MUxy7H3%2FW2HamPGKH5hNNbMAholYF1XDnxjq0tTjHU2QL0uE5Fl67EXtCHji7vnMvgxny6YNEpL%2Ba7S24qo03T3pdY7P0CNiOXaVhk9gKmpXf%2B%2FlsRMirfKXDp2pjfhgDLLlysvFx4Gn7c05kRk2yu4G%2FVoabQklJlc7zujKwI4BJ5GtABYvIDEfPIFU7N43YDXwZlggrBPYL0TApVDK2Z31ldEPOB4YmhVDz7nCC9wX%2Bzg2UW2S%2BMV9O%2FlnerF0RbhUfjORbswb60zRlv9615k%2Fl3cAMmkkbim768ybk%2B1jf3CfexWrYq2L0ZasPJbjwSoU87Gj52tmwua5mfeR%2FsfX0AZ8JaG6ZQXy4Hn3SEJBlg3tgvhOa1OzPGok2H7GJxU6gAaQbxm65mJaaDVjlL5QJpY3zijmue0CXCmcs8kqHHxlyaD0EOCt4Q%2B8HfvHXU4dzFZ1XH1NsW7zrNY2yao6KWlS5wk8QHNd0uPEA39luxj1m9fFl1%2BVhvByVntTDaq9RAEB2MLCM1M4GOqUB6Q1w1MPfddcuOUqn2A8gqOJYMeiEPY6bObHjXWuXz2PtYlxxb51BoIyrHBf54EhATlprakiwpapDpSEvzevgFB%2BlgRAmMQ0uvFhCs5bNje%2FD3uGNNdId0oAN33eb6HumzSZnPn3Con4%2BVlqJK9vBLMFmtWKRv1KIXjmXL6ppR5o%2BzBsT9L5QERaR%2Fq%2Fc1wFag%2BFRDodbXzi2EN3sftS%2F68xFHJlX&X-Amz-Signature=f403caf0892167a44aa596c3721915da164d42345be9ff9d4d7363daed87488b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JRGNLQ4%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIHOAgxVT18ThVNvcnIv3e04wk%2FrHUvWUu0BeD6vKloisAiBEuuw7Pg%2FNT3F3EPcI1Xz2P0STKStwx9Q7doF1x5uJUSqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMw3cHR2ncHYbGX77sKtwD4N6AqvCN%2BaN5FeZ%2BYgWBrnKZ2zEV%2FYvkbvxi9tjtfw68P6S0T69hZ1QHKSBqz9G5TO%2FmmVrGetktHCziDXmzViYibq3z3P%2B%2BdaO61PMmBDekxE3FQufIwwylALY0UQ7t5tL1E2BPXpBbbXD0FZSr35uAfU7jo656xZ5u9E6o1E8%2BZu1wc6LVaV7EBYaxWZHc92u0YYHIp8zSm3R4vz7OGdfe4nIl91%2BEuXEjm%2Fb6omw4Lfpnik3iKx89U21FLBZ5VZ%2FPOw8cPFlu4Er7hylrDBe76MAYrKOwqFG9gfu%2Foibd3Ly3CvGKdKXh90pAe7r5potZsXv6XFbQneVah77aEOrpCBGjd46mO%2BQAMl7KNJxYIcHzXnYjH8ToZnaD08ac0pVWWkJOIcHmerKGb1hrv5LZDotWXe9pTQJ7UuQ58U1D5GBTORyM5FN82NIGEP6jW%2Fy%2B4T9B1koimdu9D5wcXzM04ICVeyT%2FH8cTAybRtrjvBPdW9zpbQAFQb79avZc9nwy6ZQARy2vX5SU5dzmhCohah56WPYHFQf2Mq5s8Rr9oKSCy4pVuXHtGRvc0fRDjKpcXrQ8iiaah3Bme%2BiLJiXA6lafwGwSccY7v0vfXNLAW%2Bhv4GcmUuI9dTaQwqY3UzgY6pgGqZtapAkmL7Npc9nZaZIG2fV%2FiNezbE7ivpGpAa1ub83R4ARtP%2Fep5%2Bu%2B%2FZ70t%2B2dYrV97vthdf1skziZeUd1GNrHieGLdLhBM0w15RLec4nCEpzAgobLWq9fJ6MB54ERSnzgaaeyzSbVXLRqgAZDQ%2FcUtHCg4OpVY73Gh1Iw7ysgj0cjjfzKCg0Ap%2FurpIhPVxavvlzjUT5yWnuDo2ofY%2BniXZw2e&X-Amz-Signature=2c5a7f91db6532c529323579438e9ed8f8342d64fbd8e6aa466ffcf89497142b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3J6EAZO%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174452Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIDWLSigI5zBqKSAg4yMuWmwlpPJgNlcRbwVSICsxiBR5AiBe9e4YmvaxFoTdHSd6Ox5uWF9IvqfblBDQjxKeSY98tyqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM7QOF5PmLrXw4QWuOKtwDPRjw0cGnO4W9utJt5YnIORLEPwb%2FmrH0hzURM0gFRMbpmPlJtqZw4ASrOYj0p6NPGfp3Mxh0gEDz3UDgCW13d2RmGN8pZJgI9I3%2Bc17BaUZd5cYFTDDS26YPBC%2BOJuvnQdfbe4NUxU8%2F8O1aW1N5Tkts%2FsxVEf2rSE7ExUW7cEgFrfiwY38LJqwpvRrIPfrm%2BMO78ChSysnwBWmgqunbO%2FaKaSUOX07o9VdrRdCt4umOKTSGE5qKJUAd6qAKtCIN%2FBKgWDRAlIT09oqLP%2BZw1a4%2FKleI2%2BG3N9MPfwIbmTy84z186RO6xS34XE2elD%2FA57UixKvVYpEbAkWla7ifoGYnp65SKtYfG0jAM5WlN8Y7Cip1OnonMO96Gr%2FNbsPB0CEqhcGB%2Fv4bJvARjkdu8sqGk06E5b74uXywO%2BK54FS50qbDlToducmdAeNDmBZBAh0zspqDivdeCJ%2Fs%2F1Tdu764QYtra9cFDHjmK4TWPWJ%2FDTO5k7d50iQgKtHI0q5WWrWTqYLFnrywMREalZ8e%2Bhr4MI1reHkeIBJSrbdhBJFJ6CIvjQ5KrIAoKzJ9U%2FyQX6eOY6CjBH7Gs2wd%2BUGLghTmgpqKQf%2BJqDiR75za3%2Bo10S76qffIXBw3gxUwwIzUzgY6pgH0JIeVqkWPOG0tIsr0isHrWOrn3Ip2w8G7Tc2wW14lUpwo0PAskeF1NFQdRQBAbY%2Bcx7JVN1FJXF4lChLkLyxuDfZZM4JvvRSICoFWfFtTho1LxnrXO08%2BRaoTNUQr489YJ992Cek2tygqQ6p%2BzLpJJqoJrKOng9Z0ZGcpWYKo6jnkPZ8jMbWix9kDGJnF3gt9eCgT2GFl4Wbx2jbWOONA3XTMdpgR&X-Amz-Signature=8eadee93f7dfb73be43213449e2aaca57b2e5b93410dc3e0b4083a0a30729dc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652KWA2NY%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174454Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIDBcEukItechWuYP1wyGG53iG2tgfZdUWa2m22S7mwxMAiAyvHRjKau%2BI3D45iNO1mcrKWHNJQAsaUZafeyH8u2PoiqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMFC9BjjOF4rRzrSSfKtwD1OASON3Yq1yIrwmxJe2NbH4lAxHsffbHsUdWxXmQH2RZJ6HOkZcp1WlIkWIuhaohxX6oGHi8yHO4UGpTLnnBvoQuM59AzyOgxHVd2nKQHamGbONOPsrTa05G5UsLdQ%2BmHuozN4bqTVDsr9q7b8RLZI8KqC67DXtQSLelNY4vONNTLx%2BdESQEvf4vxqvej4MquWl86F5MM3Intdj2eu%2Bv0FJDCeK4TTP78VotnvlfClcA9M4wEjLIntq59rh5KmvqTnIyOGrbN6zSudFjvpJmBPZ%2B7hEciT0M9r8gBcj69%2BsibU1Mtxtyc%2BvnB8N%2BOu%2FyKLLtiDevgG4a3WvRkdQuMJxFhg%2Biz9lAlSDNn73y9KXxEn1ZNJ6N8TJTjxAN56y89BghzW5H51a7%2FBWZDaDiOzG90l1s6xIk2wnNDSxqFl%2Fd5Sva6lrzCspb46Qf7%2FaZhVJOsZUyyC6i3g%2FC5e8SgBuujPeVVA%2BbeV87i43n90kDzj%2FgaY29O0fRGZDej16QV5vuFrZS9mESAvjY6KuGlMFTwkXsr0ocrk%2BVe3HCI4y8ETA0uoKPvV7hZj9P318sPAg182tIKKIANHkaK%2BNh%2FWJm85S9wIw1KRlnzvoaiju5xuE7wDuBBWKtVugwt47UzgY6pgEwsz14wjIoMDNye5k86Kt5JKnR57Sw7vA0pI%2Bp43xk0yEc%2BKE4yp32xnXS8Th%2BCg0pOSUcfW8IS%2FVnkNXm4p%2FT8YzniHuxFsrjKSQRu8aFx5PeE0%2Bbl%2Bdsh28u12K%2BITDBzMKm%2F3%2FXuC7R0%2FiJldOsp65vUluL9cdf%2Fc%2FMFZWC1bzRoQdq3wHrwiu1zCfn6M9AaBOBoM%2FpmjTyn6WFPjZfYdybIpiK&X-Amz-Signature=c65a1824e9d753d3e9f6509d013c518f8ffa7ab5f1c9f97db456d936905c915d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XB4VNPIS%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCNpklrrj5UEWAad9sxcoEQsB1Rl68WrkZGWoekqdhOiwIgcydWNrCN3ixF3xNvt0RP6R%2FSy%2BwkRWGWHt4CajWk1BwqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHu%2FqGFJjdgQQhWQWyrcA5sTbEIRcYfMU%2BW0dC1wrBCd6dSRvYrHruPd9YXq0ZQCI7WTmsfuq09mgcNXSv9WxGtB%2FkJ5vOLKiLHSFx%2B6wMu79wF7UJ27Cs2pNAfkAIP1YwdoL47hXjNwq35l4R5z%2BwqXw6zDFuskma%2FMaVXPEXw9AwoJbN6sXMO45nLzhM24vBNzZnSV6BKrYYFZC%2FG6xLpk2IyfnC9udDoKk%2B%2FHct4rksvpx1aVQRKh9xucaSp7OCnH2fPzhxsSqteyNVl08iaFYFCucDOJ0Usrk72p9imIaUwl5DxCi8AC2jWQA95I%2B%2Bbkj96xrDyf2YOxqzaFcML2mIPPUpOUCEdJgzfCeDuuBpBuofl5S0xcNuXJBO%2BF%2FUWa%2F6MZmhbcp5PiqOLrJLZO%2BPOYVYQQxGb%2Bf2wFpKfkKT5rxzyMjIPAhpw0g1YJA8vcgIMgSjrFF1Fbke5gJ3aU5YmmaeFHnn1rZzr82HeyZyJbnVinRgy%2BPMHtC13nrT90j8sgTMqjyvakpz2PL%2F2nhUmxi3Ee9rAOGxz%2Fq8OQEDoQ6j7QYEy%2B1cKKdJtJHO0NxCR0fmlAUsq134SbuRgW1rMp1KuDtEbbbJyL3C1ws2EppMHXg%2Fb6LrYwee0%2Fc15A8w50m0IoInf8MNmL1M4GOqUBb21JTUDr85YouZ2CsF2n04lz0G5HUr65hXiTMC8T8ABKiKY850cWbrpGZIrovk81qJ0Qo%2BJYOeen9UMqsHUWpL5%2BbO6ElFDqR%2FO9ukgF4ea5Rd8YmDYtCvks6%2FwuQ1VktycZKo399m832M15%2BPaQfTDM7FMUe4DBOK%2FRyf5N0dmQx1V9YrRPqcI7MxKatlL8b6TPnTQZmEmzpSjvVmabI4UXLxSz&X-Amz-Signature=2be7aba79b6c6d3f93281c74190e044ae8fdc8795db5dbf0a262de29dccf2dda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XB4VNPIS%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174455Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCNpklrrj5UEWAad9sxcoEQsB1Rl68WrkZGWoekqdhOiwIgcydWNrCN3ixF3xNvt0RP6R%2FSy%2BwkRWGWHt4CajWk1BwqiAQI5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHu%2FqGFJjdgQQhWQWyrcA5sTbEIRcYfMU%2BW0dC1wrBCd6dSRvYrHruPd9YXq0ZQCI7WTmsfuq09mgcNXSv9WxGtB%2FkJ5vOLKiLHSFx%2B6wMu79wF7UJ27Cs2pNAfkAIP1YwdoL47hXjNwq35l4R5z%2BwqXw6zDFuskma%2FMaVXPEXw9AwoJbN6sXMO45nLzhM24vBNzZnSV6BKrYYFZC%2FG6xLpk2IyfnC9udDoKk%2B%2FHct4rksvpx1aVQRKh9xucaSp7OCnH2fPzhxsSqteyNVl08iaFYFCucDOJ0Usrk72p9imIaUwl5DxCi8AC2jWQA95I%2B%2Bbkj96xrDyf2YOxqzaFcML2mIPPUpOUCEdJgzfCeDuuBpBuofl5S0xcNuXJBO%2BF%2FUWa%2F6MZmhbcp5PiqOLrJLZO%2BPOYVYQQxGb%2Bf2wFpKfkKT5rxzyMjIPAhpw0g1YJA8vcgIMgSjrFF1Fbke5gJ3aU5YmmaeFHnn1rZzr82HeyZyJbnVinRgy%2BPMHtC13nrT90j8sgTMqjyvakpz2PL%2F2nhUmxi3Ee9rAOGxz%2Fq8OQEDoQ6j7QYEy%2B1cKKdJtJHO0NxCR0fmlAUsq134SbuRgW1rMp1KuDtEbbbJyL3C1ws2EppMHXg%2Fb6LrYwee0%2Fc15A8w50m0IoInf8MNmL1M4GOqUBb21JTUDr85YouZ2CsF2n04lz0G5HUr65hXiTMC8T8ABKiKY850cWbrpGZIrovk81qJ0Qo%2BJYOeen9UMqsHUWpL5%2BbO6ElFDqR%2FO9ukgF4ea5Rd8YmDYtCvks6%2FwuQ1VktycZKo399m832M15%2BPaQfTDM7FMUe4DBOK%2FRyf5N0dmQx1V9YrRPqcI7MxKatlL8b6TPnTQZmEmzpSjvVmabI4UXLxSz&X-Amz-Signature=b8614be7c61885374f592fd0a6985ec3cebe1709b4cf96bb1ae20528306ad3c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZVMCQIU%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIECUsN42r0MZFTSzelUOoOM%2BWuz01cf3T5gx4LZsPaxOAiEA5emj5QfWx%2Fh1IJPgX3%2BPgD7flw7j3dVGqTrmBpu1iPQqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN6aSfRK8XYh9kt%2B3yrcAw3OdHUFJZ1f1JV2pWTxjt9uGAEvrrUVUda52YvsomaCDGAeAP7JWLbWl7qtYAC64zdRWbeoI4oWRgWqAv72%2B6t9vhfV2kCduQuR7cYfGlwu05ADD%2B9aDZ7dqT0ZXMLEcZbwwoamiALdAi3pdAfijqjmI0WGb2LZzDiSsvun%2FYRaSyoKkwH6st3Wow8VKJKn7uCGieZU39FWPrriDM7IIzUXovYDcm2LiS57VFnuzYvW1UDXhqjZFsw5sfEDF7yER2F4JKyaxN7Lhw7RkbjKWrK121a7ZHNf0Gc6fJ9fQstRm%2F1lBvKNgxrQZczasEKD32ZaiiveN5yWYA2rMxPsycGhx3n%2BY8vaRgI%2FyvLNFTmP8SsIr%2FqitymElExjBLL0igvzEQJpbcxZDOG4LCHC11m%2Bz8aCH3ZRFZlwsGBcaNTMQ%2BGJTof7tzQjwnLaK2D%2BfHkwHfWE06yfoNP8kgYXW60b7K4XoE6Ihj0QyoFjpidV%2B6D8%2F%2FGQzSgLLtUy1Rd4penYmqJmTU42rlTrbY%2B3HnG7yh%2BXgwvp5QcHPRoZFdaCOBfClFp%2Fbgwmt2ivibDG%2BZX0HouwyW9kkRuRxx1Zgp2GTbSptrZZbJZPHhPPA1eFYXp6eddDdXPSyMXGMJKM1M4GOqUBfXJSCC%2FMbd08i4SYUMs2Nl6wkFTxjUwsifnRkjEoC8NFh8EFIa%2Bbwe%2BW8zrATODen0j4zYYmA0ld6csAnHo%2BwNnZIsxtDVJZeSx%2BCj28R3%2Fk6kixIrAUuY8V0oXvK%2FlsXZkQmQ0YnjlNz3A0bONF3kKinjgEXUuES%2FIMjCa4h6%2FDyfYX7cFY6JWx%2B74%2BjtNSPWw4vHdyogz%2Fp1WTGdKsXf9zfZi7&X-Amz-Signature=91d31005d89a2b7a736efd4f3878551bbace2de81c06e0956a6bf55dcb94175c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV5QPNJD%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQDWwVZr42W%2Fh5Nv4%2BblmoyzrFGsqQU3IU3F05e8B1gD8gIgBK3pZCir0qOZx9ItmnYhPlzH51Ii%2BRd8dg2NhgQd1x4qiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFjKLzZh2YDIj5D6iircA%2BiVYBa0tu8G87d55pTvQ8%2FcHtA5UmCQaq04tiHMfY8%2BC8YLrsmRvY3YXy6K%2Bs9QakgtPs%2Fb6LWe06ftapOSceWkiNkBd3sAhTsa2zVvpFPuGnNlPSAemR6zikTwY3lCq9NwiwS29%2Br172h9eULJoMMMjaqEtBv4oM7xnmvgQ7QEn3C1b3%2Bv9hy3IYOn%2BFPDAyRuuMwGPwcttm0aaT9P36cm8BuA%2FN2LNcVuARZWRYDhRE9d7xO7zCDsvw3QOz73y4DbJ%2BV0pjoqciJoS3abeMlt4pzEFYNgE1guxMRyCPj22ibXwmT%2BKu6XOmDrEvPGB4ZB1Ixo%2BoLvelYZixOc9%2FdWcu9PTVFYGH5z4lsQTk17WGwpndM%2Btl4faSGW06wIqVWP58A3JmCgl1EOfOJsM%2BrmmS1eu0NSR6k9bA3f0z4YnxsRaGtLVTIzihDQT3ZN60WesD8plE6tgO8myQ9Ij5RYDJJZMeMHY1iBGNqvTWVaGBjIbRLG7T7oEcuwYNye%2Bx1VvAgYmTVR2KmwZRczm0DZAa2fZEVPgnGgmMwAUt221IXxIr%2BrWY6AVCvRCTsk3dtvqdA3%2FbfQzX%2BaKaGlzHWwt3lVkmtYoFSB1qEqHWoefkSSTN%2Bd83%2FHAI8kMIuO1M4GOqUBX4jbwkYXChsIsRtcjnX2JgusxgQD9weiTUx0XC4cMZieQySPahk80Sj7DgYHk5zqRLxEWEqSFMKk0deLSSTm92KkovzoiTzLMCEvX11pLSaI%2FUn9oqR2JouK%2FefXASDCCs9n4boWA7vGKMGeP4xpgI%2B%2Fc7%2Bs0UWk6ALqjvTcU0MR7i39xK9xqlQJrQeKfd18W4DdO0ifFL1CLX8F3aTs9Z6DwS1F&X-Amz-Signature=1552d5198dc53e726dadbffc13bf0b6e4f92f0eb11f8f3edbdc9a6034e64ceb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV5QPNJD%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQDWwVZr42W%2Fh5Nv4%2BblmoyzrFGsqQU3IU3F05e8B1gD8gIgBK3pZCir0qOZx9ItmnYhPlzH51Ii%2BRd8dg2NhgQd1x4qiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFjKLzZh2YDIj5D6iircA%2BiVYBa0tu8G87d55pTvQ8%2FcHtA5UmCQaq04tiHMfY8%2BC8YLrsmRvY3YXy6K%2Bs9QakgtPs%2Fb6LWe06ftapOSceWkiNkBd3sAhTsa2zVvpFPuGnNlPSAemR6zikTwY3lCq9NwiwS29%2Br172h9eULJoMMMjaqEtBv4oM7xnmvgQ7QEn3C1b3%2Bv9hy3IYOn%2BFPDAyRuuMwGPwcttm0aaT9P36cm8BuA%2FN2LNcVuARZWRYDhRE9d7xO7zCDsvw3QOz73y4DbJ%2BV0pjoqciJoS3abeMlt4pzEFYNgE1guxMRyCPj22ibXwmT%2BKu6XOmDrEvPGB4ZB1Ixo%2BoLvelYZixOc9%2FdWcu9PTVFYGH5z4lsQTk17WGwpndM%2Btl4faSGW06wIqVWP58A3JmCgl1EOfOJsM%2BrmmS1eu0NSR6k9bA3f0z4YnxsRaGtLVTIzihDQT3ZN60WesD8plE6tgO8myQ9Ij5RYDJJZMeMHY1iBGNqvTWVaGBjIbRLG7T7oEcuwYNye%2Bx1VvAgYmTVR2KmwZRczm0DZAa2fZEVPgnGgmMwAUt221IXxIr%2BrWY6AVCvRCTsk3dtvqdA3%2FbfQzX%2BaKaGlzHWwt3lVkmtYoFSB1qEqHWoefkSSTN%2Bd83%2FHAI8kMIuO1M4GOqUBX4jbwkYXChsIsRtcjnX2JgusxgQD9weiTUx0XC4cMZieQySPahk80Sj7DgYHk5zqRLxEWEqSFMKk0deLSSTm92KkovzoiTzLMCEvX11pLSaI%2FUn9oqR2JouK%2FefXASDCCs9n4boWA7vGKMGeP4xpgI%2B%2Fc7%2Bs0UWk6ALqjvTcU0MR7i39xK9xqlQJrQeKfd18W4DdO0ifFL1CLX8F3aTs9Z6DwS1F&X-Amz-Signature=1552d5198dc53e726dadbffc13bf0b6e4f92f0eb11f8f3edbdc9a6034e64ceb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RA32HK3%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T174457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQDh8QJzE%2BbAGyK1%2BI%2BJGmgKbbihUqPKliBpfLTI6GKzbwIhAJ%2FEIpff00YkpMZqlMHarIBOeZkCy2ZWuugTQL7p1C6IKogECOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwgzH7YvW4ianeYO%2BIq3AOsd3YzUrVVwgek6ixNA7glD6%2FimBNxW5zJm%2Ft2YJdbFLKPoDoEUFdXPvHM0aDJNFgVQ1teVBhk9tsjoMBsKUdmCcVPQZOxJFfc8CU1kOzlpfJfnBvcth4%2BaNMF86iXaBDoPH%2FCDppBbZbiAd5EOFIgUqkXPeii2KR8cvjwB2M3mtnrtRX3fJA2wIsulAgOZuFC7moy%2B%2B4yrGdH094o9RLNq07CRSuc7tBfrtG7TFSvWkeuUQVZnE3Q%2FreerglEeVB0DbtTfTcDLLgD63stzTy6o9D6qDnlDjAEGOO2W%2FvtmUjamI9b3KD%2FxRvj%2FF6yoQzAsosJdjgEpDs7V1nEBtJNv7HLzX16yvb6AzfoX5JK1Bj5yxTVtBVJustBEt%2BQngnhWAP512epGwCuv%2BxwilQfCoV%2FgfsqqpSO6h1juZwR0Vg9vWw%2BYB8yU%2B4IChP1whnTZy%2BY%2BiOvWousFvuuC%2FOnN2MdJZZulbi263ahg2o7uNfjoyRwybMj%2FRPC3ey6YobaR3RtOgAc7VCveXYDe%2FNZmveh4xR2QOHkImi849Om24cn5VGCVh0ODv1VPLLjVup6XfFX7IL6AjVs2nLeFHbl6qgFSAmV4zs0mfpJfBekI75DXXoqKpw9OQyCCTDujtTOBjqkASsoiu9qeO9pIqNpIMOXzh8oXAI%2BGqab0oavScXgxjpgv9NMYBqYNI%2BDbbA737JM03vVji0QSHEnOEg%2Bbb5oAWxlZfeEILpPCixlzPAqiwLLIFzgd14zHO9vnD%2Fk62jayvXf%2FQ0iW0Mg0X%2F45%2F8bZVL%2FfNLmYmWM39H94ubXr73mRkv0%2Bt3eM12p%2FOF8CGGyKe4vM7BJH%2FrEYug6xznmA9kJVPVl&X-Amz-Signature=91b7012526a7617c03b28e9c4c714ccdd74dfa386e5a60f05538270c71c582dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

