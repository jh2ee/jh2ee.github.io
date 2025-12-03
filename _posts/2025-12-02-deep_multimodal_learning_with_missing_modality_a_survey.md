---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWS3BJAQ%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T230052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIAO3eKTK9zuPXzq%2Fw%2Bex%2FL4xfR334iM7aTP2aodWn6V8AiEAv8Ihc2FpXHD9BWgNyZ4og8sjeY8yOh3DDD1HFW6NSlYq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDDgbWeh3kIdvAVNg%2BSrcAzTi4ALR7L5gQOILyJWx6xROucEvdpKkzSbgib4xJi0Pq1662uMQ3pnexMZQt1EHIx8ZZu80zAMxcuofTY7HMvRs5nFuXyc4PQlDHeCJv0YlB2D4ZZICRa8%2BbuDpxcJU79ZBnMOzPNmeCNCQZN2zhEyArwAblLlxJA5RmMZ7vAeNR4ouD5AwkHmUT30y%2FnI1mgdrS8U2NxD%2F3jonzNkUkmRP6xeu0u3%2FT1D9b%2B6woMuPrx0FXjjV7hfdhbkGNBrkFpgCSXdkefh2FOF7l8kluOeo2vp70R90dXrogSg75vIC%2BRoTdC%2Bhfoiufb9OVjqngLCr7kIsVOZ529DjJgn94wI7DXqajR1%2BdXTbDdyGW7IhVZPFp8c28aA6KXOr%2FW%2BNb5C2ucrsmKZD4JuPPbXjDxxqWtWu8BGFWEilorfpnd5g51zFIAtacfDJqlt14BNTvrD6RgllYMiU8VOvOnOBOzUL09QaHkzU0ClH9IuI0fhckuw9bBlRPVssv1t5oK8kwDZu6uOEOMwemJAqb6Td6IecjsCoNyYZDGkGQIEmhbz%2BB2PSPnzKwwR%2BgpnTskjboOoR8h6YpEBDimtfwwLPcMwxIxPX2M4Rn%2F9fvxFTMrfOMSC4iP5s%2BTlUVkG2MJ%2FnwskGOqUB253C9ufDQ1J2iwsrvj3tEb9S8MekUUNqmpgBJhGXQKbtD9CGvkIaXezxxmeMSV0lYz8iPA%2FpezXMJ3hMyuWjWscOUdMHSzygEwe0RJw%2FaYJUC42jDIRgYxPUz1foCNw4VKZRiBAnRxbdAu1Zhhr0h2MhyLnvfYFS7%2F8NvcKs4eESlhGJ2hOeXbxmLMBAbyhzecfJzvJ8lnsUjssOz%2F8VlB0NlePe&X-Amz-Signature=98a825153e200401b4d3e2f73efefc5d902cd0d8c39737de30dc42a6e04f10d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWS3BJAQ%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T230052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJHMEUCIAO3eKTK9zuPXzq%2Fw%2Bex%2FL4xfR334iM7aTP2aodWn6V8AiEAv8Ihc2FpXHD9BWgNyZ4og8sjeY8yOh3DDD1HFW6NSlYq%2FwMINxAAGgw2Mzc0MjMxODM4MDUiDDgbWeh3kIdvAVNg%2BSrcAzTi4ALR7L5gQOILyJWx6xROucEvdpKkzSbgib4xJi0Pq1662uMQ3pnexMZQt1EHIx8ZZu80zAMxcuofTY7HMvRs5nFuXyc4PQlDHeCJv0YlB2D4ZZICRa8%2BbuDpxcJU79ZBnMOzPNmeCNCQZN2zhEyArwAblLlxJA5RmMZ7vAeNR4ouD5AwkHmUT30y%2FnI1mgdrS8U2NxD%2F3jonzNkUkmRP6xeu0u3%2FT1D9b%2B6woMuPrx0FXjjV7hfdhbkGNBrkFpgCSXdkefh2FOF7l8kluOeo2vp70R90dXrogSg75vIC%2BRoTdC%2Bhfoiufb9OVjqngLCr7kIsVOZ529DjJgn94wI7DXqajR1%2BdXTbDdyGW7IhVZPFp8c28aA6KXOr%2FW%2BNb5C2ucrsmKZD4JuPPbXjDxxqWtWu8BGFWEilorfpnd5g51zFIAtacfDJqlt14BNTvrD6RgllYMiU8VOvOnOBOzUL09QaHkzU0ClH9IuI0fhckuw9bBlRPVssv1t5oK8kwDZu6uOEOMwemJAqb6Td6IecjsCoNyYZDGkGQIEmhbz%2BB2PSPnzKwwR%2BgpnTskjboOoR8h6YpEBDimtfwwLPcMwxIxPX2M4Rn%2F9fvxFTMrfOMSC4iP5s%2BTlUVkG2MJ%2FnwskGOqUB253C9ufDQ1J2iwsrvj3tEb9S8MekUUNqmpgBJhGXQKbtD9CGvkIaXezxxmeMSV0lYz8iPA%2FpezXMJ3hMyuWjWscOUdMHSzygEwe0RJw%2FaYJUC42jDIRgYxPUz1foCNw4VKZRiBAnRxbdAu1Zhhr0h2MhyLnvfYFS7%2F8NvcKs4eESlhGJ2hOeXbxmLMBAbyhzecfJzvJ8lnsUjssOz%2F8VlB0NlePe&X-Amz-Signature=98a825153e200401b4d3e2f73efefc5d902cd0d8c39737de30dc42a6e04f10d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCZ7QXUD%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T230055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQD5WA0%2By7TtTcWXUSKeVraS%2Fd9KfBdSTipTcADLjllzxAIhAJNdIbhTG4t9XplKWG9V8tMwkfc9QJREvF%2BkaXp8yuJRKv8DCDcQABoMNjM3NDIzMTgzODA1IgxHrAeurQf5I3S3FFwq3APST21ynVK18hM%2Fz2yfxsE%2BCIi4kKsbKdClXUZ7iGc%2BfnvxFuBKSSXmL%2BVBG4FInV9qD4H641AnFSnNlrMYz%2BjGf6NvT5VJTSH5DQlIuwb%2FsPCuqkkoZgA3%2FTEOI25ESD4FrfaNMnYdtfXhLrvpcKfIx7Pl3%2B4nQoXlbcqo1QKXwa5yQ%2BKLnf2TPRJ0bOykam2oFrFCyH0sVKh0mJJ9Zx9ksWzUckqlz1AEiYh%2BQk8MTN9PPgB%2BpuMFTbp9SttlGxCo5RQcX16IRD37ijo3faV4saPiYMZw9%2FI6gZcd7QcD2B2BlwllmDw8%2FF6kecyXsiyGhwCmh3TxukcxrI00pl8eh%2BFdrqYJjGmtbTuZvUABlTkoeAbw4%2FBlnFb9%2FQSI0jgKPAMShME1fEB42YdO54qRjSKXKirJQXQZPLne0gYQ2KodO9cySMuT%2BHg0%2FLQPICJIgfC2LY2AFHlyshb0td0YrsKZymkO%2BFtqcncs%2B9DDh5BHe3B3H0TlDx8SzoBRx1De9pFJTVSVUMQvitIXaGMnBrRjnHscE5FVMjDcu1Z8e39MlYEdP%2F3ZbYcoXF%2BcujEUEdaaJS%2FCa37S2j1lFrjTvyllvXLsCChnCcHE7yJdDnoDbYomKkUtSfNgwzCp6MLJBjqkAdkC1SoO9QBYkjXHfXaWYifywmrZ33zeNqrSaBqRutKR1bhrpdBBmkcb8B6aao6mWEI7KqHvjrh8R%2F63PyFdw6EV2Yw2Jc20kGQdlkfgO2tpK4SxvC8juvOWfoohv3fD%2F6j9Bu7j961BGAGbhXqVd4K9UMW0E4yMwFj4ZXKLStXw2GBtFeowAhNWZtAraY106%2F3mcU%2FWz95GrM8FEP94WhUN29pm&X-Amz-Signature=f046d36ad5ae5ab81e7336eb6921f387f6ba6dfd592050f02156ba5abd03a1ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCZ7QXUD%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T230055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQD5WA0%2By7TtTcWXUSKeVraS%2Fd9KfBdSTipTcADLjllzxAIhAJNdIbhTG4t9XplKWG9V8tMwkfc9QJREvF%2BkaXp8yuJRKv8DCDcQABoMNjM3NDIzMTgzODA1IgxHrAeurQf5I3S3FFwq3APST21ynVK18hM%2Fz2yfxsE%2BCIi4kKsbKdClXUZ7iGc%2BfnvxFuBKSSXmL%2BVBG4FInV9qD4H641AnFSnNlrMYz%2BjGf6NvT5VJTSH5DQlIuwb%2FsPCuqkkoZgA3%2FTEOI25ESD4FrfaNMnYdtfXhLrvpcKfIx7Pl3%2B4nQoXlbcqo1QKXwa5yQ%2BKLnf2TPRJ0bOykam2oFrFCyH0sVKh0mJJ9Zx9ksWzUckqlz1AEiYh%2BQk8MTN9PPgB%2BpuMFTbp9SttlGxCo5RQcX16IRD37ijo3faV4saPiYMZw9%2FI6gZcd7QcD2B2BlwllmDw8%2FF6kecyXsiyGhwCmh3TxukcxrI00pl8eh%2BFdrqYJjGmtbTuZvUABlTkoeAbw4%2FBlnFb9%2FQSI0jgKPAMShME1fEB42YdO54qRjSKXKirJQXQZPLne0gYQ2KodO9cySMuT%2BHg0%2FLQPICJIgfC2LY2AFHlyshb0td0YrsKZymkO%2BFtqcncs%2B9DDh5BHe3B3H0TlDx8SzoBRx1De9pFJTVSVUMQvitIXaGMnBrRjnHscE5FVMjDcu1Z8e39MlYEdP%2F3ZbYcoXF%2BcujEUEdaaJS%2FCa37S2j1lFrjTvyllvXLsCChnCcHE7yJdDnoDbYomKkUtSfNgwzCp6MLJBjqkAdkC1SoO9QBYkjXHfXaWYifywmrZ33zeNqrSaBqRutKR1bhrpdBBmkcb8B6aao6mWEI7KqHvjrh8R%2F63PyFdw6EV2Yw2Jc20kGQdlkfgO2tpK4SxvC8juvOWfoohv3fD%2F6j9Bu7j961BGAGbhXqVd4K9UMW0E4yMwFj4ZXKLStXw2GBtFeowAhNWZtAraY106%2F3mcU%2FWz95GrM8FEP94WhUN29pm&X-Amz-Signature=f046d36ad5ae5ab81e7336eb6921f387f6ba6dfd592050f02156ba5abd03a1ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3IUUHFG%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T230052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJIMEYCIQDsqku7lb7WbXcGFEMOEgFVF1YNK%2Fh0M6mDQXsS%2F7rPDwIhAK8oUW%2FH%2FkgLGXXsuRdsT5Nyzw1wUfR4O8FbVwt6wMt2Kv8DCDcQABoMNjM3NDIzMTgzODA1IgxVRfd5QxH3sqN67CUq3ANagpp4Et3AuF5C9bXFml67FhBt7LsAbaBwJu3LrON2eM3xHqhYh0RQ035FJFUdV0%2FWBb0bwVjZnw%2BZJfpA%2BE6aBu6acbd2fjw3NyR45huvKEELHNRtjP%2BfQSyeWxrZlNcILbS6g35CYYsREmyhKiXmTXaiwi8bVulA79mqKR70G8q29X4hXkJ2IKIJ3w4yqIE6hWbxjXUyGb39%2FwCt7QMzvAqtSau1P6HhHbztxgctg%2Bq7ANQqEcQwq31gX1Io8QtpuSvnZhUXEI7I1pEwn65XEOG5%2Bjdqol%2BO5EpN%2Fctrsdk0vWhqXH7YVcEIcA2PJA0rZtmJBGku4jXoMbW%2F8zCGwnp3U8vljLWjlWRN8RuFwoFvPRRSfI%2F4WFAwdvaFkAIvX4bhzBXOQIEc91LYky0uaLKqEmOIsIUnlWoDonAkJR3gz4uayytQn%2BIL9pJRlyrCKVjvmFvQqZ1fesHVk0njxfoidcxDUAbeFs%2BNWjCgrsmlPlmoVtjVCecRyMND4NjsnLjR0fWEpTGBNpdDUCS7y7uOa6qtkf%2F%2FwjqkecAetNpyeDVnRIkHXNuH%2FUmUIkxqwDZMB6gOUf3mM8ADlV7P%2Fe2A%2BcJL1j3LcvbWtC31oWsnSnRnwVl9eEizjjDR58LJBjqkAaUgcReg%2FpIdEglRb816q7GSo76C2neiFPZMbu5HMGi%2BhAXN3Duo1YZVNE7a0KK6Zv1hiW3zUWDW6ntwLRKhq7F%2Fu4qd61CMf4%2BcvZmRwJJVWAouOSJAimDQV5H7heQK%2FqhRMXdTf4gnnt%2Bsc04SmJ0nXgGe6alMz4IYE52TgOETRxOXoWyrv5xOwxAFtQ0hrG4WLUufKKouX8Knytv%2FTeSN15Es&X-Amz-Signature=74a0ac8a4821e84370dfeae86244004782486ce49cd44a265953528279b5fb43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673GR3TS3%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T230100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIGjONDzCK0BtmoN3UA5MEo4jjWypQ%2BEpg58ZNgEHEbXuAiBDZNlsztxwjyUJBpf46iBceGFnUAhMCxdyktN5OxEuHCr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMPYgOKGRzRuOprINaKtwD%2F6tGF2WRW6xI1CxJ4xtvyV6YfBXu2G58QtYlsGgi2n4vmEXFKSE3gh0RkNkgu2EWibYMtS%2FX9EFi2%2BrqPq9iDjzE%2B2Hm3pdbhE2WAOFv%2FhuKUS0TPayzOWGhtpkQU3g2T7%2B4rT%2BDyJ%2Fg8CwI63pInG8toWZz4L1hKtiQROfpIhrejJsazG8xX7xRy%2FENJxA8YW0qdqRa8z9Sgg6OGGiucz3QqHl6szLIlia0ag6%2B6FpRG6M0ZM3NAwUFV2JZLNvA7sHUIAH3dB6K4PUapl5zQeNCh6QLTyGsATZxPoYwHrhWxr9jAecmhV%2BF7StNDAte9HYvClC8ZI4Hk9Z4d4C4ul8YE1s0Is86VfO%2ByzwgRr8iE9KsqYtBFJpovHhWVwQjKQvJGbE%2FHXAdWkC5kre1uoXehZDk1Sc8IsD6BxkdjeRyQ1m5OgE8Ru%2FWXXiQG%2BQngTHa32ynKId%2FP%2F4nCx9jkR1voOwRjL6s4cltv3vjlCt%2F2DqoS6Q4R2EEyl8uLUdPWEIO9kYnW3I5v4LqEOHpvUx7AuU%2F3Ig08j5dD9cJT03oYXaupTlHQXPETW0l%2B%2B3QqmX7jUSRT%2F5cM7LpnsI7IwN3mGkYN2%2FBTkCEuGNJmZEMF1za6eQR98xhLN4wsefCyQY6pgEP2VDRafG8M5hqoXEjbxQji9nkq%2BGiIcbWtP%2BeSkRl5tpmPyTYxht78Aa66e%2Fwd5a971BaP6VFs6mDvo3LcYTjHULYOcxl8aFpRQjluy5Y89ZegzeFzLK%2FS%2Fdf0nYNjLZ4pK0i3%2FU2J8qyzhBlU4%2BD8c7lkeN07QM6FLf0ZYmF5x2fxIROHfF2hqys%2BXMKkUlamkx%2F17%2B8RMW5bdfE3wlxXUKk%2B0C5&X-Amz-Signature=8fa56e26ff3b63736186575233267d5b1f07e74faf50e479529c1234b26ba724&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673GR3TS3%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T230100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG4aCXVzLXdlc3QtMiJGMEQCIGjONDzCK0BtmoN3UA5MEo4jjWypQ%2BEpg58ZNgEHEbXuAiBDZNlsztxwjyUJBpf46iBceGFnUAhMCxdyktN5OxEuHCr%2FAwg3EAAaDDYzNzQyMzE4MzgwNSIMPYgOKGRzRuOprINaKtwD%2F6tGF2WRW6xI1CxJ4xtvyV6YfBXu2G58QtYlsGgi2n4vmEXFKSE3gh0RkNkgu2EWibYMtS%2FX9EFi2%2BrqPq9iDjzE%2B2Hm3pdbhE2WAOFv%2FhuKUS0TPayzOWGhtpkQU3g2T7%2B4rT%2BDyJ%2Fg8CwI63pInG8toWZz4L1hKtiQROfpIhrejJsazG8xX7xRy%2FENJxA8YW0qdqRa8z9Sgg6OGGiucz3QqHl6szLIlia0ag6%2B6FpRG6M0ZM3NAwUFV2JZLNvA7sHUIAH3dB6K4PUapl5zQeNCh6QLTyGsATZxPoYwHrhWxr9jAecmhV%2BF7StNDAte9HYvClC8ZI4Hk9Z4d4C4ul8YE1s0Is86VfO%2ByzwgRr8iE9KsqYtBFJpovHhWVwQjKQvJGbE%2FHXAdWkC5kre1uoXehZDk1Sc8IsD6BxkdjeRyQ1m5OgE8Ru%2FWXXiQG%2BQngTHa32ynKId%2FP%2F4nCx9jkR1voOwRjL6s4cltv3vjlCt%2F2DqoS6Q4R2EEyl8uLUdPWEIO9kYnW3I5v4LqEOHpvUx7AuU%2F3Ig08j5dD9cJT03oYXaupTlHQXPETW0l%2B%2B3QqmX7jUSRT%2F5cM7LpnsI7IwN3mGkYN2%2FBTkCEuGNJmZEMF1za6eQR98xhLN4wsefCyQY6pgEP2VDRafG8M5hqoXEjbxQji9nkq%2BGiIcbWtP%2BeSkRl5tpmPyTYxht78Aa66e%2Fwd5a971BaP6VFs6mDvo3LcYTjHULYOcxl8aFpRQjluy5Y89ZegzeFzLK%2FS%2Fdf0nYNjLZ4pK0i3%2FU2J8qyzhBlU4%2BD8c7lkeN07QM6FLf0ZYmF5x2fxIROHfF2hqys%2BXMKkUlamkx%2F17%2B8RMW5bdfE3wlxXUKk%2B0C5&X-Amz-Signature=8fa56e26ff3b63736186575233267d5b1f07e74faf50e479529c1234b26ba724&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

