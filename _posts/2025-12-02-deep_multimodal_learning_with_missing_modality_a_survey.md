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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OXWMK6N%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T140152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIBHKLPGUFUSDtUDLBGp692wQT%2BxCL75Q8imIjcfovoq0AiEA0aVhuQi6RbYspkHy9hkGglrIVFT2NBO1DBz6vkM%2BTlwq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDBZRfVULKAU7WMCzxSrcA3%2FYL7q0hUYsuDpOA%2FprdwdpRYBIhiDukT1ndHYfTmcNy9IdbKixWDLagJ1XiWMvWc4zdKY5arefQQEeLuOIxTc3Isb0423ZCCNETXx6vlYZusd%2BZ0jmJ1IZ0Y6TJqlS8x7m6LCdIfVZo1F8LCc8tMT0DCTsKQhPyBFsOeh%2F7RhABX3OyNtOVeF%2BXJwvm6I9SdU8LC9N7MRXPVQ%2BHLpvYd26Anyt5hSpKbx%2Bkixe6WkAYkvD6FqQmDtwKcgX3S%2FJ9bgkGYd1YExUsw4tOJhpU3g%2FLsgevqvwuNNa4odjQYbDFbxxb6XRs5NUsHbxbB8MonB%2BCL7QQkEomQqX9af6xrukdbhSTDHven0w%2B3Un6NLB1%2FzpQ9gMfef6ReciljYpjNpd8KpAups64JDAYPS6xn5nJ3fNrkUxnbnFupIAUMwfKoVJu%2Fwy%2BKycnHCmI7gv1e5sx2jNl3Xm8YhLBUTG76iLkUVOyrWwF5jBSNr4aW27qOqZtgvDodd7Om5PlTzBnkxXPkZv6oglX0O%2FeWu3nyo9fgEAzHolAMuVK3kM8xqjvLoCF%2FjHJH%2BhXq829mKhFND0vQYDwUv%2FqMuOWZXHihXJ6q4vnOcIFDhq%2F3v6%2BlBb4OImtEbe3vBz9WJ9MJT0wMkGOqUBw0s49s3XpxkgTsJU0wOzBs4xULLq3OpbtdKLjGxa5PggQxTuXbHjQNtIrPQbbe8baWJBqx7MOC2PF1TXtHRM8Y1cigFAUrNvUVUdNhcNrG4%2Bo%2FqkAzjHZLyuA0nQKBtosIaVtipr%2FSwghjOlPso8Tqu9%2FlNRo6EtNqf5awbfxrPXlu6ULZ3hg2Q4%2BXiQJVPa4234A9biL6E24BPMC4tkNKpvghba&X-Amz-Signature=79719fabefa9e36c2e8b01c8d7c1a59c2dfd31f79a5c89b86666289b09ff40c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OXWMK6N%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T140152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIBHKLPGUFUSDtUDLBGp692wQT%2BxCL75Q8imIjcfovoq0AiEA0aVhuQi6RbYspkHy9hkGglrIVFT2NBO1DBz6vkM%2BTlwq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDBZRfVULKAU7WMCzxSrcA3%2FYL7q0hUYsuDpOA%2FprdwdpRYBIhiDukT1ndHYfTmcNy9IdbKixWDLagJ1XiWMvWc4zdKY5arefQQEeLuOIxTc3Isb0423ZCCNETXx6vlYZusd%2BZ0jmJ1IZ0Y6TJqlS8x7m6LCdIfVZo1F8LCc8tMT0DCTsKQhPyBFsOeh%2F7RhABX3OyNtOVeF%2BXJwvm6I9SdU8LC9N7MRXPVQ%2BHLpvYd26Anyt5hSpKbx%2Bkixe6WkAYkvD6FqQmDtwKcgX3S%2FJ9bgkGYd1YExUsw4tOJhpU3g%2FLsgevqvwuNNa4odjQYbDFbxxb6XRs5NUsHbxbB8MonB%2BCL7QQkEomQqX9af6xrukdbhSTDHven0w%2B3Un6NLB1%2FzpQ9gMfef6ReciljYpjNpd8KpAups64JDAYPS6xn5nJ3fNrkUxnbnFupIAUMwfKoVJu%2Fwy%2BKycnHCmI7gv1e5sx2jNl3Xm8YhLBUTG76iLkUVOyrWwF5jBSNr4aW27qOqZtgvDodd7Om5PlTzBnkxXPkZv6oglX0O%2FeWu3nyo9fgEAzHolAMuVK3kM8xqjvLoCF%2FjHJH%2BhXq829mKhFND0vQYDwUv%2FqMuOWZXHihXJ6q4vnOcIFDhq%2F3v6%2BlBb4OImtEbe3vBz9WJ9MJT0wMkGOqUBw0s49s3XpxkgTsJU0wOzBs4xULLq3OpbtdKLjGxa5PggQxTuXbHjQNtIrPQbbe8baWJBqx7MOC2PF1TXtHRM8Y1cigFAUrNvUVUdNhcNrG4%2Bo%2FqkAzjHZLyuA0nQKBtosIaVtipr%2FSwghjOlPso8Tqu9%2FlNRo6EtNqf5awbfxrPXlu6ULZ3hg2Q4%2BXiQJVPa4234A9biL6E24BPMC4tkNKpvghba&X-Amz-Signature=79719fabefa9e36c2e8b01c8d7c1a59c2dfd31f79a5c89b86666289b09ff40c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FFE2GC3%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T140153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCICmE5k5VBlHvS3TmQBpGoYl0vfkJYqvj%2BljgH03K12W0AiEAwNacbKrxIzgnGL%2Fh3CjFEL3Ki92CBDAjjM5icL2mwd4q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDMXmfEtsW4dvAamhWyrcA0QYEdq4TaH7xfwA%2FMSvqgnEfhwApJT74TCzn5YUjRzxB1eQFFKyUFmruKczj%2FyD5kuaVWB2KywM4GgvYiwEd0LU4E3VaHDA%2B4AqvoDyyLad0ahBfbsfxXym6ywAfv3aQ8WiFGhjMboLA4zlIHPljn%2FdwGaA3FUnRyjyir8MiLEAMRIfva6WbWbrP3N%2B5uzjO8Euiu4givQztLV0RGWjiCYmMfJXyRY3Jzt5jLbUksX9PV6YN6NsCB0VquA22Q8gSLHvvfhTbKm6%2B8lXm8Lu43C%2F2304iyo5DNe61FBL%2FXGb5ubapVNO88bxVAXUSqN4EDAbt%2FxtqCfLzeSjZpWgYtWVnDiYn5gEciIlLtqRkHCog5tuOfM5C909PxAf3y%2BP37BymmKKvJOXyOEmOxYYARDfZEavVul2T%2BBlY5HVuAxZAOqe9P6KWMZr%2BTgLaVcKVjYmqNg0A%2Fu2k%2FU%2BmY6vGyENujkhsSgRmdaQS4ZRUGCnM2TuAaebSIGB6y7i9DnkthvW8Gky0RPJA4o8TbsKsTeOq78p18fY5NQ4ZRyCji3kczSEFGLesQn1Z0ABdstnAdBE8dTEPGu7yFSvpTEdvRLjQbknNNtR%2Bgs4bNMruO%2FuE1PpR9jRJXravIYQMOzzwMkGOqUBvsY7OPUVVER%2F69t0Muhppbeazn8gKVHePoHtuv%2B7%2Flj7quL5B1qc6%2FkSd%2FEy2YIFVOQ8gJ4aLn9YAi3IUqfjjsQU9lnBa8MgYG3Mdi6lmvzM8%2F%2FxjwosOFlYklPfHXBVLn%2B5G549S8V4iN68G%2BTyw4mQNVqCVvueL0l9K9%2B%2FsUhLJDbX4FRCPQ7iViJlKf5ZybRDIkEHcFUMfnaX3yOkfpplgT3l&X-Amz-Signature=27c24d3e64c5c1d5c1ae9256e5f1699cbb22174b323138ee3b2274e63199210e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FFE2GC3%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T140153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCICmE5k5VBlHvS3TmQBpGoYl0vfkJYqvj%2BljgH03K12W0AiEAwNacbKrxIzgnGL%2Fh3CjFEL3Ki92CBDAjjM5icL2mwd4q%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDMXmfEtsW4dvAamhWyrcA0QYEdq4TaH7xfwA%2FMSvqgnEfhwApJT74TCzn5YUjRzxB1eQFFKyUFmruKczj%2FyD5kuaVWB2KywM4GgvYiwEd0LU4E3VaHDA%2B4AqvoDyyLad0ahBfbsfxXym6ywAfv3aQ8WiFGhjMboLA4zlIHPljn%2FdwGaA3FUnRyjyir8MiLEAMRIfva6WbWbrP3N%2B5uzjO8Euiu4givQztLV0RGWjiCYmMfJXyRY3Jzt5jLbUksX9PV6YN6NsCB0VquA22Q8gSLHvvfhTbKm6%2B8lXm8Lu43C%2F2304iyo5DNe61FBL%2FXGb5ubapVNO88bxVAXUSqN4EDAbt%2FxtqCfLzeSjZpWgYtWVnDiYn5gEciIlLtqRkHCog5tuOfM5C909PxAf3y%2BP37BymmKKvJOXyOEmOxYYARDfZEavVul2T%2BBlY5HVuAxZAOqe9P6KWMZr%2BTgLaVcKVjYmqNg0A%2Fu2k%2FU%2BmY6vGyENujkhsSgRmdaQS4ZRUGCnM2TuAaebSIGB6y7i9DnkthvW8Gky0RPJA4o8TbsKsTeOq78p18fY5NQ4ZRyCji3kczSEFGLesQn1Z0ABdstnAdBE8dTEPGu7yFSvpTEdvRLjQbknNNtR%2Bgs4bNMruO%2FuE1PpR9jRJXravIYQMOzzwMkGOqUBvsY7OPUVVER%2F69t0Muhppbeazn8gKVHePoHtuv%2B7%2Flj7quL5B1qc6%2FkSd%2FEy2YIFVOQ8gJ4aLn9YAi3IUqfjjsQU9lnBa8MgYG3Mdi6lmvzM8%2F%2FxjwosOFlYklPfHXBVLn%2B5G549S8V4iN68G%2BTyw4mQNVqCVvueL0l9K9%2B%2FsUhLJDbX4FRCPQ7iViJlKf5ZybRDIkEHcFUMfnaX3yOkfpplgT3l&X-Amz-Signature=27c24d3e64c5c1d5c1ae9256e5f1699cbb22174b323138ee3b2274e63199210e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664D7PPAZ2%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T140152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQD49a5nU6JrCyd9KkRDeSWSAB1yTiWzq0t%2FVlTIKTTdWgIgd4YEdfGzqjxPPEkcTwY2z7ATgTEcldOC5lPcJ8Nn%2FJUq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDA7p88xnOKKMWkRwtSrcA27u%2FuU1jqotCLHpCXCk9OgvbppsPW5aUFSJec50YianABxVwmyjFJBN6UYEc6DvYJCnbu7SDKMkFgG0QoZ0nkMfV3ua3Vgb3FTzXW%2F%2BM891DHDC%2FETi%2Fnja3pVAmngmRPaIi3f%2Byshz%2Bhfe9FRg%2Fyj1PZ%2FbHsbIfnzNQzrE%2BZq1YpsqGv1edvAAK9DQypGjha%2B%2BOkRTWwcNjTP47EEJE0Ph9nmka1unvuAB3vn28syFauGEq%2BbOiR9iJ8j9qnTvA4BVqmS2N7wM26iaEvKL%2FSV%2FR%2BXG%2BshFRwIu%2BVrph6pyIvEUZJuwS8LoXKOaO2nM2Qsbv1ze9jV%2B%2Fk7cW055DPA6%2B4zmimveg9eV3H7y%2FAt7EqtK943N82tiKxaHxOeDbyjqM1h%2BJKEORybkRj%2FdqmCEJZxM0dVOnoPYIGC4o0UTa5mw31GE8m4JOvElSehvkt32SHUblFIyLb%2Fbefva7VgAfAtsGujbgTE210UlrGP4eiD1J585BzYe9RY5m73WeLX5%2F63kfIx5u1GLOPmbnlWiAO9uVc6oRXKRpWeYyGQ64PUv5tnUEknKOFSEMppc88vSpq2Mr34ZPM8rT7eRWwhEEUyc0OWJtw9s81ECObccZHZ9UEf60b2nZ%2F8dMN7zwMkGOqUBauoIit2no3TTllcLLUt5mwg%2Bvv3CjTxI0fgQzjgvQfQVLMDEu8%2BTpWtXKsd2lD6bGhvthzbyz9ezNggphgDQ00vICNh%2FAyP4VTQJyfmQeN0eAnbnRa%2BlnTDsgxj7Fy5EANAB9kSkpeZQDTqeNlKSJagQ0cfXH6ftT779pCZO94hh84cgHI2eCC82ALaqvPSx4kbF5eckuV%2FfapXCggvaohd4xrh2&X-Amz-Signature=fdb68313ef9bdc60f837eab6519e07ad4f572f60e22b66f21692f3bbff496403&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TCSK2YV%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T140156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCdC2YOiFR%2FbfE8jXG2n9jUFmAyzbxVHhHanjiZ0OOqjwIgAPK9sLXsy5OCGp1lRL6H83StyCFeNVsHGlYFY%2F1jMUMq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDPu2SjCAeBZx61vZOircA1eNTwOSSPkuEZat%2BKO7YGDA1HRdmXYREIkN69zAfAyc2%2B%2F0eTUDXKOLbztAoGT4DqdXgcaeVBkSaeWLcb4YDv3eX18%2BQyiHL4HQ33cQzwmmYCsSr%2Ffdi5eAfKY5UG7syexI3v47RhQ73pXiEyUciOpju%2B4fag8z941z6kMbNN1BbZxTXp1%2Fi2or4xdMzkq%2B82RT%2BtUwpCFIlg%2BJKpzHdcC%2BNbvzkwhXfQDLnOuv4vcOwmN1m%2FbgqBHeqnGVHmOif%2BPq%2BnApfuEKbCBMlWBBZpxC2fKrfRaQP0T9wfIoR6yZGoHWPHf1Tr%2FYv1OG5do7Ks0VwLCJlbWExpfQKlzLA92Z0SxtJOmedg7lOLCGUGWhF%2FUSPo9IHWWLQQfNzGRZHGYlmlDeVlvcEzD8SaHnPozScvie8W9tudRnsQJZ920TQjjqYJ%2Bd7Iduc9l%2Bvj%2FmomIbmfEnNd%2BOwpImwyLZRAEX79h2U1VMRKkCnpgbYl3IKy%2FcLqBmNN2u1ZlKZNmOikHOCROS53hLJ7wKDSNaMGB7kiGOElXMhTi0TGuZIz%2FYBrQnEd5JVtJR4MlSOP9qyB8EZD5i4Kyh30a6DKpD8kB2cp499G6uhp6KU5qKvQt5sbVrRGNdxmaiZAKKMJv0wMkGOqUB1F2CofLrYonvgA9mbJOFUFsY%2Bw9NgpXA2FiSisEArAJmEzZ%2Bp8lL4DIp3wTEnTOMZD7PW%2Bvl2NqfLq45DoSWEP4%2FWqQIwGqKFbxedA36TMgrs8z2hM5Ctl2%2BNq2j42IE9sleu%2F71n6QAQbSt%2F78n0K1%2B8kmq4XukDhtMudJTtaDtn3yl9ujzCdKXXK9M9nWmspctLjY94eSaDC34x0wgSvFvLw0h&X-Amz-Signature=5c6c8d4d279e154e9af121648031205d01267b2ae75c8961da029815a1673169&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TCSK2YV%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T140156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIQCdC2YOiFR%2FbfE8jXG2n9jUFmAyzbxVHhHanjiZ0OOqjwIgAPK9sLXsy5OCGp1lRL6H83StyCFeNVsHGlYFY%2F1jMUMq%2FwMILhAAGgw2Mzc0MjMxODM4MDUiDPu2SjCAeBZx61vZOircA1eNTwOSSPkuEZat%2BKO7YGDA1HRdmXYREIkN69zAfAyc2%2B%2F0eTUDXKOLbztAoGT4DqdXgcaeVBkSaeWLcb4YDv3eX18%2BQyiHL4HQ33cQzwmmYCsSr%2Ffdi5eAfKY5UG7syexI3v47RhQ73pXiEyUciOpju%2B4fag8z941z6kMbNN1BbZxTXp1%2Fi2or4xdMzkq%2B82RT%2BtUwpCFIlg%2BJKpzHdcC%2BNbvzkwhXfQDLnOuv4vcOwmN1m%2FbgqBHeqnGVHmOif%2BPq%2BnApfuEKbCBMlWBBZpxC2fKrfRaQP0T9wfIoR6yZGoHWPHf1Tr%2FYv1OG5do7Ks0VwLCJlbWExpfQKlzLA92Z0SxtJOmedg7lOLCGUGWhF%2FUSPo9IHWWLQQfNzGRZHGYlmlDeVlvcEzD8SaHnPozScvie8W9tudRnsQJZ920TQjjqYJ%2Bd7Iduc9l%2Bvj%2FmomIbmfEnNd%2BOwpImwyLZRAEX79h2U1VMRKkCnpgbYl3IKy%2FcLqBmNN2u1ZlKZNmOikHOCROS53hLJ7wKDSNaMGB7kiGOElXMhTi0TGuZIz%2FYBrQnEd5JVtJR4MlSOP9qyB8EZD5i4Kyh30a6DKpD8kB2cp499G6uhp6KU5qKvQt5sbVrRGNdxmaiZAKKMJv0wMkGOqUB1F2CofLrYonvgA9mbJOFUFsY%2Bw9NgpXA2FiSisEArAJmEzZ%2Bp8lL4DIp3wTEnTOMZD7PW%2Bvl2NqfLq45DoSWEP4%2FWqQIwGqKFbxedA36TMgrs8z2hM5Ctl2%2BNq2j42IE9sleu%2F71n6QAQbSt%2F78n0K1%2B8kmq4XukDhtMudJTtaDtn3yl9ujzCdKXXK9M9nWmspctLjY94eSaDC34x0wgSvFvLw0h&X-Amz-Signature=5c6c8d4d279e154e9af121648031205d01267b2ae75c8961da029815a1673169&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

