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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDPRF455%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGx4Fmz781hvYrtc1bJ920qvxyf7vBgZ4Sy%2F%2FOlBzQIKAiEA26M6zKE%2FjM4k6lBVNOWcGo7S7c%2Bn61P2SjAHN0rlX1EqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP5Y7oTQ8J0wHJk5ISrcAzOH1AFvEWRfni9nVPBSb327FT5v%2FbCtKvrUV8DTS3%2B1btZ3ToLPWYDnEemhuGXkdzc5ZPloTRrWrnGV4cQGUXX9gtBajpdos9yk4owPv2CG6cuQP4yJGSOpuHdOgPIFSFKGj5sNWddp3GZpo%2FnxOmlcszuMiLSJDcaZUroqcQZ6UmIQRRC%2FnQ9U5EgIPeBmBAk3QIf4MlCndp5w4ZTgkGkZymgbXHI5v5h0SvdCkV4hgZchqVFF8xQGuPz2W9611qXy5r3bfuNpdVqp7IlS3jdSdaD2EiGaeSX6f8RJAJxEcmMpM%2F29yqhGd%2F%2BqelKUjYh1Oo3CyX49fIHbCVzwvzo6o0%2Bjvixwyy%2FYEYgHW%2BJg3oB%2B0oC%2BtgihyiZdDS%2Ft7lQPd546d04IYISVLkEqpinG5nNFBxXPFqIyRKrqo1frzf4zF0ltgmw10gVjfFINpeDK6W3fZQo9ToD32vKEOYizjo4GiMQFlFg4Mq5VInPIUL8IX%2F3DzsOpWSCr7SCMDv9pl8sQQN4GwH64kEAw9DMNuw78BksL4nThaqtRrp4dryaPS1YSlQrEfFnhqFM%2BRhSwmZAR5e2Yu31dlGqK%2FoYnIgwIDQkbitl1v9vAQpy1CAqHaWk98p1GMUMDMPqZmM0GOqUBMhmRs8r%2B5apEymy4oAIkShjzMAdijk2%2BlpSaGIeU7ey1%2B7geYDSItoWypvfGXbeD%2Bkm8KUy0bnhjtMBelvA4%2FKS1%2FoeRZhWrIsRmmTJqaPlUXbTXfAiEOtmiael6tZmeqeMljEuUc9Y%2F%2By7ttd%2FNvnuvnEWbBUc%2B99SLS4ZTBX5hcAT7f9KbODz62CrRlOoxcLhEtJlxhhWOuyhAc7cMueA%2BnAmw&X-Amz-Signature=58936e138903e24c4a56bbb8380942fca8b315325baefd5b07b0896e3a4e5fd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDPRF455%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGx4Fmz781hvYrtc1bJ920qvxyf7vBgZ4Sy%2F%2FOlBzQIKAiEA26M6zKE%2FjM4k6lBVNOWcGo7S7c%2Bn61P2SjAHN0rlX1EqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP5Y7oTQ8J0wHJk5ISrcAzOH1AFvEWRfni9nVPBSb327FT5v%2FbCtKvrUV8DTS3%2B1btZ3ToLPWYDnEemhuGXkdzc5ZPloTRrWrnGV4cQGUXX9gtBajpdos9yk4owPv2CG6cuQP4yJGSOpuHdOgPIFSFKGj5sNWddp3GZpo%2FnxOmlcszuMiLSJDcaZUroqcQZ6UmIQRRC%2FnQ9U5EgIPeBmBAk3QIf4MlCndp5w4ZTgkGkZymgbXHI5v5h0SvdCkV4hgZchqVFF8xQGuPz2W9611qXy5r3bfuNpdVqp7IlS3jdSdaD2EiGaeSX6f8RJAJxEcmMpM%2F29yqhGd%2F%2BqelKUjYh1Oo3CyX49fIHbCVzwvzo6o0%2Bjvixwyy%2FYEYgHW%2BJg3oB%2B0oC%2BtgihyiZdDS%2Ft7lQPd546d04IYISVLkEqpinG5nNFBxXPFqIyRKrqo1frzf4zF0ltgmw10gVjfFINpeDK6W3fZQo9ToD32vKEOYizjo4GiMQFlFg4Mq5VInPIUL8IX%2F3DzsOpWSCr7SCMDv9pl8sQQN4GwH64kEAw9DMNuw78BksL4nThaqtRrp4dryaPS1YSlQrEfFnhqFM%2BRhSwmZAR5e2Yu31dlGqK%2FoYnIgwIDQkbitl1v9vAQpy1CAqHaWk98p1GMUMDMPqZmM0GOqUBMhmRs8r%2B5apEymy4oAIkShjzMAdijk2%2BlpSaGIeU7ey1%2B7geYDSItoWypvfGXbeD%2Bkm8KUy0bnhjtMBelvA4%2FKS1%2FoeRZhWrIsRmmTJqaPlUXbTXfAiEOtmiael6tZmeqeMljEuUc9Y%2F%2By7ttd%2FNvnuvnEWbBUc%2B99SLS4ZTBX5hcAT7f9KbODz62CrRlOoxcLhEtJlxhhWOuyhAc7cMueA%2BnAmw&X-Amz-Signature=58936e138903e24c4a56bbb8380942fca8b315325baefd5b07b0896e3a4e5fd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662W7S3FEP%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHTZos5xgQLTcWPPumyjMoV2XcmNCa8ARINEvi9%2BKgQjAiEApcaR%2FMTOKITKTm1flBZx0jvIvtDEYRIBKMR%2Ffr7gCX4qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHv9oIfW%2FkXnyn9aIyrcAx37RTZ81hefFC5K3c6M3pDaqMtnlIkRNDVSXGw3zReliqo8h1CxE865sF5BfgKBfZN%2BGiKzZ0R4QfU0U9Zirsp0D0VUBCi2zb50Hwt1yXv5H0Raw4bxWFjSwvhggMinP0nsbczCXrrEpyMzKdy6YBDKzA3G1LvsgslhWD0jwMSFsrleN2IR3z8wn7inhf7gnRVhi74oVZnXwvQBxZn%2FveMwlgv6W8GMES9GGEq0GocFz%2F0zYR5%2B%2FmOfUEbxIlW3c91%2FeTmxU%2F%2Bs%2BDgUsHDdvMGwyoobzQn0vWp8OR7JmWDPH%2BOFPzJpzoaetY%2BabwcPT4RHUQbwAs7%2FLpMhp86ZUsUVWAmZ%2Br%2F7Hm800jhiJImK7G%2Fw7GtyzeYHXH6vW9xrIkJ9eUC1%2BYkE2qDMfKh03wnZ%2FjN8Z7ZrFbtfnNV9wuwX8Nn3xZ8lPgmkRMnBDjpvHfAIkA9UWFW%2F5NI3uaUf2s2Q%2FpvEvjK2mavw3eFCfTnqNcPFHpH7ZkmGKqSf08t8LfT3rmpGGuRzicHnxQ5mpHAJ9HWp58UK19ceFBKEvaLLL5fV9a2cgXuptb6B%2BRsIuha3VPlfNgr8hH0bwha5tlPCdcWcEnR7zQElzR9Sbe%2FKKScprQ86JMO1e7CpMIGbmM0GOqUBLDNUvy1eL4u3LtkWEZOXJ73swHOTscKYFub8JceSYl9Y41Y6mIDQ6pFNB8ItKQEWVX5aQY0DtD9ErH8ELlr2uBBWEbBF6VwQIJ%2FolvuolhOj%2FTdB%2Fzuq0DwKkRhNkP5yzcqia7KaY8bE9QrnD6Wi5Km0lpCMLjCbT%2Bl3pFoPD3mXRJSKLsU6Nd7B%2B28t6UUfKl1HIn2Xf72BL3xqAefs84wfoN%2FF&X-Amz-Signature=604f53683179b3cb1cb0417002d2f284e046d35382a7021f898f846365db2212&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WH24HYRP%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDNKC1%2FsCAB68oUOnY%2FFIPgknDiT%2BEHaBczx9o8MnWqbQIgSZSKMNTmE3sImBBPML8n051l4wW4BXGCLZhcQVATqPIqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIk%2BbC%2FK%2FApAHgaD0SrcA2Zio%2B3daoP5%2B4hRQWQ0nlSddq%2FhF%2Fzdsmqlu42YbGyfd7i7zmoJONjnLlmw85L%2F9vYdXQz9RKe1kdXkxtSd1sTUd6dp9SsjEdb35B02qhajGfyqoi4ZlNijJnqs5flnoXCKve08JB9CeZZZ28iLNtzZtlIbxmZs7XpheKbVIeRdrq%2B2xAumbWF6%2BUZykZYBZeCurgIOa2wDWI4Htazl7T1BbHzR6AHiOqELpL09dI1LvVFqCaaZvIK2fX2NRsRq1Xw3%2BWJA0hs%2FB746pHfCgreXUVvGVB0W%2BZWkN5nemFz91ccZ6JeU7%2BBvoxwPbZ39XrTZKLY6GQSAkTVVsHKBNc8tWXMLcRoS%2Bqp2bS5YEYkdTRzTPVnkIpcDqhpBuzS5TK8CKX9Cg%2BuLgiSjormY%2Fx6r7ytJzNlMXWNe2UFxLK64C%2Bpiqj9eyXgpNM10YcXk7OL2%2BxFR3UdL8I0NI03cS3t6wBwLRS81Pn8nUMNtfyH0supdG9BuIvA0ghXyDFM%2B%2FUtNXBVRs9X1J9oYKLA7K3Y9EBQoZZHVavgJeF0YGGUhxxIRWIByc%2BNsX6a9SYDfLaG4T53P7orzn1XkYLjbXHelyTywF0zdS6%2BgdvQ3gxGAjmKGEuEx%2FmczlTccMI6amM0GOqUBGHLGzRgBVVXmQLNiU6y5L5W9vo1VETixI2217iK2jepokQtqeCb7jbh2p9hQhI3sbH902WGRhE5cJLTcoK%2FxBsYKJQVoQvP1ZVjMELxfK48AelVLxjBF2AtUu1XFOsW%2Bx86pOXZIbHI07jcVOORamV%2BkfUaG5M%2FuAtNZdMuSAcputUvo1fUTy5XtqoBmkVNNz%2FEVob3kmDIHB8k4mMHMrfzYdH4c&X-Amz-Signature=eeae7b18eca0e3e3bbb24f23ea9f21fcb44c09d2cef9d40cf8f20a4025b638dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WH24HYRP%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDNKC1%2FsCAB68oUOnY%2FFIPgknDiT%2BEHaBczx9o8MnWqbQIgSZSKMNTmE3sImBBPML8n051l4wW4BXGCLZhcQVATqPIqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIk%2BbC%2FK%2FApAHgaD0SrcA2Zio%2B3daoP5%2B4hRQWQ0nlSddq%2FhF%2Fzdsmqlu42YbGyfd7i7zmoJONjnLlmw85L%2F9vYdXQz9RKe1kdXkxtSd1sTUd6dp9SsjEdb35B02qhajGfyqoi4ZlNijJnqs5flnoXCKve08JB9CeZZZ28iLNtzZtlIbxmZs7XpheKbVIeRdrq%2B2xAumbWF6%2BUZykZYBZeCurgIOa2wDWI4Htazl7T1BbHzR6AHiOqELpL09dI1LvVFqCaaZvIK2fX2NRsRq1Xw3%2BWJA0hs%2FB746pHfCgreXUVvGVB0W%2BZWkN5nemFz91ccZ6JeU7%2BBvoxwPbZ39XrTZKLY6GQSAkTVVsHKBNc8tWXMLcRoS%2Bqp2bS5YEYkdTRzTPVnkIpcDqhpBuzS5TK8CKX9Cg%2BuLgiSjormY%2Fx6r7ytJzNlMXWNe2UFxLK64C%2Bpiqj9eyXgpNM10YcXk7OL2%2BxFR3UdL8I0NI03cS3t6wBwLRS81Pn8nUMNtfyH0supdG9BuIvA0ghXyDFM%2B%2FUtNXBVRs9X1J9oYKLA7K3Y9EBQoZZHVavgJeF0YGGUhxxIRWIByc%2BNsX6a9SYDfLaG4T53P7orzn1XkYLjbXHelyTywF0zdS6%2BgdvQ3gxGAjmKGEuEx%2FmczlTccMI6amM0GOqUBGHLGzRgBVVXmQLNiU6y5L5W9vo1VETixI2217iK2jepokQtqeCb7jbh2p9hQhI3sbH902WGRhE5cJLTcoK%2FxBsYKJQVoQvP1ZVjMELxfK48AelVLxjBF2AtUu1XFOsW%2Bx86pOXZIbHI07jcVOORamV%2BkfUaG5M%2FuAtNZdMuSAcputUvo1fUTy5XtqoBmkVNNz%2FEVob3kmDIHB8k4mMHMrfzYdH4c&X-Amz-Signature=3c2035e4bdf481a8c5b98e7196c54f2a96be889b1f3023dd3272134cde3b82bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666U7VLUXZ%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD92qcfmjYra4tL9uH6DFrYUzR2BXO1GlyWqY0FWZUSbwIhAPm9JjpBZ3UASHBZ7irhaXRQYVfS8g7jz0fzT1J22L%2BVKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwjTdru%2BP0LewTCnC4q3ANd6VuBrNGN1zE1N%2B5fRsRg2Pr8n52Clue4R3DYH81Qny2ci1TR52EXFhgU0GfOLWnX7rvqHbUtmNlH%2Btp4QTOHPo3yw1giCCB9lBrixWiDyRzqS4Pne7d%2FEYszj5OrsKSvBRbUQRn%2F7ErBmG4LXwN4iXKuh77f2A9%2BNJNMJJAQRdf2ctph220XFHgYatfNUdaVTBgyOtC5Kr7GZsfU2OMxgxc0Tg%2BbM%2FQwpQ5U4yNAKUDRAtrPYT5Q6cUWbgZWj5x7kb4YZq2q7SxC4iXik2UYjTRfzo%2BPsJgMaeNBGOUHQ%2FSFULmCpPSPuH3MWx%2BIMfwQP1mtxkl%2F9cSz7b1BB9elVnGkx%2BKs3hWm3p9nTKJy0yXoaLto9qmDTZxV28pKGrbbUkoxMhU3BirSqzUkp3R6x3aZiTWeAblFBftjE30DUjoPwvzw%2FqJAgjPDAKZrnfWHYAC9VHWZAFMLs7KXnjN4HY9OfxQbjN%2BwAiPEQEBBLld6S%2B1JCjRtxNY8hN0nhw2vj1aZIRwNSF8%2FwPfaKFimMTDMVhmexWfJ8Cxt0f7MsODxkS7LX3j%2BYR8VMyZaFmoREGwYNF8e4s88XSNUBKLgYkTxxyS9fyh85VdMPiC8Qh6GWiowNhCKNpFoYzCPmpjNBjqkAZ955ZGGeINVmulfCHo1fWviIlD68iL9Qu0UV3aC7VkbSbVD3QHtjdGja17JNAIT0OtJMCHiZj5fHuuDrsDWYmvLejFGWcZQ5Rk%2BY1y%2F71QaDLg7%2F84J31GPWvuM1OX9tV6NKH0I%2FzjsNrBoBTvdE0rGcwh6eNW1jmsh9tpb5iccVKPSN9l9wsWP%2FCRABwGPStg5rKr4%2BtJHZxwUooFiLV5o4MtU&X-Amz-Signature=af3a9e90b5ee8c0630ec4795cff930b5317cf7e5a8bb6563e3fe87dcaa34aecc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662ED5OOZ%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCQgeHQBIqNr0w%2FAoR1972onp7zE60UrPshWALF43u0VQIhANwt94iWKrXyJbH%2FwgG2tLpLvI8gjgHiWTJYv4ISYG6OKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzbfgus3x8XNtN7E1Eq3AP02oC0EqcGeOAWLTgxwPCGaf8TTCpb4v6dA%2BIXpIe2W4TtCjbEqmg%2BiKAD37SQqrfRSEnQiwzD8pM%2Bx1M%2BY25JnptsZYiZwWySONCrkLu%2BKcKUA8uVzD7Kc369D%2B3wab1oUFxgbt6enS0gF%2BJj03P5QQj4fwLVSS5QHn12tafs9Ak1%2BPTMy05NDOz4jzUwjkI0xHLVAVCLTGMujfzsgZ%2FGGSyZbkYV%2Bhqub5J27j4%2B7pzQg5SPNYMtGZQ7CKEw55e03%2F5cpqOoWUfWxgJfPyQ4UWfTFKvmEMsE2ct48qQdwhE8BMj6UjpcwArteqY6OOB5aWcItw7DixSW%2F9%2Bxe1Ms2WCVBEh%2FWcaPM%2BekAPCbJe4iOZ9DHS52wJR3NaZZouyQnh6NxTK9vYe7KUJl1jfd2Z2TrVH1H7b1E2s7TSNCtV7YuzwZQoDQ2KKDAanp%2FbiiSNlvG5igzOGx3ns5Dna36Llyl8ZcTbiCbLKrUJvXNYcTEXS85OB92b8GJEh3E%2B3C15a7VQZ%2BbAadjV%2Fdm1mJQNMm%2Bw1FGzRy%2Fznj7xFNB43SaywVjaXo3DM3Y8%2FcKgiqvUUd%2FD0UbnTIF7Uy9X8BZBCPKA3VyiAN8ahtz507MvAPfAK%2BESd9SoGlXjDtmZjNBjqkAVEe1V07xcOWVj9upVzb1SirLp%2BxFW%2FX%2BWtfj2eR2%2BH%2BztIbKiqzlMwp6fEdrA0eBYW0jGDRp5J%2FBj0JaL2MfslsiytkecZ8WpbQb%2B2hBA0LA7dXLnd1wYnkV%2BBuqcyZ1af84y7K3v6%2Bu36CVWBzCrX%2BlpuSW%2FEdL3RmNrSrQNZW8mHQUyTNcNekcwMFs%2BYq0KkcE2dQGL9zqPtKR171ek99J3k2&X-Amz-Signature=09f5b0f8f2423514208bcd52dd4602f35288ab535ee5cce3b6c67dad99f70afe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663P6X4ZL5%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICKiKGmYG1p8dRa1L4znXcv3jI3GRxM49i5YIfucnKT3AiEA3kX99ZNzYpLS%2F0rKXNFwV8E40WDup6lay8iHlUw5%2FKIqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO6or6PZ%2BlbQEl7k8SrcA27tbNcqiRte2Sr12qLAQ39ChuDMB9oPBRo3CvRDJTYMj262%2B%2FwIhCjfANT6Kczt8XTyys2eyrGzKxY7s0BKNMbnAaHkwJ4PWZquqxuiF8%2BD%2FnXqJGiLT3DMOVU%2Ff1lZvGI%2BAzkqSFtvnLPo3fS%2BB8ncrrtOw%2FVVkdnmsWxD%2BWbjjy%2BDfeigPpqOQFm1P3H6O1LByJVJEjalNEJy6kIISfzZv0n2%2BQAgvpKB9QOyy879gcWuINIITZDhtC77lzxI0EeWUlDUceKgFvBETFJ4ZfILXB3GxQHhaAu8rgBMbTvQIkZzSASSkmaUAGGPAXC4Mdw6KdI1YQXR8w60NozbZwA65G8kfO8S5bRvjSvRAR8TRDlr6a8jC3uOaWbTfyuMRzRJMfNoQj%2FINxkgSMHjm49V%2BerByvOB8%2FRLITnjQ1f1%2BmrFXv6okJ7Pmww4DH7qEvvbKHrLAZvlQYkoEVBP3vqmaxplZGlF9WK75yEOGIct6djcDU%2FXpbZX32%2FCPMjuDgd%2BH%2FTLQGM7Cpr8vGjmnYYwtaCa7uDKvGyNK2bvgmo%2FqiOnTet%2BhTjlvbsrEK2PATnLoaJs9IdErErQvoaH9ZQswrtKctYJJoVH2Sw%2FmnWE%2BkXWDkJxv488p1gJMMeZmM0GOqUBpaezxivIiOUiAlk0JQZk6b%2FSzkI%2F3OU0uyxMe3wn5mQOrAjC3H5tLX1nabgn4HkBOMjluc829jaKXcVVJqQQ4V27RE1x2Lul47MF8FlizdQPYGySfj6gjxGdvD6ZtYEjtSitXXqVu6hcE6k24hP%2Fbl1v9rcX3QFkCKP4dhXsWih4OHPWlfiBlNuupIxDVWNC4PFqs5zO8jAvpOvQjQfFa%2FNsHU3K&X-Amz-Signature=11e6768c7fc6d122786c6f4e83855c698630ec149c1499006ee3508d5f54d97b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLGHKDKN%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFU8whZY3Ji04afDAGFLHoI4x0ZE91%2BQ39YBqrhQD84MAiEAzfrhB%2FNFJYrtHYNhyGdIuswOY6Ze%2Bt4OZnOpT8fEPL8qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOUUbghrG1zKIRX24SrcA9WPF2Wn%2FuUCxWak95Pzfi6GsRIyVqboLQLUORMdrGCRomefb9x4gzHQCP%2B%2FL0IRewvYzsFaMbTwRcZzmNH%2FiWyGc4DbkWVh5Ch36hMKOqxYl1lnfr%2BVrHSn79%2BHhe7iUwr4XNUVPxyOtA%2FPn%2FL1mKkz8GWMR2u2l%2BiV2%2FC8G7a%2F8y086%2Fafjv2gct03adpncasvDkbxWRCaK0ZQokTpgipXwsyZ1fLveBN3jLOxQnS7rvqoW6qfNt88CI%2FPRHl7%2Fv0p48oEzAWk76UlFG2D41wmn8KX0G5Jme2GhmG7pqNSKf0ryseIbW73Z8SrGDGAOJS6su%2FtEsGAOJfi5LPwkGkImzcnA7hrp3NXyNwUm9mzj222vUmRHjk0tS2Zkoqj7%2FhndSZP5RAEncKt%2F4%2Fj9BegORnnPk0M6TnSKM124GnerYsJgcAsJN%2FXfdj%2FxfKsphcGahNTXY2Os58koAwEwqA2pPRDTLefV6R5vd4Qkvqg3MMtzzVr2eijGCFdJSWB9k7yt2CfauM65bpRJMg39803Sz1lZIDAxqGjrQT6qPp9RLRv5uRbRfLJJdH3sgaLJH5xDFx54x7g4OWo%2FtulMahhj3V8kDxtyfcBzkyvlY3s00vaWw74xBsNkODqMLCamM0GOqUBxmz%2BBZpkXcHtdDKXvgbqWiewDGk6GgpgSrSYuInk45lMp7nQdcYvUshudYycQZnlut%2FsZSOoIGme9RTNl4yDb9dY0ozigvhjAAU%2BLWBSSXTcXeRst3wsRBkukM2y0I3%2BaXLyJe7SeRHqpB8JtQGTDhmsPetvaMipN1Z9aYOeX1FDtJjCI1QFlKtmZ%2BJ62zHK%2BAB8zaigYWFi3hVKdgcrlMKW14wR&X-Amz-Signature=1978d518c9f747483a803211143f6f961fa9771d084405e3f1da66cd97f58f96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLGHKDKN%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFU8whZY3Ji04afDAGFLHoI4x0ZE91%2BQ39YBqrhQD84MAiEAzfrhB%2FNFJYrtHYNhyGdIuswOY6Ze%2Bt4OZnOpT8fEPL8qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOUUbghrG1zKIRX24SrcA9WPF2Wn%2FuUCxWak95Pzfi6GsRIyVqboLQLUORMdrGCRomefb9x4gzHQCP%2B%2FL0IRewvYzsFaMbTwRcZzmNH%2FiWyGc4DbkWVh5Ch36hMKOqxYl1lnfr%2BVrHSn79%2BHhe7iUwr4XNUVPxyOtA%2FPn%2FL1mKkz8GWMR2u2l%2BiV2%2FC8G7a%2F8y086%2Fafjv2gct03adpncasvDkbxWRCaK0ZQokTpgipXwsyZ1fLveBN3jLOxQnS7rvqoW6qfNt88CI%2FPRHl7%2Fv0p48oEzAWk76UlFG2D41wmn8KX0G5Jme2GhmG7pqNSKf0ryseIbW73Z8SrGDGAOJS6su%2FtEsGAOJfi5LPwkGkImzcnA7hrp3NXyNwUm9mzj222vUmRHjk0tS2Zkoqj7%2FhndSZP5RAEncKt%2F4%2Fj9BegORnnPk0M6TnSKM124GnerYsJgcAsJN%2FXfdj%2FxfKsphcGahNTXY2Os58koAwEwqA2pPRDTLefV6R5vd4Qkvqg3MMtzzVr2eijGCFdJSWB9k7yt2CfauM65bpRJMg39803Sz1lZIDAxqGjrQT6qPp9RLRv5uRbRfLJJdH3sgaLJH5xDFx54x7g4OWo%2FtulMahhj3V8kDxtyfcBzkyvlY3s00vaWw74xBsNkODqMLCamM0GOqUBxmz%2BBZpkXcHtdDKXvgbqWiewDGk6GgpgSrSYuInk45lMp7nQdcYvUshudYycQZnlut%2FsZSOoIGme9RTNl4yDb9dY0ozigvhjAAU%2BLWBSSXTcXeRst3wsRBkukM2y0I3%2BaXLyJe7SeRHqpB8JtQGTDhmsPetvaMipN1Z9aYOeX1FDtJjCI1QFlKtmZ%2BJ62zHK%2BAB8zaigYWFi3hVKdgcrlMKW14wR&X-Amz-Signature=f6e1a2583e16f838a972d192f49a88a736e89680e348412e0b126cd2c37fd60d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XC434RQ%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDtbdx8uCQ5xALxK9hpUSQdyWPxYKx2rtd6ici2iVoCoAiAhnBE0vvi4IJq5oQX1qsH4sSdT%2BnEc7H1jTvrmEPdOSiqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMoRnQWdAURbpYpg7PKtwDPNCwwMqvgjY4nIGVYwbPOwVBWprfasEpe06qE3hObM0s0Wb0ICU9KcHzGrra%2BhUSrBQDsNq5j6knwTdFvXTSTXnuv%2FSAjPxMojmN5votE2ZQr9mQa7PXzmo5xip4FD2lmiv21tB3rvhVYRaus%2Fa15GMtTWESjWwYfFWD6M4XBqtwWeuIjqVopnQZtb6I9LUI8e7sB00nBeql6vnJGez7OmsnP5edKlv1A8ZynTHVeizMWMxSIhyReaE91K1%2Bqr%2FWVqg6LbvDVmo0vJ0QVwy%2BvLVvDvjUji%2FsQhTuKaxlmuGBLTVZeom3iZNuntRjqmisrfSSt07Pe8JW4hacKXhR1bhompIDs5UUVfY0a7N5oKRoYr0upcuc85x8jP0gwNhi%2BGOY252p0jKFVXFM2XaIR%2B6x5e0Cgbn81mFKHMu%2BgCOyZf2E51ivap%2BK6voMalYha0oRJhvKL0LlQEvE8Bn19JSfdTYvi8fuegQX19Hd2W21Ffd%2FL8JM5Cd6MPv%2BJjqWnJ4qmkROvslX6bJgXVEZqy7M8B%2B5TotWlGo2MM4IB0ko55C4Neho6kbmifwD4dxXGnl78IGz%2BFEnLBfHT1oi3NzZG2bEJTCS1zfYGhHtwpq9aKaj4v8R0klzyQMwupqYzQY6pgHZKFTiXqLvejyroiuZXfa8xVfHsxhFXxPzeVhBicf%2F%2Fb2eqf7rtHxCCMLz7o%2FSoil3pJC%2FPU88FTPpjpO1xa6ekZEenIZ14zkWPFuC8nhLsmO3n4s3Z0CoII6LhMqFVNITiPzxNDCuMKOO5tzi7QIVogI5MuoNxEBM6B2YQ2P%2BFH3zX935pb%2BgLeFEHckpYMgxKyxTx5GydOugZ7HGbCKDSG%2BhyhEG&X-Amz-Signature=1728cb9c5b60d25e7930f1bc3cc58f79fa3de6bc5f6a70987090a23db355a9cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665N4SNADB%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGJEisFZxxeAYXMSYmUCEjamVG8E8i2fk63JCDVneNeQIhAK79ncSzIeP1AFMt9q4Kba1H5G73LsGA7aYzDvx9bWLgKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwc%2F3EAgLHhQuH6dcoq3AOF12UUies63k6O9jyUkeBq%2BODuWKVD%2FftbQI9buGliWFDauCW9AJYQYZUT2nsg%2FrdDXfoK9HlwG%2FdqCg8HJwRT0J5ctpDmoAunMKTZ7X1p3Ff0gcNLXY1Hu1mdAqtCZys4sojTimNyt92kIyuCuwQwhpETMU1ZNL2%2BVbUQH0OX1RkbAqkhWffTABk%2FfqTYc%2BC43x35VZQQCMiXvehrYylWKCO704SbQixz%2F6XtEP2o56%2B9QZxpuSm3o2tqN%2BKnnTj8nJjnOWhAHH9Kfp0J1NGwfrqNXl%2BD5wk%2B6K%2FSBA5rTyCD4HSFGlCk8ZX1emF7Ul%2BQg1HIcF4Q%2FVCg3vunrutwtCUPPhWpnWIj8c4Uz0cpaNlXusMKqwPR9RsskgCMAOo3d0S%2FAyHMgA%2FaT%2FfXxTO8aiW1GWjwYWh2X9GtXhP4FJBaiamZPiSZmLUoAIto30cZ0bbQ50Ujrw7yiNONCjKx6LJ2EUWSx9KNAYOaxPGhody8aXk1gz0mDqS446a9iJlvHS3tnrY6wzhVFIevwEs%2Fwq7Zad0dDYSRKpPcO48zVzBnCsiAZnJCU97afydCs3MI2w0t2SuuWgL7qyEWy5NnIDaTuOP2YDbWpGgIzRyzgGfsYiPetFw9iAsesTDYmpjNBjqkAUph3Lhiz%2FpPWFF3yrWpxnvr%2BxovUhx%2F%2B3%2Fw6eUJpFUWyQFmfOvaqfGOQQcbwAeyR2qlsbAgDmK9JU21TQtbQyX3RSGEIMNW1TqebYulZrNinYLRvLl%2FgVkTSByo%2BYJJ0WKwoC6B0WenQAll77ykRqjeUZhDoapEpRXt2O1sAZKXR8AVyO15AF870CmT5dq9%2F9mGDMw18Lv9MtkZ2cSCApt7hRuQ&X-Amz-Signature=25a9010b782c92bc4e3671d0896e0c44e57b62c094e178750b36852c33acd113&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665N4SNADB%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGJEisFZxxeAYXMSYmUCEjamVG8E8i2fk63JCDVneNeQIhAK79ncSzIeP1AFMt9q4Kba1H5G73LsGA7aYzDvx9bWLgKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwc%2F3EAgLHhQuH6dcoq3AOF12UUies63k6O9jyUkeBq%2BODuWKVD%2FftbQI9buGliWFDauCW9AJYQYZUT2nsg%2FrdDXfoK9HlwG%2FdqCg8HJwRT0J5ctpDmoAunMKTZ7X1p3Ff0gcNLXY1Hu1mdAqtCZys4sojTimNyt92kIyuCuwQwhpETMU1ZNL2%2BVbUQH0OX1RkbAqkhWffTABk%2FfqTYc%2BC43x35VZQQCMiXvehrYylWKCO704SbQixz%2F6XtEP2o56%2B9QZxpuSm3o2tqN%2BKnnTj8nJjnOWhAHH9Kfp0J1NGwfrqNXl%2BD5wk%2B6K%2FSBA5rTyCD4HSFGlCk8ZX1emF7Ul%2BQg1HIcF4Q%2FVCg3vunrutwtCUPPhWpnWIj8c4Uz0cpaNlXusMKqwPR9RsskgCMAOo3d0S%2FAyHMgA%2FaT%2FfXxTO8aiW1GWjwYWh2X9GtXhP4FJBaiamZPiSZmLUoAIto30cZ0bbQ50Ujrw7yiNONCjKx6LJ2EUWSx9KNAYOaxPGhody8aXk1gz0mDqS446a9iJlvHS3tnrY6wzhVFIevwEs%2Fwq7Zad0dDYSRKpPcO48zVzBnCsiAZnJCU97afydCs3MI2w0t2SuuWgL7qyEWy5NnIDaTuOP2YDbWpGgIzRyzgGfsYiPetFw9iAsesTDYmpjNBjqkAUph3Lhiz%2FpPWFF3yrWpxnvr%2BxovUhx%2F%2B3%2Fw6eUJpFUWyQFmfOvaqfGOQQcbwAeyR2qlsbAgDmK9JU21TQtbQyX3RSGEIMNW1TqebYulZrNinYLRvLl%2FgVkTSByo%2BYJJ0WKwoC6B0WenQAll77ykRqjeUZhDoapEpRXt2O1sAZKXR8AVyO15AF870CmT5dq9%2F9mGDMw18Lv9MtkZ2cSCApt7hRuQ&X-Amz-Signature=25a9010b782c92bc4e3671d0896e0c44e57b62c094e178750b36852c33acd113&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGRDJDLF%2F20260303%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260303T005816Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDokryRwBSN3SgqNVfoiAYXu2p1dpFgOOORjD7UnG9TxwIgC84n1deKbJqNvW%2BbKqSlPJT%2Bl7uiwIF18BtF99P3KzsqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFKyNlCIyXuymh6hwircA2yw1tz4egv4s8GFX1CRAW%2FqZfFM6%2Fp6JBdCfCSj0LvfP%2FG62sq2xsAUVN8eQnh8HfQZrwfn%2BFp69Gk%2BBf5BYykwFVmbyGgX9YDMfNmiLd1MjJujcbSdGBd2LHBxVoHFXqaPaDLQTr%2FecZAIQHolY3MjBBopzm8oH3vC5X2ta%2BRmP2X4nNB3ry3ws4cnOL1iisblHAzv9lbyxm%2FDIjZ0h24e%2FG55CiQ%2BCxg0cLo2wLtxSqdoCrYsMOsj2eGFDidX9MGDBUzUS6%2BnnC%2FaNowy89IkHUk1IG0vvY4a0U8t7%2F4aWkUmwyVYqWyoHaeumaCkw74BPje0zFnsk1ksCOAqrIHwg1Y6F%2Fz%2BNi0dep6RZFOSjZBOfaSFQilnA4HLDhPi2yJtccfkTX8dpdyTgLqN6uUtfx8BuhyLBSLbeBZdOzQItxfW4EH09oVrJeYfH30JcnQUO8eSdHHqSuWzJILFMx051T0yQoxx8F5JlnIasUzmeQ1Cg1OvvqUG5pJ0SpBUT0exhK74qbQCbZ%2Bd5JMug5eij5hhhva%2BUsU0ra05u2nYODruau8IMG5ilj226CtN1cwP4o3GwMaQrF1k9MB%2B0TeuYZYLXotNA%2BSl7W7Er6TN%2Fk9dKPPz%2FLC4aK6XMP2ZmM0GOqUB4syYLI2uYwnO5lzDvOBZoS1Mx9cT5VPSh%2BBu%2F6gSGvWZr49xQbSllILdbNdnik0zaD%2FEmO0X1a8DC6tYI9REQmBlsMxNf%2BfxdzMbjnGaKgMjFAJxs7pXos4Re9r7heFMOv5pfGSEhjBWjOkthK3izlV0paZwPCvNCMzcCoM92DMQP5Jxwe%2Fu%2BjPPY5FW3oBfH79EO%2B5ceMiij6oGRxBEITiMfay4&X-Amz-Signature=bffc9cc748b90764ee7e73955d53e0f9c97ab889ff6792227b964e3322237009&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

