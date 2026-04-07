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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBT5LQXK%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIADqzRxWd6ONXs0nYHxGdU5qOvMqbRwtBJi5W61sVZ2dAiEAoC6cVU50DB2ie0U%2B%2BuyT6vgUl%2FPt00w3FKvoO7U7OisqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLNNjpK7yvdgtr93qyrcA%2BJicVNoZiVatSskkSdL2DkU%2BYHPy295MEFuqyflFI3T1cURrGZA76SRhF5dSyWs8mzVtGCoNNa%2BabkKseckfFdwQpwu43a2zR07rJ%2Fc5Y%2B%2FOy36qoNLRyTL%2BpiY0%2FaNuwSg1JHbrsPdECoSE69X31y%2F%2FeufIm3IJ3OgYCRAdLFR4%2Fdk8EpyD5%2FFZVknDHLHx9yTxVvAc8qe6m3bzmP8Ulwq93uhrSpTBPox7zazuscp71MYwFhBasg9iP1%2BiyOcCuHAL6l7eJfYQ6pJcIFhF8ogX8IeyGHqzRU9WVi%2FgGNoUfGDm3R1xLm9acvQyXuoLhAMe5K7%2Bxa54ju3TwCHxLWXV8PsUj8rf6G7lHnQC0odQMPQ11JHYF0584kf3n1McvD8yF0Rveca9EmzBdM2buwo%2FzZ911Z1QQKAAob4bWOXiGNjNbR5IRMTp5jnLcmR4Ewegu2t1Eu0aGlVVfXukXFoi%2Ffze7o6jW9RUylVW%2FlD7sTIxyLziR2mbpO%2FYwiwWo59vgPZ1Pb26JZmeh9usnw%2BWszmzQGbR1GV43JBRtCY6GHMAVIVdLtHJ%2BRMg2HfUJLqReaC5NtqfHMDmvDWmdApL4QLBs2cg33fCDQc5XwqlkgMjWF1K22bZQMsMK7I1c4GOqUBmikSkudmjujCSglY5ypmeJDjLM0oRLeqESP0BAszc8hJSS5PJggb7d1h0EINi27hv3nFjNXMkDENueggCdMDBd3GlcdeCD9l7M2H6b4wAy8FN4R7dAdG98eNPTf3GDSjlptOf8UkeY2f0Ci1lMNUt9uw7jkSVplrXiI6RW1DEjAZpo064Igi5nleTjQTQmc%2F6pREmaKuCljDArNfevjDtzls64Vt&X-Amz-Signature=b05b5bd37bf999b47546e2363b97f315f2bd83411d6d77a5f25cdbc3172d479d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBT5LQXK%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIADqzRxWd6ONXs0nYHxGdU5qOvMqbRwtBJi5W61sVZ2dAiEAoC6cVU50DB2ie0U%2B%2BuyT6vgUl%2FPt00w3FKvoO7U7OisqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLNNjpK7yvdgtr93qyrcA%2BJicVNoZiVatSskkSdL2DkU%2BYHPy295MEFuqyflFI3T1cURrGZA76SRhF5dSyWs8mzVtGCoNNa%2BabkKseckfFdwQpwu43a2zR07rJ%2Fc5Y%2B%2FOy36qoNLRyTL%2BpiY0%2FaNuwSg1JHbrsPdECoSE69X31y%2F%2FeufIm3IJ3OgYCRAdLFR4%2Fdk8EpyD5%2FFZVknDHLHx9yTxVvAc8qe6m3bzmP8Ulwq93uhrSpTBPox7zazuscp71MYwFhBasg9iP1%2BiyOcCuHAL6l7eJfYQ6pJcIFhF8ogX8IeyGHqzRU9WVi%2FgGNoUfGDm3R1xLm9acvQyXuoLhAMe5K7%2Bxa54ju3TwCHxLWXV8PsUj8rf6G7lHnQC0odQMPQ11JHYF0584kf3n1McvD8yF0Rveca9EmzBdM2buwo%2FzZ911Z1QQKAAob4bWOXiGNjNbR5IRMTp5jnLcmR4Ewegu2t1Eu0aGlVVfXukXFoi%2Ffze7o6jW9RUylVW%2FlD7sTIxyLziR2mbpO%2FYwiwWo59vgPZ1Pb26JZmeh9usnw%2BWszmzQGbR1GV43JBRtCY6GHMAVIVdLtHJ%2BRMg2HfUJLqReaC5NtqfHMDmvDWmdApL4QLBs2cg33fCDQc5XwqlkgMjWF1K22bZQMsMK7I1c4GOqUBmikSkudmjujCSglY5ypmeJDjLM0oRLeqESP0BAszc8hJSS5PJggb7d1h0EINi27hv3nFjNXMkDENueggCdMDBd3GlcdeCD9l7M2H6b4wAy8FN4R7dAdG98eNPTf3GDSjlptOf8UkeY2f0Ci1lMNUt9uw7jkSVplrXiI6RW1DEjAZpo064Igi5nleTjQTQmc%2F6pREmaKuCljDArNfevjDtzls64Vt&X-Amz-Signature=b05b5bd37bf999b47546e2363b97f315f2bd83411d6d77a5f25cdbc3172d479d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV5OIWHB%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203135Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQDJCl2MCJXS7PK8iSdEzI07wrLMQYOIWqbiUp65ZwIpzwIgTlXkyuU%2BgqxWvChi5kdhPnIDzJxYfKXQnYOuXuvBWs0qiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCWKG9nlmCphj37cJircA%2FXGmlEsfbSOXTTxMBpF7CRe6waLydlVblGYHYNVcY91fJoVHdRuUISU7fYVbXIGW15pTvu1A2i8DE7GnO9D9xt9wdDOujpPfY94oxLuhxV%2FafGVWehWITOIvnZdtoTA%2BpEIGcRzPRPJNhvcot9fyF36Bd%2FIvO0iw9LK7tOD6qfeybtKDUQ%2F%2B4pUjCziy%2FR1SfeXbpPvGmXEcJzUQwiA3%2BVoZUgFOeZkZGZT9EWpqHKfRxRE9vCF0uks4mfnUQNPz27Evo0%2Bc%2B5ZNeGlDC9miNhdRe0agC%2BmMph8s4MtF9TJR9JJrUtpMLULnpl5DU4AGMSFtQ8XkscdAlGlKxJVJk1sktJT%2B%2BgQgwVRoVCLT1GSUpsUKq0UKmyU9WSyHVSCC0PMLKPeSSM%2BpyOFIEzdGuU0BHSzO4wktH2lzXr2GetYuuGHEcf1UBuhjh%2FP3qDzvVglSdjVjPa0iA7Uyvu8jDhMLvkt6AibNv3LZXfF8Un7%2B05NGd%2BiSiVB%2FkJkhc%2FB96sLtq6RTDSnLGRdJHQ95qrqM3K5zMW7%2B7YLfo2AoSF0wuo2BbvCj6X9n0nw9ZbT4Vcp3tPF%2BcJejIdk1AWnKSse8gumCSTl0K5bMGueCpfhh9raPbcZPzYtVfFYMPjG1c4GOqUBD6FCcwfN%2FvAD5bn3TxjaqKcyV9%2BPv6rGMG8U2sSVUoBAqpYKOTvkXxGwqfI8%2FeTdJmkAWBwPVtJYdfVlENvYsu8YJKZs38GwDz%2FUxobrryyi%2BB4ZcswJH5YKiAa%2BSCdY%2Bz%2F%2BcyjzEJbFAB%2BapKXi4DPVxPGZAJlbDHnv6CBO635UyQzvWjkA%2Fd60wus8HGfFZ68Wg4wfflKQlM2dI01M5UajoHyd&X-Amz-Signature=b186db4210c52ff72cd560bdf6208907a037c32467a84cc34e20f9c94a58fafb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PTQT6BN%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIFFiupX%2FJmV9dnMNJ6AJshn0LOZ57gLrt8JxVPF1jcFiAiEAy85l7zWTV20OHtsVG%2B9wjX91YJIKa%2FC72WANqturnD0qiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJEP5beaMcfKsHmp%2FCrcA8vELLMq0ig45UGoCwKg6paJb26IWSXYl44abA4Ffvp4IKYpHbePjoIytjTIgzoddhI52kQ9EK8PgjgW1UJOCMEvo7R9P55e0JFBCR6Kt%2B38%2FGwgjvdEQoaC92LWIkadGW53PfICDefd%2FNSn8%2FiC%2BIcimkKdcvvqS2D%2FPpdvAm9GCFXLqsz00DXN3xbM1zi9vbxolW1jBdCcTp67GTbOEKh8djNwv8npa0CYtoqoihiXcqXFBP%2BHWjUIeVORxRMahy4eqpk2dgbLFexsjkfX8kWi7C0uQgYkN7e7gslGllJOHWy4suY4Q2vGEjIcQffGslGczXjeQhye6bnAoyb1V84mg4JFZTP3ivOwbHzeb%2FbM70DnvFZDSwHc%2B2CrhtzmUl9DI0HMSGgv7cCQjCjmlJRYhB%2BShqaQ97yEsAr8YcwglT4KZZyJ6a3QRZkOgPWq2kFI3kQnBg2taq3vXkcc%2B1Q0YiFvt0TEPA3%2F%2FcMHMyxYawbwO9xkHMnu8UwzXAqyWOpx5oOS5okiGEF0XYkBh7hqfVnLMrhtsPO3hClJrSiENUxCFU6yuEKfXYpcaXhH20AbDdNfATnOevmCvVj7D0idhFDqOHcf66pcyV06QLXqNpF1UK65dJg3VXDgMMjG1c4GOqUBhmXFwcwqrT1Rvr8OcydyrsL2ZkBTK3UHScfkVAnUbZ0bcFBn2yiv%2FmJ68dps99iYxcqQd1%2BceqZmQTagUZ8p8xioZBGEBKPGFJuDJqP15VrggJ951Q5s%2Fc%2F0L547gDo%2F7U%2F1RO3M%2Fbb7xq%2B%2FBRhpj8t2O0bJW8Gh7WWQNAky2uH2zR8VkC3KTMAFDhF%2FobEq7CXfdzy10V747y9djCzHnpTGZcqa&X-Amz-Signature=adde8221135db3aa556de6b2fadab8f74c09242af04c7def261fc918be51c6fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PTQT6BN%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIFFiupX%2FJmV9dnMNJ6AJshn0LOZ57gLrt8JxVPF1jcFiAiEAy85l7zWTV20OHtsVG%2B9wjX91YJIKa%2FC72WANqturnD0qiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJEP5beaMcfKsHmp%2FCrcA8vELLMq0ig45UGoCwKg6paJb26IWSXYl44abA4Ffvp4IKYpHbePjoIytjTIgzoddhI52kQ9EK8PgjgW1UJOCMEvo7R9P55e0JFBCR6Kt%2B38%2FGwgjvdEQoaC92LWIkadGW53PfICDefd%2FNSn8%2FiC%2BIcimkKdcvvqS2D%2FPpdvAm9GCFXLqsz00DXN3xbM1zi9vbxolW1jBdCcTp67GTbOEKh8djNwv8npa0CYtoqoihiXcqXFBP%2BHWjUIeVORxRMahy4eqpk2dgbLFexsjkfX8kWi7C0uQgYkN7e7gslGllJOHWy4suY4Q2vGEjIcQffGslGczXjeQhye6bnAoyb1V84mg4JFZTP3ivOwbHzeb%2FbM70DnvFZDSwHc%2B2CrhtzmUl9DI0HMSGgv7cCQjCjmlJRYhB%2BShqaQ97yEsAr8YcwglT4KZZyJ6a3QRZkOgPWq2kFI3kQnBg2taq3vXkcc%2B1Q0YiFvt0TEPA3%2F%2FcMHMyxYawbwO9xkHMnu8UwzXAqyWOpx5oOS5okiGEF0XYkBh7hqfVnLMrhtsPO3hClJrSiENUxCFU6yuEKfXYpcaXhH20AbDdNfATnOevmCvVj7D0idhFDqOHcf66pcyV06QLXqNpF1UK65dJg3VXDgMMjG1c4GOqUBhmXFwcwqrT1Rvr8OcydyrsL2ZkBTK3UHScfkVAnUbZ0bcFBn2yiv%2FmJ68dps99iYxcqQd1%2BceqZmQTagUZ8p8xioZBGEBKPGFJuDJqP15VrggJ951Q5s%2Fc%2F0L547gDo%2F7U%2F1RO3M%2Fbb7xq%2B%2FBRhpj8t2O0bJW8Gh7WWQNAky2uH2zR8VkC3KTMAFDhF%2FobEq7CXfdzy10V747y9djCzHnpTGZcqa&X-Amz-Signature=32e46158a8717a19317f9b6b099aaba9c4098acdd8dfd4cd2e6d74e0d95a1f72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPJVSWMT%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIFEtWQC9lGs5LYmjBKFBBpSDthp0puE2tsffrwG2k7XYAiBMfqHP2gOZl7aNlTQ1znSRBh%2BjryLyzlg2UR2hdiDkAyqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbNLX9mutStl9kHCFKtwD0aIbeg2ySdT6OwuS2ZOPp5rMHAeJhO39%2FtLeRTnvwnVbQZ13Xh8UdFpf94EFICFWzxqoPcXDMolAqNzy6SBREGFThikJWSYjkHehre%2B3LmL3hLxva13DHm8Qael3D7meW7ohogfMTYwBk%2BEpXCtKs4LhO1m25m30%2B16mcP1fR%2B9TOPEAIgmlui2%2B8mAQskfRi7hbbOstLboTOi4mOJgdhWwFh%2BOxZoX7rScnPjMozwL%2Bu6oH5oDAxV%2FkCVsn2anACbFScfUz9vFAvQE6NmGeVnuXKKWBpIg%2FD4En5JCOkCXUl11skJJgP7SFq7xxGn43ewJUc0KQysd78HuVsBfV%2F%2Bu0JMWxJPc4YNGS6KoaJ15scOuen5Y6gCF3HMFE9RJ8h6xqjXvC%2F5eQ9IyTZLBJOrsESYvXCg5q%2Ftyf5xQen04k2Fg7xCj0QmIAh%2FOueMSn8j4%2FDNdlP%2BP7%2FgXc3FWQRQjIo%2FrtoikongjLh9Rwm4qtPQxhq4pQ0pN%2BTEQElc00XLpMlnx7CbJIqYhkgMWN4YFEdXLY%2BqxyUJxG1Kxp1hiRpb5%2B4hySwOxnicRJE4svWQOerWiGr95OEAUJ0TbHkViEQPXUVN56E0s0uXxv2A%2Bkedm9n%2FaMZAS1aTswycXVzgY6pgEl8jzAH4bKO3OzUdnRzViPPBV4cFJ3aX7XvyikMrPvk3oAvYCgBGQ45DPNaLDo4CSzjRMny5xjjbz9Lx1sd%2F8F2UGtm8MjornZD%2BUDubWvvx4DvOK51cG0zpacEdgJ20kVZEeQRoNQNL5Xng1o%2FYMsfrA4GoV%2BWss%2BlZCLVprKdscaBB7BHsLRByzyhZZEPTFqPodNJWZRAJhCS6O3ZMWtai96gFtR&X-Amz-Signature=d81ec6c56ef40539b2ba26290ac799692cdbe1114733c433874d09a73cba6fa7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKXEG4UO%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIHBvLgDjYlGdHQoMfYb1OhGyKGeZx7PZ%2BLWf8XV9D70EAiEAjwyWBG%2Bgw6DEjeC%2BAmHdA0SyGJzVa%2FU7pYA3V9lQkkYqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHtb9ny3sriP8pZffyrcAwIS1P8n31%2B%2FP8Vd%2Fwhr7LdQNLaUmLQDzClYUEyV7RlCYfucrbJj3V3H91%2BAIa6RbxGfLcH8lg4hw8uooQwIoFwrcE2iGCPhL%2B61vQHNilPvrwgB9pQqOiJ5T6dnhvvSNJZBtL0Rbdb5SBDqn4Zf0jklMDG6TbX2kKdGYWb3JBMeU0o0fP1iN%2BqxpW4CScNvCV1OPw61t%2Bg3KAMwiUz39%2F5Fg7amhyOm7dG3c5teEBjQ2%2BEq9tRkK0CMv%2FOFDddBsUB9f5S9PjRrN8Ap8W%2FwCTh%2FsBe33GiCPGEOM5IyfZzk5gQRZMiukwatlIZ1NfSuYysOBmlfqHX8SS84pZcn%2Fe9kWsybbWGu7HaC%2BDEKEwI7RicFPw09MIaSZNTed0LmMMDD8z5GUztVVikHCj5JXzMfRL%2FjDPjwnrvC4%2BJCkAFtpD5UBAg6q7ibb8GQaO2Ly%2FwJimKhxprItKep%2BJYP0T%2F4jjClpiApBb1prcV4nU%2Bdpg9ypNoxrl1ksuT4VupoJHl2YN91GMKvTzSFznFobs0ObkbMqsJA6COisK9QPQ6gyAiDAUtF9y0lce0jRWkLWay6d60tlZ0%2B0F0ldypNePO9knrXLrwNhPT4tRneXTK8KYGg%2Fut4BAkIHS7cMNrF1c4GOqUB2acogXLfhF9douN5RkkgRa24w%2F79oCAwisGMFpIhVcAaXHrBXrootNHVrfrC6H05iI%2FWGjlWc4y8K7dbaX8lEyNeKM2tqRtzQShHFCbQd%2B7PsyFemu4X2I54P2umpA6kbxwo6nOcEadPjb49bOXHe9uHeHeuCb7qmTDqICwmQ22TG2Aa45ta%2FdyMb1d6I0icBctDXkq%2FNhTkeQcNtwUvPh7kI4P2&X-Amz-Signature=43479b2afd4e94a74396fda7db44ea085510f92ccb188f88548c44cde2493cc7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JYVIPTT%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQDwciVZ5qjeoy9IokKHDDxfpg9l4peVYgeovKZtU6o4%2FQIgbHFwdDW4VN90fbMyu3nQYgT74k4pnHKzyBer%2BpJ6CF0qiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCD49%2FAdK%2FCcCAkIWSrcA3IiAG0%2BgEwM1o%2BrIdi3meopaZfLNxm%2BziBf1LadRdJsB2cZoMizmc%2BR8a80Vsg7p8gHQ2%2BBD2eyzx75pDu1gXr3qx33uJbw0wT5rMgulBFud70kUrkFfUwzaDadmccbl03N54fHGchUjlYAmsFeVXJgAwmvk0Z2cxwsebfYUfgFmI6pVzxN7%2BF7E%2FFKyuNwqDia2OT4Eathu9zAuOmJ2iCXBrZFWvWUCGxUDWvzild1BsYSRD%2FwFrJn6b1V6XSLgLrjRB9lev%2BsXeed9sY65HjrNn32tGKIn4aVnuNLFWrKRjLS5gd7ag761VvNNKII8HQm1tiJsZsppUK1%2B2OB3ewgWdh5ba0iSQF2HY7bGVWpCCfOMSWafgTkZxmW06p%2Bu2Zl%2Bvykj9%2BjpBRjIBB0JoSBybZ%2FASEGTnyC3l7FDAaFBPJKJo2T%2FNlJJq1g0xKb1tbQrqfUmD8FVa8erywER3PbKO4iaV0IfUn6WQu4e7e92HTaQHRn3tS2j0eRQKHbcWTIYdXp4Up7pa8DmxUzNqxYA5OAlmd0LR0yfmQq1qT56rRkD5Lc6ChHhk5TqPzzeg%2Fu2NC4vHlP%2FEElD%2FSVZQHILJoiqTzHe8eopN0ASIS9g6Dx%2FJ6xi6kinyJfMODI1c4GOqUBWgc44GsaWO7bimF%2BSbx6bjC%2BRT5%2FdSvwCAuv4%2BiMZPE8Y2hWC5OqoSPUTuiGz8klA9ZXOpRzeYrh1BTgO5aSs73X93JhxUIChxpCltSe4QY6jhapwrRFXXl2SI6zbqAxHvPlhFl7xxB3iNcfo7oAMzDurAYIyucX%2BFdIzsnpPYCJKV9caooK8d8JPxcH13oJKHuMEvQ5g%2BeeXK3nB9imMSfTufe1&X-Amz-Signature=fb2a98b3efba995d445789aa0e498d2bb44cba09dad1b7a225b6ffabc58c174d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MDX4BGQ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIDJ2Bssbldf%2BdkmEtWlctFWDkpbuK3uNQyAcbeZY6z8kAiBMcfYuylF7RVJMm7j3e8poVGNPllc4XPyv%2Fr1CU7rhOSqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMII5w61XpXXxbdPwrKtwD%2FGMjNJlmUk9N%2BG3qbhn1BNQt1KzjLIbIVC07bNCEZRu8W%2FbvS1T6T8YPOy6U3kfqI46ZOZyFVXbnOt9Bia6WjFQ2jOQ%2FwiITOuGF%2BS9K%2BVcki1i43YdlNDmMlKS%2FDEJWUHpzlmoU1e0YcXmvqXQK91gYYJX2Ii73tF7XFOldh5Luv6gsorvfXOzBTh9JJGktMuVhsqHczpnTcksY2NoLijZcoKhOJQ0P2wPW9heMBEw2t80W7P6kTU7VqrrgrGL3MnPRts5uppBWUWQtxP04%2B%2Fch2S4KmMChBdV8GJoUZ9yW4kaXIZZAngR%2FzXGeU0buzmOLjrMZicMHoXwm%2FkWyveoAVfDRjBhETuuFYGi%2BXzMsCqQluuu%2Fuzfz1Rw8ndoXEpjbMxecRT5dd%2FCAH2Qtn2Q1r8RCDb6HtcQ%2B%2BMAeUXK6Eum5uGJ%2BOKp0lpBWjVX9OPAz%2BqVPZqXLuux0mUsZMdk4rxuXwYioePLpoYgRxGRQ%2BImspDpHMcLwTzff3TRArYuoUGA6pKzAcVPgQjSqy2MJY%2F5bqNt7bHzuX5eOkGUZPj61zmW8iszeyEWdzEFcAlcHAJc0iLx5IJAfdhwQ1j8lXs4X%2FY2AjyJQr5WeMQVKT%2BA1ONjdtcnURyYw4MXVzgY6pgGuAczoWHW0rZ6Ssr%2F7lmfLRF6GvBfvsmVnm6MGwoBLu4gewsGAApnSi8ou8KRGGZSwDNE2O9hq5hKhwMMi7N%2BsFVLzqOyf2%2FQePbehGFUrmwifx%2FfluNqJygcqCoFMBBLeanZ41WMrClE6K392JdaCZsANvLQSfBsn1sewa9WKWvDW44zUy7GNFXp7OzSvoQ5PaBagbpWkJvka9Ie5i7fM7IunX3ml&X-Amz-Signature=92602eadea5135d41d3e1964eaf1cae966947a1eb39b31d917e075c2490293b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MDX4BGQ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIDJ2Bssbldf%2BdkmEtWlctFWDkpbuK3uNQyAcbeZY6z8kAiBMcfYuylF7RVJMm7j3e8poVGNPllc4XPyv%2Fr1CU7rhOSqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMII5w61XpXXxbdPwrKtwD%2FGMjNJlmUk9N%2BG3qbhn1BNQt1KzjLIbIVC07bNCEZRu8W%2FbvS1T6T8YPOy6U3kfqI46ZOZyFVXbnOt9Bia6WjFQ2jOQ%2FwiITOuGF%2BS9K%2BVcki1i43YdlNDmMlKS%2FDEJWUHpzlmoU1e0YcXmvqXQK91gYYJX2Ii73tF7XFOldh5Luv6gsorvfXOzBTh9JJGktMuVhsqHczpnTcksY2NoLijZcoKhOJQ0P2wPW9heMBEw2t80W7P6kTU7VqrrgrGL3MnPRts5uppBWUWQtxP04%2B%2Fch2S4KmMChBdV8GJoUZ9yW4kaXIZZAngR%2FzXGeU0buzmOLjrMZicMHoXwm%2FkWyveoAVfDRjBhETuuFYGi%2BXzMsCqQluuu%2Fuzfz1Rw8ndoXEpjbMxecRT5dd%2FCAH2Qtn2Q1r8RCDb6HtcQ%2B%2BMAeUXK6Eum5uGJ%2BOKp0lpBWjVX9OPAz%2BqVPZqXLuux0mUsZMdk4rxuXwYioePLpoYgRxGRQ%2BImspDpHMcLwTzff3TRArYuoUGA6pKzAcVPgQjSqy2MJY%2F5bqNt7bHzuX5eOkGUZPj61zmW8iszeyEWdzEFcAlcHAJc0iLx5IJAfdhwQ1j8lXs4X%2FY2AjyJQr5WeMQVKT%2BA1ONjdtcnURyYw4MXVzgY6pgGuAczoWHW0rZ6Ssr%2F7lmfLRF6GvBfvsmVnm6MGwoBLu4gewsGAApnSi8ou8KRGGZSwDNE2O9hq5hKhwMMi7N%2BsFVLzqOyf2%2FQePbehGFUrmwifx%2FfluNqJygcqCoFMBBLeanZ41WMrClE6K392JdaCZsANvLQSfBsn1sewa9WKWvDW44zUy7GNFXp7OzSvoQ5PaBagbpWkJvka9Ie5i7fM7IunX3ml&X-Amz-Signature=d9c4a31a7903a4606634c8ae4f94241596d01f7573f4dfa3a8c531da01d893c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y23L4SKM%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIDDOXu%2FUSf6hnu2nkB3I8uIOiq0fkf5U%2BpCFmfE%2FNjwrAiBi34TYuhekmpYMqhv1vCg4YKvqHcjIlNQIGtZQZKandiqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8lNrkbosB%2F1MmKuMKtwDC%2B9GrCcq3nbWstHmqbX38D4qN6WlSHtG7IC1h4pw6EwqFQhjtXRD%2BFtL9ZjAdSHhFpLc5NH7fJDv0Xe%2BnZMOFxaF9wBiVI%2BEEDy86M3hjZ4lGn7ueRK7Hq6zPPret7zOoRAy6I3KtmM%2BicIZJESYc6w9UEZfjv2ncH%2F8gD%2FQ7tjwGlHIwWvUtkyk9Q34o7ND1Ipwz%2F0gyB4sxFouvQBs%2BkvgY5lfa8kRuVi6PT%2FuBs%2FDInqR3duqui5wYV%2FmGT0wCkewfzsz7sDd%2B4lzSlpS1Fqhhxy6z8vHygYQh8hJff%2BaExNfsEQ4ilH3MjCmgtjVTXrDMnM7BZhwxDFP0eVJAFa465KCyeb1RWGH2PO3SQ28Kcx6lPEPHNVEbUFQAkfVkPqBPf2ta10QryTLFLjMY%2Bl1biuvuGmMxx7qYzIKsnETBsFGm4MtW%2FGOmlnwTBZWNXGm7RwMD9EQtgN5ofUXlnqfHAJNafFSJshcNzD2i3XsdcmPWSNqGGS091Dzf2FuWEcWbGyqkyp4ykhg%2Bt0lkJkb8eDnN5kPSyuCbRp7YtbOiHXD4l8L6E1y5xAZwXmMgQ0Iw5KG%2BpFpToL0s2IatWocrpQoS249%2BF%2BdC%2BlmsLX3rMHQc8cLD7BwCCwwtcbVzgY6pgGgjHJZDd9aKp3Eixcqu5lPArNVo58PQwn5cBfKTEDFDBcP48R5i1vyJaXX26g3acHO%2FnuZiY6hfvrM1p55VLR2gqWX%2F9%2Baf2iBd1C1VnMcDe6mv5RIPOhqDJU2bw1sS1mHx1hQrfjOql%2BHaTbwTWg1yBkFaJnO9dMUHS4fdvEYuVf9EYrilIRg9on1%2BsJ0ZP9TIU9GcAP%2FPdYNQxE3ZbhUSdoe%2BwVN&X-Amz-Signature=eb1161b361aeb35548741653e20a1568e2741b5a462444592404fdb0a65e76a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IASNPUD%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQD00Peo18OtcVZ2Xp1dULHN2I9ZBiuq8ZKISmcrxkLv1gIgZrDINd7fabazCinNnszAKY81i4rOA0n5cCQQqtQx6RQqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH4IoXrDbYQSGWDINCrcAyZVS1EeInJnubrFoXfstVronULMm%2FY%2FeTKHv9ctkXI%2BuPNTVCl5i37ORpniQsyR10ab3obe9rmsoBTN9iECqxpXvJKeef7rOZ4cY4ih4ADvbrm%2FU0kGZBZaH8MwJDfyFCA8jk%2FB8HYpfcWSwtTdiY%2Blybo3Jjt5rxba8u1lNLwyss7fxuCR57Tbeu6eNAU6fuShEaD3t%2Bqpnsz2x%2FpFqOJDwXJxmpiSzwtPvZ8HyZ44YK1539Z2DW9oXdBkPLoczLqKKjbqcBaisHt91i08RP6xgdpriiDdMa9ONylkClsqmxEwU%2B1L1iTGnzWHF57od6EYSj1%2FkMnlZBA7z8NMmnC3hjoopiak5gZHNdOWDnafRIsCZjkR9vCgxCzpYtoMv%2FX6vy%2BTXZK5qxxoGArkkyu3W94otPqmxnlAxDQmtebv0ySZu5WI2kouTXwwg4ny9O3vgNb%2FuRZo6DO%2FlJsQ5DQ6Vd8Eh5eRispQdNGQb%2B3mkEAv4wD7XHzgCYhLFoFKGWSm5SU%2BeMUopZx7nnmWx0JjxDAfxSCvXVXOkHGxQdgrkmDJj1OMOXh8J6nW6Wrk4lvhAKS7D9kCvQsXC78iE8itgjApsnjPwQlXTpUG2gAeO6qwMGtEDRrqc8orMMvH1c4GOqUBYzflR2fnUkiRE0n1FItN9JNclDKFx0rwbw0dIo%2Fc%2BhTGNHVr1o2CEzHDej0LRIKzNHz%2BPav7gsgXIx3%2BfjzeBpQtjof04g65py%2F%2FEfkhN0po47uQMVT%2BAJYk8YNS36j3S146mInoGKE6ChdMF96q7aZOODkqDpbX4IN0RjD%2F3hC9bUnDoWQmXqcihmiclxhKcEEJvAcgFG5jHPr9mj1sqKHFX%2BHL&X-Amz-Signature=73c191c033f4e49c43ce557d8c6c2c51cf7e0d7ebb196b5cfcd96db39e50e68d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667IASNPUD%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQD00Peo18OtcVZ2Xp1dULHN2I9ZBiuq8ZKISmcrxkLv1gIgZrDINd7fabazCinNnszAKY81i4rOA0n5cCQQqtQx6RQqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH4IoXrDbYQSGWDINCrcAyZVS1EeInJnubrFoXfstVronULMm%2FY%2FeTKHv9ctkXI%2BuPNTVCl5i37ORpniQsyR10ab3obe9rmsoBTN9iECqxpXvJKeef7rOZ4cY4ih4ADvbrm%2FU0kGZBZaH8MwJDfyFCA8jk%2FB8HYpfcWSwtTdiY%2Blybo3Jjt5rxba8u1lNLwyss7fxuCR57Tbeu6eNAU6fuShEaD3t%2Bqpnsz2x%2FpFqOJDwXJxmpiSzwtPvZ8HyZ44YK1539Z2DW9oXdBkPLoczLqKKjbqcBaisHt91i08RP6xgdpriiDdMa9ONylkClsqmxEwU%2B1L1iTGnzWHF57od6EYSj1%2FkMnlZBA7z8NMmnC3hjoopiak5gZHNdOWDnafRIsCZjkR9vCgxCzpYtoMv%2FX6vy%2BTXZK5qxxoGArkkyu3W94otPqmxnlAxDQmtebv0ySZu5WI2kouTXwwg4ny9O3vgNb%2FuRZo6DO%2FlJsQ5DQ6Vd8Eh5eRispQdNGQb%2B3mkEAv4wD7XHzgCYhLFoFKGWSm5SU%2BeMUopZx7nnmWx0JjxDAfxSCvXVXOkHGxQdgrkmDJj1OMOXh8J6nW6Wrk4lvhAKS7D9kCvQsXC78iE8itgjApsnjPwQlXTpUG2gAeO6qwMGtEDRrqc8orMMvH1c4GOqUBYzflR2fnUkiRE0n1FItN9JNclDKFx0rwbw0dIo%2Fc%2BhTGNHVr1o2CEzHDej0LRIKzNHz%2BPav7gsgXIx3%2BfjzeBpQtjof04g65py%2F%2FEfkhN0po47uQMVT%2BAJYk8YNS36j3S146mInoGKE6ChdMF96q7aZOODkqDpbX4IN0RjD%2F3hC9bUnDoWQmXqcihmiclxhKcEEJvAcgFG5jHPr9mj1sqKHFX%2BHL&X-Amz-Signature=73c191c033f4e49c43ce557d8c6c2c51cf7e0d7ebb196b5cfcd96db39e50e68d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RO2NTGHA%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T203143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIFwqX%2F70Z6DryaSD5O%2Bqi06QgR8xBmpFyNBnggzvgfsmAiEA%2FtLdWZdpn%2Bp94KxmyNCJzzBjqT5h1igcEHrWnTTNhnkqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFVtgwK3av1McEsDcSrcA0pL2Ew%2FXOMILR5puNGwKmD4ET2L%2B7TVUa41GOg%2BgNFuzNsLO0G%2BuvZaRfa%2FTXbTgLIfP1GRsaKhXnBLTO2oNVmJD0cS2jFUIFOpwgfmst1sdPRKOhv844bRA0Lw5PMf3hFpJ%2F%2FEsx0YuwqgIscMMlW0Q4PZ1AzbztgrU7zUdddeN7eFoIW7QDkwVdcbJ3raxPC2Syl7Pw%2FymJoPaV5eiAQWJoO6nhUVb7hBIbY9W4wd49AvLs8cB0KT138ENc2f2aUwph5L3kiONuE9kvRYs9FZfyP6sxKWkAlMVoGmIx89E4CWa6Q9oKUmrC21SCq0PFMwQnHYx5oWaZNmDCbHwBopeTX8CuPLfZ4kcLry2LJSv%2FUnxiVD4HfgFbTAPy6XSuuqEIZ5VpiIaUsiA6BoaR97b3tLds7RTPYdx4PrGUU5FOBUOhHgSbnAeSkLbsGbmGTuSQ0C7nXPKOG%2BSkM15iNEOTrAhzdaKTSXZAOx9J60ow21c%2FCv7pwmbg8VZGSzB%2BrAwyE1%2BxjhRh9mlA4S4UDQ1SDUag9VXcZXtx1ttqVd%2Ft%2FuSldqml6VGxUDBxVjQJwYZEI8W0yg7LOxW8vD53jmuVorjHgF2XMQbNEbiW%2FHk6%2B8d5etn36F7xWyMPvI1c4GOqUBtqvuTOtsL9sjaZv0jmFiwyV9lsLFVmS2M5e2%2FP1tcdDfQNJVw8c8WhBL52ODDe%2FmzBNGRALQAeSGh5zz3ge%2FSG%2F6vlmlhK67re9wVuFMXnSuZ3ZTZE3RfL2UMWTfBx%2BQ3gdqwBD5DkXpnCm2koTS5RQI2DkdfZ%2FSaCb10DfEYOyVMhlXzcoRjtZOHr1vk9NueU%2B1ez7Bn%2Fr9qqfsdIcPSNgfQjPG&X-Amz-Signature=e0ed4625c0040945b7070b94f55d3c32001b9d3fcbff89ef15e797e65abcfc1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

