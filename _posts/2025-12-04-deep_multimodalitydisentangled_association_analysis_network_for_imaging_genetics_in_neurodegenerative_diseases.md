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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNFOOT7G%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQC7vYeV07tElHDzA%2B0icmfeYnTKl5wIcos60bN6I9rcegIhAJtBOlFiCMUAkriRF8oPefDYSru6%2F%2Bieb52U0dyhoicxKv8DCDwQABoMNjM3NDIzMTgzODA1IgzbaAWalinmnzd812Yq3AOsaDDPXAW72BaUVd%2FeVKnFCimhJEzq01HOxWUjSsQHyAJZ8VSCtR0z40bnbpuZKehYBAINhQ2ZWC%2Fke%2FOpuG5VeeU7h%2BxrJmANbL%2BQs%2FseFqiKqbQsysndzO58Cw4fzbc4CCkblVY57Ui%2BzfCBOq3TgH%2B7BZzZbdbuR732LcbWYIntLv2z1z3h9YSEghbFn5y3eWEQ%2FI3%2BJdsnAkFpE33WQc6q1TNkOUFcf7jaFJvJ1iiwocNanYd0TabO9WuU18xdHW8O53xnCNs7TQJcOy0YPAx2EUb8jaZVyjie%2FH2mJGV%2Fbn3c6x%2FsjRWA2CXmmerimu9aTs%2B6YyvU%2Fro41KLOhTbJ4u4OaP6z3tvIpxi3ubLwJXLqqTWeepccYKh4rd2i78i2Z7D06grxzisKxeSqLl36S5Am%2FQOkcHcD8cpc2LtVF4WtjpKRfF8FRx6hA4Y3HTKCQQDnL0x0bgs5uswO0SYpk3zm5CC4VZ1b5vQvL5ATAJ0wszO9HVutgSTjVwl4pZxoMToDau1VGNGf302b%2BlPiE0QoMtKmqR6W6baSWMtbWQFn6EiGsNWAvYj4yUqk%2BsqrrlUk8fEpv60XNF01FvmjsqLabI6IoVuOrh3WnKOZhhGta%2FZ2Gj4gzzDT%2BYXNBjqkAXwBQL0RirYq4I8GAI8YI5jU9VB1wOJ22LpDHaLPBdWKu5NOYNhIMoQGSom%2B5W3kWAMr%2Byb3FEo19rRHpAoC%2Frd8IR7z%2BdUCcNev9gjeigY37PW7KwltxFods829dOGHxonfoLRQ1cwoVQITWElEKV4a3o%2Fdo2Hu8B5%2BHJ17TxD5b34kICjETaec9%2BRNiKfyQzy6IPeVM2XpL1tWp1sdBQDG%2B%2F4H&X-Amz-Signature=de649f2832ac397bab709e05376399ee71e8b42641a21e8f9385de1f5ecde7ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNFOOT7G%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQC7vYeV07tElHDzA%2B0icmfeYnTKl5wIcos60bN6I9rcegIhAJtBOlFiCMUAkriRF8oPefDYSru6%2F%2Bieb52U0dyhoicxKv8DCDwQABoMNjM3NDIzMTgzODA1IgzbaAWalinmnzd812Yq3AOsaDDPXAW72BaUVd%2FeVKnFCimhJEzq01HOxWUjSsQHyAJZ8VSCtR0z40bnbpuZKehYBAINhQ2ZWC%2Fke%2FOpuG5VeeU7h%2BxrJmANbL%2BQs%2FseFqiKqbQsysndzO58Cw4fzbc4CCkblVY57Ui%2BzfCBOq3TgH%2B7BZzZbdbuR732LcbWYIntLv2z1z3h9YSEghbFn5y3eWEQ%2FI3%2BJdsnAkFpE33WQc6q1TNkOUFcf7jaFJvJ1iiwocNanYd0TabO9WuU18xdHW8O53xnCNs7TQJcOy0YPAx2EUb8jaZVyjie%2FH2mJGV%2Fbn3c6x%2FsjRWA2CXmmerimu9aTs%2B6YyvU%2Fro41KLOhTbJ4u4OaP6z3tvIpxi3ubLwJXLqqTWeepccYKh4rd2i78i2Z7D06grxzisKxeSqLl36S5Am%2FQOkcHcD8cpc2LtVF4WtjpKRfF8FRx6hA4Y3HTKCQQDnL0x0bgs5uswO0SYpk3zm5CC4VZ1b5vQvL5ATAJ0wszO9HVutgSTjVwl4pZxoMToDau1VGNGf302b%2BlPiE0QoMtKmqR6W6baSWMtbWQFn6EiGsNWAvYj4yUqk%2BsqrrlUk8fEpv60XNF01FvmjsqLabI6IoVuOrh3WnKOZhhGta%2FZ2Gj4gzzDT%2BYXNBjqkAXwBQL0RirYq4I8GAI8YI5jU9VB1wOJ22LpDHaLPBdWKu5NOYNhIMoQGSom%2B5W3kWAMr%2Byb3FEo19rRHpAoC%2Frd8IR7z%2BdUCcNev9gjeigY37PW7KwltxFods829dOGHxonfoLRQ1cwoVQITWElEKV4a3o%2Fdo2Hu8B5%2BHJ17TxD5b34kICjETaec9%2BRNiKfyQzy6IPeVM2XpL1tWp1sdBQDG%2B%2F4H&X-Amz-Signature=de649f2832ac397bab709e05376399ee71e8b42641a21e8f9385de1f5ecde7ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTURDTIY%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIDZy16h596Kckt2y56Xyy2aMd%2FjvyvKxjDYc6huWFlt6AiEAgTG31G5AXQzuxK3Qj0mm3vMJloLqg3CNZasglyFhpmgq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDMHbLJnV8YtzCADvlyrcA8oZa7K5W4h5dNcjP9lCt9fUdKgDI8l0tKDdysIcHr1GYi8%2BgXqq5cwKsfp3RC0NxyWcE7pErgXEjcSAFDtCTSn1kLklLt2f7K6iful3K0%2FAs03H%2B5ZnMABjKC%2B%2BWSUD%2BJJjqQZJ3E5RRba1N05kUm1R%2BU2UBrBOaTPXoayEpPREKdkadItkqAslgPgCVWRz6pNS6uJiw58f49FfVlj4WBglpYZWQw4xkhXM86fh1dFCMfloNsfGwfQrJz9iRJ3TIx9R66MbI0uFaNkNjIaOMZL1n0RdqhE62o3I1yioLNGXTN8bnSoRJu44bO547eJiGIjsrY7aNSZEc2tsbzN%2BS1UuE5dvnMXjKLGNaRSjjQwU8OGRKERmj345ABBZZXqVNNsZ7eTOaQHZ42OPJFZkTke5eFapwx1OXviuC5r7tVe0zZSsmNh2frigQEbRcMgXjazrtaej%2BJprQHlZ2hV%2Bun9nsG5wgB433UjHkvfvnTD7CBLMDakzLjq1sy2ThnO1wousqjlaPs4du%2B96AgzyBFyagFPZf%2FeqJPxtpOWuFXHcSzG7faDgg0%2FVSD4%2Fx7oJbayyB9juBH7Yf2mxk3xeAi9%2FLWP3ZFum7jpINm%2BAoKpjrya1jY%2BzpkScOVM4MKf4hc0GOqUBp7LAtEPPRgs24g7Ah2LhtDRVsbXey5Syw2l1jpTE2UN5hyfD%2FrRfr491mJH3hUlAy82Gv3n7JJx63EJt3sURHCMzO2r4A31BKO%2Fd%2B%2Flmt1UPZmwlPoGXcchD4yXb%2BNIJVQZ%2BjeMn5JOnw1fWcUKZmSKXOqAhsrpMxi9GQ78HbtHz8xUBVvwGVcTpH%2BGgdkU%2BDTrnLU%2FMRXDUER2I2kznTCNSzwib&X-Amz-Signature=08a831c97912be675046aeceef9ebe22f5839faa37bdc4573d97243aaa14398e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCVPZTLO%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIFbZwy55OQCSFfrDG9eri%2BqGygmPoIF0v91FdUf9EoLQAiBG41v6JiWVBeJV143n2o%2FKO%2BSFK4P9N8GWQ2Rv%2FnASAyr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMbD125BzElP%2Fn%2FejUKtwDCMna6u5dEuYo6D%2F4iRx8fF%2FFbGPmqVtNm30BZI73i783H8B2P0TJmDUVper8u81RaQNsj2uFCsO4yp6FAVk7whnrCh4EYPODv8Tnle12caP8u2aPY0DXSjpQ1yCf%2BKtDqAfHs6WzbR%2FfaivO%2F3i5jPy0y324%2FljTtWPg3X%2BRoXHi%2FiLQtdawC%2FFyBwoC0QTKcfpV7pxqf%2FNQGnRwMvQyXtM1O21hVSxVoClON4wNdt7cxLwcvcMFUZweWQjnzQoQ8oGK4lbFudnNlTNWVs3vHsjIZCDHU%2B3k2EPlnFgBeCtN%2BxDGhcbqpXcGc2cLW3ke%2FkwJaDk7D1Ss%2BKCsVsrXTMFwCsGkpizR2IE3K7pnL%2Fae5aXTFDcpWxpBXUQx2nP0p0vRv0SnHaViXsyurY6Lw9H6wVLiTJUrytEZ6Atkt7NCbWBByZJgYd8Wz6oOwUhXPLNww2WGiR3c88ONzfLj8YYB16GiKShMcZzkzBjFu409JMUeiPZruc4VCv1t9hsuW5x7jcjXOjmqbs3qtm9UeYFKnl3LeMbAs1fHLiI%2B%2BgMPcAarSTHkDE9T85B%2F8EvUZPO%2FmB2DkIjhR5yjVRo7lM3ENwylzI88OPbeon2uqV73o0IgoqysNPfXiKYwuviFzQY6pgGlpRLSoHsg%2BN222fGKPTH6oMNtMUZKnOJoJsQo08AJyHe9WrYoKkz7YJMwdKZFh%2F%2BRTq%2FuP1lgpXxR3l%2FAgutWRVmSNd4h2TlD%2FYrzmpMR5Leb%2FjPzpBY%2B8cPxs7r4YqV%2B3tAd3Qnn58wL3Obh8uql38JSTfqWH1ZMe5ok1BcTv4%2BvjrwULsAaehp0gNuJQdIiBbOQrGol9mdWIr91rv%2BFW%2F25JE3y&X-Amz-Signature=8d561018b15bc3cb395223e8b5bf629e9107e2d34b5ee6b242ff055f84cc7ffe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCVPZTLO%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIFbZwy55OQCSFfrDG9eri%2BqGygmPoIF0v91FdUf9EoLQAiBG41v6JiWVBeJV143n2o%2FKO%2BSFK4P9N8GWQ2Rv%2FnASAyr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMbD125BzElP%2Fn%2FejUKtwDCMna6u5dEuYo6D%2F4iRx8fF%2FFbGPmqVtNm30BZI73i783H8B2P0TJmDUVper8u81RaQNsj2uFCsO4yp6FAVk7whnrCh4EYPODv8Tnle12caP8u2aPY0DXSjpQ1yCf%2BKtDqAfHs6WzbR%2FfaivO%2F3i5jPy0y324%2FljTtWPg3X%2BRoXHi%2FiLQtdawC%2FFyBwoC0QTKcfpV7pxqf%2FNQGnRwMvQyXtM1O21hVSxVoClON4wNdt7cxLwcvcMFUZweWQjnzQoQ8oGK4lbFudnNlTNWVs3vHsjIZCDHU%2B3k2EPlnFgBeCtN%2BxDGhcbqpXcGc2cLW3ke%2FkwJaDk7D1Ss%2BKCsVsrXTMFwCsGkpizR2IE3K7pnL%2Fae5aXTFDcpWxpBXUQx2nP0p0vRv0SnHaViXsyurY6Lw9H6wVLiTJUrytEZ6Atkt7NCbWBByZJgYd8Wz6oOwUhXPLNww2WGiR3c88ONzfLj8YYB16GiKShMcZzkzBjFu409JMUeiPZruc4VCv1t9hsuW5x7jcjXOjmqbs3qtm9UeYFKnl3LeMbAs1fHLiI%2B%2BgMPcAarSTHkDE9T85B%2F8EvUZPO%2FmB2DkIjhR5yjVRo7lM3ENwylzI88OPbeon2uqV73o0IgoqysNPfXiKYwuviFzQY6pgGlpRLSoHsg%2BN222fGKPTH6oMNtMUZKnOJoJsQo08AJyHe9WrYoKkz7YJMwdKZFh%2F%2BRTq%2FuP1lgpXxR3l%2FAgutWRVmSNd4h2TlD%2FYrzmpMR5Leb%2FjPzpBY%2B8cPxs7r4YqV%2B3tAd3Qnn58wL3Obh8uql38JSTfqWH1ZMe5ok1BcTv4%2BvjrwULsAaehp0gNuJQdIiBbOQrGol9mdWIr91rv%2BFW%2F25JE3y&X-Amz-Signature=ca0788dffa9f734c2d94980f7688924544adc4c1bddf3d737cd911613aeb203b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XK4AT2NV%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCLVZ1XUi47h9k9m%2FHRWrxNkGd4Z5zIF87QL0Uyxp%2FnRgIgBgXxg8dEZRS%2B%2BvCVkl%2BXtmm195o7%2BftSz9p5Z67BtCwq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDHMg%2Bx9q5RnlWsVqvircAx9EGxpNRx25Gd0l9I%2BzzNXAQMVYrAad78XTF%2B%2BTWGdN62HOkzfk%2B5UEah6JpGCG%2BPkk%2Fz06T5aNYXdsV7XeMkZmz%2BUWuE7kzAg%2Bh9akGHhefLrOG82DbXNuXyNoaRzNNXKz6iN2ou11VMaUVvejWvs%2FOWTWui8ygSiEjvHPgpjXNe5vujQcSnCqLubKVtWoyvrsDgGQXBZA8L40AlCcCby5nDz5RAVy26bY08iH27O%2B9TlXV8jHyco4u8rC4HV3ybi3ThIE7xD2IO0Wrq3fKhCAkOMCV9ZMogV8b8PtmkESkDj%2F7vHoQ0ezvb1mVgcgRYMz%2FsPE7yggztBb7%2Bj%2FlgqSV%2BRVv5PwxfonKpYB70u8uqpJdlYRMcWSShG0O9nMeNyxqmVrTjCAQQUhihuP9gNf4CP46MKIDG3QgtqU8s1sduj%2BInnQLobAE3GGXQ4Yu0puCEeKxrLUM%2B0zgyTGLReqbjkys8kLIuFKxEhIYAOSHkcC7MpG9%2Bbjavql%2BpZSZxvhtlp9mRONTyk0N6W71A8hQUqTYusebl8sjLUpqQDZWX25zqf%2B16NEqLDEujHpas3chUhhsnbQHDVzdrtxBWNi2%2B6uGgvDh%2BbZqBfT0ggNqQD5b8oaRK%2FTM51PMMD5hc0GOqUBf%2BORdTdfcTc%2Fd%2BRWTruAXotwVOwtd2i5K7h%2BssoyYBv07TTXdQ3ks3swWY0e%2Bn9g53MzNf5gzQc1ghlDcH4fU8QAlKqFjhw%2FuJfntssFEyu0RX3YFmh8rbDfS0saozDWbnv0R73J3%2Fb9lKKfih5zzFIUyK0x2BGQ406uoc72ge4ELJSenBFuLhAvd12D48%2BRdUPjxAN3lA7%2FeWGpqC2iYa0WJs%2F8&X-Amz-Signature=cc558f640bc869fd9cd9a29d30b3d4bcb87fd57c8ad1d84390e409d2390e0a68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWJ353V5%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQDefyq3VQVMkPUXYPo3rNLqYGMUVxWXO9N%2BT00HJxQrHAIhAO%2Be4p%2BvEtR8sAHC08qGUkVnp8RAwFRAz9qeoAjraXnkKv8DCDwQABoMNjM3NDIzMTgzODA1IgwTxLM9DDmGG7a%2F8d8q3AMS1vo4BnKyY0A4mK0AXonEv3CFhUBRa%2FuICxGa19rSx6vyBHPNM85WAMNQKJFzSYKubHe5VqJn8T716aqbJesBoVW0rjbHSp4eesABQKvpj%2FdIpZ95fieNGbVwBVsICm9Ptl1NGLD1iwrZEPnAlI%2FrzE71STdjXhkfDCjBzTbHRUvHFbBdUQo9Kzn43jwe1R3D%2Bw3gDdeBKRo6QKhqpg8iYaQMbnZkGxmWYMCMyTp1K6h2O1K%2FmOoE5cPWk2WbYCaAUFIWVWVtMDPhISHxdLUWt6YGfpLDX1KoHkOMe6qbt0Isjn6Y9jThp2KafwGQGXI0ObjkiH%2BHHISt5glPG7FdxFzBAh7DyttTpQaAQ%2BmY4BH%2Fnwu%2Ft3qEBXV3aLuhjV3bJ%2B4tnGnJsKXPXelXSFgWfG4H4suBkRDQI9%2F4c3ljkITU9TuW0f6S%2F5YE7ZF4F2aafL5P%2BZ8cmenWG7CEjybZBl49vI9puXXm03yAD2L7P0p9gqivCqyftsn6T4ncmNTk4m%2FMtl5JcVWtQTpLT%2FMJ9dpWFrFnWs1J%2BWoT0qjBpeGceEdNtpDEVz%2FTiQMCY0yYqsfCZ%2FTVvF8s2PaoFQaT9nXICsOrN%2FpeI7SFY%2BQOE6RZhlUaQDO3QlV5yzCE%2BYXNBjqkAZCI%2FJnPdNr2gqPs%2FIE%2BK%2B5Hxvsj3MTMjFENoH%2BmKVVEDtbruChCLiWBZzPNIztQri9%2Fn0%2Fyf9D1ytnKIxvZxxWgL6oI6YSj7o%2BKL8oMOxOKeCWgV%2BjgWhJEN3Lkt48sGalZD%2FrNEzL7183dTLm9UJRzRWuGzhV%2FGSiaDs8yphe6W52M5DyuN4B0sRwJZoE2bnMOYippmrPnVZexORq72qNOt0FN&X-Amz-Signature=450ea3c66c6de41210b217538627a4b95050a87d17add4fd3948a84216fa05d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SXKKUTZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQDVyV6YRFYtQuom%2FzRZUFvvYWCQx%2F3fYMI75i59ICazKwIgakZbRKkRna%2FeNf0F8PwgM8fO142YQQIs03a6IOBI9jAq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDOt9THHlxpV7feq%2FMyrcA%2FHuokqw0SzMezfNcsJVWQ2oTioNCPzv0sIswb%2Boivg5UIDojr%2Fn6ifjN%2BPcQ%2Fua42HaMFeSWL0LUd6TH0Z7X%2BfP4%2FA8oTPQ15n4cv90Xgda80IaEtMVN%2FcVyxWOHZL2cVyYAxSoJfKNrbURP6VP%2BSp6%2FSgbBH7SXEX6XM0x%2FusLZkqYixsm3jutEQvHE%2FMf6b71EL7NRCC%2Fj2iagE78Arx%2B6BKvrxvD6bPY%2BGDPRYB9Re2Bw%2F7UPbSeNbeJiE%2BAW8%2F%2BaFYu1U906h14j7q2%2BoYbJoxiFuQJltDBqt7%2BKq1EuG8Bs6edgwo3vU0RF0hQpmPiu4YLNuAiLEKMsNB4Tz53RuqFDWH%2BK0YywsFXcrW1HYcmMM3Yc7I30s6oK5vBsbMRq%2BLokXwS70vvcFKRV4AkPQsWKAgbBq3IXZYjMOLAGZ3mf%2BgaSrsWKwYcsp74pt2%2B35adxNEx5s9HDtcRIDYXDGSpWl%2Bh2efpGYLFagvRB1S8eO1pVeSEYpyH0ufaHX2INPsPwCj52In0fXS1%2BRoE1X8HE0bkdeYqhbjK85QJl%2BAgdVSigvu8X5NcWlA7ZOp4rPOxjOeOd1v87bV90pWuiYYegQ7WGA3v%2F24Ug4D743hnQLDjGZdT%2FFVCMKb4hc0GOqUBFOtZu8z4ggY1wK7JVIzzZVpWZ3SqSxY54i5129XTWly%2BX0ebmmK04i6uB%2F16wn8ExO6ISqXT3BiJCrKcA6Ok%2FOLaG9Sdi%2BO3Y8VaAfxkCN4k9agy4NK3nk2OBqJeOUwBkx7Roku%2BA9d%2F48Ih2LCrD0Z812asvbD9IWdaibCJtCWS2LqGOrdLpG37FW1diBrFVmaBF1LdV8Vuip%2FZLZQ04Wd5K%2BQV&X-Amz-Signature=4f2e90e94a89027d36dcb5c59ed37bce25f511c8bcb7c0e4d3f53585e0b38259&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXOCXRJ3%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQD6QPDI2%2Fg8fTp%2BDf9%2Bloot80VQWbvLBvqJkyRCW23LdQIgfs9YkgAxLCAIfQcoAIuyQbZotBKbc9tOTcQNev%2F%2FPGUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDFJ%2BUK57z1hfFgN3RircA%2BHFw%2B4moaOQaGbsxIEektIrBpM4Al4XSbmlZKtlPQUTfj79bQQRA5p0h0BEsFiZx7QIThbi8Fch1fQ%2B8VM1D2gVsKTMoJFOGix6nvo%2Ft%2FNJAsDf5jRMATn67jMv4IMFZCT4SqvO6%2Ff%2FsrcDWsFMT2GbWLA7E9ANkygl9TPSmRWLeYKWAJsDk%2Fm74LRiwrVGZbnCDGVNRbx5UbivjmihWWWP%2FAUT6izmeVaaWxS8JbwLpcREO9OytDBqD0uyh01Vzj9iZm3nyGk4K9uGN7%2BqPQj7rxgUicilxnYrBA%2FWa8DUbn8HoX35qs%2FPZV7Po2OwFHr9nU%2BmLF7hpTdnTG9yztDdlEd0b%2BIrtSYBAJFpsat6jqMd1ni%2FXoGUHqkzGPiNE9kkeLk1UCbJgQmgJOVxt0MqO1xuV56cv1PqzSqThmjs%2FhQ6mXZ3%2FGesh0ryzNMXsezhGiedPyS2KcHr6%2BrVH9aJOpoZvJVn2Hfg1WkuBazr%2B2EEmBMJAUW61F%2BDuPzdCRi8T%2BpeXwyzSIo5GYMrwvA9cmSOYKLMJGjMu1w0W4QWAaPVsy3ccYH3ruQb4iNMradMIj3wUcjpd6pQCfHCuTfnXs6cmLRFcIsiNHVRXlvsDojbNpwuMET%2B1jLNMJ75hc0GOqUBNlk1s9ooR3j6O2RcbM924vFuD3aXP7EDOd9FnZYkQ8OqVU3i857eGdZIn%2Fii3KWuuc60jK9AacurH8NUtpe7mwEqgGuHJ1g0dfortbN%2B8p%2FrlTKKENrop3SOEXBaz3TRVhO5EvFHHZPMVo5vNh7xLiulEK3SvE1Ww6evNS2w%2BKyOJ6FFgRHV%2BAnNZnzNNrS3RdGWIZbckSG7wpiqbpllQlfgS59p&X-Amz-Signature=8698ee751ed751e284e87e1f1d7c14661f5677f9b19bf295787fda5e838df4a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXOCXRJ3%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQD6QPDI2%2Fg8fTp%2BDf9%2Bloot80VQWbvLBvqJkyRCW23LdQIgfs9YkgAxLCAIfQcoAIuyQbZotBKbc9tOTcQNev%2F%2FPGUq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDFJ%2BUK57z1hfFgN3RircA%2BHFw%2B4moaOQaGbsxIEektIrBpM4Al4XSbmlZKtlPQUTfj79bQQRA5p0h0BEsFiZx7QIThbi8Fch1fQ%2B8VM1D2gVsKTMoJFOGix6nvo%2Ft%2FNJAsDf5jRMATn67jMv4IMFZCT4SqvO6%2Ff%2FsrcDWsFMT2GbWLA7E9ANkygl9TPSmRWLeYKWAJsDk%2Fm74LRiwrVGZbnCDGVNRbx5UbivjmihWWWP%2FAUT6izmeVaaWxS8JbwLpcREO9OytDBqD0uyh01Vzj9iZm3nyGk4K9uGN7%2BqPQj7rxgUicilxnYrBA%2FWa8DUbn8HoX35qs%2FPZV7Po2OwFHr9nU%2BmLF7hpTdnTG9yztDdlEd0b%2BIrtSYBAJFpsat6jqMd1ni%2FXoGUHqkzGPiNE9kkeLk1UCbJgQmgJOVxt0MqO1xuV56cv1PqzSqThmjs%2FhQ6mXZ3%2FGesh0ryzNMXsezhGiedPyS2KcHr6%2BrVH9aJOpoZvJVn2Hfg1WkuBazr%2B2EEmBMJAUW61F%2BDuPzdCRi8T%2BpeXwyzSIo5GYMrwvA9cmSOYKLMJGjMu1w0W4QWAaPVsy3ccYH3ruQb4iNMradMIj3wUcjpd6pQCfHCuTfnXs6cmLRFcIsiNHVRXlvsDojbNpwuMET%2B1jLNMJ75hc0GOqUBNlk1s9ooR3j6O2RcbM924vFuD3aXP7EDOd9FnZYkQ8OqVU3i857eGdZIn%2Fii3KWuuc60jK9AacurH8NUtpe7mwEqgGuHJ1g0dfortbN%2B8p%2FrlTKKENrop3SOEXBaz3TRVhO5EvFHHZPMVo5vNh7xLiulEK3SvE1Ww6evNS2w%2BKyOJ6FFgRHV%2BAnNZnzNNrS3RdGWIZbckSG7wpiqbpllQlfgS59p&X-Amz-Signature=1e9a67b326fdc0401cf35cb970c07983cd2ae545d389cf8ccc7b46801858f220&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TBFK53D%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122733Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCIBcDTs8AyruK9Wz0JK8pKlXN2hSJv3QmIaVF8NuDjeVcAiB2tlSPFI1ZoT7Mr5f1v1Jbn616xClQ0n3MD%2FvzGyiDtyr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMTB8XfpZfNz4pL09NKtwDJ3BMUqRb1X%2F%2FmnrS4Pgt5KWzTfROVRD3LViU1MT55IEsFV9tLt5EhUNNC8Cx0VQPZbTCcHAqxB9j7zEZgGnSOFptRksObSTPzRf1WoLE2Px2QaDq5Oyt5mH6UWtIms6Tya0KVtJcY1KJHJY1j0f3B4WCcwFQSz0jJdTJnXuH3gBZG3vPQ4wOrGzjnO0NvcFpoIZUlbnvm0GHt2RJ5UH%2FSsEMtxDtCjunTQ5vM3FSoVdfw8jhiEuu87iXWyV5nUzoqf4%2FA207peYvGc9TPDoDmTFlBfPMJL3NGdXdMflARxECYAHgtDJUb5rGMQPRYtqIavpR2EAPkWlyUL18vkDCRcVphcp4Ld0MgJBFUjEeFUYdmkqq45xi1Gm3gVFOgeKZrPQBkfgTI97XM4sUhTmnHDozrTQUR%2FpTwqTaiKR3gM43m2pK%2B4BMliO65kvjCgaX9uukqvo5HK2AXT67r1n0CuZ%2FwHqSaGZ6IqfUJgpy%2BpfTgRwOJMMx927xukeFkIHE8K31A6NfwYzX7jGDrT5u5zeMi%2BmfcjmYebyHvKB7eYPRbBB0pSYx%2FmYcqFmHjhXgO7bxa2kIiGnsJHVPo%2FAUogNjSex4TH28nvWrAMP1qsCGNRYz5P1ZOdMPalwwoPmFzQY6pgFjlK3i3AEYTN%2F%2FFL9lDQoaybg1PZc4KVq4KPpuWh7V3mW8vDOEiYon%2B0GuIbxOxbt2LPnwBDgtOtX7YN5heCJPl%2F6yx0N372Zetxm%2BdULw%2BLpybcM4qCEhhEYgCUhCcYGKF5eeSMooETTbpybc2MMu2ZGrXUqxRN7uTb2N6KZD%2FGmgl8ctk9iBH3uRS1W%2BUJC8JsTqDvkBqSHd9hxq7%2BVuwLRbxVzw&X-Amz-Signature=847937ef93d447f1b526720417d51beddbc162e667db4acd8de90b3769e4dc3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFHAHF3D%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQC6E9dIKjbQhWmD4NueR9K7rbDIp1%2B0iKmKnGKu1gJNAAIhAOVJEdcPMUK1a6K5SHQAmxLQMCJbxyHFQeamvjIx%2FpCKKv8DCDwQABoMNjM3NDIzMTgzODA1IgzEeOYF7xUes%2B61VUMq3APcgjQNWf%2B%2B7u4Jlgpnsz%2FJlrLQWftQTBsGk%2B59gNjd%2FlXLxZsU%2BlIE60kO%2F8TwwoAvlJrd3g33XWes7J5iRaYmLW8mbCqEd69lo8tJIoXPBL2m2ChE%2BiVJ7Y3e8IpalGMANXbCZ5jz0mdaX08GCzZa%2FqISUMDppytgulocljtrhOTpcbmEVvyOlITnpY7iISJzzdZzjflbrwdbE5ZZJhRnPagucjDK11Ix2KhrtIWd23Cae5F6%2FF7co7P%2FakcndjG4evpmlnoo0JdIK5vNrf2N%2BvDdSpJU4DjR84jJTd4PGcyXS4eh%2FVBmSejHdgeFOVuNmQr3ZWxyRx4vVNgybsB8%2BirZGZ%2BGJ8HJHDHHpJGp1TMQStbIV4ZhdonlTyrs2gNQHEL1YHjbmD0utYjmUpp3ArLrddjBGmbAx5KOMgGup1iTrPm%2B5U%2BnBIE72LLDWw6%2FEo0JD1Pgbipy5du3KredaNoqw2Si0x6yNVp7kYquXcD5vJBgLb%2BuC6OgcaCCUNhjRqNdJNoaqjyvIjPzX9yNEahT88xtkcxtc%2BawKAray19fyU%2B5j5QUi2bdl9Kf2cRp7FlA5%2BfPQLLQjPOqnkqvzu8TlAoeQiic7E49QM1sAX00uDd2NVgQWJPJQjDQ%2BYXNBjqkAS23UFirpcU9MvVemb73AcA2YgSvu8qW5KLU%2FzXaixoI599ajrOCaigCNBbttf9%2BKD3llCH%2F0Xv31JSedr3W7CYK6DV2k5ZWqNwkQ0MEoddBWk7viJLRVn6WrrtnVvkiFLiLyHpjfG7Z2d989UgLgCfTsFo4dtVtKBbRbqFha2D08aQj7sf6oa2hpYWVwWdL80%2BMpqgg%2BLDBFXb4DeY165S99YM8&X-Amz-Signature=ac533e22d7ac5505877e98d2e9b4a0db2524c0301df090fd5f07edd208a0caf2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFHAHF3D%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQC6E9dIKjbQhWmD4NueR9K7rbDIp1%2B0iKmKnGKu1gJNAAIhAOVJEdcPMUK1a6K5SHQAmxLQMCJbxyHFQeamvjIx%2FpCKKv8DCDwQABoMNjM3NDIzMTgzODA1IgzEeOYF7xUes%2B61VUMq3APcgjQNWf%2B%2B7u4Jlgpnsz%2FJlrLQWftQTBsGk%2B59gNjd%2FlXLxZsU%2BlIE60kO%2F8TwwoAvlJrd3g33XWes7J5iRaYmLW8mbCqEd69lo8tJIoXPBL2m2ChE%2BiVJ7Y3e8IpalGMANXbCZ5jz0mdaX08GCzZa%2FqISUMDppytgulocljtrhOTpcbmEVvyOlITnpY7iISJzzdZzjflbrwdbE5ZZJhRnPagucjDK11Ix2KhrtIWd23Cae5F6%2FF7co7P%2FakcndjG4evpmlnoo0JdIK5vNrf2N%2BvDdSpJU4DjR84jJTd4PGcyXS4eh%2FVBmSejHdgeFOVuNmQr3ZWxyRx4vVNgybsB8%2BirZGZ%2BGJ8HJHDHHpJGp1TMQStbIV4ZhdonlTyrs2gNQHEL1YHjbmD0utYjmUpp3ArLrddjBGmbAx5KOMgGup1iTrPm%2B5U%2BnBIE72LLDWw6%2FEo0JD1Pgbipy5du3KredaNoqw2Si0x6yNVp7kYquXcD5vJBgLb%2BuC6OgcaCCUNhjRqNdJNoaqjyvIjPzX9yNEahT88xtkcxtc%2BawKAray19fyU%2B5j5QUi2bdl9Kf2cRp7FlA5%2BfPQLLQjPOqnkqvzu8TlAoeQiic7E49QM1sAX00uDd2NVgQWJPJQjDQ%2BYXNBjqkAS23UFirpcU9MvVemb73AcA2YgSvu8qW5KLU%2FzXaixoI599ajrOCaigCNBbttf9%2BKD3llCH%2F0Xv31JSedr3W7CYK6DV2k5ZWqNwkQ0MEoddBWk7viJLRVn6WrrtnVvkiFLiLyHpjfG7Z2d989UgLgCfTsFo4dtVtKBbRbqFha2D08aQj7sf6oa2hpYWVwWdL80%2BMpqgg%2BLDBFXb4DeY165S99YM8&X-Amz-Signature=ac533e22d7ac5505877e98d2e9b4a0db2524c0301df090fd5f07edd208a0caf2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643MA7OSU%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T122754Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCnYZ3bZxcTKL9sHWQcbTHqdOxtBx5lQMgMjnZyaUiuuQIhAPwBRZmUKQVcOVKDj976lVcYhzpr5wAxFPFCtPnKSCyjKv8DCDwQABoMNjM3NDIzMTgzODA1IgwEQ89Qlb3tWy3o4e8q3APBELol5w%2B1qz%2BpV8YB9es17vjy3Cq8220gVnnMt04%2F9PE3dXDcoZnr4pl21scl%2BNQiA6vYvliyaFTf%2FabVNEVo3yOc69Fd8rLr6opVIMHKHJt9D1Q1fCMGBIRo%2FFxUuwpZJhys4i86fWVLt5eSGKtbjSB9cxbpgI%2BlSHls%2BctKXX3MGjjy9TlzDHwKbkRrpd50XtWQoZpr1pvgK9yl3Kl6lV%2Fqnn6V0r5wYWDlTLWbI6Y9h%2Bj8s3WtpUGBNfXyodjJl0YChebQ0TJXSVXl8K%2BXSYE11oINr%2BlppgEs0RDY%2BpdIkAetLIhJWrXRV8PYNoj5fwchC8VRw2w37c4qPJycY%2B3wb7HPF%2BSN8qBEKBGau2O8bCcgn%2BiOPZkVVOigjhWYjuvxgH3kOA1wUgl30lEWiNfEm9lR8qqk46bIzn5LXtpyaG1cP8tzIyAe%2Bp0UM8aai71ByKM%2Fite0VimIp54q8XJ5hc1cOaKW1TkawhzW%2FCqkG3r0UlCn1nDNcAnZw1m%2FTyDjOHlh%2FA7sj%2FkBM9I0KQgs4WAqMeE6kvml%2Bd5OKBKqYjDIGwLvgWAOtwcUO7qbDOscTnhPwNYMqBLDpuvR%2FmwC7UhS7fq6z6m6nPBzFa2yP5B2NTLlAH8DijCk%2BYXNBjqkAVu7sLVsaWKZBtgR9JG8m5jjuVpczfucQfC%2B8y3pHqev6wpsYH8Ku2Z%2Ft6CguQK7aCkxYvh2gdO1u1Brl1bIC4j9DsP2apBKDvZR%2BhvsLRyC3J4%2BWBt%2FIIXScIKMnieH2W%2BJqXWsQSgMgi79cn%2BzwcLSC%2FqbQ1xRa%2FFVPs%2FlERCoOGs9q1JHbrlHjAE%2BfVel2RCciEGEpOtonsDw5l6DZS8tTquI&X-Amz-Signature=514980da5551206fa45ad106c670d642f3c585bb9d0951a4e6cca3a6e38a4684&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

